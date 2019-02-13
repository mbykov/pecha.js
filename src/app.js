// import "./stylesheets/main.css";

import _ from "lodash";
// import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";

import { q, qs, empty, create, remove, span, p, div, getCoords } from './lib/utils'
import { navigate } from './lib/nav';
import sband from "./lib/sband";
import { showCholok } from "./lib/parsedata";
import { mainResults } from "./lib/main";
import { parseStarDict, parseCSV } from "./lib/dict";
import { checkCfg, setDBs, cleanupDB } from "./lib/pouch";

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
  if (action == 'stardict') dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'JSON', extensions: ['stardict'] }]}, parseStarDict)
  else if (action == 'csv') dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'JSON', extensions: ['stardict'] }]}, parseCSV)
  else if (action == 'cleanupdb') cleanupDB()
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
  } else {
  }
})

document.addEventListener("mouseover", function(ev) {
  if (!ev.target.textContent) return
  if (ev.target.classList.contains('tibphrase')) {
    if (ev.shiftKey == true) {
      let coords = getCoords(ev.target)
      showCholok(ev.target.textContent, coords)
    } else {
      // log('FRASE', ev.target.textContent)
      mainResults(ev.target)
    }
  }
}, false)

document.addEventListener("mouseout", function(ev) {
  if (ev.target.classList.contains('tibphrase')) {
    let popup = q('#transcript')
    popup.classList.add('is-hidden')
  }
}, false)

document.addEventListener("keyup", function(ev) {
  let popup = q('#transcript')
  popup.classList.add('is-hidden')
}, false)


clipboard
  .on('text-changed', () => {
    let txt = clipboard.readText()
    let pars = sband('tib', txt)
    if (!pars || !pars.length) return
    // orthoPars(pars)
    // hstates.push(pars)
    // hstate = hstates.length-1
    let state = {section: 'main', pars: pars}
    navigate(state)
    // showText(pars)
  })
  .startWatching()

checkCfg()
