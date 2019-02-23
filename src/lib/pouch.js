import _ from 'lodash'

// import { replicate } from "../../../replicator.js";

const path = require('path')

const fse = require('fs-extra')
// const curl = require('curl')

const isDev = require('electron-is-dev')
const settings = require('electron-settings')
const log = console.log
const PouchDB = require('pouchdb')

PouchDB.plugin(require('pouchdb-load'));

// let replicationStream = require('pouchdb-replication-stream');
// PouchDB.plugin(replicationStream.plugin);
// let MemoryStream = require('memorystream');
// PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);

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

let dbs = []

// а если новая база?
export function setDBs(upath) {
  let cfg = settings.get('cfg')
  if (!cfg) cfg = createZeroCfg(upath)
  cfg = createZeroCfg(upath)
  log('===setDBs CFG===', cfg)
  let dbnames = _.compact(cfg.map(cf => { return (cf.active) ? cf.name : null }))
  log('POUCH:DBNS', dbnames)
  dbnames.forEach((dn, idx) => {
    let dpath = path.resolve(upath, 'pouch', dn)
    let pouch = new PouchDB(dpath)
    pouch.dname = dn
    pouch.weight = idx
    dbs.push(pouch)
  })
  return dbnames
}

export function getCfg(upath) {
  let cfg = settings.get('cfg')
  if (!cfg) cfg = createZeroCfg(upath)
  cfg = createZeroCfg(upath)
  return cfg
}

function createZeroCfg(upath, version) {
  let pouchpath = path.resolve(upath, 'pouch')
  fse.ensureDirSync(pouchpath)
  let fns = fse.readdirSync(pouchpath)
  let cfg = []
  fns.forEach((dn, idx) => {
    // if (dn == 'cfg.json') return
    let dpath = path.resolve(pouchpath, dn)
    let cf = {name: dn, active: true, idx: idx}
    cfg.push(cf)
  })
  settings.set('cfg', cfg)
  // log('__ZERO CFG__', cfg)
  return cfg
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

// adduser --system --home /opt/couchdb --no-create-home --shell /bin/bash -g couchdb couchdb
// useradd --system -b /opt/couchdb --shell /bin/bash -g couchdb couchdb
// sudo -i -u couchdb bin/couchdb
// lobsang vasilyev

export function infoDB(localpath) {
  let localDB = new PouchDB(localpath)
  return localDB.info()
}

export function cleanupDB(state) {
  log('CLEAN UP')
}

export function replicate(remotepath, localpath) {
  log('REPLICATE LOCAL', localpath)
  let localDB = new PouchDB(localpath);
  // return localDB.load('http://ru.diglossa.org/dump.txt')
  return localDB.load('http://localhost:3000/dumps/dump.txt')
}

// export function replicate_STREAM(remotepath, localpath) {
//   let stream = new MemoryStream();
//   let source = new PouchDB(remotepath);
//   let dest = new PouchDB(localpath);

//   return Promise.all([
//     source.dump(stream),
//     dest.load(stream)
//   ])
//     // .then(function () {
//     //   console.log('Hooray the stream replication is complete!');
//     // }).catch(function (err) {
//     //   console.log('oh no an error', err);
//     // });
// }

export function replicate_(remotepath, localpath) {
  // localpath += '___'
  let upath = '/home/michael/.config/Pecha.js\ \(development\)'
  localpath = path.resolve(upath, 'pouch', 'vasilyev')
  remotepath = ['http://localhost:5984', 'vasilyev'].join('/')
  log('LOCALPATH', localpath)
  log('REMOTEPATH', remotepath)
   let localDB = new PouchDB(localpath)
  // localDB.dname = dbname
  let remoteDB = new PouchDB(remotepath)

  return PouchDB.replicate(remoteDB, localDB, {
    // live: true,
    // retry: true
    batch_size: 100,
    timeout: false
  }).on('change', function (info) {
    log('change', info.ok)
  }).on('paused', function (err) {
    log('paused', err)
  }).on('active', function (res) {
    log('active', res)
  }).on('denied', function (err) {
    log('denied', err)
  }).on('complete', function (info) {
    log('complete', info.ok)
  }).on('error', function (err) {
    log('error', err)
  })


  // return localDB.info()
  //   .then(function(info) {
  //     return PouchDB.replicate(remoteDB, localDB, {
  //       // live: true,
  //       // retry: true
  //       batch_size: 10000,
  //       timeout: false
  //     }).on('change', function (info) {
  //       log('change', info.ok)
  //     }).on('paused', function (err) {
  //       log('paused', err)
  //     }).on('active', function (res) {
  //       log('active', res)
  //     }).on('denied', function (err) {
  //       log('denied', err)
  //     }).on('complete', function (info) {
  //       log('complete', info.ok)
  //     }).on('error', function (err) {
  //       log('error', err)
  //     })
  //   })
  //   // .then(function() {
  //   //   localDB.info()
  //   // })

  // remoteDB.replicate.to(localDB).then(function (result) {
  //   log('REPLICATION COMPLETED', result);
  //   localDB.info()
  //     .then(function(info) {
  //           return result
  //     })
  // }).catch(function (err) {
  //   log(err);
  // })
}

  // localDB.replicate.from(remoteDB, {batch_size: 1000})
  //   .on('complete', function (info) {
  //     log('REPL', info)
  //     cb(true)
  //   }).on('error', function (err) {
  //     // handle error
  //     log('____ERR', err)
  //     cb(false)
  //   })

// {
//   let rep = PouchDB.replicate(remoteDB, localDB, {
//     // live: true,
//     // retry: true
//   }).on('change', function (info) {
//     log('change', info)
//   }).on('paused', function (err) {
//     log('paused', err)
//   }).on('active', function (res) {
//     log('active', res)
//   }).on('denied', function (err) {
//     log('denied', err)
//   }).on('complete', function (info) {
//     log('complete', info)
//   }).on('error', function (err) {
//     log('error', err)
//   })
// }

export function remoteDicts() {
  return couch.listDatabases()
    .catch(function(err) {
      log('REMOTE DICTS ERR', err)
    })
}
