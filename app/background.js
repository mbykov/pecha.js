!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=30)}([function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("electron")},function(e,t,n){"use strict";n.d(t,"b",function(){return o}),n.d(t,"a",function(){return r});const o={tsek:"་"},r=["འི","ར","འོ","འམ","འི","ས","འང"]},function(e,t,n){"use strict";var o=n(0),r=n.n(o),c=n(5),i=n.n(c),s=n(2);console.log;const l=s.b.tsek;n.d(t,"e",function(){return C}),n.d(t,"f",function(){return k}),n.d(t,"a",function(){return _}),n.d(t,"d",function(){return W}),n.d(t,"c",function(){return R}),n.d(t,"b",function(){return M});const a=s.b.tsek;let u=new RegExp(a+"$");const p=n(4),d=n(12);let f=n(13)({gitignore:!0});n(9);const h=n(6),b=n(10);b.plugin(n(14));const g=console.log;n(7),n(15);let m=n(16),w=n(17),v="tib",E=[],x=/༈/;const y=n(18),j=new y;new y({host:"couchdb.external.service",protocol:"https",port:6984}),new y({auth:{user:"login",pass:"secret"}});function C(){return j.listDatabases().catch(function(e){g("REMOTE DICTS ERR",e)})}function k(e,t){g("REPLICATE LOCAL",t);let n=new b(t);return n.info().then(function(t){return g("REPL-BEFORE-INFO",t),n.load(e)})}function _(){let e=h.get("upath"),t=p.resolve(e,"pouch"),n=d.readdirSync(t),o=h.get("cfg")||[],c=[];return n.forEach((e,t)=>{let n=r.a.find(o,t=>t.name==e);if(n)c.push(n);else{let n={name:e,active:!0,idx:100+t};c.push(n)}}),(c=r.a.sortBy(c,"idx")).forEach((e,t)=>{e.idx=t}),h.set("cfg",c),function(e,t){E=[];let n=r.a.compact(t.map(e=>e.active?e.name:null));g("setDBNS",n),n.forEach((t,n)=>{let o=p.resolve(e,"pouch",t),r=new b(o);r.dname=t,r.weight=n,E.push(r)})}(e,c),c}function W(e){g("QUERY->",e.str);e.str.replace(x,"");let t,n=function(e){let t=e.split(l),n=4,o=e,c=(t.length,[[t]]);!function e(t,i){(function(e){let t,n,o=[];for(let r=1;r<e.length+1;r++){t=e.slice(0,r),n=e.slice(r);let c={head:t,tail:n};n.length&&o.push(c)}return o.reverse()})(t).forEach(t=>{i.push(t.head),i.push(t.tail),r.a.flatten(i).join(l)==o&&(c.push(r.a.clone(i)),i.pop()),i.length<n&&e(t.tail,i),i.pop()})}(t,[]);let i=[];return c.forEach(e=>{let t=[];e.forEach(e=>{t.push(e.join(l))}),i.push(t)}),i}(e.str),o=function(e){let t=r.a.uniq(r.a.flatten(e)),n=[];return t.forEach(e=>{s.a.forEach(t=>{let o=new RegExp(t+"$"),r=e.replace(o,"");e!=r&&n.push(r)})}),{main:t,added:n}}(n);return t=e.compound?r.a.filter(o.main,t=>t!=e.str):r.a.uniq(o.main.concat(o.added)),Promise.all(E.map(function(e){return e.allDocs({keys:t,include_docs:!0}).then(function(t){if(!t||!t.rows)throw new Error("no dbn result");let n=r.a.compact(t.rows.map(e=>e.doc)),o=r.a.flatten(r.a.compact(n.map(e=>e.docs)));return o.forEach(t=>{t.dname=e.dname,t.weight=e.weight}),o}).catch(function(e){console.log("ERR GET DBs",e)})})).then(function(t){let o=function(e,t){let n,o=function(e,t){let n,o,c=[],i=[];e.forEach(e=>{let n=[],o=!1,l=!0;e.forEach(e=>{let c=r.a.filter(t,t=>(function(e,t){if(e==t)return!0;let n=new RegExp("^"+t),o=e.replace(n,"");return!(e==o||!s.a.includes(o))})(e,t.dict));c.length&&(o=!0),c.length||(l=!1);let i={seg:e,docs:c};n.push(i)}),o&&c.push(n),l&&i.push(n)}),i.length?(n=B(i),o=!0):n=B(c);return{chains:n,full:o}}(t,e).chains;o.length>1?n=function(e){let t,n=e[0],o=[];for(let c=0;c<n.length;c++){let i=e.map(e=>e[c].seg);if(1==r.a.uniq(i).length)o.push(n[c]),t=null;else{t||(t={ambi:!0,seg:"",docs:[]},o.push(t));let n=e.map(e=>({seg:e[c].seg,docs:e[c].docs}));t.docs.push(n)}}return r.a.filter(o,e=>e.ambi).forEach(e=>{let t=e.docs[0],n=[];for(let o=0;o<t.length;o++){let t=e.docs.map(e=>e[o]);n.push(t)}e.chains=n;let o=n[0];e.seg=o.map(e=>e.seg).join(a)}),o}(o):1==o.length&&(n=o[0]);return n}(r.a.flatten(t),n);return e.chain=o,e})}function B(e){let t=r.a.max(e.map(e=>r.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length)),n=r.a.filter(e,e=>r.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=t-1),o=r.a.min(n.map(e=>e.length));return r.a.filter(n,e=>e.length==o)}let O=[],q=[],D=[];function R(e){g("LOCAL",e),e=p.resolve(__dirname,e);let t=f.readdirSync("**/*.tib*",{cwd:e}),n=function(e,t){let n=[],o={};return t.forEach(t=>{let c=p.resolve(e,t),s=d.readFileSync(c,"utf8").trim().split("\n");(s=r.a.compact(s)).forEach((e,t)=>{let r=function(e){let t=e.trim();return t=t.trim().replace(/\.$/,"")}(e);i()(r,v).forEach(e=>{e.forEach(e=>{e.lang==v&&e.text.split(" ").forEach(e=>{e=e.replace(u,""),o[e]||(n.push(e),o[e]=!0)})})})})}),n}(e,t=r.a.uniq(t));g("WFS",n.length);let o=n.map(e=>({str:e}));o=o.slice(0,3),g("QS2",o),S(o)}function S(e){let t=m.from.obj(e),n=m.to.obj(T,F),o=m.through.obj(function(e,t,n){W(e).then(function(e){n(null,e)})});m.pipe(t,o,n,function(e){if(e)return console.error("Copy error!",e);console.log("Copied successfully")})}function T(e,t,n){if(g("_dbres_:",e),!e.chain)return n();e.chain.forEach(e=>{e.docs.length?O.push(e.seg):D.push(e.seg)}),n()}function F(e){if(D=r.a.uniq(D),O=r.a.uniq(O),q.length==O.length)return g("__VERY END__",O);if(q.length=O.length,g("FLUSH: DICTS",O.length,"QS",D),D.length){S(D.map(e=>({str:e})))}else g("____THE END____")}function M(e){g("IMPORT CSV",e),d.createReadStream(e).pipe(w()).on("data",console.log)}},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o;(o=n(11))&&o.__esModule;var r=n(0),c=(console.log,n(7)("app"),{zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ' ]+)"});t.default=function(e,t){var n=new RegExp(c[t]);if(n.test(e)){var o=e.trim().replace(/᾽/g,"'"),i=o.split("'").join("");if(n.test(i)){var s=new RegExp("([.,!:;·།])"),l=o.replace(/\r?\n+/,"\n").split("\n"),a=(l.map(function(e){return e.split(s)}),[]);return l.forEach(function(e){var o=[];e.split(s).forEach(function(e){if(s.test(e)){var c={text:e,punct:!0};o.push(c)}else{var i=e.split(n);(i=r.compact(i)).forEach(function(e){if(e=e.trim()){var r={text:e};!!n.test(e)&&(r.lang=t),o.push(r)}})}}),a.push(o)}),a}}}},function(e,t){e.exports=require("electron-settings")},function(e,t){e.exports=require("debug")},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(e,t){e.exports=require("electron-is-dev")},function(e,t){e.exports=require("pouchdb")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=function(){return"new message"}},function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("glob-fs")},function(e,t){e.exports=require("pouchdb-load")},function(e,t){e.exports=require("highland")},function(e,t){e.exports=require("mississippi")},function(e,t){e.exports=require("csv2")},function(e,t){e.exports=require("node-couchdb")},,,,function(e,t){e.exports=require("url")},,function(e){e.exports={name:"pecha.js",productName:"Pecha.js",description:"Starter for your Electron application",version:"0.1.0",private:!0,author:"Mr. Gumby <mr.gumby@example.com>",copyright:"© 2017, Gumby inc.",homepage:"http://example.com",main:"app/background.js",build:{appId:"com.example.electron-boilerplate",files:["app/**/*","node_modules/**/*","package.json"],directories:{buildResources:"resources"},publish:null},scripts:{postinstall:"electron-builder install-app-deps",preunit:"webpack --config=build/webpack.unit.config.js --env=test --display=none",unit:"electron-mocha temp/specs.js --renderer --require source-map-support/register",pree2e:"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",e2e:"mocha temp/e2e.js --require source-map-support/register",test:"npm run unit && npm run e2e",start:"node build/start.js",release:"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder"},dependencies:{axios:"^0.18.0",cholok:"^0.1.5",csv2:"^0.1.1",curl:"^0.1.4",debug:"^4.1.1","directory-tree":"^2.1.0","electron-clipboard-extended":"^1.1.1","electron-is-dev":"^1.0.1","electron-settings":"^3.2.0","file-loader":"^2.0.0","franc-all":"^5.0.0","fs-extra":"^7.0.1","fs-jetpack":"^2.2.0","git-clone":"^0.1.0",glob:"^7.1.3","glob-fs":"^0.1.7",highland:"^2.13.3",json5:"^2.1.0",lodash:"^4.17.11",memorystream:"^0.3.1",mississippi:"^3.0.0",mousetrap:"^1.6.2","node-couchdb":"^1.3.0",pouchdb:"^7.0.0","pouchdb-authentication":"^1.1.3","pouchdb-find":"^7.0.0","pouchdb-load":"^1.4.6","pouchdb-quick-search":"^1.3.0","pouchdb-replication-stream":"^1.2.9","readable-stream":"^3.2.0",slash:"^2.0.0","split.js":"^1.4.0",textract:"^2.4.0",through2:"^3.0.1"},devDependencies:{"@babel/core":"^7.1.2","@babel/preset-env":"^7.1.0","babel-loader":"^8.0.4","babel-plugin-transform-object-rest-spread":"^7.0.0-beta.3",chai:"^4.2.0","css-loader":"^0.28.7",electron:"4.0.4","electron-builder":"^20.38.5","electron-mocha":"^6.0.4",mocha:"^5.2.0","source-map-support":"^0.5.9",spectron:"^4.0.0","style-loader":"^0.23.0","friendly-errors-webpack-plugin":"^1.7.0",webpack:"^4.20.2","webpack-cli":"^3.1.2","webpack-merge":"^4.1.4","webpack-node-externals":"^1.7.2"}}},,,,,,function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),c=n(4),i=n.n(c),s=n(22),l=n.n(s),a=n(1);const u={label:"File",submenu:[{label:"Home",accelerator:"CmdOrCtrl+L",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:"Quit",accelerator:"CmdOrCtrl+Q",click:()=>{a.app.quit()}}]},p={label:"About",submenu:[{label:"About Pecha.js",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:"Code and Download",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:"License",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:"Contacts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:"Acknowledgements",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},d={label:"Dict",submenu:[{label:"Clone dicts from server",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","clonedicts")}},{label:"Arrange local dicts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","activedicts")}},{label:"Create CSV from some texts",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","localdict")}},{label:"to / form CSV",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","csv")}},{label:"Publish new dictionary (disabled)",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","publish")}},{label:"Cleanup DBs completely",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},f={label:"Help",submenu:[{label:"hot keys",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Toggle DevTools",accelerator:"Alt+CmdOrCtrl+I",click:()=>{a.BrowserWindow.getFocusedWindow().toggleDevTools()}}]};var h=n(3);var b=n(8);const g=n(6),m=console.log;if("production"!==b.name){const e=a.app.getPath("userData");a.app.setPath("userData",`${e} (${b.name})`)}a.app.on("ready",()=>{(()=>{const e=[u,d,p,f];b.name,a.Menu.setApplicationMenu(a.Menu.buildFromTemplate(e))})();let e=g.get("winBounds");e.y-=21,m("winBounds",e);const t=new a.BrowserWindow({webPreferences:{nodeIntegration:!0}});t.setBounds(e),t.loadURL(l.a.format({pathname:i.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===b.name&&t.openDevTools(),t.webContents.on("did-finish-load",()=>{let e=n(24),o=e.name,r=e.version;t.webContents.send("version",r),t.setTitle([o,"v.",r].join(" "))}),t.on("resize",function(){t.webContents.send("reload")}),t.on("close",()=>{g.set("winBounds",t.getBounds())}),a.globalShortcut.register("CommandOrControl+Shift+R",()=>t.reload());const o=a.app.getAppPath(),c=a.app.getPath("userData");g.set("apath",o),g.set("upath",c),Object(h.a)(),a.ipcMain.on("replicate",(e,t)=>{console.log("B:REPLICATE",t);let n=i.a.resolve(c,"pouch",t),o=["http://localhost:3000/api",t].join("/");Object(h.f)(o,n).then(function(t){console.log("Hooray the stream replication is complete!",t),Object(h.a)(),e.sender.send("replicateOK",t)}).catch(function(e){console.log("oh no an error",e)})}),a.ipcMain.on("queryDBs",(e,t)=>{Object(h.d)(t).then(function(t){e.sender.send("replayDBs",t)})}),a.ipcMain.on("importcsv",(e,t)=>{Object(h.b)(t)}),a.ipcMain.on("queryLocalDict",(e,t)=>{Object(h.c)(t)}),a.ipcMain.on("remoteDicts",(e,t)=>{m("B: REMOTE DICTS START"),Object(h.e)().then(function(t){m("REMOTE DICTS",t),t=r.a.filter(t,e=>"_"!=e[0]),e.sender.send("remoteDictsReply",t)})})}),a.app.on("window-all-closed",()=>{a.app.quit()})}]);
//# sourceMappingURL=background.js.map