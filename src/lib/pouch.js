import _ from 'lodash'
import { remote } from "electron";

const path = require('path')
const fse = require('fs-extra')
const curl = require('curl')
const app = remote.app;
const apath = app.getAppPath()
const upath = app.getPath("userData")
const settings = remote.require('electron-settings')
const log = console.log
const PouchDB = require('pouchdb')


let dbs = []
let pouchpath = path.resolve(upath, 'pouch')
fse.ensureDirSync(pouchpath)

export function cleanupDB(state) {
  log('CLEAN UP')
}

export function getPossible(keys) {
  if (!dbs.length) setDBs()
  return queryDBs(keys)
}

export function queryDBs (keys) {
  return Promise.all(dbs.map(function (db) {
    return db.allDocs({
      keys: keys,
      include_docs: true
    })
      .then(function (res) {
        if (!res || !res.rows) throw new Error('no dbn result')
        let rdocs = _.compact(res.rows.map(row => { return row.doc }))
        let docs = _.flatten(_.compact(rdocs.map(rdoc => { return rdoc.docs })))
        if (!docs.length) return []
        docs.forEach(doc => { doc.dname = db.dname, doc.weight = db.weight })
        return docs
      }).catch(function (err) {
        console.log('ERR GET DBs', err)
      })
  }))
}

export function checkCfg() {
  let cfg = settings.get('cfg')
  if (!cfg) cfg = createZeroCfg(upath)
  return cfg
}

function createZeroCfg(upath, version) {
  let destpath = path.resolve(upath, 'pouch')
  let fns = fse.readdirSync(destpath)

  let cfg = []
  fns.forEach((dn, idx) => {
    if (dn == 'cfg.json') return
    let dpath = path.resolve(destpath, dn)
    let cf = {name: dn, active: true, idx: idx}
    cfg.push(cf)
  })
  settings.set('cfg', cfg)
  log('__ZERO CFG__', cfg)
  return cfg
}

// а если новая база?
export function setDBs() {
  let cfg = settings.get('cfg')
  log('===setDBs CFG===', cfg)
  let dbnames = _.compact(cfg.map(cf => { return (cf.active) ? cf.name : null }))
  // log('DBNS', dbnames)
  dbnames.forEach((dn, idx) => {
    let dpath = path.resolve(upath, 'pouch', dn)
    let pouch = new PouchDB(dpath)
    pouch.dname = dn
    pouch.weight = idx
    dbs.push(pouch)
  })

  // let localDB = dbs[0]
  // let remoteDB = new PouchDB('http://localhost:5984/vasilyev')
  // localDB.replicate.to(remoteDB).on('complete', function () {
  //   log('yay, were done!')
  // }).on('error', function (err) {
  //   log('boo, something went wrong!', err)
  // })
}

// adduser --system --home /opt/couchdb --no-create-home --shell /bin/bash -g couchdb couchdb
// useradd --system -b /opt/couchdb --shell /bin/bash -g couchdb couchdb
// sudo -i -u couchdb bin/couchdb
// lobsang vasilyev
export function replicateDB() {
  if (!dbs.length) setDBs()
  let localDB = _.find(dbs, db=> { return db.dname == 'vasilyev'})
  log('DB-name', localDB.dname)
  let remoteDB = new PouchDB('http://localhost:5984/vasilyev')
  localDB.replicate.to(remoteDB).on('complete', function () {
    log('yay, were done!')
  }).on('error', function (err) {
    log('boo, something went wrong!', err)
  })
}

export function remoteDictsList() {
  let remoteDBs = new PouchDB('http://localhost:5984/_all_dbs')
  log('DBS LIST', remoteDBs)
  let url = 'http://localhost:5984/_all_dbs'
  curl.get(url, {}, function(err, res, body) {
    if (err) {
      log('CURL ERR', err)
      return
    }
    log('RESPONSE', res)
    log('BODY', body)
  });
}
