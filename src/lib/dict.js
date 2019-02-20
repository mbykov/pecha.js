//
import _ from 'lodash'
import { checkCfg, remoteDictsList, replicateDB } from "./pouch";
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'

const log = console.log

export function serverDicts() {
  // let cfg = checkCfg()
  // log('CLONE DICTS: CFG:', cfg)
  log('SERVER DICTS START__________________')
  let defaults = ['terms', 'verbs', 'lobsang', '_users']
  remoteDictsList(function(rdbs) {
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
    // otable = q('#server-dicts-table tbody')
    // log('TABLE2', otable)
  })
}

export function startCloning(dbname) {
  log('CLONING DB', dbname)
  let cloningText = q('#cloning-text')
  cloningText.textContent = '...cloning, please wait...'
  let progress = q('#progress')
  progress.classList.add('is-shown')
  replicateDB(dbname, function(res) {
    if (res) log('OKOK')
    else log('FUFU')
    cloningText.textContent = ''
    progress.classList.remove('is-shown')
  })
}

export function parseCSV() {
  log('PARSE STAR CSV')
}
