//

const _ = require('lodash')
const log = console.log
const fse = require('fs-extra')
const miss = require('mississippi')
const csv = require("fast-csv");
const path = require('path')
// const PouchDB = require('pouchdb')
import { segmenter, totalKeys } from "./segmenter"
import sband from "speckled-band"
const stream = require("stream")
const gs = require('glob-stream');
const MultiStream = require('multistream')
import { queryDBs } from "../pouch"

let code  = 'tib'
import { tibsyms, tibsuff } from "../lib/tibetan_data"
const tsek = tibsyms.tsek
let retsek = new RegExp(tsek+'$')

export function glob2csv(globpath) {
  let rs = gs(['**/*', '!**/*localDict.csv'], { cwd: globpath, nodir: true })
  // let wspath = path.resolve(globpath, 'db-stream')
  // let ws = fse.createWriteStream(wspath)

  const toTibetan = miss.through.obj((data, enc, cb) => {
    selectTib(data.path)
      .then(function(wfs) {
        log('d', data.path)
        log('_wfs_', wfs.length)
        wfs = wfs.slice(0,3)
        if (wfs.length) cb(null, wfs);
        else cb()
      }).catch(function(err) {
        log('WFS-ERR', err)
      })
  })

  const toDict = miss.through.obj((wfs, enc, next) => {
    let idx = 0
    function factory (cb) {
      wfs.forEach(wf=> {
        log('____wf', wf)
        setTimeout(function () {
          let rs = stream.Readable({objectMode: true})
          rs._read = () => {}
          rs.push(wf)
          if (idx == 0)
            idx++, factory (cb)
          else
            cb(null, rs)
        }, 100)
      })
    }
    // MultiStream(factory).pipe(process.stdout)
    MultiStream(factory).pipe(toStr).pipe(process.stdout)
    next()
  })

  const toStr = miss.through.obj((data, enc, cb) => {
    let json = JSON.stringify(data) + '\n'
    // let str = data.toString() + '\n'
    // log('json:', json)
    cb(null, json);
  })

  // rs.pipe(toStr).pipe(process.stdout);
  rs.pipe(toTibetan).pipe(toStr).pipe(process.stdout);
  // rs.pipe(toTibetan).pipe(toDict)
}

function selectTib(fpath) {
  return fse.readFile(fpath,'utf8')
    .then(function(text) {
      if (!text) return
      let tibs = []
      let tibkey = {}
      let rows = text.trim().split('\n')
      rows = _.compact(rows)
      rows.forEach((row, idx)=> {
        let clean = cleanStr(row)
        // if (idx > 0) return
        let gpars = sband(clean, code)
        if (!gpars) return
        gpars.forEach(spans=> {
          spans.forEach(span=> {
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
      // log('___XXXX', tibs.length)
      return tibs
    })
    .catch(function(err) {
      log('selectTib-ERR', err)
    })
}

function cleanStr(row) {
  let clean = row.trim()
  clean = clean.trim().replace(/\.$/, '')
  return clean
}
