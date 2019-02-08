// import "./stylesheets/main.css";

import _ from "lodash";
// import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";

import { q, qs, empty, create, remove, span, p, div, getCoords } from './lib/utils'
import { navigate } from './lib/nav';
import sband from "./lib/sband";
import { fireCholok } from "./lib/parsedata";

const settings = require('electron').remote.require('electron-settings')

const JSON = require('json5')
const axios = require('axios')
let fse = require('fs-extra')
const slash = require('slash')
const log = console.log

const path = require('path')

const clipboard = require('electron-clipboard-extended')
const {dialog, getCurrentWindow} = require('electron').remote

const isDev = require('electron-is-dev')
// const isDev = false
// const isDev = true
const app = remote.app;

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

// let home = q('#home')
// home.classList.add('is-shown')
let state = settings.get('state')
log('STATE1', state)
navigate(state)

document.body.addEventListener('click', (ev) => {
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
  if (ev.shiftKey == true && ev.target.classList.contains('tibetan')) {
    let coords = getCoords(ev.target)
    fireCholok(ev.target.textContent, coords)
  }
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
