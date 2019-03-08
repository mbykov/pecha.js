//

import _ from 'lodash'
import sband from '../../../../sband'
import { segmenter, totalKeys } from "./segmenter";
import { tibsyms, tibsuff } from "../lib/tibetan_data";
const tsek = tibsyms.tsek
let retsek = new RegExp(tsek+'$')

const request = require('request')
const path = require('path')
const fse = require('fs-extra')
let glob = require('glob-fs')({ gitignore: true })

const isDev = require('electron-is-dev')
const settings = require('electron-settings')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-load'));

const log = console.log
let debug = require('debug')
// let log = debug('app')
// let d = debug('app')
let H = require('highland');
let miss = require('mississippi');
let csv2 = require('csv2');


let code = 'tib'
let dbs = []
let test = 'ཀྱི་བསླབ་པ'
let test2 = 'ཀྱི་བསླབ་པ་དང'
let rekuku = /༈/

const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb()

const diglossa = new NodeCouchDb({
  host: 'diglossa.org',
  protocol: 'http',
  port: 5984,
  auth: {
    user: 'guest',
    pass: 'guest'
  }
})

export function remoteDicts() {
  return diglossa.listDatabases()
    .catch(function(err) {
      log('REMOTE DICTS ERR', err)
      throw new Error(err)
    })
}

export function replicate(upath, dbname) {
  let localpath = path.resolve(upath, 'pouch', dbname)
  let localDB = new PouchDB(localpath)
  let remotepath = ['http://diglossa.org/dump-', dbname].join('')
  log('REPLICATE START', localpath, remotepath)

  // return localDB.info()
  //   .then(function(info) {
  //     log('REPL-BEFORE-INFO', info)
  //     localDB.load(remotepath)
  //       .then(function(res) {
  //         let cfg = getCfg()
  //         log('REPL OK, getting CFG', cfg)
  //         return cfg
  //       })
  //   })

  return localDB.load(remotepath)
    .then(function(res) {
      let opts = { live: true, retry: true };
      localDB.sync(remotepath, opts)
        .on('change', onSyncChange)
        .on('paused', onSyncPaused)
        .on('error', onSyncError);

      let cfg = getCfg()
      log('REPL OK, getting CFG', cfg)
      return cfg
    })

  localDB.replicate.from(remotepath).on('complete', function(info) {
    // then two-way, continuous, retriable sync
    let opts = { live: true, retry: true };
    localDB.sync(remotepath, opts)
      .on('change', onSyncChange)
      .on('paused', onSyncPaused)
      .on('error', onSyncError);
  }).on('error', onSyncError);

}

function onSyncChange() { log('onSyncChange') }
function onSyncPaused() { log('onSyncPaused') }
function onSyncError() { log('onSyncError') }

function setDBs(upath, cfg) {
  dbs = []
  let dbnames = _.compact(cfg.map(dict => { return (dict.active) ? dict.name : null }))
  // log('setDBNS', dbnames)
  dbnames.forEach((dn, idx) => {
    let dpath = path.resolve(upath, 'pouch', dn)
    let pouch = new PouchDB(dpath)
    pouch.dname = dn
    pouch.weight = idx
    dbs.push(pouch)
  })
  return dbnames
}

export function getCfg() {
  let upath = settings.get('upath')
  let pouchpath = path.resolve(upath, 'pouch')
  fse.ensureDirSync(pouchpath)
  let fns = fse.readdirSync(pouchpath)
  // log('FNS', fns)
  let oldcfg = settings.get('cfg') || []
  // log('OLDCFG', oldcfg)
  let cfg = []
  fns.forEach((dn, idx) => {
    let old = _.find(oldcfg, dict=> {return dict.name == dn })
    // log('OLD', old)
    if (old) cfg.push(old)
    else {
      let newdict = {name: dn, active: true, idx: 100+idx}
      cfg.push(newdict)
    }
  })
  cfg = _.sortBy(cfg, 'idx')
  cfg.forEach((dict, idx)=> { dict.idx = idx })
  settings.set('cfg', cfg)
  setDBs(upath, cfg)
  log('===CFG===', cfg)
  return cfg
}

// adduser --system --home /opt/couchdb --no-create-home --shell /bin/bash -g couchdb couchdb
// useradd --system -b /opt/couchdb --shell /bin/bash -g couchdb couchdb
// sudo -i -u couchdb bin/couchdb

export function infoDB(localpath) {
  let localDB = new PouchDB(localpath)
  return localDB.info()
}

export function cleanupDB(upath) {
  let destpath = path.resolve(upath, 'pouch')
  log('CLEAN UP', destpath)
  try {
    fse.removeSync(destpath)
    getCfg()
  } catch (err) {
    log('ERR re-creating DBs', err)
    // app.quit()
  }
}

