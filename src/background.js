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

import { setDBs, replicate, infoDB, remoteDicts, queryDBs, localDict, importCSV, exportCSV, cleanupDB } from "./dbs/pouch"

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

  setDBs(upath)

  ipcMain.on('infoDB', (event, dname) => {
    infoDB(upath, dname)
  })

  ipcMain.on('queryDBs', (event, query) => {
    queryDBs(query)
      .then(function(query) {
        event.sender.send('replayDBs', query)
      })
  })

  ipcMain.on('import-from-csv', (event, csvpath) => {
    importCSV(csvpath, function(res) {
      log('import-from-csv', res)
      event.sender.send('csvReply', res)
    })
  })

  ipcMain.on('export-to-csv', (event, csvname) => {
    exportCSV(csvname)
      .then(function (res) {
        if (res) log('DOCS', res)
        event.sender.send('csvReply', true)
      }).catch(function (err) {
        console.log('ERR', err);
        event.sender.send('csvReply', false)
      });
  })

  ipcMain.on('queryLocalDict', (event, datapath) => {
    localDict(datapath)
  })

  ipcMain.on('remoteDicts', (event, query) => {
    // log('B: REMOTE DICTS START')
    remoteDicts()
      .then(function(rdbs) {
        log('B: REMOTE DICTS:', rdbs)
        rdbs = _.filter(rdbs, dname=> { return dname[0] != '_' })
        event.sender.send('remoteDictsReply', rdbs)
      }).catch(function (err) {
        log('B: REMOTE DICTS ERR')
        event.sender.send('remoteDictsReply', false)
      });
  })

  ipcMain.on('replicate', (event, dname) => {
    console.log('B:REPLICATE', dname)
    let localpath = path.resolve(upath, 'pouch', dname)
    replicate(upath, dname)
      .then(function (res) {
        log('B: replicate done', res)
        event.sender.send('replicateReply', true)
      }).catch(function (err) {
        event.sender.send('replicateReply', false)
      });
  })

  ipcMain.on('cleanupDB', (event, datapath) => {
    cleanupDB(upath, function(res) {
      event.sender.send('cleanupReply', res)
    })
  })



})

app.on("window-all-closed", () => {
  app.quit()
})
