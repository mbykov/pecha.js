// import "./stylesheets/main.css";

import _ from "lodash";
// import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";

import { q, qs, empty, create, remove, span, p, div, getInnermostHovered } from './lib/utils'
import { navigate } from './lib/nav';
import sband from "./lib/sband";
import { showCholok, showResults, showPopup } from "./lib/parsedata";
import { mainResults } from "./lib/main";
import { moveDictFirst } from "./lib/dict";

const settings = require('electron').remote.require('electron-settings')
// const Mousetrap = require('mousetrap')

const JSON = require('json5')
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
// const apath = app.getAppPath()
// const upath = app.getPath("userData")


let over = q("#new-version")

let container = q('#container')
let imports = qs('link[rel="import"]')
imports.forEach(link=> {
  let content = link.import
  let section = content.querySelector('.section')
  container.appendChild(section.cloneNode(true))
})

ipcRenderer.on('section', function (event, section) {
  navigate({section: section})
})

ipcRenderer.on('action', function (event, action) {
  if (action == 'clonedicts') navigate({section: 'clone'})
  else if (action == 'arrangeDicts') navigate({section: 'activedicts'})
  else if (action == 'csv') dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'JSON', extensions: ['stardict'] }]}, parseCSV)
  else if (action == 'cleanupdb') cleanupDB()
})

// ctrl-R
ipcRenderer.on('reread', function (event) {
  let state = settings.get('state')
  getCurrentWindow().reload()
  navigate(state)
})

// let home = q('#home')
// home.classList.add('is-shown')
let state = settings.get('state')
// log('STATE1', state)
if (!state) state = {section: 'home'}
navigate(state)

document.addEventListener('click', (ev) => {
  let data = ev.target.dataset
  if (!data) return
  if (data.external) {
    let href = ev.target.textContent
    shell.openExternal(href)
  } else if (data.section) {
    navigate({section: data.section})
  } else if (data.clone) {
    ipcRenderer.send('replicate', data.clone)
  } else if (data.activedict) {
    let dbname = data.activedict
    moveDictFirst(dbname)
  } else if (data.docs) {
    mainResults(ev.target , true)
  }
})

document.addEventListener("mouseover", function(ev) {
  if (!ev.target.textContent) return
  if (ev.ctrlKey == true) return
  let tpar = ev.target.closest('.tibpar')
  if (tpar) hidePopups()

  if (ev.target.classList.contains('tibphrase')) {
    if (ev.shiftKey == true) {
      showCholok(ev.target)
    } else {
      mainResults(ev.target)
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
  if (ev.ctrlKey == true) return
  if (ev.shiftKey != true) return
  let ohover = getInnermostHovered()
  if (ohover.id == 'source') ohover = q('.tibpar')
  showCholok(ohover)
}, false)

clipboard
  .on('text-changed', () => {
    let txt = clipboard.readText()
    let pars = sband('tib', txt)
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
