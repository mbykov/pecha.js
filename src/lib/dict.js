//
import _ from 'lodash'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from './utils'
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
  let state = {section: 'remotedicts'}
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
  let state = {section: 'home'}
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
  let locals = cfg.map(dict=> { return dict.dname })
  let installed = _.uniq(locals)

  let obefore = q('#before-remote-table')
  obefore.textContent = ''
  let otable = q('#table-remote')
  if (otable) empty(otable)
  else {
    let osection = q('#remotedicts')
    otable = createTable('remote')
    osection.appendChild(otable)
  }
  let oheader = q('#remote-table-header')

  rdbs.forEach(rdb=> {
    let otr = create('tr')
    otable.appendChild(otr)
    // insertAfter(otr, oheader)
    let odt = create('td')
    otr.appendChild(odt)
    odt.textContent = rdb.descr.name
    let osize = create('td', 'dsize')
    osize.textContent = rdb.size
    otr.appendChild(osize)
    let olang = create('td', 'dlang')
    olang.textContent = rdb.descr.langs
    otr.appendChild(olang)
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

function createTable(distance) {
  let otable = create('table', 'dicts-table')
  otable.id = ['table', distance].join('-')
  let oheader = create('tr', 'table-header')
  oheader.id = ['table-header', distance].join('-')
  otable.appendChild(oheader)
  let oname = create('td')
  oname.textContent = 'dict\'s name'
  oheader.appendChild(oname)
  let osize = create('td')
  osize.textContent = 'docs'
  oheader.appendChild(osize)
  let olang = create('td')
  olang.textContent = 'langs'
  oheader.appendChild(olang)
  let osync = create('td')
  osync.textContent = 'synchronize'
  oheader.appendChild(osync)
  return otable
}

export function showActiveDicts() {
  let cfg = settings.get('cfg')
  if (!cfg) return
  let dnames = cfg.map(cf=> { return cf.dname })
  let mess = q('#adictmessage')
  if (dnames.length) mess.textContent = 'click dict\'s name to move it first'
  let otable = q('#local-dicts-table tbody')
  empty(otable)
  cfg.forEach(dict=> {
    let name = dict.descr.name
    let otr = create('tr')
    otable.appendChild(otr)
    let odt = create('td', 'dictname')
    otr.appendChild(odt)
    odt.textContent = name
    odt.dataset.firstdict = dict.dname
    let oactive = create('td', 'active-dict')
    if (dict.active) {
      let check = checkmark()
      oactive.appendChild(check)
    } else {
      oactive.textContent = 'activate'
    }
    oactive.dataset.activedict = dict.dname
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
