import { app, BrowserWindow } from "electron";

export const dictMenuTemplate = {
  label: "Dict",
  submenu: [
    { label: "synchronize server dicts", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'clonedicts') } },
    { label: "arrange local dicts", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'arrangeDicts') } },
    { label: "export CSV to dict", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'csv') } },
    { label: "create local dict", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'localdict') } },
    { label: "cleanup DB", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'cleanupdb') } }
  ]
};
