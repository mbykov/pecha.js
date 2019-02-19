//
import _ from 'lodash'
import { checkCfg, remoteDictsList } from "./pouch";
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'

const log = console.log

export function serverDicts() {
  let cfg = checkCfg()
  log('CLONE DICTS: CFG:', cfg)
  // let theader = q('#table-header')
  let otable = q('#server-dicts-table')
  let defaults = ['terms', 'verbs', 'lobsang']
  remoteDictsList(function(rdbs) {
    let dbnames = _.difference(rdbs, defaults)
    dbnames.forEach(dbname=> {
      let otr = create('tr')
      otable.appendChild(otr)
      let odt = create('td')
      otr.appendChild(odt)
      odt.textContent = _.capitalize(dbname)
      let oclone = create('td', 'link')
      oclone.textContent = 'clone'
      oclone.dataset.clone = dbname
      otr.appendChild(oclone)
    })
  })
}

export function startCloning(dbname) {
  log('CLONING DB', dbname)
  // let buttons = qs('td.link')
  // let button = _.find(buttons, link=> { return link.dataset.clone == dbname })
  // log('BTNS', button)
  let cloningText = q('#cloning-text')
  cloningText.textContent = '...cloning, please wait...'
  let progress = q('#progress')
  progress.classList.add('is-shown')
}

export function parseCSV() {
  log('PARSE STAR CSV')
}
