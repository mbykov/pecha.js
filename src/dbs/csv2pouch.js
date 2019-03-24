//

const log = console.log
const fse = require('fs-extra')
const miss = require('mississippi')
const csv = require("fast-csv");
const path = require('path')
const PouchDB = require('pouchdb')
const stream = require("stream")

let tsek = '་'
let retsek = new RegExp(tsek+'$')

export function csv2pouch(jsonpath, dbpath) {
  let descr = fse.readJsonSync(jsonpath)
  descr._id = 'description'
  let dirpath = path.parse(jsonpath).dir
  let csvpath = path.resolve(dirpath, descr.path)
  log('csvpath', csvpath)
  log('csvpath', fse.pathExistsSync(csvpath))
  if (!fse.pathExistsSync(csvpath)) return ''

  let rs = fse.createReadStream(csvpath);

  let csvopts = {
    comment: '#',
    trim: true,
    ignoreEmpty: true
  }

  let csvStream = csv(csvopts)
      .on("end", function() {
        // log("CSV end")
      })
      .on("error", function(err) {
        log("CSV STEREAM ERR", err)
      })

  const row2doc = miss.through.obj(
    function (row, enc, cb) {
      let dict = row[0].replace(retsek, '')
      let mdoc = {dict: dict, trns: row.slice(1).join('').trim().split('; ') }
      let doc = {_id: dict, docs: [mdoc] }
      cb(null, doc)
    }
  )

  // let dbpath = path.resolve(dirpath, 'db-stream')
  // let ws = fse.createWriteStream(dbpath)

  fse.emptyDirSync(dbpath)
  let db = new PouchDB(dbpath)

  let streamopts = {
    objectMode: true,
    highWaterMark: 3
  }

  let buff = []

  class myWritable extends stream.Writable {
    constructor(options){
      super(options)
      this.buff = []
    }

    _write(chunk, encoding, next){
      if (buff.length < 1000) {
        buff.push(chunk)
        next()
      } else {
        buff.push(chunk)
        db.bulkDocs(buff)
          .then(function(res) {
            buff = []
            next()
          })
          .catch(function (err) {
            next(err, null)
          });
      }
    }
  }

  let pouchPushStream = new myWritable(streamopts)

  return rs.pipe(csvStream).pipe(row2doc).pipe(pouchPushStream)
    .on('finish', function (err) {
      return db.bulkDocs(buff)
        .then(function() {
          db.put(descr)
        })
        .catch(function (err) {
          log('PUT DESCR ERR', err)
        });

    })
    .on('error', function(err) {
      log('__stream final_err', err)
    })
}
