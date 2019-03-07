// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import _ from 'lodash'
import path from "path";
import url from "url"
import { app, BrowserWindow, Menu, ipcMain, globalShortcut } from "electron"
import { libMenuTemplate } from "./menu/lib_menu_template"
import { aboutMenuTemplate } from "./menu/about_menu_template"
import { dictMenuTemplate } from "./menu/dict_menu_template"
import { helpMenuTemplate } from "./menu/help_menu_template"

import { getCfg, replicate, infoDB, remoteDicts, queryDBs, localDict, importCSV, cleanupDB } from "./dbs/pouch"

import { devMenuTemplate } from "./menu/dev_menu_template"
import { editMenuTemplate } from "./menu/edit_menu_template"
// import createWindow from "./helpers/window"
const settings = require('electron-settings')
// const windowStateKeeper = require('electron-window-state')
const log = console.log

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env"

const setApplicationMenu = () => {
  // const menus = [libMenuTemplate, fileMenuTemplate, aboutMenuTemplate, authMenuTemplate, helpMenuTemplate]
  // const menus = [libMenuTemplate, aboutMenuTemplate, helpMenuTemplate]
  const menus = [libMenuTemplate, dictMenuTemplate, aboutMenuTemplate, helpMenuTemplate]
  if (env.name !== "production") {
    // menus.push(devMenuTemplate)
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus))
}

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData")
  app.setPath("userData", `${userDataPath} (${env.name})`)
}

app.on("ready", () => {
  setApplicationMenu()

  // let mainWindowState = windowStateKeeper({
  //   defaultWidth: 1000,
  //   defaultHeight: 800
  // })

  let opts = {webPreferences: {
    nodeIntegration: true
  }}

  // Object.assign(opts, winBounds)

  const win = new BrowserWindow(opts)

  let winBounds = settings.get('winBounds') || win.getBounds()
  winBounds.y -= 21
  log('winBounds', winBounds)

  win.setBounds(winBounds)

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  )

  if (env.name === "development") {
    win.openDevTools()
  }

  win.webContents.on('did-finish-load', () => {
    let pckg = require('../package.json')
    let name = pckg.name
    let version = pckg.version
    // let aversion = pckg.dependencies.antrax.replace('^', '')
    win.webContents.send('version', version )
    win.setTitle([name, 'v.', version].join(' '))
  })

  win.on('resize', function () {
    win.webContents.send('reload')
  })

  win.on('close', () => {
    settings.set('winBounds', win.getBounds())
  })

  // globalShortcut.register('CommandOrControl+R', () => win.webContents.send('reread'))
  // globalShortcut.register('CommandOrControl+R', () => win.reload())
  globalShortcut.register('CommandOrControl+Shift+R', () => win.reload())
  // globalShortcut.register('CommandOrControl+R', () => win.reload())

  const apath = app.getAppPath()
  const upath = app.getPath("userData")
  settings.set('apath', apath)
  settings.set('upath', upath)

  getCfg()

  ipcMain.on('queryDBs', (event, query) => {
    queryDBs(query)
      .then(function(query) {
        event.sender.send('replayDBs', query)
      })
  })

  ipcMain.on('importcsv', (event, csvname) => {
    importCSV(csvname)
      // .then(function(res) {
      //   // event.sender.send('XXX', res)
      // })
  })

  ipcMain.on('queryLocalDict', (event, datapath) => {
    localDict(datapath)
  })

  ipcMain.on('remoteDicts', (event, query) => {
    log('B: REMOTE DICTS START')
    remoteDicts()
      .then(function(rdbs) {
        log('B: REMOTE DICTS:', rdbs)
        rdbs = _.filter(rdbs, dname=> { return dname[0] != '_' })
        event.sender.send('remoteDictsReply', rdbs)
      }).catch(function (err) {
        log('B: REMOTE DICTS ERR')
        event.sender.send('replicateERR')
      });
  })

  ipcMain.on('replicate', (event, dbname) => {
    console.log('B:REPLICATE', dbname)
    let localpath = path.resolve(upath, 'pouch', dbname)
    replicate(upath, dbname)
      .then(function (res) {
        getCfg()
        event.sender.send('replicateOK', res)
      }).catch(function (err) {
        // event.sender.send('replicateERR')
      });
  })

  ipcMain.on('cleanupDB', (event, datapath) => {
    cleanupDB(upath)
  })



})

app.on("window-all-closed", () => {
  app.quit()
})
