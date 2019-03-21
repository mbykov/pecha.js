!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=28)}([function(e,n){e.exports=require("electron")},function(e,n){e.exports=require("lodash")},function(e,n,t){"use strict";t.d(n,"b",function(){return o}),t.d(n,"a",function(){return r});const o={tsek:"་"},r=["འི","ར","འོ","འམ","འི","ས","འང"]},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("speckled-band")},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(e,n){e.exports=require("electron-settings")},function(e,n){e.exports=require("electron-is-dev")},,function(e,n){e.exports=require("fs-extra")},function(e,n){e.exports=require("pouchdb")},function(e,n){e.exports=require("pouchdb-load")},,,function(e,n){e.exports=require("url")},,function(e,n){e.exports=require("mississippi")},function(e,n){e.exports=require("fast-csv")},function(e,n){e.exports=require("stream")},function(e,n){e.exports=require("glob")},function(e,n){e.exports=require("pouch-remote-stream")},function(e,n){e.exports=require("debug")},function(e,n){e.exports=require("csv2")},function(e,n){e.exports=require("node-couchdb")},function(e){e.exports={name:"pecha.js",version:"0.8.22",productName:"Pecha.js",description:"Simple practical Tibetan text analyzer",author:"Michael Bykov <m.bykov@gmail.com>",copyright:"© 2018-2019, Michael Bykov",license:"GPL-3.0",homepage:"http://diglossa.org/tibetan",main:"app/background.js",build:{appId:"org.diglossa.tibetan",files:["app/**/*","src/**/*","resources/**/*","node_modules/**/*","package.json"],directories:{buildResources:"resources"},dmg:{title:"${productName}-Setup",window:{height:380,width:540}},mac:{category:"public.app-category.productivity",icon:"resources/icon.icns"},win:{icon:"resources/icon.ico",publisherName:"Michael Bykov",publish:["github"]},linux:{category:"Educational software",target:[{target:"deb",arch:["x64"]},{target:"rpm",arch:["x64"]}],icon:"resources/icons"},publish:"github"},scripts:{postinstall:"electron-builder install-app-deps",preunit:"webpack --config=build/webpack.unit.config.js --env=test --display=none",unit:"electron-mocha temp/specs.js --renderer --require source-map-support/register",pree2e:"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",e2e:"mocha temp/e2e.js --require source-map-support/register",test:"npm run unit && npm run e2e",start:"node build/start.js",release:"webpack --config=build/webpack.app.config.js --env=production && electron-builder",release_:"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder"},dependencies:{axios:"^0.18.0",cholok:"^0.2.0",csv2:"^0.1.1",debug:"^4.1.1","electron-clipboard-extended":"^1.1.1","electron-is-dev":"^1.0.1","electron-settings":"^3.2.0","fast-csv":"^2.4.1","file-loader":"^2.0.0","fs-extra":"^7.0.1","fs-jetpack":"^2.2.2","git-clone":"^0.1.0",glob:"^7.1.3",json5:"^2.1.0",lodash:"^4.17.11",memorystream:"^0.3.1",mississippi:"^3.0.0",mousetrap:"^1.6.2","node-couchdb":"^1.3.0","pouch-remote-stream":"^0.3.0",pouchdb:"^7.0.0","pouchdb-load":"^1.4.6","pouchdb-quick-search":"^1.3.0","pouchdb-utils":"^7.0.0",slash:"^2.0.0","speckled-band":"^2.0.0","split.js":"^1.4.0"},devDependencies:{"@babel/core":"^7.1.2","@babel/preset-env":"^7.1.0","babel-loader":"^8.0.4","babel-plugin-transform-object-rest-spread":"^7.0.0-beta.3",chai:"^4.2.0","css-loader":"^0.28.7",electron:"4.0.0","electron-builder":"^20.31.3","electron-mocha":"^6.0.4","friendly-errors-webpack-plugin":"^1.7.0",mocha:"^5.2.0","source-map-support":"^0.5.9",spectron:"^4.0.0","style-loader":"^0.23.0",webpack:"^4.20.2","webpack-cli":"^3.1.2","webpack-merge":"^4.1.4","webpack-node-externals":"^1.7.2"},repository:{type:"git",url:"git+https://github.com/mbykov/pecha.js.git"},bugs:{url:"https://github.com/mbykov/pecha.js/issues"}}},,,,function(e,n,t){"use strict";t.r(n);var o=t(1),r=t.n(o),c=t(3),i=t.n(c),s=t(14),l=t.n(s),a=t(0);const u={label:"File",submenu:[{label:"Home",accelerator:"CmdOrCtrl+L",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:"Quit",accelerator:"CmdOrCtrl+Q",click:()=>{a.app.quit()}}]},p={label:"About",submenu:[{label:"About Pecha.js",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:"Code and Download",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:"License",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:"Contacts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:"Acknowledgements",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},d={label:"Dict",submenu:[{label:"Clone dicts from server",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","clonedicts")}},{label:"Import form CSV",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","csv")}},{label:"Arrange local dicts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","activedicts")}},{label:"Create CSV from some texts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","localdict")}},{label:"Publish new dictionary (disabled)",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","publish")}},{label:"Cleanup DBs completely",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},f={label:"Help",submenu:[{label:"hot keys",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Toggle DevTools",accelerator:"Alt+CmdOrCtrl+I",click:()=>{a.BrowserWindow.getFocusedWindow().toggleDevTools()}}]};var h=t(4),g=t.n(h),m=t(2);console.log;const b=m.b.tsek;const w=console.log,v=t(9),y=t(16),k=t(17),j=t(3),x=t(10),E=t(18);let R=new RegExp("་$");const C=m.b.tsek;let D=new RegExp(C+"$");const B=t(3),W=t(9);let q=t(19);t(7);const S=t(6);let _=t(10);t(11);_.plugin(t(11));let M=t(20);_.adapter("remote",M.adapter);const F=console.log;t(21),t(22);let P=[],O="tib",T="ཀ",A="￰";const I=t(23),N=(new I,new I({host:"diglossa.org",protocol:"http",port:5984,auth:{user:"guest",pass:"guest"}}));function V(e){}function $(){F("onSyncError")}function L(e){let n=S.get("cfg");if(n)!function(e){let n=S.get("upath");e.forEach((e,t)=>{if(!e.active)return;let o=B.resolve(n,"pouch",e.dname),r=new _(o);r.dname=e.dname,r.weight=t,P.push(r)}),P.map(e=>e.dname)}(n);else{n=[],S.set("cfg",n);let t=B.resolve(e,"pouch");W.ensureDirSync(t)}}function J(e){S.get("upath");let n=S.get("cfg");if(r.a.find(n,n=>n.dname==e))return n;let t={dname:e,active:!0,idx:n.length};return n.push(t),S.set("cfg",n),n}function z(e){let n,t=function(e){let n=e.split(b),t=4,o=e,c=(n.length,[[n]]);!function e(n,i){(function(e){let n,t,o=[];for(let r=1;r<e.length+1;r++){n=e.slice(0,r),t=e.slice(r);let c={head:n,tail:t};t.length&&o.push(c)}return o.reverse()})(n).forEach(n=>{i.push(n.head),i.push(n.tail),r.a.flatten(i).join(b)==o&&(c.push(r.a.clone(i)),i.pop()),i.length<t&&e(n.tail,i),i.pop()})}(n,[]);let i=[];return c.forEach(e=>{let n=[];e.forEach(e=>{n.push(e.join(b))}),i.push(n)}),i}(e.str),o=function(e){let n=r.a.uniq(r.a.flatten(e)),t=[];return n.forEach(e=>{m.a.forEach(n=>{let o=new RegExp(n+"$"),r=e.replace(o,"");e!=r&&t.push(r)})}),{main:n,added:t}}(t);n=e.compound?r.a.filter(o.main,n=>n!=e.str):r.a.uniq(o.main.concat(o.added));P.map(e=>e.dname);return Promise.all(P.map(function(e){return e.allDocs({keys:n,include_docs:!0}).then(function(n){if(!n||!n.rows)throw new Error("no dbn result");let t=r.a.compact(n.rows.map(e=>e.doc)),o=r.a.flatten(r.a.compact(t.map(e=>e.docs)));return o.forEach(n=>{n.dname=e.dname,n.weight=e.weight}),o}).catch(function(e){console.log("ERR GET DBs",e)})})).then(function(n){let o=function(e,n){let t,o=function(e,n){let t,o,c=[],i=[];e.forEach(e=>{let t=[],o=!1,s=!0;e.forEach(e=>{let c=r.a.filter(n,n=>(function(e,n){if(e==n)return!0;let t=new RegExp("^"+n),o=e.replace(t,"");return!(e==o||!m.a.includes(o))})(e,n.dict));c.length&&(o=!0),c.length||(s=!1);let i={seg:e,docs:c};t.push(i)}),o&&c.push(t),s&&i.push(t)}),i.length?(t=G(i),o=!0):t=G(c);return{chains:t,full:o}}(n,e).chains;o.length>1?t=function(e){let n,t=e[0],o=[];for(let c=0;c<t.length;c++){let i=e.map(e=>e[c].seg);if(1==r.a.uniq(i).length)o.push(t[c]),n=null;else{n||(n={ambi:!0,seg:"",docs:[]},o.push(n));let t=e.map(e=>({seg:e[c].seg,docs:e[c].docs}));n.docs.push(t)}}return r.a.filter(o,e=>e.ambi).forEach(e=>{let n=e.docs[0],t=[];for(let o=0;o<n.length;o++){let n=e.docs.map(e=>e[o]);t.push(n)}e.chains=t;let o=t[0];e.seg=o.map(e=>e.seg).join(C)}),o}(o):1==o.length&&(t=o[0]);return t}(r.a.flatten(n),t);return e.chain=o,e})}function G(e){let n=r.a.max(e.map(e=>r.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length)),t=r.a.filter(e,e=>r.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=n-1),o=r.a.min(t.map(e=>e.length));return r.a.filter(t,e=>e.length==o)}let Q,H=[];function U(e){let n=B.resolve(__dirname,e);q("**/*",{cwd:n,nodir:!0},function(e,t){let o=function(e,n){let t=[],o={};return n.forEach(n=>{let c=B.resolve(e,n);if("localDict.csv"==n||"unprocessed.csv"==n)return;let i=W.readFileSync(c,"utf8").trim().split("\n");(i=r.a.compact(i)).forEach((e,n)=>{let r=function(e){let n=e.trim();return n=n.trim().replace(/\.$/,"")}(e),c=g()(r,O);c&&c.forEach(e=>{e.forEach(e=>{e.lang==O&&e.text.split(" ").forEach(e=>{e=e.replace(D,""),o[e]||(t.push(e),o[e]=!0)})})})})}),t}(n,t).map(e=>({str:e}));return Q=B.resolve(n,"localDict.csv"),W.removeSync(Q),o.forEach(e=>{(function(e){return z(e).then(function(n){if(!n.chain)return H;n.chain.forEach(n=>{if(n.docs.length)!function(e){let n=[e,", -\n"].join("");W.appendFile(Q,n,function(e){e&&console.log("CSVERR",e)})}(n.seg);else if(e.str!=n.seg)return K({str:n.seg})})})})(e).catch(function(e){console.log("Q-ERR",e)})})})}function K(e){function n(n){if(!n.chain)return H;n.chain.forEach(n=>{if(n.docs.length)X(n.seg);else{if(e.str!=n.seg)return K({str:n.seg})}})}return z(e).then(n)}function X(e){let n=[e,", -\n"].join("");W.appendFile(Q,n,function(e){if(e)console.log("CSVERR",e)})}function Y(e,n){let t,o;W.readJson(e).then(function(c){let i=S.get("upath");return t=c.name,o=B.resolve(i,"pouch",t),function(e,n){let t=v.readJsonSync(e);t._id="description";let o=j.parse(e).dir,r=j.resolve(o,t.path),c=v.createReadStream(r),i=k({comment:"#",trim:!0,ignoreEmpty:!0}).on("end",function(){});const s=y.through.obj(function(e,n,t){let o=e[0].replace(R,"");t(null,{_id:o,docs:[{dict:o,trns:e.slice(1).join("").trim().split("; ")}]})});v.emptyDirSync(n);let l=new x(n),a=[],u=new class extends E.Writable{constructor(e){super(e),this.buff=[]}_write(e,n,t){a.length<2?(a.push(e),t()):(a.push(e),l.bulkDocs(a).then(function(e){a=[],t()}).catch(function(e){t(e,null)}))}}({objectMode:!0,highWaterMark:3});return c.pipe(i).pipe(s).pipe(u).on("finish",function(e){return l.bulkDocs(a).then(function(){l.put(t)}).catch(function(e){w("PUT DESCR ERR",e)})}).on("error",function(e){w("__stream final_err",e)})}(e,o).on("finish",function(e){let r=new _(o);r.dname=t,F("CSV DB NAME =>",r.dname),P.push(r),J(t);let c=S.get("cfg");F("IM CFG",c),n(!0)}).on("error",function(e){console.log("IMPORT .ON ERR",e),P=r.a.filter(P,e=>e.dname!=t),function(e){S.get("upath");let n=S.get("cfg");n=r.a.filter(n,n=>n.dname!=e),S.set("cfg",n)}(t),n(!1)})}).catch(function(e){F("csvDB ERR",e)})}var Z=t(5);const ee=t(6);console.log;if("production"!==Z.name){const e=a.app.getPath("userData");a.app.setPath("userData",`${e} (${Z.name})`)}a.app.on("ready",()=>{(()=>{const e=[u,d,p,f];Z.name,a.Menu.setApplicationMenu(a.Menu.buildFromTemplate(e))})();const e=new a.BrowserWindow({webPreferences:{nodeIntegration:!0}});let n=ee.get("winBounds")||e.getBounds();n.y-=21,e.setBounds(n),e.loadURL(l.a.format({pathname:i.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===Z.name&&e.openDevTools(),e.webContents.on("did-finish-load",()=>{let n=t(24),o=n.name,r=n.version;e.webContents.send("version",r),e.setTitle([o,"v.",r].join(" "))}),e.on("resize",function(){e.webContents.send("reload")}),e.on("close",()=>{ee.set("winBounds",e.getBounds())}),a.globalShortcut.register("CommandOrControl+R",()=>e.reload());const o=a.app.getAppPath(),c=a.app.getPath("userData");ee.set("apath",o),ee.set("upath",c),L(c),a.ipcMain.on("infoDB",(e,n)=>{!function(e){let n=S.get("upath");B.resolve(n,"pouch",e),r.a.find(P,n=>n.dname==e).info().then(function(e){F("INFO",e)})}(n)}),a.ipcMain.on("queryDBs",(e,n)=>{z(n).then(function(n){e.sender.send("replyDBs",n)})}),a.ipcMain.on("importCSV",(e,n)=>{Y(n,function(n){e.sender.send("csvImportReply",n)})}),a.ipcMain.on("exportCSV",(e,n)=>{!function(e,n){let t=r.a.find(P,n=>n.dname==e);t.allDocs({include_docs:!0,startkey:T,endkey:A}).then(function(o){let c=o.rows.map(e=>e.doc),i="";c.forEach(e=>{let n=e._id,t=e.docs.map(e=>e.trns),o=r.a.flatten(t).join(";"),c=[n,o.split(",").length>1?JSON.stringify(o):o].join(",");c=[c,"\n"].join(""),i+=c});let s=S.get("upath"),l=[e,"csv"].join("."),a=[e,"json"].join("."),u=B.resolve(s,l),p=B.resolve(s,a);W.writeFile(u,i,function(e){if(e&&F("ERRR",e),e)return n(!1);t.get("description").then(function(e){W.writeJson(p,e).then(()=>{n(!0)}).catch(e=>{console.error("JSONERR",e),n(!1)})})})})}(n,function(n){e.sender.send("csvExportReply",n)})}),a.ipcMain.on("scanLocalDict",(e,n)=>{U(n),e.sender.send("scanLocalReply",n)}),a.ipcMain.on("remoteDicts",(e,n)=>{N.listDatabases().then(function(e){return Promise.all(e.map(function(e){let n=["http://diglossa.org:5984/",e].join("");return new _(n).info()})).then(function(e){return e.map(e=>({dname:e.db_name,size:e.doc_count}))})}).then(function(n){n=r.a.filter(n,e=>"_"!=e[0]),e.sender.send("remoteDictsReply",n)}).catch(function(n){e.sender.send("remoteDictsReply",!1)})}),a.ipcMain.on("replicate",(e,n)=>{(function(e,n){let t=B.resolve(e,"pouch",n),o=new _(t),r=["http://diglossa.org/dump-",n].join(""),c=["http://diglossa.org:5984/",n].join("");return o.load(r).then(function(){o.sync(c,{live:!0,retry:!0}).on("change",V).on("error",$),o.dname=n,P.push(o),J(n)})})(c,n).then(function(n){e.sender.send("replicateReply",!0)}).catch(function(n){e.sender.send("replicateReply",!1)})}),a.ipcMain.on("cleanupDB",(e,n)=>{!function(e,n){let t=B.resolve(e,"pouch");try{P=[],W.removeSync(t),W.ensureDirSync(t),S.set("cfg",[]),n(!0)}catch(e){console.log("ERR re-creating DBs",e),n(!1)}}(c,function(n){e.sender.send("cleanupReply",n)})})}),a.app.on("window-all-closed",()=>{a.app.quit()})}]);
//# sourceMappingURL=background.js.map