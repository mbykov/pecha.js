//
import _ from 'lodash'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'
import { navigate } from './nav'
import { getCfg } from "../dbs/pouch";

const log = console.log
const settings = require('electron-settings')

ipcRenderer.on('remoteDictsReply', function (event, rdbs) {
  // let cloneErr = q('#cloneERR')
  // let progress = q('#progress')
  // progress.classList.add('is-hidden')
  // if (rdbs) showRemoteDicts(rdbs)
  // else cloneErr.classList.remove('is-hidden')
  hideProgress(rdbs)
  showRemoteDicts(rdbs)
})

ipcRenderer.on('replicateReply', function (event, res) {
  hideProgress(res)
  let state = {section: 'activedicts'}
  navigate(state)
})

ipcRenderer.on('csvReply', function (event, res) {
  hideProgress(res)
})

function hideProgress(res) {
  let cloneErr = q('#cloneERR')
  let progress = q('#progress')
  if (res) progress.classList.add('is-hidden')
  else cloneErr.classList.remove('is-hidden')
}


function showRemoteDicts(rdbs) {
  // let upath = settings.get('upath')
  let cfg = settings.get('cfg')
  // log('CLONE DICTS: CFG:', cfg)
  let defaults = ['_users']
  let locals = cfg.map(dict=> { return dict.name })
  let installed = _.uniq(defaults.concat(locals))

  let otable = q('#server-dicts-table tbody')
  empty(otable)
  rdbs.forEach(dbname=> {
    if (defaults.includes(dbname)) return
    let otr = create('tr')
    otable.appendChild(otr)
    let odt = create('td')
    otr.appendChild(odt)
    odt.textContent = _.capitalize(dbname)
    let oink = create('td', 'link')
    if (installed.includes(dbname)) {
      let check = checkmark()
      oink.appendChild(check)
    } else {
      oink.textContent = 'sync'
    }
    oink.dataset.clone = dbname
    otr.appendChild(oink)
  })
}

export function showActiveDicts() {
  let cfg = settings.get('cfg')
  let dbnames = cfg.map(cf=> { return cf.name })
  let otable = q('#local-dicts-table tbody')
  empty(otable)
  cfg.forEach(dict=> {
    let name = dict.name
    let otr = create('tr')
    otable.appendChild(otr)
    let odt = create('td', 'dictname')
    otr.appendChild(odt)
    odt.textContent = _.capitalize(name)
    odt.dataset.firstdict = name
    let oactive = create('td', 'active-dict')
    if (dict.active) {
      let check = checkmark()
      oactive.appendChild(check)
    } else {
      oactive.textContent = 'activate'
    }
    oactive.dataset.activedict = name
    otr.appendChild(oactive)
    let ocsv = create('td', 'dictcsv')
    ocsv.textContent = 'toCSV'
    ocsv.dataset.csv = name
    otr.appendChild(ocsv)
  })
}

export function moveDictFirst(dbname) {
  let cfg = settings.get('cfg')
  let dict = _.find(cfg, dict=> { return dict.name == dbname })
  let rest = _.reject(cfg, dict=> { return dict.name == dbname })
  rest.unshift(dict)
  cfg = rest
  cfg.forEach((dict, idx)=> { dict.idx = idx })
  settings.set('cfg', cfg)
  getCfg()
  showActiveDicts()
}

export function activateDict(el) {
  let cfg = settings.get('cfg')
  let dict = _.find(cfg, dict=> { return dict.name == el.dataset.activedict })
  let check = checkmark()
  if (el.textContent) {
    el.textContent = ''
    el.appendChild(check)
    dict.active = true
  } else {
    empty(el)
    el.textContent = 'activate'
    dict.active = false
  }
  settings.set('cfg', cfg)
}

function checkmark() {
  let check = create('img', 'dict-check')
  check.setAttribute('src', '../resources/check.png')
  return check
}

export function parseCSV() {
  log('PARSE START CSV')
}
