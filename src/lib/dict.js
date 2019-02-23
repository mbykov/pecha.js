//
import _ from 'lodash'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'
import { navigate } from './nav';

const log = console.log
const settings = require('electron-settings')

ipcRenderer.on('remoteDictsReply', function (event, rdbs) {
  showRemoteDicts(rdbs)
})

ipcRenderer.on('replicateReply', function (event, res) {
  log('____________ replicateReply', res)
  let state = {section: 'activedicts'}
  navigate(state)
})

/*
  встроенные - всегда - terms, verbs, lobsang - V
  installed  - V
  остальные - sync

*/

export function showRemoteDicts(rdbs) {
  let cfg = settings.get('cfg')
  // log('CLONE DICTS: CFG:', cfg)
  let defaults = ['terms', 'verbs', 'lobsang', '_users']
  let readynames = cfg.map(cf=> { return cf.name })
  let installed = _.uniq(defaults.concat(readynames))
  let dbnames = _.difference(rdbs, installed)
  // log('INSTALLED___', installed, dbnames)

  let otable = q('#server-dicts-table tbody')
  dbnames.forEach(dbname=> {
    let cells = qs('#server-dicts-table tr td')
    let tdnames = _.map(cells, tr=> { return tr.textContent})
    if (tdnames.includes(_.capitalize(dbname))) return
    let otr = create('tr')
    otable.appendChild(otr)
    let odt = create('td')
    otr.appendChild(odt)
    odt.textContent = _.capitalize(dbname)
    let oink = create('td', 'link')
    oink.textContent = 'sync'
    oink.dataset.clone = dbname
    otr.appendChild(oink)
  })
}

export function arrangeDicts() {
  let cfg = settings.get('cfg')
  // log('ACTIVE CFG:', cfg)
  let dbnames = cfg.map(cf=> { return cf.name })
  let otable = q('#local-dicts-table tbody')
  empty(otable)
  dbnames.forEach(dbname=> {
    let otr = create('tr')
    otable.appendChild(otr)
    let odt = create('td', 'dictname')
    otr.appendChild(odt)
    odt.textContent = _.capitalize(dbname)
    odt.dataset.activedict = dbname
    let oactive = create('td', 'active-dict')
    oactive.textContent = 'activate'
    oactive.dataset.active = dbname
    otr.appendChild(oactive)
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
  arrangeDicts()
}

export function parseCSV() {
  log('PARSE STAR CSV')
}