export function queryDBs (query) {
  // log('QUERY->', query.str)
  let clean = query.str.replace(rekuku, '')

  let pdchs = segmenter(query.str)
  let keys
  let keyres = totalKeys(pdchs)
  if (query.compound) keys = _.filter(keyres.main, key=> { return key != query.str})
  else keys =  _.uniq(keyres.main.concat(keyres.added))
  // log('KEYS->', keys.length)

  return Promise.all(dbs.map(function (db) {
    return db.allDocs({
      keys: keys,
      include_docs: true
    })
      .then(function (res) {
        if (!res || !res.rows) throw new Error('no dbn result')
        let rdocs = _.compact(res.rows.map(row => { return row.doc }))
        let docs = _.flatten(_.compact(rdocs.map(rdoc => { return rdoc.docs })))
        docs.forEach(doc => { doc.dname = db.dname, doc.weight = db.weight })
        // log('DOCS->', docs.length)
        return docs
      })
      .catch(function (err) {
        console.log('ERR GET DBs', err)
      })
  }))
    .then(function (res) {
      // log('======RES', res.length)
      let docs =_.flatten(res)
      // log('======DOCS', docs.length)
      let chain = compactDocs(docs, pdchs)
      // log('======CHAIN', chain)
      query.chain = chain
      return query
      // return chain
    })
}

function selectTib(datapath, files) {
  let tibs = []
  let tibkey = {}
  files.forEach(file => {
    let fpath = path.resolve(datapath, file)
    let text = fse.readFileSync(fpath,'utf8').trim()
    let rows = text.split('\n')
    rows = _.compact(rows)
    rows.forEach((row, idx)=> {
      let clean = cleanStr(row)
      // if (idx > 0) return
      let gpars = sband(clean, code)
      gpars.forEach(gpar=> {
        gpar.forEach(span=> {
          if (span.lang != code) return
          let wfs = span.text.split(' ')
          wfs.forEach(wf=> {
            wf = wf.replace(retsek, '')
            if (tibkey[wf]) return
            tibs.push(wf)
            tibkey[wf] = true
          })
        })
      })
    })
  })
  return tibs
}

function cleanStr(row) {
  let clean = row.trim()
  clean = clean.trim().replace(/\.$/, '')
  return clean
}

// let query = {keys: keys, pdchs: pdchs, compound: compound, lastsek: lastsek}
export function compactDocs(docs, pdchs) {
  let res = makeChains(pdchs, docs)
  let chains = res.chains
  // log('FULL, CHAINS', res.full, chains.length, chains)
  let chain
  if (chains.length > 1) chain = commonParts(chains)
  else if (chains.length == 1) chain = chains[0]
  return chain
}


function commonParts(chains) {
  let first = chains[0]
  let clean = []
  let ambitmp
  for (let idx = 0; idx < first.length; idx++) {
    let segs = chains.map(segs=> { return segs[idx].seg })
    if (_.uniq(segs).length == 1) {
      clean.push(first[idx])
      ambitmp = null
    } else {
      if (!ambitmp) ambitmp = {ambi: true, seg: '', docs: []}, clean.push(ambitmp)
      let segdocs = chains.map(segs=> { return {seg: segs[idx].seg, docs: segs[idx].docs}  })
      ambitmp.docs.push(segdocs)
    }
  }
  let ambis = _.filter(clean, seg=> { return seg.ambi })
  ambis.forEach(ambi=>{
    let first = ambi.docs[0]
    let chains = []
    for (let idx = 0; idx < first.length; idx++) {
      let chain = ambi.docs.map(adocs=> { return adocs[idx] })
      chains.push(chain)
    }
    ambi.chains = chains
    let chain = chains[0]
    ambi.seg = chain.map(seg=>{ return seg.seg}).join(tsek)
  })
  // log('___AMBIS___', ambis)
  return clean
}

function makeChains(pdchs, docs) {
  let chains = []
  let fulls = []
  pdchs.forEach(segs=>{
    let chain = []
    let any = false
    let full = true
    segs.forEach(seg=>{
      let segdocs = _.filter(docs, doc => { return startWith(seg, doc.dict) })
      if (segdocs.length) any = true
      if (!segdocs.length) full = false
      let doc = {seg: seg, docs: segdocs}
      chain.push(doc)
    })
    if (any) chains.push(chain)
    if (full) fulls.push(chain)
  })
  // здесь full только для справки, убрать!!!
  let bests, full
  if (fulls.length) bests = selectBests(fulls), full = true
  else bests = selectBests(chains)
  return {chains: bests, full: full}
}

