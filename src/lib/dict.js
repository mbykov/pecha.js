//
import _ from 'lodash'
import { checkCfg } from "./pouch";

const log = console.log

export function cloneServerDicts(state) {
  let cfg = checkCfg()
  log('CLONE DICTS', cfg)
}

export function parseCSV(state) {
  log('PARSE STAR CSV')
}
