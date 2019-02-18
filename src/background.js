// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import { app, BrowserWindow, Menu, ipcMain, globalShortcut } from "electron";
import { libMenuTemplate } from "./menu/lib_menu_template";
import { aboutMenuTemplate } from "./menu/about_menu_template";
import { dictMenuTemplate } from "./menu/dict_menu_template";
import { helpMenuTemplate } from "./menu/help_menu_template";

import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
// import createWindow from "./helpers/window";
const windowStateKeeper = require('electron-window-state');
const settings = require('electron-settings');

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";

const setApplicationMenu = () => {
  // const menus = [libMenuTemplate, fileMenuTemplate, aboutMenuTemplate, authMenuTemplate, helpMenuTemplate];
  // const menus = [libMenuTemplate, aboutMenuTemplate, helpMenuTemplate];
  const menus = [libMenuTemplate, dictMenuTemplate, aboutMenuTemplate, helpMenuTemplate];
  if (env.name !== "production") {
    // menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

app.on("ready", () => {
  setApplicationMenu();

  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });

  const win = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );

  if (env.name === "development") {
    win.openDevTools();
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

  globalShortcut.register('CommandOrControl+R', () => win.webContents.send('reread'));
  // globalShortcut.register('CommandOrControl+R', () => win.reload());
  globalShortcut.register('CommandOrControl+Shift+R', () => win.reload());
  // globalShortcut.register('CommandOrControl+R', () => win.reload());
});



app.on("window-all-closed", () => {
  app.quit();
});
