//

import _ from 'lodash'
// import sband from '../../../../sband'
import sband from "speckled-band"
import { segmenter, totalKeys } from "./segmenter";
import { tibsyms, tibsuff } from "../lib/tibetan_data";
import { csv2pouch } from '../../../../csv/csv2pouch'

const tsek = tibsyms.tsek
let retsek = new RegExp(tsek+'$')

// const JSON = require('json5')
// require('json5/lib/register')

// const request = require('request')
const path = require('path')
const fse = require('fs-extra')
let glob = require("glob")

const isDev = require('electron-is-dev')
const settings = require('electron-settings')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-load'));
PouchDB.plugin(require('pouch-stream'));

const log = console.log
let debug = require('debug')
// let log = debug('app')
// let d = debug('app')
// let miss = require('mississippi');
let csv2 = require('csv2');

let dbs = []
let code = 'tib'
let startkey =  'ཀ'
let endkey = '\ufff0'
let csvdb

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
    .then(function(dnames) {
      return Promise.all(dnames.map(function(dname) {
        let remotepath = ['http://diglossa.org:5984/', dname].join('')
        let remoteDB = new PouchDB(remotepath)
        return remoteDB.info()
      })).then(function(res) {
        let dbinfo = res.map(info=> { return {dname: info.db_name, size: info.doc_count} })
        return dbinfo
      })
    })
}

export function replicate(upath, dname) {
  let localpath = path.resolve(upath, 'pouch', dname)
  let localDB = new PouchDB(localpath)
  let dumppath = ['http://diglossa.org/dump-', dname].join('')
  let remotepath = ['http://diglossa.org:5984/', dname].join('')

  return localDB.load(dumppath)
    .then(function() {
      let opts = { live: true, retry: true }
      localDB.sync(remotepath, opts)
        .on('change', onSyncChange)
        .on('error', onSyncError)
      localDB.dname = dname
      dbs.push(localDB)
      // let dnames = dbs.map(db=>{ return db.dname })
      setCfg(dname)
    })
}

function onSyncChange(data) {  } // log('onSyncChange', data)
function onSyncError() { log('onSyncError') }

function setDBs(cfg) {
  let upath = settings.get('upath')
  cfg.forEach((dict, idx) => {
    if (!dict.active) return
    let dpath = path.resolve(upath, 'pouch', dict.dname)
    let pouch = new PouchDB(dpath)
    pouch.dname = dict.dname
    pouch.weight = idx
    dbs.push(pouch)
  })
  let dnames = dbs.map(db=>{ return db.dname })
  return dnames
}

export function ensureCfg(upath) {
  let cfg = settings.get('cfg')
  if (cfg) {
    setDBs(cfg)
  } else {
    cfg = []
    settings.set('cfg', cfg)
    let pouchpath = path.resolve(upath, 'pouch')
    fse.ensureDirSync(pouchpath)
  }
}

function setCfg(dname) {
  let upath = settings.get('upath')
  let cfg = settings.get('cfg')
  let check = _.find(cfg, dict=> { return dict.dname == dname })
  if (check) return cfg
  let newdict = {dname: dname, active: true, idx: cfg.length} // sync: remotepath,
  cfg.push(newdict)
  settings.set('cfg', cfg)
  return cfg
}

function delCfg(dname) {
  let upath = settings.get('upath')
  let cfg = settings.get('cfg')
  cfg = _.filter(cfg, dict=> { return dict.dname != dname})
  settings.set('cfg', cfg)
  return cfg
}

export function infoDB(upath, dname) {
  let localpath = path.resolve(upath, 'pouch', dname)
  let localDB = new PouchDB(localpath)
  localDB.allDocs({
    include_docs: true,
    startkey: startkey,
    endkey: endkey
  }).then(function (res) {
    if (!res.rows.length) return
    let doc = res.rows[0].doc
    // console.log('INFO-doc', doc)
    // console.log('INFO-docs', doc.docs)
  })
    .catch(function(err) {
      console.log('INFO ERR', err)
    })
}

export function cleanupDB(upath, cb) {
  let pouchpath = path.resolve(upath, 'pouch')
  try {
    dbs = []
    fse.removeSync(pouchpath)
    fse.ensureDirSync(pouchpath)
    settings.set('cfg', [])
    cb(true)
  } catch (err) {
    console.log('ERR re-creating DBs', err)
    cb(false)
    // app.quit()
  }
}

export function queryDBs (query) {
  let pdchs = segmenter(query.str)
  let keys
  let keyres = totalKeys(pdchs)
  if (query.compound) keys = _.filter(keyres.main, key=> { return key != query.str})
  else keys =  _.uniq(keyres.main.concat(keyres.added))
  let dnames = dbs.map(db=> { return db.dname })

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
        return docs
      })
      .catch(function (err) {
        console.log('ERR GET DBs', err)
      })
  }))
    .then(function (res) {
      let docs =_.flatten(res)
      let chain = compactDocs(docs, pdchs)
      query.chain = chain
      return query
    })
}

