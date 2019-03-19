//

const log = console.log
const _ = require('lodash')
const fse = require('fs-extra')
const miss = require('mississippi')
let MemoryStream = require('memorystream')

export function pouch2csv(db, csvpath) {
  let ws = fse.createWriteStream(csvpath, {encoding: "utf8"})
  let stream = new MemoryStream()

  const row2doc = miss.through.obj(
    function (buf, enc, cb) {
      let row = JSON.parse(buf.toString())
      if (row.docs) {
        let docs = _.compact(_.flatten(row.docs.map(row=> { return row.docs})))
        let rows = ''
        docs.forEach(doc=> {
          let tmp = [JSON.stringify(doc.dict), ',', JSON.stringify(doc.trns.join(';'))].join('') + '\n'
          rows += tmp
        })
        cb(null, rows)
      } else {
        cb(null, "\n")
      }
    }
  )
  db.dump(stream)
  return stream.pipe(row2doc).pipe(ws)
}
