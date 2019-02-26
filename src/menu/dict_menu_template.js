import { app, BrowserWindow } from "electron";

export const dictMenuTemplate = {
  label: "Dict",
  submenu: [
    { label: "Clone dicts from server", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'clonedicts') } },
    { label: "Arrange local dicts", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'activedicts') } },
    { label: "Create CSV dict from texts", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'localdict') } },
    { label: "Convert CSV to dict", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'csv') } },
    { label: "upload new dict to server (disabled)", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'upload') } },
    { label: "Cleanup DBs completely", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'cleanup') } }
  ]
};