function selectTib(datapath, files) {
  let tibs = []
  let tibkey = {}
  files.forEach(fname => {
    let fpath = path.resolve(datapath, fname)
    if (fname == 'localDict.csv' || fname == 'unprocessed.csv') return
    let text = fse.readFileSync(fpath,'utf8').trim()
    let rows = text.split('\n')
    rows = _.compact(rows)
    rows.forEach((row, idx)=> {
      let clean = cleanStr(row)
      // if (idx > 0) return
      let gpars = sband(clean, code)
      if (!gpars) return
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
  let longests = _.filter(chains, chain => { return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length >= max - 1 })
  // let max = _.max(chains.map(chain => {  return _.sum(chain.map(segment => { return segment.docs.length ? Math.pow(segment.seg.length, 2) : 0 }))/chain.length } ) )
  // let longests = _.filter(chains, chain => { return _.sum(chain.map(segment => { return segment.docs.length ? Math.pow(segment.seg.length, 2) : 0 }))/chain.length >= max - 10 })

  let min = _.min(longests.map(chain => {  return chain.length } ) )
  let shortests  = _.filter(longests, chain => { return chain.length == min })
  return shortests
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

// ===================== generate Local Dict

let localDictPath
let dicts = []
export function scanLocalDict(datapath) {
  let dictpath = path.resolve(__dirname, datapath)
  let files = []
  // let pattern = '**/*\.tib*'
  let pattern = '**/*'
  let options = {cwd: dictpath, nodir: true}
  glob(pattern, options, function(err, files) {
    let wfs = selectTib(dictpath, files)
    let queries = wfs.map(wf=> { return {str: wf}})
    // queries = queries.slice(0, 10)

    let csvname = 'localDict.csv'
    localDictPath = path.resolve(dictpath, csvname)
    fse.removeSync(localDictPath)

    return queries.forEach(query=> {
      recQuery(query)
        .catch(function(err) {
          console.log('Q-ERR', err)
        })
    })
  })
}

function recQuery(query) {
  function decide(aquery) {
    if (!aquery.chain) return dicts
    aquery.chain.forEach(sec=> {
      if (sec.docs.length) saveChunk(sec.seg) //dicts.push(sec.seg)
      else {
        if (query.str != sec.seg) return recQuery({ str: sec.seg })
      }
    })
  }
  return queryDBs(query).then(decide);
}

function saveChunk(seg) {
  let csv = [seg, ', -\n'].join('')
  fse.appendFile(localDictPath, csv, function(err) {
    if (err) console.log('CSVERR', err)
  })
}


// =============== CSV

export function importCSV(jsonpath, cb) {
  let dname, dpath
  fse.readJson(jsonpath)
    .then((manifest) => {
      let upath = settings.get('upath')
      dname = path.parse(jsonpath).name
      dpath = path.resolve(upath, 'pouch', dname)
      fse.emptyDirSync(dpath)
      if (csvdb) {
        dbs = _.filter(dbs, db=> { return db.dname != dname })
        delCfg(dname)
        return csvdb.destroy()
      } else {
        return Promise.resolve()
      }
    })
    .then(function() {
      csvdb = new PouchDB(dpath)
      csv2pouch(jsonpath, csvdb)
        .on('finish', function (err) {
          log('THE END')
          // csvdb.get('འགོ')
          csvdb.info()
            .then(function(res) {
              log('CSV-RES:', res)
            })

          csvdb.dname = dname
          dbs.push(csvdb)
          setCfg(dname)
          cb(true)
        })
        .on('error', function (err) {
          log('IMPORT .ON ERR', err)
          log('IMPORT .ON DNAME', dname)
          dbs = _.filter(dbs, db=> { return db.dname != dname })
          delCfg(dname)
          cb(false)
        })

    })
}

export function exportCSV(csvname) {
  csvdb.get('འགོ')
  csvdb.info()
    .then(function(res) {
      log('D', res)
    })


  // csv2pouch(jsonpath, db)
  //   .then(function(res) {
  //     res
  //       .on('finish', function (err) {
  //         console.log('importCSV DONE');
  //         // let csvDB = new PouchDB(dpath)
  //         // csvDB.dname = name
  //         // dbs.push(csvDB)
  //         setCfg(name)
  //         cb(true)
  //       })
  //       .on('error', function (err) {
  //         console.log('IMPORT CSV ERR', err);
  //         delCfg(name)
  //         fse.emptyDirSync(dpath)
  //         cb(false)
  //       })
  //   })

}

// export function exportCSV(csvname) {
//   let db = _.find(dbs, db=> { return db.dname == csvname })
//   return db.allDocs({
//     include_docs: true,
//     startkey: startkey,
//     endkey: endkey
//   }).then(function (res) {
//     let docs = res.rows.map(row=> { return row.doc })
//     let csv = ''
//     docs.forEach(doc=> {
//       let head = doc._id
//       let trns = doc.docs.map(rdoc=> { return rdoc.trns })
//       let trn = _.flatten(trns).join(';')
//       let commas = trn.split(',')
//       let value = (commas.length > 1) ? JSON.stringify(trn) : trn
//       let str = [head, value].join(',')
//       str = [str, '\n'].join('')
//       csv += str
//     })
//     let upath = settings.get('upath')
//     let filename = [csvname, 'csv'].join('.')
//     let manifest = [csvname, 'json'].join('.')
//     let filepath = path.resolve(upath, filename)
//     let manipath = path.resolve(upath, manifest)
//     fse.writeFile(filepath, csv, function(err) {
//       if (err) return false
//       db.get('description')
//         .then(function(doc) {
//           fse.writeJson(manipath, doc)
//             .then(() => {
//               return true
//             })
//             .catch(err => {
//               console.error(err)
//               return false
//             })
//         })
//     })
//   })
// }
