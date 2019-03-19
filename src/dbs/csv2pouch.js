//

const log = console.log
const fse = require('fs-extra')
const miss = require('mississippi')
const csv = require("fast-csv");
const path = require('path')
let tsek = '་'
let retsek = new RegExp(tsek+'$')

export function csv2pouch(jsonpath, db) {
  let descr = fse.readJsonSync(jsonpath)
  descr._id = 'description'
  let dirpath = path.parse(jsonpath).dir
  // let name = path.parse(jsonpath).name
  let csvname = [path.parse(jsonpath).name, 'csv'].join('.')
  let csvpath = path.resolve(dirpath, csvname)
  let rs = fse.createReadStream(csvpath);

  let options = {
    comment: '#',
    trim: true,
    ignoreEmpty: true
  }
  let csvStream = csv(options)
      .on("end", function(){
        // log("done");
      });

  const row2doc = miss.through.obj(
    function (row, enc, cb) {
      let dict = row[0].replace(retsek, '')
      let mdoc = {dict: dict, trns: row.slice(1).join('').trim().split('; ') }
      let doc = {_id: dict, docs: [mdoc] }
      cb(null, doc)
    }
  )

  return rs.pipe(csvStream).pipe(row2doc).pipe(db.createWriteStream())

  // return db
  //   .put(descr)
  //   .then(function() {
  //     return rs.pipe(csvStream).pipe(row2doc).pipe(db.createWriteStream())
  //     // rs.pipe(csvStream).pipe(row2doc).pipe(db.createWriteStream())
  //     //   .on('finish', function (err) {
  //     //     log('THE END')
  //     //     db.get('འགོ')
  //     //     // db.info()
  //     //       .then(function(res) {
  //     //         log('D', res)
  //     //       })
  //     //   })
  //   })
}
