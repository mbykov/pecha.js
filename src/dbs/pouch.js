//

import _ from 'lodash'
import sband from "speckled-band"
import { segmenter, totalKeys } from "./segmenter";
import { tibsyms, tibsuff } from "../lib/tibetan_data";
import { csv2pouch } from './csv2pouch'
import { glob2csv } from './glob2csv'

const tsek = tibsyms.tsek
let retsek = new RegExp(tsek+'$')

// const JSON = require('json5')
// require('json5/lib/register')

// const request = require('request')
const path = require('path')
const fse = require('fs-extra')
// let glob = require("glob")

const isDev = require('electron-is-dev')
const settings = require('electron-settings')
let PouchDB = require('pouchdb')
let load = require('pouchdb-load');
PouchDB.plugin(require('pouchdb-load'));

// let Remote = require('pouch-remote-stream');
// PouchDB.adapter('remote', Remote.adapter);

const log = console.log
let debug = require('debug')
// let d = debug('app')
// let miss = require('mississippi');
let csv2 = require('csv2');

let dbs = []
let code = 'tib'
let startkey =  'ཀ'
let endkey = '\ufff0'
// let csvDB

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
    .then(function(dnlist) {
      let defaults = ['_users']
      let dnames = _.difference(dnlist, defaults)
      return Promise.all(dnames.map(function(dname) {
        let remotepath = ['http://diglossa.org:5984/', dname].join('')
        let remoteDB = new PouchDB(remotepath)
        // return remoteDB.info()
        return remoteDB.info().then(info=> {
          return remoteDB.get('description')
            .then(descr=> {
              let dbinfo = { dname: info.db_name, size: info.doc_count, descr: descr }
              return dbinfo
            })
            .catch(err=> {
              log('REMOTE-ERR:', err)
            })
          })
      }))
        .then(function(dbinfos) {
          settings.set('dbinfos', dbinfos)
          return dbinfos
      })
    })
}

export function replicate(upath, dname) {
  let localpath = path.resolve(upath, 'pouch', dname)
  let localDB = new PouchDB(localpath)
  let dumppath = ['http://diglossa.org/dump-', dname].join('')
  let remotepath = ['http://diglossa.org:5984/', dname].join('')
  let dbinfos = settings.get('dbinfos')

  return localDB.load(dumppath)
    .then(function() {
      let opts = { live: true, retry: true }
      localDB.sync(remotepath, opts)
        .on('change', onSyncChange)
        .on('error', onSyncError)
      localDB.dname = dname
      dbs.push(localDB)
      let dbinfo = _.find(dbinfos, dbinfo=> { return dbinfo.dname == dname })
      setCfg(dbinfo)
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

export function reReadCfg() {
  let cfg = settings.get('cfg')
  dbs = []
  setDBs(cfg)
}

function setCfg(dbinfo) {
  let upath = settings.get('upath')
  let cfg = settings.get('cfg')
  let check = _.find(cfg, dict=> { return dict.dname == dbinfo.dname })
  if (check) return cfg
  dbinfo.active = true
  dbinfo.idx = cfg.length
  cfg.push(dbinfo)
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

export function infoDB(dname) {
  let upath = settings.get('upath')
  let localpath = path.resolve(upath, 'pouch', dname)
  let db = _.find(dbs, db=> { return db.dname == dname })
  db.info()
    .then(function(info) {
      log('INFO', info)
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

// let query = {keys: keys, pdchs: pdchs, compound: compound, lastsek: lastsek}
function compactDocs(docs, pdchs) {
  let chains = makeChains(pdchs, docs)
  // log('CHAINS', chains.length, chains)
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
  // let bests, full
  // if (fulls.length) bests = selectBests(fulls), full = true
  // else bests = selectBests(chains)
  // return {chains: bests, full: full}
  if (fulls.length) chains = fulls
  let bests = selectBests(chains)
  return bests
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

// function fullChains(chains) {
//   let fulls = []
//   chains.forEach(segs => {
//     let full = true
//     segs.forEach(seg => {
//       if (!seg.docs.length) full = false
//     })
//     if (full) fulls.push(segs)
//   })
//   return fulls
// }

// =============== CSV

export function importCSV(jsonpath, cb) {
  let dname, dpath
  fse.readJson(jsonpath)
    .then(function(manifest) {
      let upath = settings.get('upath')
      dname = manifest.name
      dpath = path.resolve(upath, 'pouch', dname)
      return csv2pouch(jsonpath, dpath)
        .on('finish', function (err) {
          let csvDB = new PouchDB(dpath)
          csvDB.dname = dname
          dbs.push(csvDB)
          let newcfg = { dname: dname, descr: manifest }
          setCfg(newcfg)
          cb(true)
        })
        .on('error', function (err) {
          log('IMPORT CSV ERR:', err)
          throw new Error()
        })
    })
    .catch(function(err) {
      log('IMPORT CSV CATCH ERR:', err)
      let cfg = settings.get('cfg')
      log('IMP ERR CFG', cfg)
      // console.log('IMPORT .ON ERR', err)
      dbs = _.filter(dbs, db=> { return db.dname != dname })
      delCfg(dname)
      cb(false)
    })
}

export function exportCSV(csvname, cb) {
  let db = _.find(dbs, db=> { return db.dname == csvname })
  db.allDocs({
    include_docs: true,
    startkey: startkey,
    endkey: endkey
  }).then(function (res) {
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
    let upath = settings.get('upath')
    let filename = [csvname, 'csv'].join('.')
    let manifest = [csvname, 'json'].join('.')
    let filepath = path.resolve(upath, filename)
    let manipath = path.resolve(upath, manifest)
    fse.writeFile(filepath, csv, function(err) {
      if (err) log('ERRR', err)
      if (err) return cb(false)
      db.get('description')
        .then(function(doc) {
          fse.writeJson(manipath, doc)
            .then(() => {
              cb(true)
              // return true
            })
            .catch(err => {
              console.error('JSONERR', err)
              cb(false)
              // return false
            })
        })
    })
  })
}
