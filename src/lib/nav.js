//
import _ from "lodash"
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, enclitic } from './utils'
import Split from 'split.js'
import { showText } from "./parsedata";
import { serverDicts, showActiveDicts, parseCSV } from "./dict";
// import { signup } from "./auth";

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

// Mousetrap.bind(['alt+1', 'alt+2'], function(ev) {
//   // if (ev.which == 49) log('----1')
//   // else if (ev.which == 50) log('----2')
// })

// Mousetrap.bind(['esc'], function(ev) {
//   // похоже, общий метод не получится
// })

// Mousetrap.bind(['ctrl+d'], function(ev) {
//   let datapath = '/home/michael/diglossa.texts/Tibetan'
//   ipcRenderer.send('scanLocalDict', datapath)
// })

// Mousetrap.bind(['ctrl+j'], function(ev) {
//   let jsonpath = '/home/michael/tibetan/utils/csv/csvdict.json'
//   ipcRenderer.send('importCSV', jsonpath)
// })

// Mousetrap.bind(['ctrl+i'], function(ev) {
//   ipcRenderer.send('infoDB', 'csvdict')
// })

// Mousetrap.bind(['ctrl+v'], function(ev) {
//   log('vasilyev')
//   ipcRenderer.send('infoDB', 'vasilyev')
// })

// Mousetrap.bind(['ctrl+b'], function(ev) {
//   ipcRenderer.send('infoDB', 'lobsang')
// })

Mousetrap.bind(['ctrl+='], function(ev) {
  let osource = q('#source')
  osource.style.fontSize = 'larger'
})

Mousetrap.bind(['ctrl+-'], function(ev) {
  let osource = q('#source')
  osource.style.fontSize = 'smaller'
})

Mousetrap.bind(['ctrl+0'], function(ev) {
  let osource = q('#source')
  osource.style.fontSize = 'medium'
})


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

  let osource = q('#source')
  if (!osource) {
    log('NO SOURCE')
    // let over = q("#new-version")
    // over.textContent = 'something goes wrong.Please remove DBs and reinstall dicts again'
    // over.textContent = ''
  }


  if (!state.old) {
    state.old = false
    delete state.old
    history.push(state)
    hstate = history.length-1
  }

  if (section == 'main') twoPanes(state), showText(state)
  else if (section == 'clonedicts') ipcRenderer.send('remoteDicts', '') // serverDicts()
  else if (section == 'activedicts') showActiveDicts()

  let progress = q('#progress')
  progress.classList.add('is-hidden')

  // state = {section: 'home'}
  settings.set('state', state)
}

function showSection(section) {
  hideAll()
  const sectionId = ['#', section].join('')
  q(sectionId).classList.remove('is-hidden')
  q(sectionId).classList.add('is-shown')
}

function hideAll () {
  // const sections = document.querySelectorAll('.section')
  const sections = qs('.section')
  Array.prototype.forEach.call(sections, (section) => {
    section.classList.add('is-hidden')
    section.classList.remove('is-shown')
  })
  let otrans = q('#transcript')
  otrans.classList.add('is-hidden')
  let oambi = q('#ambi')
  oambi.classList.add('is-hidden')
}
