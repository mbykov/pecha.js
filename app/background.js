!function(e){var o={};function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)n.d(t,r,function(o){return e[o]}.bind(null,r));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=23)}([function(e,o){e.exports=require("electron")},function(e,o){e.exports=require("lodash")},function(e,o){e.exports=require("path")},function(e,o,n){"use strict";n.d(o,"f",function(){return b}),n.d(o,"b",function(){return f}),n.d(o,"a",function(){return m}),n.d(o,"c",function(){return w}),n.d(o,"e",function(){return h}),n.d(o,"d",function(){return g});var t=n(1),r=n.n(t);const c=n(2),s=n(6),i=(n(7),n(4)),l=console.log,a=n(8);a.plugin(n(9));const u=n(10),d=new u;new u({host:"couchdb.external.service",protocol:"https",port:6984}),new u({auth:{user:"login",pass:"secret"}});let p=[];function b(e){let o=f(e);l("===setDBs CFG===",o);let n=r.a.compact(o.map(e=>e.active?e.name:null));return l("POUCH:DBNS",n),n.forEach((o,n)=>{let t=c.resolve(e,"pouch",o),r=new a(t);r.dname=o,r.weight=n,p.push(r)}),n}function f(e){let o=i.get("cfg");return o||(o=m(e)),o}function m(e,o){let n=c.resolve(e,"pouch");s.ensureDirSync(n);let t=s.readdirSync(n),r=[];return t.forEach((e,o)=>{c.resolve(n,e);let t={name:e,active:!0,idx:o};r.push(t)}),i.set("cfg",r),r}function w(e){return Promise.all(p.map(function(o){return o.allDocs({keys:e,include_docs:!0}).then(function(e){if(!e||!e.rows)throw new Error("no dbn result");let n=r.a.compact(e.rows.map(e=>e.doc)),t=r.a.flatten(r.a.compact(n.map(e=>e.docs)));return t.length?(t.forEach(e=>{e.dname=o.dname,e.weight=o.weight}),t):[]}).catch(function(e){console.log("ERR GET DBs",e)})}))}function h(e,o){return l("REPLICATE LOCAL",o),new a(o).load("http://localhost:3000/dumps/dump.txt")}function g(){return d.listDatabases().catch(function(e){l("REMOTE DICTS ERR",e)})}},function(e,o){e.exports=require("electron-settings")},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(e,o){e.exports=require("fs-extra")},function(e,o){e.exports=require("electron-is-dev")},function(e,o){e.exports=require("pouchdb")},function(e,o){e.exports=require("pouchdb-load")},function(e,o){e.exports=require("node-couchdb")},,,function(e,o){e.exports=require("url")},,,function(e){e.exports={name:"pecha.js",productName:"Pecha.js",description:"Starter for your Electron application",version:"0.1.0",private:!0,author:"Mr. Gumby <mr.gumby@example.com>",copyright:"© 2017, Gumby inc.",homepage:"http://example.com",main:"app/background.js",build:{appId:"com.example.electron-boilerplate",files:["app/**/*","node_modules/**/*","package.json"],directories:{buildResources:"resources"},publish:null},scripts:{postinstall:"electron-builder install-app-deps",preunit:"webpack --config=build/webpack.unit.config.js --env=test --display=none",unit:"electron-mocha temp/specs.js --renderer --require source-map-support/register",pree2e:"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",e2e:"mocha temp/e2e.js --require source-map-support/register",test:"npm run unit && npm run e2e",start:"node build/start.js",release:"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder"},dependencies:{axios:"^0.18.0",cholok:"^0.1.5",curl:"^0.1.4",debug:"^4.1.1","directory-tree":"^2.1.0","electron-clipboard-extended":"^1.1.1","electron-is-dev":"^1.0.1","electron-settings":"^3.2.0","electron-window-state":"^5.0.3","file-loader":"^2.0.0","franc-all":"^5.0.0","fs-extra":"^7.0.1","fs-jetpack":"^2.2.0","git-clone":"^0.1.0",glob:"^7.1.3",json5:"^2.1.0",lodash:"^4.17.11",memorystream:"^0.3.1",mousetrap:"^1.6.2","node-couchdb":"^1.3.0",pouchdb:"^7.0.0","pouchdb-authentication":"^1.1.3","pouchdb-find":"^7.0.0","pouchdb-load":"^1.4.6","pouchdb-quick-search":"^1.3.0","pouchdb-replication-stream":"^1.2.9",slash:"^2.0.0","split.js":"^1.4.0",textract:"^2.4.0"},devDependencies:{"@babel/core":"^7.1.2","@babel/preset-env":"^7.1.0","babel-loader":"^8.0.4","babel-plugin-transform-object-rest-spread":"^7.0.0-beta.3",chai:"^4.2.0","css-loader":"^0.28.7",electron:"4.0.4","electron-builder":"^20.38.5","electron-mocha":"^6.0.4",mocha:"^5.2.0","source-map-support":"^0.5.9",spectron:"^4.0.0","style-loader":"^0.23.0","friendly-errors-webpack-plugin":"^1.7.0",webpack:"^4.20.2","webpack-cli":"^3.1.2","webpack-merge":"^4.1.4","webpack-node-externals":"^1.7.2"}}},,,,,,,function(e,o,n){"use strict";n.r(o);var t=n(2),r=n.n(t),c=n(13),s=n.n(c),i=n(0);const l={label:"File",submenu:[{label:"Home",accelerator:"CmdOrCtrl+L",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:"Quit",accelerator:"CmdOrCtrl+Q",click:()=>{i.app.quit()}}]},a={label:"About",submenu:[{label:"What does this program do?",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("action","about")}},{label:"Code and Download",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("action","code")}},{label:"License",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("action","license")}},{label:"Acknowledgements",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("action","acknowledgements")}}]},u={label:"Dict",submenu:[{label:"clone dicts from server",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","clonedicts")}},{label:"arrange local dicts",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","activedicts")}},{label:"export CSV to dict",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("action","csv")}},{label:"create CSV dict from texts",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("action","localdict")}},{label:"cleanup DBs completely",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},d={label:"Help",submenu:[{label:"hot keys",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("action","hotkeys")}},{label:"Toggle DevTools",accelerator:"Alt+CmdOrCtrl+I",click:()=>{i.BrowserWindow.getFocusedWindow().toggleDevTools()}}]};var p=n(3);var b=n(5);const f=n(4),m=console.log;if("production"!==b.name){const e=i.app.getPath("userData");i.app.setPath("userData",`${e} (${b.name})`)}i.app.on("ready",()=>{(()=>{const e=[l,u,a,d];b.name,i.Menu.setApplicationMenu(i.Menu.buildFromTemplate(e))})();let e=f.get("winBounds");e.y-=20,m("winBounds",e);const o=new i.BrowserWindow({webPreferences:{nodeIntegration:!0}});o.setBounds(e),o.loadURL(s.a.format({pathname:r.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===b.name&&o.openDevTools(),o.webContents.on("did-finish-load",()=>{let e=n(16),t=e.name,r=e.version;o.webContents.send("version",r),o.setTitle([t,"v.",r].join(" "))}),o.on("resize",function(){o.webContents.send("reload")}),o.on("close",()=>{f.set("winBounds",o.getBounds())}),i.globalShortcut.register("CommandOrControl+Shift+R",()=>o.reload());const t=i.app.getAppPath(),c=i.app.getPath("userData");f.set("apath",t),f.set("upath",c);r.a.resolve(c,"pouch","vasilyev");let w=["http://localhost:5984","vasilyev"].join("/"),h=Object(p.f)(c);console.log("B:dbnames",h);let g=Object(p.b)(c);console.log("CFG",g),i.ipcMain.on("replicate",(e,o)=>{console.log("B:REPLICATE",o);let n=r.a.resolve(c,"pouch",o);Object(p.e)(w,n).then(function(o){console.log("Hooray the stream replication is complete!",o),e.sender.send("replicateReply",o)}).catch(function(e){console.log("oh no an error",e)})}),i.ipcMain.on("queryDBs",(e,o)=>{Object(p.c)(o.keys).then(function(n){o.docs=n,e.sender.send("replayDBs",o)})}),i.ipcMain.on("remoteDicts",(e,o)=>{Object(p.d)().then(function(o){e.sender.send("remoteDictsReply",o)})})}),i.app.on("window-all-closed",()=>{i.app.quit()})}]);
//# sourceMappingURL=background.js.map