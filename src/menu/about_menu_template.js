import { app, BrowserWindow } from "electron";

export const aboutMenuTemplate = {
  label: "About",
  submenu: [
    { label: "About Pecha.js", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'about') } },
    { label: "Code and Download", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'code') } },
    { label: "License", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'license') } },
    { label: "Contacts", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'contacts') } },
    { label: "Acknowledgements", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'acknowledgements') } }
  ]
};
