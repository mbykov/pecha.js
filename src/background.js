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

import { ensureCfg, reReadCfg, replicate, infoDB, remoteDicts, queryDBs, scanDirectory, importCSV, exportCSV, cleanupDB } from "./dbs/pouch"
import {glob2csv} from "./dbs/glob2csv"


import { devMenuTemplate } from "./menu/dev_menu_template"
import { editMenuTemplate } from "./menu/edit_menu_template"
const settings = require('electron-settings')
const log = console.log

import env from "env"

const setApplicationMenu = () => {
  // const menus = [libMenuTemplate, fileMenuTemplate, aboutMenuTemplate, authMenuTemplate, helpMenuTemplate]
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

  let opts = {webPreferences: {
    nodeIntegration: true
  }}

  const win = new BrowserWindow(opts)

  let winBounds = settings.get('winBounds') || win.getBounds()
  winBounds.y -= 21

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
  // globalShortcut.register('CommandOrControl+Shift+R', () => win.reload())
  globalShortcut.register('CommandOrControl+R', () => win.reload())

  const apath = app.getAppPath()
  const upath = app.getPath("userData")
  settings.set('apath', apath)
  settings.set('upath', upath)

  ensureCfg(upath)

  ipcMain.on('infoDB', (event, dname) => {
    infoDB(dname)
  })

  ipcMain.on('queryDBs', (event, query) => {
    queryDBs(query)
      .then(function(query) {
        event.sender.send('replyDBs', query)
      })
  })

  ipcMain.on('importCSV', (event, jsonpath) => {
    // log('CSVIMPORT', importCSV(jsonpath))
    importCSV(jsonpath, function(res) {
      event.sender.send('csvImportReply', res)
    })
      // .then(function(rdbs) {
      //   log('__true')
      //   event.sender.send('csvImportReply', true)
      // })
      // .catch(function (err) {
      //   log('__false')
      //   event.sender.send('csvImportReply', false)
      // });

      // .on('finish', function (err) {
      //   event.sender.send('csvImportReply', true)
      // })
      // .on('error', function (err) {
      //   event.sender.send('csvImportReply', false)
      // })
  })

  ipcMain.on('exportCSV', (event, csvname) => {
    exportCSV(csvname, function(res) {
      event.sender.send('csvExportReply', res)
    })
  })

  ipcMain.on('scanDirectory', (event, globpath) => {
    glob2csv(globpath)
    .then(function(res) {
      event.sender.send('scanReply', globpath)
    })
  })

  ipcMain.on('remoteDicts', (event, query) => {
    remoteDicts()
      .then(function(rdbs) {
        rdbs = _.filter(rdbs, dname=> { return dname[0] != '_' })
        event.sender.send('remoteDictsReply', rdbs)
      })
      .catch(function (err) {
        event.sender.send('remoteDictsReply', false)
      });
  })

  ipcMain.on('replicate', (event, dname) => {
    replicate(upath, dname)
      .then(function (res) {
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

  ipcMain.on('reReadCfg', (event) => {
    reReadCfg()
  })

})

app.on("window-all-closed", () => {
  app.quit()
})
