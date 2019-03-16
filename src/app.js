// import "./stylesheets/main.css";

import _ from "lodash";
// import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";

import { q, qs, empty, create, remove, span, p, div, getInnermostHovered } from './lib/utils'
import { navigate } from './lib/nav'
// import sband from "../../../sband"
import sband from "speckled-band"
import { showCholok, showResults, showPopup, queryDBs } from "./lib/parsedata"
import { moveDictFirst, activateDict } from "./lib/dict"

const settings = require('electron').remote.require('electron-settings')
// const Mousetrap = require('mousetrap')

// const JSON = require('json5')
const axios = require('axios')
// let fse = require('fs-extra')
const slash = require('slash')
const log = console.log

const path = require('path')

const clipboard = require('electron-clipboard-extended')
const {dialog, getCurrentWindow} = require('electron').remote

const isDev = require('electron-is-dev')
// const isDev = false
// const isDev = true
// const app = remote.app;
const code = 'tib'

let over = q("#new-version")
let progress = q('#progress')

let container = q('#container')
let imports = qs('link[rel="import"]')
imports.forEach(link=> {
  let content = link.import
  let section = content.querySelector('.section')
  container.appendChild(section.cloneNode(true))
})

ipcRenderer.on('version', function (event, oldver) {
  axios.get('https://api.github.com/repos/mbykov/pecha.js/releases/latest')
    .then(function (response) {
      if (!response || !response.data) return
      let newver = response.data.name
      if (oldver && newver && newver > oldver) {
        let over = q("#new-version")
        let verTxt = ['new version available:', newver].join(' ')
        over.textContent = verTxt
        over.classList.remove('is-hidden')
      }
    })
    .catch(function (error) {
      console.log('API.GITHUB ERR')
    })
})

ipcRenderer.on('section', function (event, section) {
  navigate({section: section})
})

// ctrl-R
ipcRenderer.on('reread', function (event) {
  let state = settings.get('state')
  getCurrentWindow().reload()
  navigate(state)
})

let state = settings.get('state')
if (!state) state = {section: 'home'}
navigate(state)

document.addEventListener('click', (ev) => {
  // let progress = q('#progress')
  let data = ev.target.dataset
  if (!data) return
  let parent = ev.target.parentElement
  if (ev.target.classList.contains('external')) {
    let href = ev.target.textContent
    shell.openExternal(href)
  } else if (data.section) {
    navigate({section: data.section})
  } else if (data.clone) {
    progress.classList.remove('is-hidden')
    ipcRenderer.send('replicate', data.clone)
  } else if (data.firstdict) {
    moveDictFirst(data.firstdict) // ev.target,
  } else if (data.activedict) {
    activateDict(ev.target)
  } else if (data.csv) {
    progress.classList.remove('is-hidden')
    ipcRenderer.send('export-to-csv', data.csv)
  } else if (parent && parent.dataset && parent.dataset.activedict) {
    // activateDict(parent)
    // log('activateDict(parent)_______')
  } else if (ev.target.id == 'cleanupdb') {
    ipcRenderer.send('cleanupDB')
  } else if (ev.target.id == 'scandir') {
    dialog.showOpenDialog( {properties: ['openDirectory'] }, scanDir)
  } else if (ev.target.id == 'importcsv') {
    dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'JSON', extensions: ['json'] }]}, importCSV)
  } else if (data.docs) {
    queryDBs(ev.target , true)
  }
})

document.addEventListener("mouseover", function(ev) {
  if (!ev.target.textContent) return
  if (ev.ctrlKey == true) return
  let tpar = ev.target.closest('.tibpar')
  if (tpar) hidePopups()

  if (ev.target.classList.contains('tibphrase')) {
    if (ev.shiftKey == true) {
      // showCholok(ev.target)
    } else {
      queryDBs(ev.target)
    }
  } else if (ev.target.classList.contains('tibwf')) {
    showResults(ev.target)
  } else if (ev.target.classList.contains('tibambi')) {
    showPopup(ev.target) // mouseover, tibambi
  }
}, false)

document.addEventListener("mouseleave", function(ev) {
  if (!ev.target.classList) return
  if (ev.ctrlKey == true) return
  if (ev.target.classList.contains('tibphrase')) {
    let otrans = q('#transcript')
    otrans.classList.add('is-hidden')
  }
}, false)

document.addEventListener("keyup", function(ev) {
  if (ev.ctrlKey == true) return
  // hidePopups()
  let transcript = q('#transcript')
  transcript.classList.add('is-hidden')
}, false)

document.addEventListener("keydown", function(ev) {
  // if (ev.ctrlKey == true) return
  if (ev.shiftKey != true) return
  let ohover = getInnermostHovered()
  if (!ohover) return
  if (ohover.id == 'source') ohover = q('.tibpar')
  let text = ohover.textContent
  let pars = sband(text, code)
  if (!pars) return
  let cumulative = (ev.ctrlKey == true) ? true: false
  showCholok(ohover, cumulative)
  // if (ev.ctrlKey == true) showCholok(ohover, true)
}, false)

document.addEventListener("wheel", function(ev) {
  scrollPane(ev, state)
}, false)


clipboard
  .on('text-changed', () => {
    let txt = clipboard.readText()
    let pars = sband(txt, code)
    if (!pars || !pars.length) return
    let state = {section: 'main', pars: pars}
    navigate(state)
  })
  .startWatching()

function hidePopups() {
  qs('.popup').forEach(popup=> {
    popup.classList.add('is-hidden')
  })
}

export function scrollPane(ev, state) {
  if (ev.shiftKey == true) return;
  let delta = (ev.deltaY > 0) ? 24 : -24
  let opane = q('.section.is-shown')
  if (!opane) return
  opane.scrollTop += delta
}

function scanDir(fns) {
  if (!fns) return
  let datapath = fns[0]
  if (!datapath) return
  progress.classList.remove('is-hidden')
  ipcRenderer.send('scanLocalDict', datapath)
}

function importCSV(fns) {
  if (!fns) return
  let csvpath = fns[0]
  if (!csvpath) return
  progress.classList.remove('is-hidden')
  ipcRenderer.send('import-from-csv', csvpath)
}

ipcRenderer.on('scanLocalReply', function (event, datapath) {
  progress.classList.add('is-hidden')
  let state = {section: 'publish', datapath: datapath}
  navigate(state)
})
