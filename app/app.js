!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=31)}([function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("electron")},function(e,t,n){"use strict";n.d(t,"b",function(){return i}),n.d(t,"a",function(){return o});const i={tsek:"་"},o=["འི","ར","འོ","འམ","འི","ས","འང"]},function(e,t,n){"use strict";var i=n(0),o=n.n(i),r=n(5),s=n.n(r),c=n(2);console.log;const a=c.b.tsek;n.d(t,"e",function(){return S}),n.d(t,"f",function(){return L}),n.d(t,"a",function(){return q}),n.d(t,"d",function(){return R}),n.d(t,"c",function(){return D}),n.d(t,"b",function(){return T});const l=c.b.tsek;let u=new RegExp(l+"$");const d=n(4),p=n(12);let f=n(13)({gitignore:!0});n(9);const h=n(6),g=n(10);g.plugin(n(14));const m=console.log;n(7),n(15);let b=n(16),v=n(17),x="tib",E=[],C=/༈/;const y=n(18),w=new y;new y({host:"couchdb.external.service",protocol:"https",port:6984}),new y({auth:{user:"login",pass:"secret"}});function S(){return w.listDatabases().catch(function(e){m("REMOTE DICTS ERR",e)})}function L(e,t){m("REPLICATE LOCAL",t);let n=new g(t);return n.info().then(function(t){return m("REPL-BEFORE-INFO",t),n.load(e)})}function q(){let e=h.get("upath"),t=d.resolve(e,"pouch"),n=p.readdirSync(t),i=h.get("cfg")||[],r=[];return n.forEach((e,t)=>{let n=o.a.find(i,t=>t.name==e);if(n)r.push(n);else{let n={name:e,active:!0,idx:100+t};r.push(n)}}),(r=o.a.sortBy(r,"idx")).forEach((e,t)=>{e.idx=t}),h.set("cfg",r),function(e,t){E=[];let n=o.a.compact(t.map(e=>e.active?e.name:null));m("setDBNS",n),n.forEach((t,n)=>{let i=d.resolve(e,"pouch",t),o=new g(i);o.dname=t,o.weight=n,E.push(o)})}(e,r),r}function R(e){m("QUERY->",e.str);e.str.replace(C,"");let t,n=function(e){let t=e.split(a),n=4,i=e,r=(t.length,[[t]]);!function e(t,s){(function(e){let t,n,i=[];for(let o=1;o<e.length+1;o++){t=e.slice(0,o),n=e.slice(o);let r={head:t,tail:n};n.length&&i.push(r)}return i.reverse()})(t).forEach(t=>{s.push(t.head),s.push(t.tail),o.a.flatten(s).join(a)==i&&(r.push(o.a.clone(s)),s.pop()),s.length<n&&e(t.tail,s),s.pop()})}(t,[]);let s=[];return r.forEach(e=>{let t=[];e.forEach(e=>{t.push(e.join(a))}),s.push(t)}),s}(e.str),i=function(e){let t=o.a.uniq(o.a.flatten(e)),n=[];return t.forEach(e=>{c.a.forEach(t=>{let i=new RegExp(t+"$"),o=e.replace(i,"");e!=o&&n.push(o)})}),{main:t,added:n}}(n);return t=e.compound?o.a.filter(i.main,t=>t!=e.str):o.a.uniq(i.main.concat(i.added)),Promise.all(E.map(function(e){return e.allDocs({keys:t,include_docs:!0}).then(function(t){if(!t||!t.rows)throw new Error("no dbn result");let n=o.a.compact(t.rows.map(e=>e.doc)),i=o.a.flatten(o.a.compact(n.map(e=>e.docs)));return i.forEach(t=>{t.dname=e.dname,t.weight=e.weight}),i}).catch(function(e){console.log("ERR GET DBs",e)})})).then(function(t){let i=function(e,t){let n,i=function(e,t){let n,i,r=[],s=[];e.forEach(e=>{let n=[],i=!1,a=!0;e.forEach(e=>{let r=o.a.filter(t,t=>(function(e,t){if(e==t)return!0;let n=new RegExp("^"+t),i=e.replace(n,"");return!(e==i||!c.a.includes(i))})(e,t.dict));r.length&&(i=!0),r.length||(a=!1);let s={seg:e,docs:r};n.push(s)}),i&&r.push(n),a&&s.push(n)}),s.length?(n=O(s),i=!0):n=O(r);return{chains:n,full:i}}(t,e).chains;i.length>1?n=function(e){let t,n=e[0],i=[];for(let r=0;r<n.length;r++){let s=e.map(e=>e[r].seg);if(1==o.a.uniq(s).length)i.push(n[r]),t=null;else{t||(t={ambi:!0,seg:"",docs:[]},i.push(t));let n=e.map(e=>({seg:e[r].seg,docs:e[r].docs}));t.docs.push(n)}}return o.a.filter(i,e=>e.ambi).forEach(e=>{let t=e.docs[0],n=[];for(let i=0;i<t.length;i++){let t=e.docs.map(e=>e[i]);n.push(t)}e.chains=n;let i=n[0];e.seg=i.map(e=>e.seg).join(l)}),i}(i):1==i.length&&(n=i[0]);return n}(o.a.flatten(t),n);return e.chain=i,e})}function O(e){let t=o.a.max(e.map(e=>o.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length)),n=o.a.filter(e,e=>o.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=t-1),i=o.a.min(n.map(e=>e.length));return o.a.filter(n,e=>e.length==i)}let _=[],N=[],j=[];function D(e){m("LOCAL",e),e=d.resolve(__dirname,e);let t=f.readdirSync("**/*.tib*",{cwd:e}),n=function(e,t){let n=[],i={};return t.forEach(t=>{let r=d.resolve(e,t),c=p.readFileSync(r,"utf8").trim().split("\n");(c=o.a.compact(c)).forEach((e,t)=>{let o=function(e){let t=e.trim();return t=t.trim().replace(/\.$/,"")}(e);s()(o,x).forEach(e=>{e.forEach(e=>{e.lang==x&&e.text.split(" ").forEach(e=>{e=e.replace(u,""),i[e]||(n.push(e),i[e]=!0)})})})})}),n}(e,t=o.a.uniq(t));m("WFS",n.length);let i=n.map(e=>({str:e}));i=i.slice(0,3),m("QS2",i),k(i)}function k(e){let t=b.from.obj(e),n=b.to.obj(P,J),i=b.through.obj(function(e,t,n){R(e).then(function(e){n(null,e)})});b.pipe(t,i,n,function(e){if(e)return console.error("Copy error!",e);console.log("Copied successfully")})}function P(e,t,n){if(m("_dbres_:",e),!e.chain)return n();e.chain.forEach(e=>{e.docs.length?_.push(e.seg):j.push(e.seg)}),n()}function J(e){if(j=o.a.uniq(j),_=o.a.uniq(_),N.length==_.length)return m("__VERY END__",_);if(N.length=_.length,m("FLUSH: DICTS",_.length,"QS",j),j.length){k(j.map(e=>({str:e})))}else m("____THE END____")}function T(e){m("IMPORT CSV",e),p.createReadStream(e).pipe(v()).on("data",console.log)}},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i;(i=n(11))&&i.__esModule;var o=n(0),r=(console.log,n(7)("app"),{zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ' ]+)"});t.default=function(e,t){var n=new RegExp(r[t]);if(n.test(e)){var i=e.trim().replace(/᾽/g,"'"),s=i.split("'").join("");if(n.test(s)){var c=new RegExp("([.,!:;·།])"),a=i.replace(/\r?\n+/,"\n").split("\n"),l=(a.map(function(e){return e.split(c)}),[]);return a.forEach(function(e){var i=[];e.split(c).forEach(function(e){if(c.test(e)){var r={text:e,punct:!0};i.push(r)}else{var s=e.split(n);(s=o.compact(s)).forEach(function(e){if(e=e.trim()){var o={text:e};!!n.test(e)&&(o.lang=t),i.push(o)}})}}),l.push(i)}),l}}}},function(e,t){e.exports=require("electron-settings")},function(e,t){e.exports=require("debug")},,function(e,t){e.exports=require("electron-is-dev")},function(e,t){e.exports=require("pouchdb")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=function(){return"new message"}},function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("glob-fs")},function(e,t){e.exports=require("pouchdb-load")},function(e,t){e.exports=require("highland")},function(e,t){e.exports=require("mississippi")},function(e,t){e.exports=require("csv2")},function(e,t){e.exports=require("node-couchdb")},function(e,t){e.exports=require("cholok")},function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("pouchdb-authentication")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},,function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),r=n(1);n(25);function s(e){return document.querySelector(e)}function c(e){return document.querySelectorAll(e)}function a(e,t){let n=document.createElement(e);return t&&n.classList.add(t),n}function l(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}function u(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}function d(e){return e.getBoundingClientRect()}function p(e,t){let n=[e.top,"px"].join(""),i=[e.left,"px"].join("");t.style.top=n,t.style.left=i}function f(){return[].slice.call(document.querySelectorAll(":hover")).pop()}var h=n(23),g=n.n(h),m=n(19),b=n.n(m),v=n(2);const x=n(1).remote.require("electron-settings");let E=v.b.tsek;const C=console.log;function y(e){let t=e.pars,n=s("#source"),i=s("#result");u(n),u(i),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=l(e.text);e.lang?n.classList.add("tibphrase"):e.punct?n.classList.add("punct"):n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});c("span.tibetan")}function w(e,t){let n=d(e),i=t?b()(e.textContent,!0):b()(e.textContent),o={top:n.top-40,left:n.left+15},r=s("#transcript");r.textContent=i,r.classList.remove("is-hidden"),p(o,r)}function S(e,t){let n;try{n=JSON.parse(e.dataset.chains)}catch(t){return void C("ERR: JSON chains",e)}let i=!e.closest(".tibpar"),o=function(e,t){let n;t?((n=a("div","popup")).classList.add("upper"),document.body.appendChild(n)):n=s("#ambi");let i=d(e);u(n),n.classList.remove("is-hidden"),p({top:i.bottom-3,left:i.left},n);let o=a("ul","ambilist");return n.appendChild(o),o}(e,i);t?function(e,t){t.forEach(t=>{let n,i=a("li","ambiline");e.appendChild(i),t.ambi?(n=l(t.seg,"tibambi")).dataset.chains=JSON.stringify(t.chains):t.docs.length?(n=l(t.seg,"tibwf")).dataset.docs=JSON.stringify(t.docs):n=l(t.seg,"tibphrase"),i.appendChild(n)})}(o,n):function(e,t){e.classList.add("danger"),t.forEach(t=>{let n=a("li","ambiline");e.appendChild(n),t.forEach(e=>{let t=e.docs.length?l(e.seg,"tibwf"):l(e.seg,"tibphrase");e.docs.length&&(t.dataset.docs=JSON.stringify(e.docs)),n.appendChild(t)})})}(o,n),s("#progress").classList.remove("is-shown")}function L(e,t){s("#progress").classList.add("is-shown");let n=e.textContent.trim(),i=new RegExp(E+"$"),c={str:n.replace(i,""),compound:t,lastsek:o.a.last(n)==E};r.ipcRenderer.send("queryDBs",c)}r.ipcRenderer.on("replayDBs",function(e,t){let n=t.chain,i=f();n?t.compound?(i.dataset.chains=JSON.stringify(n),S(i,!0)):function(e,t,n){e.textContent="",t.forEach((n,i)=>{let o;n.ambi?(o=l(n.seg,"tibambi")).dataset.chains=JSON.stringify(n.chains):n.docs.length?(o=l(n.seg,"tibwf")).dataset.docs=JSON.stringify(n.docs):o=l(n.seg,"tibphrase"),e.appendChild(o),i<t.length-1&&e.appendChild(l(E,"tsek"))}),n&&e.appendChild(l(E,"tsek")),s("#progress").classList.remove("is-shown")}(i,n,t.lastsek):s("#progress").classList.remove("is-shown")});var q=n(3);console.log;const R=n(6);function O(){let e=R.get("cfg"),t=(e.map(e=>e.name),s("#local-dicts-table tbody"));u(t),e.forEach(e=>{let n=e.name,i=a("tr");t.appendChild(i);let r=a("td","dictname");i.appendChild(r),r.textContent=o.a.capitalize(n),r.dataset.firstdict=n;let s=a("td","active-dict");if(e.active){let e=N();s.appendChild(e)}else s.textContent="activate";s.dataset.activedict=n,i.appendChild(s)})}function _(e){let t=R.get("cfg"),n=o.a.find(t,t=>t.name==e.dataset.activedict),i=N();e.textContent?(e.textContent="",e.appendChild(i),n.active=!0):(u(e),e.textContent="activate",n.active=!1),R.set("cfg",t)}function N(){let e=a("img","dict-check");return e.setAttribute("src","../resources/check.png"),e}r.ipcRenderer.on("remoteDictsReply",function(e,t){!function(e){let t=R.get("cfg"),n=["_users"],i=t.map(e=>e.name),r=o.a.uniq(n.concat(i)),c=s("#server-dicts-table tbody");u(c),e.forEach(e=>{if(n.includes(e))return;let t=a("tr");c.appendChild(t);let i=a("td");t.appendChild(i),i.textContent=o.a.capitalize(e);let s=a("td","link");if(r.includes(e)){let e=N();s.appendChild(e)}else s.textContent="sync";s.dataset.clone=e,t.appendChild(s)})}(t)}),r.ipcRenderer.on("replicateOK",function(e,t){U({section:"activedicts"})});const j=n(4),D=(n(6),console.log),k=n(10);k.plugin(n(26));const P=r.remote.app,J=(P.getAppPath(),P.getPath("userData")),T=console.log,z=(n(20),n(1).remote.require("electron-settings")),A=n(27),{getCurrentWindow:B}=(n(4),n(21),n(1).remote);let K,M=[],F=0;function I(){const e=document.querySelectorAll(".section.is-shown");Array.prototype.forEach.call(e,e=>{e.classList.remove("is-shown")}),s("#transcript").classList.add("is-hidden"),s("#ambi").classList.add("is-hidden")}function U(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){T("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),function(e){I(),s(["#",e].join("")).classList.add("is-shown")}(e.section),e.old||(e.old=!1,delete e.old,M.push(e),F=M.length-1);let n=s("#progress");"main"==t?(function(e){let t=z.get("split-sizes")||[50,50];K&&e.mono?K.collapse(1):K&&K.setSizes(t),K||(z.set("split-sizes",t),K=g()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){z.set("split-sizes",e),B().reload()}}),e.mono&&K.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),y(e)):"clonedicts"==t?r.ipcRenderer.send("remoteDicts",""):"activedicts"==t?O():n.classList.remove("is-shown"),z.set("state",e)}A.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(F<=0)return;F--;let e=M[F];e.old=!0,I(),U(e)}():39==e.which&&function(){if(F>=M.length-1)return;F++;let e=M[F];e.old=!0,I(),U(e)}()}),A.bind(["alt+1","alt+2"],function(e){}),A.bind(["esc"],function(e){}),A.bind(["ctrl+d"],function(e){r.ipcRenderer.send("queryLocalDict","/home/michael/diglossa.texts/Tibetan")}),A.bind(["ctrl+u"],function(e){T("CLICK SIGNUP"),function(e){let t=new k("http://localhost:5984/mydb",{skip_setup:!0}),n=j.resolve(e,"pouch","auth");new k(n).sync(t,{live:!0,retry:!0}).on("error",console.log.bind(console)),t.signUp("batman","brucewayne",function(e,t){e&&("conflict"===e.name||e.name)}).then(function(e){D("SIGNUP RES",e)})}(J)});var V=n(5),W=n.n(V);n.d(t,"scrollPane",function(){return ee});const $=n(1).remote.require("electron-settings"),G=(n(28),n(29),n(21),console.log),Q=(n(4),n(20)),{dialog:Y,getCurrentWindow:H}=n(1).remote;n(9);s("#new-version");let X=s("#container");c('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");X.appendChild(t.cloneNode(!0))}),r.ipcRenderer.on("section",function(e,t){U({section:t})}),r.ipcRenderer.on("action",function(e,t){"clonedicts"==t?U({section:"clone"}):"arrangeDicts"==t?U({section:"activedicts"}):"csv"==t?Y.showOpenDialog({properties:["openFile"],filters:[{name:"CSV",extensions:["csv"]}]},parseCSV):"cleanupdb"==t&&U({section:"clone"})}),r.ipcRenderer.on("reread",function(e){let t=$.get("state");H().reload(),U(t)});let Z=$.get("state");function ee(e,t){if(1==e.shiftKey)return;let n=e.deltaY>0?24:-24;s(".section.is-shown").scrollTop+=n}function te(e){G("FNS",e)}function ne(e){if(G("FNS",e),!e)return;let t=e[0];t&&r.ipcRenderer.send("importcsv",t)}Z||(Z={section:"home"}),U(Z),document.addEventListener("click",e=>{let t=e.target.dataset;if(!t)return;let n=e.target.parentElement;if(e.target.classList.contains("external")){let t=e.target.textContent;r.shell.openExternal(t)}else t.section?U({section:t.section}):t.clone?r.ipcRenderer.send("replicate",t.clone):t.firstdict?function(e){let t=R.get("cfg"),n=o.a.find(t,t=>t.name==e),i=o.a.reject(t,t=>t.name==e);i.unshift(n),(t=i).forEach((e,t)=>{e.idx=t}),R.set("cfg",t),Object(q.a)(),O()}(t.firstdict):t.activedict?_(e.target):n&&n.dataset&&n.dataset.activedict?_(n):"cleanupdb"==e.target.id?G("CLEAN UP DBs!"):"scandir"==e.target.id?Y.showOpenDialog({properties:["openDirectory"]},te):"importcsv"==e.target.id?Y.showOpenDialog({properties:["openDir"],filters:[{name:"CSV",extensions:["csv"]}]},ne):t.docs&&L(e.target,!0)}),document.addEventListener("mouseover",function(e){if(!e.target.textContent)return;if(1==e.ctrlKey)return;e.target.closest(".tibpar")&&c(".popup").forEach(e=>{e.classList.add("is-hidden")}),e.target.classList.contains("tibphrase")?1==e.shiftKey||L(e.target):e.target.classList.contains("tibwf")?function(e){s("#source");let t=s("#result");u(t);let n=e.textContent,i=JSON.parse(e.dataset.docs);try{i=JSON.parse(e.dataset.docs)}catch(e){return void C("ERR: JSON docs")}let r=x.get("cfg");JSON.parse(JSON.stringify(r)),i.forEach(e=>{e.weight=o.a.find(r,t=>e.dname==t.name).idx}),i=o.a.sortBy(i,"weight");let c=a("div","dict");t.appendChild(c);let l=a("p","dict-wf");l.textContent=n,c.appendChild(l),i.forEach(e=>{let t=a("p","dict-dname");t.textContent=e.dname,c.appendChild(t);let n=a("p","dict-article");n.textContent=e.dict,c.appendChild(n);let i=a("ul","dict-ul");c.appendChild(i),e.trns||C("NO TRNS",e),e.trns&&e.trns.forEach(e=>{let t=a("li","dict-line");t.textContent=e,i.appendChild(t)})})}(e.target):e.target.classList.contains("tibambi")&&S(e.target)},!1),document.addEventListener("mouseleave",function(e){if(e.target.classList&&1!=e.ctrlKey&&e.target.classList.contains("tibphrase")){s("#transcript").classList.add("is-hidden")}},!1),document.addEventListener("keyup",function(e){if(1==e.ctrlKey)return;s("#transcript").classList.add("is-hidden")},!1),document.addEventListener("keydown",function(e){if(1!=e.shiftKey)return;let t=f();"source"==t.id&&(t=s(".tibpar")),w(t),1==e.ctrlKey&&w(t,!0)},!1),document.addEventListener("wheel",function(e){ee(e,Z)},!1),Q.on("text-changed",()=>{let e=Q.readText(),t=W()(e,"tib");t&&t.length&&U({section:"main",pars:t})}).startWatching()}]);
//# sourceMappingURL=app.js.map