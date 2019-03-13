!function(e){var n={};function t(o){if(n[o])return n[o].exports;var c=n[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,t),c.l=!0,c.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)t.d(o,c,function(n){return e[n]}.bind(null,c));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=27)}([function(e,n){e.exports=require("electron")},function(e,n){e.exports=require("lodash")},function(e,n,t){"use strict";t.d(n,"b",function(){return o}),t.d(n,"a",function(){return c});const o={tsek:"་"},c=["འི","ར","འོ","འམ","འི","ས","འང"]},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("speckled-band")},function(e,n){e.exports=require("electron-settings")},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(e,n){e.exports=require("electron-is-dev")},function(e,n){e.exports=require("pouchdb")},,,,function(e,n){e.exports=require("url")},,function(e,n){e.exports=require("request")},function(e,n){e.exports=require("fs-extra")},function(e,n){e.exports=require("glob")},function(e,n){e.exports=require("pouchdb-load")},function(e,n){e.exports=require("debug")},function(e,n){e.exports=require("csv2")},function(e,n){e.exports=require("node-couchdb")},function(e){e.exports={name:"pecha.js",version:"0.8.5",productName:"Pecha.js",description:"Simple practical tibetan text analyzer",author:"Michael  Bykov <m.bykov@gmail.com>",copyright:"© 2018, Michael Bykov",license:"GPL-3.0",homepage:"http://example.com",main:"app/background.js",build:{appId:"com.example.electron-boilerplate",files:["app/**/*","src/**/*","resources/**/*","node_modules/**/*","package.json"],directories:{buildResources:"resources"},dmg:{title:"${productName}-Setup",window:{height:380,width:540}},mac:{category:"public.app-category.productivity",icon:"resources/icon.icns"},win:{icon:"resources/icon.ico",publisherName:"Michael Bykov",publish:["github"]},linux:{category:"Educational software",target:[{target:"deb",arch:["x64"]},{target:"rpm",arch:["x64"]}],icon:"resources/icons"},publish:"github"},scripts:{postinstall:"electron-builder install-app-deps",preunit:"webpack --config=build/webpack.unit.config.js --env=test --display=none",unit:"electron-mocha temp/specs.js --renderer --require source-map-support/register",pree2e:"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",e2e:"mocha temp/e2e.js --require source-map-support/register",test:"npm run unit && npm run e2e",start:"node build/start.js",release:"webpack --config=build/webpack.app.config.js --env=production && electron-builder",release_:"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder"},dependencies:{axios:"^0.18.0",cholok:"^0.2.0",csv2:"^0.1.1",debug:"^4.1.1","electron-clipboard-extended":"^1.1.1","electron-is-dev":"^1.0.1","electron-settings":"^3.2.0","file-loader":"^2.0.0","fs-extra":"^7.0.1","fs-jetpack":"^2.2.2","git-clone":"^0.1.0",glob:"^7.1.3",json5:"^2.1.0",lodash:"^4.17.11",mousetrap:"^1.6.2","node-couchdb":"^1.3.0",pouchdb:"^7.0.0","pouchdb-authentication":"^1.1.3","pouchdb-find":"^7.0.0","pouchdb-load":"^1.4.6","pouchdb-quick-search":"^1.3.0","pouchdb-replication-stream":"^1.2.9","readable-stream":"^3.2.0",request:"^2.88.0",slash:"^2.0.0","speckled-band":"^2.0.0","split.js":"^1.4.0"},devDependencies:{"@babel/core":"^7.1.2","@babel/preset-env":"^7.1.0","babel-loader":"^8.0.4","babel-plugin-transform-object-rest-spread":"^7.0.0-beta.3",chai:"^4.2.0","css-loader":"^0.28.7",electron:"4.0.4","electron-builder":"^20.38.5","electron-mocha":"^6.0.4","friendly-errors-webpack-plugin":"^1.7.0","json5-loader":"^1.0.1",mocha:"^5.2.0","source-map-support":"^0.5.9",spectron:"^4.0.0","style-loader":"^0.23.0",webpack:"^4.20.2","webpack-cli":"^3.1.2","webpack-merge":"^4.1.4","webpack-node-externals":"^1.7.2"},repository:{type:"git",url:"git+https://github.com/mbykov/pecha.js.git"},bugs:{url:"https://github.com/mbykov/pecha.js/issues"}}},,,,,,function(e,n,t){"use strict";t.r(n);var o=t(1),c=t.n(o),r=t(3),s=t.n(r),i=t(12),l=t.n(i),a=t(0);const u={label:"File",submenu:[{label:"Home",accelerator:"CmdOrCtrl+L",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:"Quit",accelerator:"CmdOrCtrl+Q",click:()=>{a.app.quit()}}]},p={label:"About",submenu:[{label:"About Pecha.js",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:"Code and Download",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:"License",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:"Contacts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:"Acknowledgements",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},d={label:"Dict",submenu:[{label:"Clone dicts from server",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","clonedicts")}},{label:"Arrange local dicts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","activedicts")}},{label:"Create CSV from some texts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","localdict")}},{label:"Import form CSV",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","csv")}},{label:"Publish new dictionary (disabled)",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","publish")}},{label:"Cleanup DBs completely",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},f={label:"Help",submenu:[{label:"hot keys",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Toggle DevTools",accelerator:"Alt+CmdOrCtrl+I",click:()=>{a.BrowserWindow.getFocusedWindow().toggleDevTools()}}]};var h=t(4),g=t.n(h),m=t(2);console.log;const b=m.b.tsek;const w=m.b.tsek;let v=new RegExp(w+"$");t(14);const y=t(3),k=t(15);let E=t(16);t(7);const R=t(5),j=t(8);j.plugin(t(17));const C=console.log;t(18);let x=t(19),B=[],D="tib",S="ཀ",W="￰";const q=t(20),M=(new q,new q({host:"diglossa.org",protocol:"http",port:5984,auth:{user:"guest",pass:"guest"}}));function F(e){C("onSyncChange",e)}function O(){C("onSyncError")}function P(e,n){let t=R.get("cfg")||[];if(!n)return t;let o={dname:n,active:!0,idx:t.length};return t.push(o),R.set("cfg",t),C("== setCFG ==",t),t}function T(e){let n,t=function(e){let n=e.split(b),t=4,o=e,r=(n.length,[[n]]);!function e(n,s){(function(e){let n,t,o=[];for(let c=1;c<e.length+1;c++){n=e.slice(0,c),t=e.slice(c);let r={head:n,tail:t};t.length&&o.push(r)}return o.reverse()})(n).forEach(n=>{s.push(n.head),s.push(n.tail),c.a.flatten(s).join(b)==o&&(r.push(c.a.clone(s)),s.pop()),s.length<t&&e(n.tail,s),s.pop()})}(n,[]);let s=[];return r.forEach(e=>{let n=[];e.forEach(e=>{n.push(e.join(b))}),s.push(n)}),s}(e.str),o=function(e){let n=c.a.uniq(c.a.flatten(e)),t=[];return n.forEach(e=>{m.a.forEach(n=>{let o=new RegExp(n+"$"),c=e.replace(o,"");e!=c&&t.push(c)})}),{main:n,added:t}}(t);n=e.compound?c.a.filter(o.main,n=>n!=e.str):c.a.uniq(o.main.concat(o.added));B.map(e=>e.dname);return Promise.all(B.map(function(e){return e.allDocs({keys:n,include_docs:!0}).then(function(n){if(!n||!n.rows)throw new Error("no dbn result");let t=c.a.compact(n.rows.map(e=>e.doc)),o=c.a.flatten(c.a.compact(t.map(e=>e.docs)));return o.forEach(n=>{n.dname=e.dname,n.weight=e.weight}),o}).catch(function(e){console.log("ERR GET DBs",e)})})).then(function(n){let o=function(e,n){let t,o=function(e,n){let t,o,r=[],s=[];e.forEach(e=>{let t=[],o=!1,i=!0;e.forEach(e=>{let r=c.a.filter(n,n=>(function(e,n){if(e==n)return!0;let t=new RegExp("^"+n),o=e.replace(t,"");return!(e==o||!m.a.includes(o))})(e,n.dict));r.length&&(o=!0),r.length||(i=!1);let s={seg:e,docs:r};t.push(s)}),o&&r.push(t),i&&s.push(t)}),s.length?(t=_(s),o=!0):t=_(r);return{chains:t,full:o}}(n,e).chains;o.length>1?t=function(e){let n,t=e[0],o=[];for(let r=0;r<t.length;r++){let s=e.map(e=>e[r].seg);if(1==c.a.uniq(s).length)o.push(t[r]),n=null;else{n||(n={ambi:!0,seg:"",docs:[]},o.push(n));let t=e.map(e=>({seg:e[r].seg,docs:e[r].docs}));n.docs.push(t)}}return c.a.filter(o,e=>e.ambi).forEach(e=>{let n=e.docs[0],t=[];for(let o=0;o<n.length;o++){let n=e.docs.map(e=>e[o]);t.push(n)}e.chains=t;let o=t[0];e.seg=o.map(e=>e.seg).join(w)}),o}(o):1==o.length&&(t=o[0]);return t}(c.a.flatten(n),t);return e.chain=o,e})}function _(e){let n=c.a.max(e.map(e=>c.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length)),t=c.a.filter(e,e=>c.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=n-1),o=c.a.min(t.map(e=>e.length));return c.a.filter(t,e=>e.length==o)}let A,I=[];function N(e){let n=y.resolve(__dirname,e);E("**/*",{cwd:n,nodir:!0},function(e,t){let o=function(e,n){let t=[],o={};return n.forEach(n=>{let r=y.resolve(e,n);if("localDict.csv"==n||"unprocessed.csv"==n)return;let s=k.readFileSync(r,"utf8").trim().split("\n");(s=c.a.compact(s)).forEach((e,n)=>{let c=function(e){let n=e.trim();return n=n.trim().replace(/\.$/,"")}(e),r=g()(c,D);r&&r.forEach(e=>{e.forEach(e=>{e.lang==D&&e.text.split(" ").forEach(e=>{e=e.replace(v,""),o[e]||(t.push(e),o[e]=!0)})})})})}),t}(n,t).map(e=>({str:e}));return A=y.resolve(n,"localDict.csv"),k.removeSync(A),o.forEach(e=>{(function(e){return T(e).then(function(n){if(!n.chain)return I;n.chain.forEach(n=>{if(n.docs.length)!function(e){let n=[e,", -\n"].join("");k.appendFile(A,n,function(e){e&&C("CSVERR",e)})}(n.seg);else if(e.str!=n.seg)return L({str:n.seg})})})})(e).catch(function(e){C("Q-ERR",e)})})})}function L(e){function n(n){if(!n.chain)return I;n.chain.forEach(n=>{if(n.docs.length)V(n.seg);else{if(e.str!=n.seg)return L({str:n.seg})}})}return T(e).then(n)}function V(e){let n=[e,", -\n"].join("");k.appendFile(A,n,function(e){if(e)C("CSVERR",e)})}function $(e,n){C("P: IMPORT CSV",e),e=y.resolve(e),k.readJson(e).then(t=>{C("MANIFEST",t);let o=y.parse(e).dir,r=[y.parse(e).name,"csv"].join("."),s=y.resolve(o,r);C("CSVPATH",s),function(e,n){let t=R.get("upath"),o=[];k.createReadStream(e).pipe(x()).on("data",function(e){o.push(e)}).on("error",function(e){}).on("end",function(r){let s=o.shift();C("ROWS-0",s),C("ROWS",o),o=c.a.filter(o,e=>"#"!=e[0][0]);let i=[];o.forEach(e=>{let n=e.shift().trim().replace(v,""),t={_id:n,docs:[]},o=e.map(e=>e.split(";")),r={dict:n,trns:c.a.flatten(o)};t.docs.push(r),i.push(t)}),C("BULK",i);let l=y.parse(e).name,a=y.resolve(t,"pouch",l),u=new j(a);u.bulkDocs(i).then(function(e){u.dname=l,B.push(u);P(0,l);n(!0)}).catch(function(e){console.log("CSVERR",e),n(!1)})})}(s,function(e){n(!0)})}).catch(e=>{console.error("IMPORTCSVERR",e),n(!1)})}var z=t(6);const G=t(5),H=console.log;if("production"!==z.name){const e=a.app.getPath("userData");a.app.setPath("userData",`${e} (${z.name})`)}a.app.on("ready",()=>{(()=>{const e=[u,d,p,f];z.name,a.Menu.setApplicationMenu(a.Menu.buildFromTemplate(e))})();const e=new a.BrowserWindow({webPreferences:{nodeIntegration:!0}});let n=G.get("winBounds")||e.getBounds();n.y-=21,e.setBounds(n),e.loadURL(l.a.format({pathname:s.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===z.name&&e.openDevTools(),e.webContents.on("did-finish-load",()=>{let n=t(21),o=n.name,c=n.version;e.webContents.send("version",c),e.setTitle([o,"v.",c].join(" "))}),e.on("resize",function(){e.webContents.send("reload")}),e.on("close",()=>{G.set("winBounds",e.getBounds())}),a.globalShortcut.register("CommandOrControl+Shift+R",()=>e.reload());const o=a.app.getAppPath(),r=a.app.getPath("userData");G.set("apath",o),G.set("upath",r),function(e){let n=y.resolve(e,"pouch");k.ensureDirSync(n);let t=R.get("cfg");B=[],t.forEach((n,t)=>{if(!n.active)return;let o=y.resolve(e,"pouch",n.dname),c=new j(o);c.dname=n.dname,c.weight=t,B.push(c)}),B.map(e=>e.dname)}(r),a.ipcMain.on("infoDB",(e,n)=>{!function(e,n){let t=y.resolve(e,"pouch",n);new j(t).allDocs({include_docs:!0,startkey:S,endkey:W}).then(function(e){if(!e.rows.length)return;let n=e.rows[0].doc;C("INFO-doc",n),C("INFO-docs",n.docs)}).catch(function(e){C("INFO ERR",e)})}(r,n)}),a.ipcMain.on("queryDBs",(e,n)=>{T(n).then(function(n){e.sender.send("replayDBs",n)})}),a.ipcMain.on("import-from-csv",(e,n)=>{$(n,function(n){e.sender.send("csvReply",n)})}),a.ipcMain.on("export-to-csv",(e,n)=>{(function(e){let n=c.a.find(B,n=>n.dname==e);return n.allDocs({include_docs:!0,startkey:S,endkey:W}).then(function(t){let o=t.rows.map(e=>e.doc),r="";o.forEach(e=>{let n=e._id,t=e.docs.map(e=>e.trns),o=c.a.flatten(t).join(";"),s=[n,o.split(",").length>1?JSON.stringify(o):o].join(",");s=[s,"\n"].join(""),r+=s});let s=R.get("upath"),i=[e,"csv"].join("."),l=[e,"json"].join("."),a=y.resolve(s,i),u=y.resolve(s,l);k.writeFile(a,r,function(e){if(e)return!1;n.get("description").then(function(e){k.writeJson(u,e).then(()=>!0).catch(e=>(console.error(e),!1))})})})})(n).then(function(n){e.sender.send("csvReply",!0)}).catch(function(n){console.log("ERR",n),e.sender.send("csvReply",!1)})}),a.ipcMain.on("scanLocalDict",(e,n)=>{N(n),e.sender.send("scanLocalReply",n)}),a.ipcMain.on("remoteDicts",(e,n)=>{H("B: REMOTE DICTS START"),(C("REMOTE"),M.listDatabases().then(function(e){return C("DNAMES",e),Promise.all(e.map(function(e){let n=["http://diglossa.org:5984/",e].join("");return new j(n).info()})).then(function(e){return e.map(e=>({dname:e.db_name,size:e.doc_count}))})})).then(function(n){H("B: REMOTE DICTS:",n),n=c.a.filter(n,e=>"_"!=e[0]),e.sender.send("remoteDictsReply",n)}).catch(function(n){H("B: REMOTE DICTS ERR"),e.sender.send("remoteDictsReply",!1)})}),a.ipcMain.on("replicate",(e,n)=>{console.log("B:REPLICATE",n);s.a.resolve(r,"pouch",n);(function(e,n){let t=y.resolve(e,"pouch",n),o=new j(t),c=["http://diglossa.org/dump-",n].join(""),r=["http://diglossa.org:5984/",n].join("");return o.load(c).then(function(){C("P: REPL DONE before sync"),o.sync(r,{live:!0,retry:!0}).on("change",F).on("error",O),o.dname=n,B.push(o),B.map(e=>e.dname),P(0,n)})})(r,n).then(function(n){H("B: replicate done",n),e.sender.send("replicateReply",!0)}).catch(function(n){e.sender.send("replicateReply",!1)})}),a.ipcMain.on("cleanupDB",(e,n)=>{!function(e,n){let t=y.resolve(e,"pouch");C("CLEAN UP",t);try{B=[],k.removeSync(t),k.ensureDirSync(t),R.set("cfg",[]),n(!0)}catch(e){C("ERR re-creating DBs",e),n(!1)}}(r,function(n){e.sender.send("cleanupReply",n)})})}),a.app.on("window-all-closed",()=>{a.app.quit()})}]);
//# sourceMappingURL=background.js.map