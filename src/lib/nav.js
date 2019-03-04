//
import _ from "lodash"
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, enclitic } from './utils'
import Split from 'split.js'
import { showText } from "./parsedata";
import { serverDicts, showActiveDicts, parseCSV } from "./dict";
import { signup } from "./auth";

import { remote } from "electron";
const app = remote.app;
const apath = app.getAppPath()
const upath = app.getPath("userData")

const log = console.log
const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
const Mousetrap = require('mousetrap')
const path = require('path')
const slash = require('slash')
const {getCurrentWindow} = require('electron').remote

// READ WRITE
const fse = require('fs-extra')
const glob = require('glob-fs')({ gitignore: true })
import sband from '../../../../sband'
import { tibsyms, tibsuff } from "./tibetan_data";

// let init = {section: 'home'}
let history = []
let hstate = 0
let split

function twoPanes(state) {

  let sizes = settings.get('split-sizes') || [50, 50]
  if (split && state.mono) split.collapse(1)
  else if (split) split.setSizes(sizes)

  if (split) return
  settings.set('split-sizes', sizes)

  split = Split(['#source', '#result'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      settings.set('split-sizes', sizes)
      getCurrentWindow().reload()
    }
  })
  if (state.mono) split.collapse(1)

  document.addEventListener("keydown", function(ev) {
    // keyPanes(ev, state)
  }, false)

  document.addEventListener("wheel", function(ev) {
    // scrollPanes(ev, state)
  }, false)
}

// arrows
Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  if (ev.which == 37) goLeft()
  else if (ev.which == 39) goRight()
})

Mousetrap.bind(['alt+1', 'alt+2'], function(ev) {
  // if (ev.which == 49) log('----1')
  // else if (ev.which == 50) log('----2')
})

Mousetrap.bind(['esc'], function(ev) {
  // похоже, общий метод не получится
})

Mousetrap.bind(['ctrl+d'], function(ev) {
  let datapath = '/home/michael/diglossa.texts/Tibetan'
  ipcRenderer.send('queryLocalDict', datapath)
})

Mousetrap.bind(['ctrl+f'], function(ev) {
  let datapath = '/home/michael/diglossa.texts/Tibetan'
  readDir(datapath)
})



Mousetrap.bind(['ctrl+u'], function(ev) {
  log('CLICK SIGNUP')
  signup(upath)
})

function hideAll () {
  const sections = document.querySelectorAll('.section.is-shown')
  Array.prototype.forEach.call(sections, (section) => {
    section.classList.remove('is-shown')
  })
  let otrans = q('#transcript')
  otrans.classList.add('is-hidden')
  let oambi = q('#ambi')
  oambi.classList.add('is-hidden')
}

function goLeft() {
  if (hstate <= 0) return
  else hstate--
  let state = history[hstate]
  state.old = true
  hideAll()
  navigate(state)
}

function goRight() {
  if (hstate >= history.length-1) return
  else hstate++
  let state = history[hstate]
  state.old = true
  hideAll()
  navigate(state)
}

export function navigate(state) {
  try {
    state = JSON.parse(JSON.stringify(state))
  } catch (err) {
    log('NAV-state ERR', err)
    state = {}
  }
  let section = state.section || 'home'
  if (!section) state.section = 'home'
  showSection(state.section)

  if (!state.old) {
    state.old = false
    delete state.old
    history.push(state)
    hstate = history.length-1
  }
  let progress = q('#progress')
  if (section == 'main') twoPanes(state), showText(state)
  else if (section == 'clonedicts') ipcRenderer.send('remoteDicts', '') // serverDicts()
  else if (section == 'activedicts') showActiveDicts()
  else progress.classList.remove('is-shown')

  // state = {section: 'home'}
  settings.set('state', state)
}

function showSection(section) {
  hideAll()
  const sectionId = ['#', section].join('')
  q(sectionId).classList.add('is-shown')
}

// ====================== READ_WRITE

function readDir(datapath) {
  log('DATAPATH', datapath)
  datapath = path.resolve(__dirname, datapath)
  let files = glob.readdirSync('**/*\.tib*', {cwd: datapath})
  files = _.uniq(files)
  // log('LOCAL DICT', datapath)
  log('F', files)
  let wfs = selectTib(datapath, files)
  log('WFS', wfs)
  let queries = wfs.map(wf=> { return {str: wf}})
  queries = queries.slice(0, 2)
  log('Q', queries)
  // let dicts = Qqueries(queries)
  // log('DICTS', dicts)
}

let code = 'tib'
const tsek = tibsyms.tsek
let retsek = new RegExp(tsek+'$')

function selectTib(datapath, files) {
  let tibs = []
  let tibkey = {}
  files.forEach(file => {
    let fpath = path.resolve(datapath, file)
    let text = fse.readFileSync(fpath,'utf8').trim()
    let rows = text.split('\n')
    rows = _.compact(rows)
    rows.forEach((row, idx)=> {
      // log('ROW', idx, row)
      let clean = cleanStr(row)
      // log('CL', clean)
      // if (idx > 0) return
      let gpars = sband(clean, code)
      // log('PARS', gpars)
      gpars.forEach(gpar=> {
        gpar.forEach(span=> {
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
  })
  return tibs
}

function cleanStr(row) {
  let clean = row.trim()
  clean = clean.replace(/\.$/, '')
  return clean
}

const { Readable } = require('stream')
const { Writable } = require('stream')

class Source extends Readable {
   constructor(array_of_data = [], opt = {}) {
      super(opt)
      this._array_of_data = array_of_data

     this.on('data', (chunk)=> {
       log('Readable on data ')
     })
      .on('error', (err)=>     {
         log('Readable on error ', err)
      })
      .on('end', ()=>      {
         log('Readable on end ')
      })
      .on('close', ()=>      {
         log('Readable on close не все реализации генерируют это событие')
      })
   }
   _read() {
      let data = this._array_of_data.shift()
      if (!data) {
         this.push(null)
      } else {
         this.push(data)
      }
   }
}

class Writer extends Writable {
   constructor(opt = {}) {
      super(opt)
      this.on('drain', ()=> {
         log('writable on drain')
      })
      .on('error', (err)=> {
         log('writable on error', err)
      })
      .on('finish', ()=> {
         log('writable on finish')
      })
   }

  _write(chunk, encoding, done) {
      if (typeof chunk === 'object') {
         log('chunk = ', chunk)
      } else {
        log('chunk not obj')
      }
      done()
   }
}

function Qqueries(queries) {
  let dicts = ['kuku']

  let opts = {
    objectMode: true
  }
  const source = new Source(queries, opts)
  log('SOURCE', source)

  let wopts = {
    objectMode: true
  }
  const target = new Writer(wopts)
  source.pipe(target)

  return target
  // return dicts
}
