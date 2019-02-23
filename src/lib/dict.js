//
import _ from 'lodash'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'

const log = console.log
const settings = require('electron-settings')

ipcRenderer.on('remoteDictsReply', function (event, rdbs) {
  showRemoteDicts(rdbs)
})

ipcRenderer.on('replicateReply', function (event, res) {
  log('____________ replicate', res)
})

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
    let calls = qs('#server-dicts-table tr td')
    let tdnames = _.map(calls, tr=> { return tr.textContent})
    if (tdnames.includes(_.capitalize(dbname))) return
    let otr = create('tr')
    otr.setAttribute('newtr', true)
    otable.appendChild(otr)
    let odt = create('td')
    otr.appendChild(odt)
    odt.textContent = _.capitalize(dbname)
    let oink = create('td', 'link')
    oink.textContent = 'clone'
    oink.dataset.clone = dbname
    otr.appendChild(oink)
  })
}

export function parseCSV() {
  log('PARSE STAR CSV')
}
