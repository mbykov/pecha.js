import { app, BrowserWindow } from "electron";

export const dictMenuTemplate = {
  label: "Dict",
  submenu: [
    { label: "Clone dicts from server", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'clonedicts') } },
    { label: "Arrange local dicts", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'activedicts') } },
    { label: "Create CSV from some texts", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'localdict') } },
    { label: "Export form CSV", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'csv') } },
    { label: "Publish new dictionary (disabled)", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'publish') } },
    { label: "Cleanup DBs completely", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'cleanup') } }
  ]
};
