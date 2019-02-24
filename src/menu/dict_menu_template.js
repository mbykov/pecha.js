import { app, BrowserWindow } from "electron";

export const dictMenuTemplate = {
  label: "Dict",
  submenu: [
    { label: "clone dicts from server", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'clonedicts') } },
    { label: "arrange local dicts", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'activedicts') } },
    { label: "export CSV to dict", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'csv') } },
    { label: "create CSV dict from texts", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'localdict') } },
    // { label: "upload dict to server (disabled)", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'upload') } },
    { label: "cleanup DBs completely", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'cleanup') } }
  ]
};
