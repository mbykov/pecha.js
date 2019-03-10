!function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=30)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("lodash")},function(e,t,n){"use strict";n.d(t,"b",function(){return i}),n.d(t,"a",function(){return s});const i={tsek:"་"},s=["འི","ར","འོ","འམ","འི","ས","འང"]},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("electron-settings")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(1),s=console.log,r=(n(7)("app"),{zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ' ]+)"});t.default=function(e,t){var n=new RegExp(r[t]);if(n.test(e)){s("__________");var o=e.trim().replace(/᾽/g,"'"),c=o.split("'").join("");if(n.test(c)){var a=new RegExp("([.,!:;·།])"),d=o.replace(/\r?\n+/,"\n").split("\n"),l=(d.map(function(e){return e.split(a)}),[]);return d.forEach(function(e){var s=[];e.split(a).forEach(function(e){if(a.test(e)){var r={text:e,punct:!0};s.push(r)}else{var o=e.split(n);(o=i.compact(o)).forEach(function(e){if(e=e.trim()){var i={text:e};!!n.test(e)&&(i.lang=t),s.push(i)}})}}),l.push(s)}),s("__________",l),l}}}},,function(e,t){e.exports=require("debug")},function(e,t){e.exports=require("electron-is-dev")},function(e,t){e.exports=require("pouchdb")},function(e,t){e.exports=require("cholok")},function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},,,,,,,,,,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("pouchdb-authentication")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},,function(e,t,n){"use strict";n.r(t);var i=n(1),s=n.n(i),r=n(0);n(24);function o(e){return document.querySelector(e)}function c(e){return document.querySelectorAll(e)}function a(e,t){let n=document.createElement(e);return t&&n.classList.add(t),n}function d(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}function l(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}function u(e){return e.getBoundingClientRect()}function p(e,t){let n=[e.top,"px"].join(""),i=[e.left,"px"].join("");t.style.top=n,t.style.left=i}function f(){return[].slice.call(document.querySelectorAll(":hover")).pop()}var h=n(14),g=n.n(h),m=n(10),v=n.n(m),b=n(2);const x=n(0).remote.require("electron-settings");let C=b.b.tsek;const y=console.log;function L(e){let t=e.pars,n=o("#source"),i=o("#result");l(n),l(i),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=d(e.text);e.lang?n.classList.add("tibphrase"):e.punct?n.classList.add("punct"):n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});c("span.tibetan")}function E(e,t){let n=u(e),i=t?v()(e.textContent,!0):v()(e.textContent),s={top:n.top-40,left:n.left+15},r=o("#transcript");r.textContent=i,r.classList.remove("is-hidden"),p(s,r)}function _(e,t){let n;try{n=JSON.parse(e.dataset.chains)}catch(t){return void y("ERR: JSON chains",e)}let i=!e.closest(".tibpar"),s=function(e,t){let n;t?((n=a("div","popup")).classList.add("upper"),document.body.appendChild(n)):n=o("#ambi");let i=u(e);l(n),n.classList.remove("is-hidden"),p({top:i.bottom-3,left:i.left},n);let s=a("ul","ambilist");return n.appendChild(s),s}(e,i);t?function(e,t){t.forEach(t=>{let n,i=a("li","ambiline");e.appendChild(i),t.ambi?(n=d(t.seg,"tibambi")).dataset.chains=JSON.stringify(t.chains):t.docs.length?(n=d(t.seg,"tibwf")).dataset.docs=JSON.stringify(t.docs):n=d(t.seg,"tibphrase"),i.appendChild(n)})}(s,n):function(e,t){e.classList.add("danger"),t.forEach(t=>{let n=a("li","ambiline");e.appendChild(n),t.forEach(e=>{let t=e.docs.length?d(e.seg,"tibwf"):d(e.seg,"tibphrase");e.docs.length&&(t.dataset.docs=JSON.stringify(e.docs)),n.appendChild(t)})})}(s,n)}function R(e,t){o("#progress").classList.remove("is-hidden");let n=e.textContent.trim(),i=new RegExp(C+"$"),c={str:n.replace(i,""),compound:t,lastsek:s.a.last(n)==C};r.ipcRenderer.send("queryDBs",c)}r.ipcRenderer.on("replayDBs",function(e,t){o("#progress").classList.add("is-hidden");let n=t.chain,i=f();n&&(t.compound?(i.dataset.chains=JSON.stringify(n),_(i,!0)):function(e,t,n){e&&(e.textContent="",t.forEach((n,i)=>{let s;n.ambi?(s=d(n.seg,"tibambi")).dataset.chains=JSON.stringify(n.chains):n.docs.length?(s=d(n.seg,"tibwf")).dataset.docs=JSON.stringify(n.docs):s=d(n.seg,"tibphrase"),e.appendChild(s),i<t.length-1&&e.appendChild(d(C,"tsek"))}),n&&e.appendChild(d(C,"tsek")))}(i,n,t.lastsek))});console.log;const S=n(4);function q(e){let t=o("#cloneERR"),n=o("#progress");e?n.classList.add("is-hidden"):t.classList.remove("is-hidden")}function w(){let e=S.get("cfg"),t=e.map(e=>e.name),n=o("#adictmessage");t.length&&(n.textContent="click dict's name to move it first");let i=o("#local-dicts-table tbody");l(i),e.forEach(e=>{let t=e.dname,n=a("tr");i.appendChild(n);let r=a("td","dictname");n.appendChild(r),r.textContent=s.a.capitalize(t),r.dataset.firstdict=t;let o=a("td","active-dict");if(e.active){let e=O();o.appendChild(e)}else o.textContent="activate";o.dataset.activedict=t,n.appendChild(o);let c=a("td","dictcsv");c.textContent="toCSV",c.dataset.csv=t,n.appendChild(c)})}function O(){let e=a("img","dict-check");return e.setAttribute("src","../resources/check.png"),e}r.ipcRenderer.on("remoteDictsReply",function(e,t){q(t),function(e){let t=S.get("cfg"),n=["_users"],i=t.map(e=>e.dname),r=s.a.uniq(n.concat(i)),c=o("#server-dicts-table tbody");l(c),e.forEach(e=>{if(n.includes(e.dname))return;let t=a("tr");c.appendChild(t);let i=a("td");t.appendChild(i),i.textContent=s.a.capitalize(e.dname);let o=a("td","dsize");o.textContent=s.a.capitalize(e.size),t.appendChild(o);let d=a("td","link");if(r.includes(e.dname)){let e=O();d.appendChild(e)}else d.textContent="sync";d.dataset.clone=e.dname,t.appendChild(d)})}(t)}),r.ipcRenderer.on("replicateReply",function(e,t){q(t);I({section:"activedicts"})}),r.ipcRenderer.on("csvReply",function(e,t){q(t);I({section:"activedicts"})}),r.ipcRenderer.on("cleanupReply",function(e,t){q(t);I({section:"clonedicts"})});const N=n(3),j=(n(4),console.log),k=n(9);k.plugin(n(25));const z=r.remote.app,D=(z.getAppPath(),z.getPath("userData")),J=console.log,P=(n(11),n(0).remote.require("electron-settings")),K=n(26),{getCurrentWindow:A}=(n(3),n(12),n(0).remote);let B,T=[],M=0;function I(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){J("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),function(e){U(),o(["#",e].join("")).classList.remove("is-hidden")}(e.section),e.old||(e.old=!1,delete e.old,T.push(e),M=T.length-1),"main"==t?(function(e){let t=P.get("split-sizes")||[50,50];B&&e.mono?B.collapse(1):B&&B.setSizes(t),B||(P.set("split-sizes",t),B=g()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){P.set("split-sizes",e),A().reload()}}),e.mono&&B.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),L(e)):"clonedicts"==t?r.ipcRenderer.send("remoteDicts",""):"activedicts"==t&&w(),o("#progress").classList.add("is-hidden"),P.set("state",e)}function U(){const e=document.querySelectorAll(".section");Array.prototype.forEach.call(e,e=>{e.classList.add("is-hidden")}),o("#transcript").classList.add("is-hidden"),o("#ambi").classList.add("is-hidden")}K.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(M<=0)return;M--;let e=T[M];e.old=!0,U(),I(e)}():39==e.which&&function(){if(M>=T.length-1)return;M++;let e=T[M];e.old=!0,U(),I(e)}()}),K.bind(["alt+1","alt+2"],function(e){}),K.bind(["esc"],function(e){}),K.bind(["ctrl+d"],function(e){r.ipcRenderer.send("queryLocalDict","/home/michael/diglossa.texts/Tibetan")}),K.bind(["ctrl+j"],function(e){let t="/home/michael/tibetan/utils/csv/csvdict.json";J("IMPORT",t),r.ipcRenderer.send("importcsv",t)}),K.bind(["ctrl+i"],function(e){r.ipcRenderer.send("infoDB","csvdict")}),K.bind(["ctrl+v"],function(e){r.ipcRenderer.send("infoDB","vasilyev")}),K.bind(["ctrl+u"],function(e){J("CLICK SIGNUP"),function(e){let t=new k("http://localhost:5984/mydb",{skip_setup:!0}),n=N.resolve(e,"pouch","auth");new k(n).sync(t,{live:!0,retry:!0}).on("error",console.log.bind(console)),t.signUp("batman","brucewayne",function(e,t){e&&("conflict"===e.name||e.name)}).then(function(e){j("SIGNUP RES",e)})}(D)});var W=n(5),F=n.n(W);n.d(t,"scrollPane",function(){return Z});const G=n(0).remote.require("electron-settings"),V=(n(27),n(28),n(12),console.log),Y=(n(3),n(11)),{dialog:$,getCurrentWindow:H}=n(0).remote;n(8);o("#new-version");let Q=o("#container");c('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");Q.appendChild(t.cloneNode(!0))}),r.ipcRenderer.on("section",function(e,t){I({section:t})}),r.ipcRenderer.on("reread",function(e){let t=G.get("state");H().reload(),I(t)});let X=G.get("state");function Z(e,t){if(1==e.shiftKey)return;let n=e.deltaY>0?24:-24;o(".section.is-shown").scrollTop+=n}function ee(e){V("FNS",e)}function te(e){if(!e)return;let t=e[0];t&&r.ipcRenderer.send("import-from-csv",t)}X||(X={section:"home"}),I(X),document.addEventListener("click",e=>{let t=o("#progress"),n=e.target.dataset;if(!n)return;let i=e.target.parentElement;if(e.target.classList.contains("external")){let t=e.target.textContent;r.shell.openExternal(t)}else n.section?I({section:n.section}):n.clone?(t.classList.remove("is-hidden"),r.ipcRenderer.send("replicate",n.clone)):n.firstdict?function(e){let t=S.get("cfg"),n=s.a.find(t,t=>t.dname==e),i=s.a.reject(t,t=>t.dname==e);i.unshift(n),(t=i).forEach((e,t)=>{e.idx=t}),S.set("cfg",t),w()}(n.firstdict):n.activedict?function(e){let t=S.get("cfg"),n=s.a.find(t,t=>t.dname==e.dataset.activedict),i=O();e.textContent?(e.textContent="",e.appendChild(i),n.active=!0):(l(e),e.textContent="activate",n.active=!1),S.set("cfg",t)}(e.target):n.csv?(t.classList.remove("is-hidden"),r.ipcRenderer.send("export-to-csv",n.csv)):i&&i.dataset&&i.dataset.activedict?V("activateDict(parent)_______"):"cleanupdb"==e.target.id?r.ipcRenderer.send("cleanupDB"):"scandir"==e.target.id?$.showOpenDialog({properties:["openDirectory"]},ee):"importcsv"==e.target.id?$.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]},te):n.docs&&R(e.target,!0)}),document.addEventListener("mouseover",function(e){if(!e.target.textContent)return;if(1==e.ctrlKey)return;e.target.closest(".tibpar")&&c(".popup").forEach(e=>{e.classList.add("is-hidden")}),e.target.classList.contains("tibphrase")?1==e.shiftKey||R(e.target):e.target.classList.contains("tibwf")?function(e){o("#source");let t=o("#result");l(t);let n=e.textContent,i=JSON.parse(e.dataset.docs);try{i=JSON.parse(e.dataset.docs)}catch(e){return void y("ERR: JSON docs",e)}let r=x.get("cfg");i.forEach(e=>{e.weight=s.a.find(r,t=>e.dname==t.dname).idx}),i=s.a.sortBy(i,"weight");let c=a("div","dict");t.appendChild(c);let d=a("p","dict-wf");d.textContent=n,c.appendChild(d),i.forEach(e=>{let t=a("p","dict-dname");t.textContent=e.dname,c.appendChild(t);let n=a("p","dict-article");n.textContent=e.dict,c.appendChild(n);let i=a("ul","dict-ul");c.appendChild(i),e.trns||y("NO TRNS",e),e.trns&&e.trns.forEach(e=>{let t=a("li","dict-line");t.textContent=e,i.appendChild(t)})})}(e.target):e.target.classList.contains("tibambi")&&_(e.target)},!1),document.addEventListener("mouseleave",function(e){if(e.target.classList&&1!=e.ctrlKey&&e.target.classList.contains("tibphrase")){o("#transcript").classList.add("is-hidden")}},!1),document.addEventListener("keyup",function(e){if(1==e.ctrlKey)return;o("#transcript").classList.add("is-hidden")},!1),document.addEventListener("keydown",function(e){if(1!=e.shiftKey)return;let t=f();t&&("source"==t.id&&(t=o(".tibpar")),E(t),1==e.ctrlKey&&E(t,!0))},!1),document.addEventListener("wheel",function(e){Z(e,X)},!1),Y.on("text-changed",()=>{let e=Y.readText(),t=F()(e,"tib");t&&t.length&&I({section:"main",pars:t})}).startWatching()}]);
//# sourceMappingURL=app.js.map