import _ from 'lodash'
import { remote } from "electron";

const path = require('path')
let fse = require('fs-extra')
const app = remote.app;
const apath = app.getAppPath()
const upath = app.getPath("userData")
const settings = remote.require('electron-settings')
const log = console.log
const PouchDB = require('pouchdb')


let dbs = []
let pouchpath = path.resolve(upath, 'pouch')
fse.ensureDirSync(pouchpath)

export function cleanupDB(state) {
  log('CLEAN UP')
}

export function getPossible(keys) {
  log('START GET POSSIBLE')
  if (!dbs.length) setDBs (cfg)

  // return padas
}

export function checkCfg() {
  let cfg = settings.get('cfg')
  if (!cfg) cfg = createZeroCfg(upath)
  return cfg
}

function createZeroCfg(upath, version) {
  let destpath = path.resolve(upath, 'pouch')
  let fns = fse.readdirSync(destpath)

  let cfg = []
  fns.forEach((dn, idx) => {
    if (dn == 'cfg.json') return
    let dpath = path.resolve(destpath, dn)
    let cf = {name: dn, active: true, idx: idx}
    cfg.push(cf)
  })
  settings.set('cfg', cfg)

  // let versionpath = path.resolve(upath, 'version.json')
  // fse.writeJsonSync(versionpath, {version: version})
  return cfg
}

export function setDBs() {
  let cfg = settings.get('cfg')
  let dbnames = _.compact(cfg.map(cf => { return (cf.active) ? cf.name : null }))
  dbnames.forEach((dn, idx) => {
    let dpath = path.resolve(upath, 'pouch', dn)
    let pouch = new PouchDB(dpath)
    pouch.dname = dn
    pouch.weight = idx
    dbs.push(pouch)
  })

}
