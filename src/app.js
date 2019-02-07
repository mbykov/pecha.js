// import "./stylesheets/main.css";

import _ from "lodash";
// import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";

import { q, qs, empty, create, remove, span, p, div } from './lib/utils'
import { navigate } from './lib/nav';
import sband from "./lib/sband";

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

// let home = q('#home')
// home.classList.add('is-shown')
let state = settings.get('state')
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

clipboard
  .on('text-changed', () => {
    let txt = clipboard.readText()
    let pars = sband('tib', txt)
    if (!pars || !pars.length) return
    // orthoPars(pars)
    // hstates.push(pars)
    // hstate = hstates.length-1
    let state = {section: 'main', pars: pars}
    showText(pars)
  })
  .startWatching()


function showText (pars) {
  log('P', pars)
  return

  showSection('main')
  let oprg = q('#progress')
  oprg.style.display = "inline-block"

  twoPages(splitSizes)

  let otext = q('#text')
  empty(otext)

  let wfs = []
  pars.forEach(spans => {
    let opar = p()
    opar.classList.add('greek')
    spans.forEach(spn => {
      let ospan = span(spn.text)
      if (spn.gr) ospan.classList.add('greek'), wfs.push(spn.text)
      if (spn.text == ' ') ospan.classList.add('space')
      opar.appendChild(ospan)
    })
    otext.appendChild(opar)
  })

  let grs = qs('span.greek')
  if (grs.length == 1) showResults(grs[0].textContent)
  oprg.style.display = "none"
}
