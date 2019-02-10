import { app, BrowserWindow } from "electron";

export const dictMenuTemplate = {
  label: "Dict",
  submenu: [
    { label: "export Stardict", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'stardict') } },
    { label: "export CSV", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'csv') } },
    { label: "read directory", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'readdir') } },
    { label: "create local dict", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'localdict') } },
    { label: "cleanup DB", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'cleanupdb') } }
  ]
};
