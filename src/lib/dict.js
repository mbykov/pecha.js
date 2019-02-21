//
import _ from 'lodash'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'

const log = console.log

ipcRenderer.on('remoteDictsReply', function (event, rdbs) {
  log('____________ show remote')
  showRemoteDicts(rdbs)
})

ipcRenderer.on('replicateReply', function (event, res) {
  log('____________ replicate', res)
})

export function showRemoteDicts(rdbs) {
  // let cfg = checkCfg()
  // log('CLONE DICTS: CFG:', cfg)
  log('SERVER DICTS START__________________')
  let defaults = ['terms', 'verbs', 'lobsang', '_users']
  let otable = q('#server-dicts-table tbody')
  // log('TABLE', otable)
  let dbnames = _.difference(rdbs, defaults)
  log('RDBS=>', rdbs, 'dfs', defaults, 'dbns', dbnames)
  dbnames.forEach(dbname=> {
    // log('DBNAME_________', dbname)
    let otr = create('tr')
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
