!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=30)}([function(e,n){e.exports=require("electron")},function(e,n){e.exports=require("lodash")},function(e,n,t){"use strict";t.d(n,"b",function(){return o}),t.d(n,"a",function(){return r});const o={tsek:"་"},r=["འི","ར","འོ","འམ","འི","ས","འང"]},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("electron-settings")},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o;(o=t(8))&&o.__esModule;var r=t(1),s=(console.log,t(7)("app"),{zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ' ]+)"});n.default=function(e,n){var t=new RegExp(s[n]);if(t.test(e)){var o=e.trim().replace(/᾽/g,"'"),c=o.split("'").join("");if(t.test(c)){var i=new RegExp("([.,!:;·།])"),l=o.replace(/\r?\n+/,"\n").split("\n"),a=(l.map(function(e){return e.split(i)}),[]);return l.forEach(function(e){var o=[];e.split(i).forEach(function(e){if(i.test(e)){var s={text:e,punct:!0};o.push(s)}else{var c=e.split(t);(c=r.compact(c)).forEach(function(e){if(e=e.trim()){var r={text:e};!!t.test(e)&&(r.lang=n),o.push(r)}})}}),a.push(o)}),a}}}},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(e,n){e.exports=require("debug")},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default=function(){return"new message"}},function(e,n){e.exports=require("electron-is-dev")},function(e,n){e.exports=require("pouchdb")},,,,function(e,n){e.exports=require("url")},,function(e,n){e.exports=require("request")},function(e,n){e.exports=require("fs-extra")},function(e,n){e.exports=require("glob-fs")},function(e,n){e.exports=require("pouchdb-load")},function(e,n){e.exports=require("highland")},function(e,n){e.exports=require("mississippi")},function(e,n){e.exports=require("csv2")},function(e,n){e.exports=require("node-couchdb")},function(e){e.exports={name:"pecha.js",productName:"Pecha.js",description:"Starter for your Electron application",version:"0.1.0",private:!0,author:"Mr. Gumby <mr.gumby@example.com>",copyright:"© 2017, Gumby inc.",homepage:"http://example.com",main:"app/background.js",build:{appId:"com.example.electron-boilerplate",files:["app/**/*","node_modules/**/*","package.json"],directories:{buildResources:"resources"},publish:null},scripts:{postinstall:"electron-builder install-app-deps",preunit:"webpack --config=build/webpack.unit.config.js --env=test --display=none",unit:"electron-mocha temp/specs.js --renderer --require source-map-support/register",pree2e:"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",e2e:"mocha temp/e2e.js --require source-map-support/register",test:"npm run unit && npm run e2e",start:"node build/start.js",release:"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder"},dependencies:{axios:"^0.18.0",cholok:"^0.1.5",csv2:"^0.1.1",curl:"^0.1.4",debug:"^4.1.1","directory-tree":"^2.1.0","electron-clipboard-extended":"^1.1.1","electron-is-dev":"^1.0.1","electron-settings":"^3.2.0","file-loader":"^2.0.0","franc-all":"^5.0.0","fs-extra":"^7.0.1","fs-jetpack":"^2.2.0","git-clone":"^0.1.0",glob:"^7.1.3","glob-fs":"^0.1.7",highland:"^2.13.3",json5:"^2.1.0",lodash:"^4.17.11",memorystream:"^0.3.1",mississippi:"^3.0.0",mousetrap:"^1.6.2","node-couchdb":"^1.3.0",pouchdb:"^7.0.0","pouchdb-authentication":"^1.1.3","pouchdb-find":"^7.0.0","pouchdb-load":"^1.4.6","pouchdb-quick-search":"^1.3.0","pouchdb-replication-stream":"^1.2.9","readable-stream":"^3.2.0",request:"^2.88.0",slash:"^2.0.0","split.js":"^1.4.0",textract:"^2.4.0",through2:"^3.0.1"},devDependencies:{"@babel/core":"^7.1.2","@babel/preset-env":"^7.1.0","babel-loader":"^8.0.4","babel-plugin-transform-object-rest-spread":"^7.0.0-beta.3",chai:"^4.2.0","css-loader":"^0.28.7",electron:"4.0.4","electron-builder":"^20.38.5","electron-mocha":"^6.0.4",mocha:"^5.2.0","source-map-support":"^0.5.9",spectron:"^4.0.0","style-loader":"^0.23.0","friendly-errors-webpack-plugin":"^1.7.0",webpack:"^4.20.2","webpack-cli":"^3.1.2","webpack-merge":"^4.1.4","webpack-node-externals":"^1.7.2"}}},,,,,,function(e,n,t){"use strict";t.r(n);var o=t(1),r=t.n(o),s=t(3),c=t.n(s),i=t(14),l=t.n(i),a=t(0);const u={label:"File",submenu:[{label:"Home",accelerator:"CmdOrCtrl+L",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:"Quit",accelerator:"CmdOrCtrl+Q",click:()=>{a.app.quit()}}]},p={label:"About",submenu:[{label:"About Pecha.js",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:"Code and Download",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:"License",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:"Contacts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:"Acknowledgements",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},d={label:"Dict",submenu:[{label:"Clone dicts from server",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","clonedicts")}},{label:"Arrange local dicts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","activedicts")}},{label:"Create CSV from some texts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","localdict")}},{label:"Import form CSV",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","csv")}},{label:"Publish new dictionary (disabled)",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","publish")}},{label:"Cleanup DBs completely",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},f={label:"Help",submenu:[{label:"hot keys",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Toggle DevTools",accelerator:"Alt+CmdOrCtrl+I",click:()=>{a.BrowserWindow.getFocusedWindow().toggleDevTools()}}]};var h=t(5),g=t.n(h),b=t(2);console.log;const m=b.b.tsek;const w=b.b.tsek;let v=new RegExp(w+"$");t(16);const y=t(3),E=t(17);let x=t(18)({gitignore:!0});t(9);const C=t(4),k=t(10);k.plugin(t(19));const j=console.log;t(7),t(20);let _=t(21),D=(t(22),"tib"),B=[],q=/༈/;const R=t(23),S=(new R,new R({host:"diglossa.org",protocol:"http",port:5984,auth:{user:"guest",pass:"guest"}}));function W(e,n){let t=y.resolve(e,"pouch",n),o=new k(t),r=["http://diglossa.org/dump-",n].join(""),s=["http://diglossa.org:5984/",n].join("");return j("REPLICATE START",t,s),o.load(r).then(function(){j("P: REPL DONE before sync"),o.sync(s,{live:!0,retry:!0}).on("change",P).on("error",M),B.push(o);let e=function(e,n,t){let o=C.get("cfg")||[];if(!n)return o;let r={dname:n,sync:t,active:!0,idx:o.length};return o.push(r),C.set("cfg",o),j("== setCFG ==",o),o}(0,n,s);j("P: REPL __COMPLETE__, new cfg",e)})}function P(e){j("onSyncChange",e)}function M(){j("onSyncError")}function F(e){e.str.replace(q,"");let n,t=function(e){let n=e.split(m),t=4,o=e,s=(n.length,[[n]]);!function e(n,c){(function(e){let n,t,o=[];for(let r=1;r<e.length+1;r++){n=e.slice(0,r),t=e.slice(r);let s={head:n,tail:t};t.length&&o.push(s)}return o.reverse()})(n).forEach(n=>{c.push(n.head),c.push(n.tail),r.a.flatten(c).join(m)==o&&(s.push(r.a.clone(c)),c.pop()),c.length<t&&e(n.tail,c),c.pop()})}(n,[]);let c=[];return s.forEach(e=>{let n=[];e.forEach(e=>{n.push(e.join(m))}),c.push(n)}),c}(e.str),o=function(e){let n=r.a.uniq(r.a.flatten(e)),t=[];return n.forEach(e=>{b.a.forEach(n=>{let o=new RegExp(n+"$"),r=e.replace(o,"");e!=r&&t.push(r)})}),{main:n,added:t}}(t);n=e.compound?r.a.filter(o.main,n=>n!=e.str):r.a.uniq(o.main.concat(o.added));let s=B.map(e=>e.dname);return j("QUERY DNAMES",s),Promise.all(B.map(function(e){return e.allDocs({keys:n,include_docs:!0}).then(function(n){if(!n||!n.rows)throw new Error("no dbn result");let t=r.a.compact(n.rows.map(e=>e.doc)),o=r.a.flatten(r.a.compact(t.map(e=>e.docs)));return o.forEach(n=>{n.dname=e.dname,n.weight=e.weight}),o}).catch(function(e){console.log("ERR GET DBs",e)})})).then(function(n){let o=function(e,n){let t,o=function(e,n){let t,o,s=[],c=[];e.forEach(e=>{let t=[],o=!1,i=!0;e.forEach(e=>{let s=r.a.filter(n,n=>(function(e,n){if(e==n)return!0;let t=new RegExp("^"+n),o=e.replace(t,"");return!(e==o||!b.a.includes(o))})(e,n.dict));s.length&&(o=!0),s.length||(i=!1);let c={seg:e,docs:s};t.push(c)}),o&&s.push(t),i&&c.push(t)}),c.length?(t=T(c),o=!0):t=T(s);return{chains:t,full:o}}(n,e).chains;o.length>1?t=function(e){let n,t=e[0],o=[];for(let s=0;s<t.length;s++){let c=e.map(e=>e[s].seg);if(1==r.a.uniq(c).length)o.push(t[s]),n=null;else{n||(n={ambi:!0,seg:"",docs:[]},o.push(n));let t=e.map(e=>({seg:e[s].seg,docs:e[s].docs}));n.docs.push(t)}}return r.a.filter(o,e=>e.ambi).forEach(e=>{let n=e.docs[0],t=[];for(let o=0;o<n.length;o++){let n=e.docs.map(e=>e[o]);t.push(n)}e.chains=t;let o=t[0];e.seg=o.map(e=>e.seg).join(w)}),o}(o):1==o.length&&(t=o[0]);return t}(r.a.flatten(n),t);return e.chain=o,e})}function T(e){let n=r.a.max(e.map(e=>r.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length)),t=r.a.filter(e,e=>r.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=n-1),o=r.a.min(t.map(e=>e.length));return r.a.filter(t,e=>e.length==o)}let O=[],A=[],L=[];function I(e){j("LOCAL",e),e=y.resolve(__dirname,e);let n=x.readdirSync("**/*.tib*",{cwd:e}),t=function(e,n){let t=[],o={};return n.forEach(n=>{let s=y.resolve(e,n),c=E.readFileSync(s,"utf8").trim().split("\n");(c=r.a.compact(c)).forEach((e,n)=>{let r=function(e){let n=e.trim();return n=n.trim().replace(/\.$/,"")}(e);g()(r,D).forEach(e=>{e.forEach(e=>{e.lang==D&&e.text.split(" ").forEach(e=>{e=e.replace(v,""),o[e]||(t.push(e),o[e]=!0)})})})})}),t}(e,n=r.a.uniq(n));j("WFS",t.length);let o=t.map(e=>({str:e}));o=o.slice(0,3),j("QS2",o),N(o)}function N(e){let n=_.from.obj(e),t=_.to.obj(Q,$),o=_.through.obj(function(e,n,t){F(e).then(function(e){t(null,e)})});_.pipe(n,o,t,function(e){if(e)return console.error("Copy error!",e);console.log("Copied successfully")})}function Q(e,n,t){if(j("_dbres_:",e),!e.chain)return t();e.chain.forEach(e=>{e.docs.length?O.push(e.seg):L.push(e.seg)}),t()}function $(e){if(L=r.a.uniq(L),O=r.a.uniq(O),A.length==O.length)return j("__VERY END__",O);if(A.length=O.length,j("FLUSH: DICTS",O.length,"QS",L),L.length){N(L.map(e=>({str:e})))}else j("____THE END____")}let G="ཀ",H="￰";var U=t(6);const V=t(4),z=console.log;if("production"!==U.name){const e=a.app.getPath("userData");a.app.setPath("userData",`${e} (${U.name})`)}a.app.on("ready",()=>{(()=>{const e=[u,d,p,f];U.name,a.Menu.setApplicationMenu(a.Menu.buildFromTemplate(e))})();const e=new a.BrowserWindow({webPreferences:{nodeIntegration:!0}});let n=V.get("winBounds")||e.getBounds();n.y-=21,z("winBounds",n),e.setBounds(n),e.loadURL(l.a.format({pathname:c.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===U.name&&e.openDevTools(),e.webContents.on("did-finish-load",()=>{let n=t(24),o=n.name,r=n.version;e.webContents.send("version",r),e.setTitle([o,"v.",r].join(" "))}),e.on("resize",function(){e.webContents.send("reload")}),e.on("close",()=>{V.set("winBounds",e.getBounds())}),a.globalShortcut.register("CommandOrControl+Shift+R",()=>e.reload());const o=a.app.getAppPath(),s=a.app.getPath("userData");V.set("apath",o),V.set("upath",s),function(e){let n=y.resolve(e,"pouch");E.ensureDirSync(n);let t=C.get("cfg");j("setting dbs, cfg",t),B=[],t.forEach((n,t)=>{if(!n.active)return;let o=y.resolve(e,"pouch",n.dname),r=new k(o);r.dname=n.dname,r.weight=t,B.push(r)}),j("DBS ok")}(s),a.ipcMain.on("queryDBs",(e,n)=>{F(n).then(function(n){e.sender.send("replayDBs",n)})}),a.ipcMain.on("importcsv",(e,n)=>{}),a.ipcMain.on("export-to-csv",(e,n)=>{(function(e){j("export to CSV",e);let n=r.a.find(B,n=>n.dname==e);return j("export DB",n.dname),n.allDocs({include_docs:!0,startkey:G,endkey:H}).then(function(n){let t=C.get("upath"),o=n.rows.map(e=>e.doc),s="";o.forEach(e=>{let n=e._id,t=e.docs.map(e=>e.trns),o=r.a.flatten(t).join(";"),c=[n,o.split(",").length>1?JSON.stringify(o):o].join(",");c=[c,"\n"].join(""),s+=c});let c=[e,"csv"].join("."),i=y.resolve(t,c);E.writeFile(i,s,function(e){return console.log("The file was saved!"),!0})})})(n).then(function(n){n&&z("DOCS",n),e.sender.send("csvReply",!0)}).catch(function(n){console.log("ERR",n),e.sender.send("csvReply",!1)})}),a.ipcMain.on("queryLocalDict",(e,n)=>{I(n)}),a.ipcMain.on("remoteDicts",(e,n)=>{S.listDatabases().catch(function(e){throw j("REMOTE DICTS ERR",e),new Error(e)}).then(function(n){z("B: REMOTE DICTS:",n),n=r.a.filter(n,e=>"_"!=e[0]),e.sender.send("remoteDictsReply",n)}).catch(function(n){e.sender.send("remoteDictsReply",!1)})}),a.ipcMain.on("replicate",(e,n)=>{console.log("B:REPLICATE",n);c.a.resolve(s,"pouch",n);W(s,n).then(function(n){z("B: replicate done",n),e.sender.send("replicateReply",!0)}).catch(function(n){e.sender.send("replicateReply",!1)})}),a.ipcMain.on("cleanupDB",(e,n)=>{!function(e){let n=y.resolve(e,"pouch");j("CLEAN UP",n);try{E.removeSync(n),E.ensureDirSync(n),C.set("cfg",[])}catch(e){j("ERR re-creating DBs",e)}}(s)})}),a.app.on("window-all-closed",()=>{a.app.quit()})}]);
//# sourceMappingURL=background.js.map