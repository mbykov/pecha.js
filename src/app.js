// import "./stylesheets/main.css";

// Small helpers you might want to keep
// import "./helpers/context_menu.js";
// import "./helpers/external_links.js";

import _ from "lodash";
// import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";

import { q, qs, empty, create, remove, span, p, div } from './lib/utils'
import { navigate } from './lib/nav';

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

let home = q('#home')
home.classList.add('is-shown')
