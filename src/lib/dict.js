//
import _ from 'lodash'
import { checkCfg, remoteDictsList } from "./pouch";
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'

const log = console.log

export function cloneServerDicts(state) {
  let cfg = checkCfg()
  log('CLONE DICTS: CFG:', cfg)
  let theader = q('#table-header')
  log('THEADER', theader)
  let rdbs = remoteDictsList()
  log('REMOTE', rdbs)
}

export function parseCSV(state) {
  log('PARSE STAR CSV')
}
