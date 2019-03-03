//

let d = require('debug')('app')
let log = console.log




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
  localpath = path.resolve(upath, 'pouch', 'XXX')
  remotepath = ['http://localhost:5984', 'XXX'].join('/')
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
