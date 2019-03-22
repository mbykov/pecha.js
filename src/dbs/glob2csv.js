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
import { queryDBs } from "./pouch"

let code  = 'tib'
import { tibsyms, tibsuff } from "../lib/tibetan_data"
const tsek = tibsyms.tsek
let retsek = new RegExp(tsek+'$')

export function glob2csv(globpath) {
  let rs = gs(['**/*', '!**/*localDict.*'], { cwd: globpath, nodir: true })

  const toTibetan = miss.through.obj((data, enc, cb) => {
    selectTib(data.path)
      .then(function(wfs) {
        if (!wfs) return
        // wfs = wfs.slice(0,3)
        if (wfs.length) cb(null, wfs);
        else cb()
      }).catch(function(err) {
        log('WFS-ERR', err)
      })
  })

  let rs2 = new stream.Readable({objectMode: true})
  rs2._read = () => {}
  rs2.push('fill in second column with your translation:')
  let rs2err = new stream.Readable({objectMode: true})
  rs2err._read = () => {}
  rs2err.push('unprocessed wordforms:')


  function recQuery(query) {
    function decide(res) {
      if (!res.chain) {
        rs2err.push(query.str)
        return
      }
      res.chain.forEach(sec=> {
        if (sec.docs.length) rs2.push(sec.seg)
        else {
          if (query.str != sec.seg) return recQuery({ str: sec.seg })
          else rs2err.push(sec.seg)
        }
      })
    }
    return queryDBs(query).then(decide);
  }

  const toDict = miss.through.obj((wfs, enc, next) => {
    let idx = 0
    wfs.forEach(wf=> {
      let query = {str: wf}
      recQuery(query)
        .catch(function(err) {
          console.log('Q-ERR', err)
        })
    })
    next()
  })

  const toStr = miss.through.obj((data, enc, cb) => {
    let row = JSON.stringify(data) + ', -\n'
    cb(null, row);
  })

  const toErr = miss.through.obj((data, enc, cb) => {
    let row = JSON.stringify(data) + ', -\n'
    cb(null, row);
  })

  let wspath = path.resolve(globpath, 'localDict.csv')
  let ws = fse.createWriteStream(wspath)
  let errpath = path.resolve(globpath, 'localDict.unproc')
  let errws = fse.createWriteStream(errpath)

  // rs.pipe(toStr).pipe(process.stdout);
  // rs.pipe(toTibetan).pipe(toStr).pipe(process.stdout);
  rs.pipe(toTibetan).pipe(toDict)
  // rs2.pipe(toStr).pipe(process.stdout);
  rs2.pipe(toStr).pipe(ws);
  rs2err.pipe(toErr).pipe(errws);
  return Promise.resolve()
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
