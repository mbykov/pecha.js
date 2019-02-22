//
import _ from "lodash"
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, enclitic } from './utils'
import Split from 'split.js'
import { showText } from "./parsedata";
import { serverDicts, parseCSV } from "./dict";
// import { replicate } from "./pouch_";

import { remote } from "electron";
const app = remote.app;
const apath = app.getAppPath()
const upath = app.getPath("userData")

const log = console.log
const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
const Mousetrap = require('mousetrap')
const fse = require('fs-extra')
const path = require('path')
const slash = require('slash')
const {getCurrentWindow} = require('electron').remote

let init = {section: 'home'}
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

Mousetrap.bind(['ctrl+i'], function(ev) {
  log('CLICK INFO')
  // ipcRenderer.send('info', 'vasilyev')
})

// Mousetrap.bind(['ctrl+j'], function(ev) {
//   log('REPLICA_')
//   let localpath = path.resolve(upath, 'pouch', 'vasilyev')
//   let remotepath = ['http://localhost:5984', 'vasilyev'].join('/')
//   replicate(remotepath, localpath)
//     .then(function(res) {
//       log('CTRL-J', res)
//     })
// })


Mousetrap.bind(['ctrl+p'], function(ev) {
  log('ZERO CFG')
  settings.set('cfg', '')
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
  navigate(state)
}

function goRight() {
  if (hstate >= history.length-1) return
  else hstate++
  let state = history[hstate]
  state.old = true
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
  else if (section == 'clone') ipcRenderer.send('remoteDicts', '') // serverDicts()
  else progress.classList.remove('is-shown')

  // state = {section: 'home'}
  settings.set('state', state)
}

function showSection(section) {
  hideAll()
  const sectionId = ['#', section].join('')
  log('SEC ID', sectionId)
  q(sectionId).classList.add('is-shown')
}
