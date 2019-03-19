//
import _ from 'lodash'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'
import { navigate } from './nav'

const log = console.log
const settings = require('electron-settings')

ipcRenderer.on('remoteDictsReply', function (event, rdbs) {
  hideProgress(rdbs)
  if (rdbs) showRemoteDicts(rdbs)
})

ipcRenderer.on('replicateReply', function (event, res) {
  hideProgress(res)
  // let state = {section: 'activedicts'}
  let state = {section: 'clonedicts'}
  navigate(state)
})

ipcRenderer.on('csvImportReply', function (event, res) {
  hideProgress(res)
  let state = {section: 'activedicts'}
  navigate(state)
})

ipcRenderer.on('csvExportReply', function (event, res) {
  hideProgress(res)
  // let state = {section: 'activedicts'}
  // navigate(state)
})

ipcRenderer.on('cleanupReply', function (event, res) {
  hideProgress(res)
  let state = {section: 'clonedicts'}
  navigate(state)
})

function hideProgress(res) {
  let errmess = q('#err-message')
  let progress = q('#progress')
  if (res) progress.classList.add('is-hidden')
  else {
    errmess.classList.remove('is-hidden')
    errmess.textContent = 'something went wrong'
  }
}


function showRemoteDicts(rdbs) {
  let cfg = settings.get('cfg')
  let defaults = ['_users']
  let locals = cfg.map(dict=> { return dict.dname })
  let installed = _.uniq(defaults.concat(locals))

  let otable = q('#server-dicts-table tbody')
  empty(otable)
  rdbs.forEach(rdb=> {
    if (defaults.includes(rdb.dname)) return
    let otr = create('tr')
    otable.appendChild(otr)
    let odt = create('td')
    otr.appendChild(odt)
    odt.textContent = _.capitalize(rdb.dname)
    let osize = create('td', 'dsize')
    osize.textContent = _.capitalize(rdb.size)
    otr.appendChild(osize)
    let oink = create('td', 'link')
    if (installed.includes(rdb.dname)) {
      let check = checkmark()
      oink.appendChild(check)
    } else {
      oink.textContent = 'sync'
    }
    oink.dataset.clone = rdb.dname
    otr.appendChild(oink)
  })
}

export function showActiveDicts() {
  let cfg = settings.get('cfg')
  if (!cfg) return
  let dnames = cfg.map(cf=> { return cf.name })
  let mess = q('#adictmessage')
  if (dnames.length) mess.textContent = 'click dict\'s name to move it first'
  let otable = q('#local-dicts-table tbody')
  empty(otable)
  cfg.forEach(dict=> {
    let name = dict.dname
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

export function moveDictFirst(dname) {
  let cfg = settings.get('cfg')
  let dict = _.find(cfg, dict=> { return dict.dname == dname })
  let rest = _.reject(cfg, dict=> { return dict.dname == dname })
  rest.unshift(dict)
  cfg = rest
  cfg.forEach((dict, idx)=> { dict.idx = idx })
  settings.set('cfg', cfg)
  showActiveDicts()
}

export function activateDict(el) {
  let cfg = settings.get('cfg')
  let dict = _.find(cfg, dict=> { return dict.dname == el.dataset.activedict })
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
