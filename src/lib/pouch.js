import _ from 'lodash'
// import { remote } from "electron";
// import { replicate } from "../../../replicator.js";

const path = require('path')
const fse = require('fs-extra')
const curl = require('curl')
// const app = remote.app;
// const apath = app.getAppPath()
// const upath = app.getPath("userData")

const settings = require('electron-settings')
const log = console.log
const PouchDB = require('pouchdb')
const isDev = require('electron-is-dev')

let dbs = []
// let pouchpath = path.resolve(upath, 'pouch')
// fse.ensureDirSync(pouchpath)

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

export function infoNewDB(upath) {
  let localpath = path.resolve(upath, 'pouch', 'vasilyev')
  let localDB = new PouchDB(localpath)
  localDB.info().then(function (info) {
    log('LOCAL INFO', info);
    localDB.close()
  })
  let remotepath = ['http://localhost:5984', 'vasilyev'].join('/')
  // let remoteDB = new PouchDB(remotepath)

  // remoteDB.info().then(function (info) {
  //   // log('REMOTE INFO', info);
  //   remoteDB.close()
  // })

}

export function replicateDB(dbname, cb) {}

export function replicate(remotepath, localpath, cb) {
  let localDB = new PouchDB(localpath)
  // localDB.dname = dbname
  let remoteDB = new PouchDB(remotepath)

  remoteDB.replicate.to(localDB).then(function (result) {
    log('REPLICATION COMPLETED', result);
    cb(true)
  }).catch(function (err) {
    log(err);
    cb(false)
  });
  return

  // var db = new PouchDB('http://example.com/dbname', {
  //   fetch: function (url, opts) {
  //     opts.headers.set('X-Some-Special-Header', 'foo');
  //     return PouchDB.fetch(url, opts);
  //   }
  // });


  // replicate(remotepath, localpath, function(res) {
  //   log('HERE RES', res)
  //   cb(res)
  // })
  // return

  // let remoteDB = new PouchDB(remotepath, {
  //   ajax: {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'withCredentials' : true
  //     },
  //     credentials: 'include',
  //     withCredentials: true
  //   }
  // });
  // remoteDB.info().then(function (info) {
  //   log('REMOTE INFO', info);
  // })

  log('LOCALPATH', localpath)
  log('REMOTEPATH', remotepath)

  remoteDB.replicate.to(localDB).on('complete', function (res) {
    log('ok, were done!', res)
  }).on('error', function (err) {
    log('boo, something went wrong!', err)
  })

  return

  // localDB.replicate.from(remoteDB)
  //   .on('complete', function(info) {
  //     // then two-way, continuous, retriable sync
  //     log('SYNC', info)
  //   }).on('error', log('ERR'));

  localDB.replicate.from(remoteDB, {batch_size: 1000})
    .on('complete', function (info) {
      log('REPL', info)
      cb(true)
    }).on('error', function (err) {
      // handle error
      log('____ERR', err)
      cb(false)
    })

  return

  remoteDB.replicate.to(localDB).then(function (result) {
    log('REPLICATION COMPLETED', result);
    cb(true)
  }).catch(function (err) {
    log(err);
    cb(false)
  });

  // remoteDB.replicate.to(localDB, {batch_size: 1000}).then(function (result) {
  //   log('REPLICATION COMPLETED', result);
  //   cb(true)
  // }).catch(function (err) {
  //   log(err);
  //   cb(false)
  // });

  return

  remoteDB.info().then(function (info) {
    log('REMOTE INFO', info);
    cb(true)
  })
  // let replication = localDB.replicate.from(remoteDB, {live: false, batch_size: 1000, batches_limit: 30}) .on('change', function (info) { console.log('change event'); console.log(info); }).on('complete', function (info) { console.log('complete event'); console.log(info); }).on('error', function (err) { console.log('error event'); console.log(err); });
  // return

  // localDB.sync(remoteDB) //No options here -> One time sync
  //   .on('complete', (info) => {
  //     log('SYNC', info)
  //   });
  log('BEFORE REMOTE');

  remoteDB.replicate.to(localDB, {batch_size: 1000, batches_limit: 30}).then(function (result) {
    log('REPLICATION COMPLETED', result);
    cb(true)
  }).catch(function (err) {
    log(err);
    cb(false)
  });
  return

  var rep = PouchDB.replicate(remoteDB, localDB, {
    // live: true,
    // retry: true
  }).on('change', function (info) {
    log('change', info)
  }).on('paused', function (err) {
    log('paused', err)
  }).on('active', function (res) {
    log('active', res)
  }).on('denied', function (err) {
    log('denied', err)
  }).on('complete', function (info) {
    log('complete', info)
  }).on('error', function (err) {
    log('error', err)
  });

  return

  localDB.info().then(function (info) {
    log('LOCAL INFO', info);
    remoteDB.replicate.to(localDB).on('complete', function () {
      log('ok, DB cloned to', localpath)
      cb(true)
    }).on('error', function (err) {
      log('something went wrong!', err)
      cb(false)
    })
  })
}

export function remoteDictsList(cb) {
  let url = 'http://localhost:5984/_all_dbs'
  let error = 'something goes wrong, no connection?'
  curl.get(url, {}, function(err, res, body) {
    if (err) {
      cb(error)
      return
    }
    if (res.statusCode == 200) {
      try {
        let rdbs = JSON.parse(body)
        cb(rdbs)
      } catch(err) {
        cb(err)
      }
    }
    else cb(res.statusCode)
  });
}
