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

let dbs = []

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
      return localDB.load('http://localhost:3000/api/vasilyev')
      // return localDB.load('http://localhost:3000/dumps/dump.txt')
    })

  // let dumpedString = 'http://localhost:3000/api/vasilyev'
  // log('REPL:dumpedString', dumpedString.length)
  // return localDB.load('http://localhost:3000/api/vasilyev')
  // return localDB.load('http://localhost:3000/dumps/dump.txt')
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
        log('======DOCS', docs)
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
