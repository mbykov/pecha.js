//

import _ from 'lodash'
import sband from '../../../../sband'
import { segmenter, totalKeys } from "./segmenter";
import { tibsyms, tibsuff } from "../lib/tibetan_data";
const tsek = tibsyms.tsek
let retsek = new RegExp(tsek+'$')

let hi = require('highland');
const path = require('path')
const fse = require('fs-extra')
let glob = require('glob-fs')({ gitignore: true })

const isDev = require('electron-is-dev')
const settings = require('electron-settings')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-load'));

// const log = console.log
let debug = require('debug')
let log = debug('app')
// let d = debug('app')

let tmp
let tmps = []

let code = 'tib'
let dbs = []
let test = 'ཀྱི་བསླབ་པ'
let test2 = 'ཀྱི་བསླབ་པ་དང'
let rekuku = /༈/

const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb()
const diglossa = new NodeCouchDb({
  host: 'couchdb.external.service',
  protocol: 'https',
  port: 6984
})
const couchAuth = new NodeCouchDb({
  auth: {
    user: 'login',
    pass: 'secret'
  }
})

export function remoteDicts() {
  return couch.listDatabases()
    .catch(function(err) {
      log('REMOTE DICTS ERR', err)
    })
}

export function replicate(remotepath, localpath) {
  log('REPLICATE LOCAL', localpath)
  let localDB = new PouchDB(localpath);
  // return localDB.load('http://localhost:3000/dumps/dump.txt')
  return localDB.info()
    .then(function(info) {
      log('REPL-BEFORE-INFO', info)
      return localDB.load(remotepath)
      // return localDB.load('http://localhost:3000/dumps/dump.txt')
    })
}

function setDBs(upath, cfg) {
  dbs = []
  let dbnames = _.compact(cfg.map(dict => { return (dict.active) ? dict.name : null }))
  log('setDBNS', dbnames)
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
  let fns = fse.readdirSync(pouchpath)
  let oldcfg = settings.get('cfg') || []
  let cfg = []
  fns.forEach((dn, idx) => {
    let old = _.find(oldcfg, dict=> {return dict.name == dn })
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
  return cfg
}

// adduser --system --home /opt/couchdb --no-create-home --shell /bin/bash -g couchdb couchdb
// useradd --system -b /opt/couchdb --shell /bin/bash -g couchdb couchdb
// sudo -i -u couchdb bin/couchdb

export function infoDB(localpath) {
  let localDB = new PouchDB(localpath)
  return localDB.info()
}

export function cleanupDB(state) {
  log('CLEAN UP')
}

export function queryDBs (query) {
  log('QUERY->', query.str)
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
      tmps.push(chain)
      query.chain = chain
      return query
      // return chain
    })
}

// let hiquery = hi.wrapCallback(queryDBs)

function hiquery(query) {
  return hi(function (push, next) {
    queryDBs(query)
      .then(function(qres) {
        push(null, qres)
        push(null, hi.nil)
      })
      .catch(function (err) {
        push(err, null)
        push(null, hi.nil)
      })
  })
}


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
  queries = queries.slice(0, 2)

  // log('QS1', queries)
  let dicts = []

  hi(queries)
    .map(hiquery)
    .series()
    .append(hiquery({str: test}))
    // .through(append)
    // .resume()
    .toArray(hi.log)
    // .toArray(function (s) {
  // log('QP', s)
  // })
}


var append = function (source) {
  source.append({str: 'test-filter'})
  return source
}

var filter = function (source) {
  return source.consume(function (err, x, push, next) {
    if (err) {
      // pass errors along the stream and consume next value
      push(err);
      next();
    }
    else if (x === _.nil) {
      // pass nil (end event) along the stream
      push(null, x);
    }
    else {
      // pass on the value only if the value passes the predicate
      if (f(x)) {
        log('________________________ AHA!')
        // push(null, {str: 'test-filter'});
        source.append({str: 'test-filter'})
      }
      next();
    }
  });
};

function f(x) {
  return true
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