function selectBests(chains) {
  let max = _.max(chains.map(chain => {  return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length } ) )
  // log('MAX', max)
  let longests = _.filter(chains, chain => { return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length >= max - 1 })
  // longests = _.sortBy(longests, chain => { return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length }).reverse()
  // log('LNGST', longests)
  // return longests

  // // квадраты - выберет более равномерное деление, да, но отбросит тоже хорошие
  // let max = _.max(chains.map(chain => {  return _.sum(chain.map(segment => { return segment.docs.length ? Math.pow(segment.seg.length, 2) : 0 }))/chain.length } ) )
  // // log('MAX', max)
  // let longests = _.filter(chains, chain => { return _.sum(chain.map(segment => { return segment.docs.length ? Math.pow(segment.seg.length, 2) : 0 }))/chain.length >= max - 10 })

  let min = _.min(longests.map(chain => {  return chain.length } ) )
  // log('MIN', min)
  let shortests  = _.filter(longests, chain => { return chain.length == min })
  return shortests
  // let maxlong = _.max(longests.map(chain => {  return chain.length } ) )
  // // log('maxlong', maxlong)
  // longests  = _.filter(longests, chain => { return chain.length == maxlong })
  // return longests
}

function startWith(str, head) {
  if (str == head) return true
  let reh = new RegExp('^' + head)
  let tail = str.replace(reh, '')
  return (str != tail && tibsuff.includes(tail)) ?  true : false
}

function fullChains(chains) {
  let fulls = []
  chains.forEach(segs => {
    let full = true
    segs.forEach(seg => {
      if (!seg.docs.length) full = false
    })
    if (full) fulls.push(segs)
  })
  return fulls
}

// =====================

let dicts = []
let tmpdicts = []
let qs = []

export function localDict(datapath) {
  log('LOCAL', datapath)
  datapath = path.resolve(__dirname, datapath)
  let files = glob.readdirSync('**/*\.tib*', {cwd: datapath})
  files = _.uniq(files)
  // log('LOCAL DICT', datapath)
  // log('F', files)
  let wfs = selectTib(datapath, files)
  log('WFS', wfs.length)
  let queries = wfs.map(wf=> { return {str: wf}})
  queries = queries.slice(0, 3)
  log('QS2', queries)

  recQuery(queries)
}

function recQuery(queries) {
  let rs = miss.from.obj(queries)
  let ws = miss.to.obj(write, flush)
  let  streamDB = miss.through.obj( // TODO parallel
    function (chunk, enc, cb) {
      queryDBs(chunk)
        .then(function(query) {
          cb(null, query)
        })
    },
    // function (cb) {
    //   cb(null, 'ONE LAST BIT OF UPPERCASE')
    // }
  )

  miss.pipe(rs, streamDB, ws, function (err) {
    if (err) return console.error('Copy error!', err)
    console.log('Copied successfully')
  })
}

function write (data, enc, cb) {
  // log('writing', JSON.stringify(data))
  log('_dbres_:', data)
  if (!data.chain) return cb()
  data.chain.forEach(seg=> {
    if (seg.docs.length) dicts.push(seg.seg)
    else qs.push(seg.seg)
  })
  cb()
}

function flush (cb) {
  // i am called before finish is emitted
  qs = _.uniq(qs)
  dicts = _.uniq(dicts)
  if (tmpdicts.length == dicts.length)  return log('__VERY END__', dicts)
  else tmpdicts.length = dicts.length
  log('FLUSH: DICTS', dicts.length, 'QS', qs)
  if (qs.length) {
    let queries = qs.map(qs=> { return {str: qs}})
    recQuery(queries)
  } else {
    log('____THE END____')
  }
}

// потом в рекурсию
// function localQueries(queries) {
//   queries.forEach(query=> {
//     queryDBs (query)
//   })
// }

// =============== CSV

export function importCSV(csvname) {
  log('IMPORT CSV', csvname)

  // добавить обработку # сомментариев
  fse.createReadStream(csvname)
      .pipe(csv2())
      .on('data', console.log)
}

let startkey =  'ཀ'
let endkey = '\ufff0'

export function exportCSV(csvname) {
  log('export to CSV', csvname)
  let db = _.find(dbs, db=> { return db.dname == csvname })
  log('export DB', db.dname)
  return db.allDocs({
    include_docs: true,
    startkey: startkey,
    endkey: endkey
  }).then(function (res) {
    let upath = settings.get('upath')
    let docs = res.rows.map(row=> { return row.doc })
    let csv = ''
    docs.forEach(doc=> {
      let head = doc._id
      let trns = doc.docs.map(rdoc=> { return rdoc.trns })
      let trn = _.flatten(trns).join(';')
      let commas = trn.split(',')
      let value = (commas.length > 1) ? JSON.stringify(trn) : trn
      let str = [head, value].join(',')
      str = [str, '\n'].join('')
      csv += str
    })
    let filename = [csvname, 'csv'].join('.')
    let filepath = path.resolve(upath, filename)
    fse.writeFile(filepath, csv, function(err) {
      console.log("The file was saved!");
      return true
    })
  })
}
