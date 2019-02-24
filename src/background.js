// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url"
import { app, BrowserWindow, Menu, ipcMain, globalShortcut } from "electron"
import { libMenuTemplate } from "./menu/lib_menu_template"
import { aboutMenuTemplate } from "./menu/about_menu_template"
import { dictMenuTemplate } from "./menu/dict_menu_template"
import { helpMenuTemplate } from "./menu/help_menu_template"

import { setDBs, getCfg, replicate, infoDB, queryDBs, remoteDicts } from "./lib/pouch"

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

  let winBounds = settings.get('winBounds')
  winBounds.y -= 21
  log('winBounds', winBounds)

  let opts = {webPreferences: {
    nodeIntegration: true
  }}

  // Object.assign(opts, winBounds)

  const win = new BrowserWindow(opts)
  win.setBounds(winBounds)
  // const win = new BrowserWindow({
  //   'x': mainWindowState.x,
  //   'y': mainWindowState.y -20,
  //   'width': mainWindowState.width,
  //   'height': mainWindowState.height,
  //   webPreferences: {
  //     nodeIntegration: true
  //   }
  // })

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

  let localpath = path.resolve(upath, 'pouch', 'vasilyev')
  let remotepath = ['http://localhost:5984', 'vasilyev'].join('/')
  // let localpath = ''
  // let remotepath = ''
  let dbnames = setDBs(upath)

  console.log('B:dbnames', dbnames)
  // console.log('APATH', apath, 'UPATH', upath)
  let cfg = getCfg(upath)
  console.log('CFG', cfg)

  ipcMain.on('replicate', (event, dbname) => {
    console.log('B:REPLICATE', dbname)
    let localpath = path.resolve(upath, 'pouch', dbname)
    // remotepath - пока dump.txt
    replicate(remotepath, localpath)
      .then(function (res) {
        console.log('Hooray the stream replication is complete!', res);
        event.sender.send('replicateReply', res)
      }).catch(function (err) {
        console.log('oh no an error', err);
      });
  })

  // ipcMain.on('info', (event, arg) => {
  //   let localpath = path.resolve(upath, 'pouch', 'vasilyev')
  //   console.log('B:INFO', arg) // prints "ping"
  //   infoDB(localpath)
  //     .then(function(info) {
  //       console.log('B: INFO:', info)
  //     })
  // })

  // let query = {keys: keys, el: el, pdchs: pdchs, compound: compound}
  ipcMain.on('queryDBs', (event, query) => {
    queryDBs(query.keys)
      .then(function(docs) {
        query.docs = docs
        event.sender.send('replayDBs', query)
      })
  })

  ipcMain.on('remoteDicts', (event, query) => {
    remoteDicts()
      .then(function(dbs) {
        event.sender.send('remoteDictsReply', dbs)
      })
  })

  // mainWindowState.manage(win);
})



app.on("window-all-closed", () => {
  app.quit()
})
