!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=20)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("path")},,function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},function(e,t){e.exports=require("cholok")},,,,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("curl")},function(e,t){e.exports=require("pouchdb")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("electron-is-dev")},function(e,t,n){"use strict";n.r(t);var o=n(1),i=n.n(o),s=n(0);n(13);function r(e){return document.querySelector(e)}function l(e){return document.querySelectorAll(e)}function c(e,t){let n=document.createElement(e);return t&&n.classList.add(t),n}function a(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}function d(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}function u(e){return e.getBoundingClientRect()}function p(e,t){let n=[e.top,"px"].join(""),o=[e.left,"px"].join("");t.style.top=n,t.style.left=o}var f=n(8),h=n.n(f),g=n(9),m=n.n(g);const b="་",x=["འི","ར","འོ","འམ","འི","ས","འང"];let E=b;const C=console.log;function v(e){if(!e||!e.pars||!e.pars.length)return;let t=e.pars,n=r("#source"),o=r("#result");d(n),d(o),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=a(e.text);e.tib&&n.classList.add("tibphrase"),e.punct&&n.classList.add("punct")," "==e.text&&n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});l("span.tibetan")}function y(e){let t=u(e),n=m()(e.textContent),o={top:t.top-40,left:t.left+15},i=r("#transcript");i.textContent=n,i.classList.remove("is-hidden"),p(o,i)}function w(e,t){let n;try{n=JSON.parse(e.dataset.chains)}catch(t){return void C("ERR: JSON chains",e)}let o=!e.closest(".tibpar"),i=function(e,t){let n;t?((n=c("div","popup")).classList.add("upper"),document.body.appendChild(n)):n=r("#ambi");let o=u(e);d(n),n.classList.remove("is-hidden"),p({top:o.bottom-3,left:o.left},n);let i=c("ul","ambilist");return n.appendChild(i),i}(e,o);t?function(e,t){t.forEach(t=>{let n,o=c("li","ambiline");e.appendChild(o),t.ambi?(n=a(t.seg,"tibambi")).dataset.chains=JSON.stringify(t.chains):t.docs.length?(n=a(t.seg,"tibwf")).dataset.docs=JSON.stringify(t.docs):n=a(t.seg,"tibphrase"),o.appendChild(n)})}(i,n):function(e,t){e.classList.add("danger"),t.forEach(t=>{let n=c("li","ambiline");e.appendChild(n),t.forEach(e=>{let t=e.docs.length?a(e.seg,"tibwf"):a(e.seg,"tibphrase");e.docs.length&&(t.dataset.docs=JSON.stringify(e.docs)),n.appendChild(t)})})}(i,n),r("#progress").classList.remove("is-shown")}const L=n(2),S=n(4),O=n(14),q=s.remote.app,N=(q.getAppPath(),q.getPath("userData")),R=s.remote.require("electron-settings"),j=console.log,J=n(15);let _=[],k=L.resolve(N,"pouch");function D(e){return _.length||P(),function(e){return Promise.all(_.map(function(t){return t.allDocs({keys:e,include_docs:!0}).then(function(e){if(!e||!e.rows)throw new Error("no dbn result");let n=i.a.compact(e.rows.map(e=>e.doc)),o=i.a.flatten(i.a.compact(n.map(e=>e.docs)));return o.length?(o.forEach(e=>{e.dname=t.dname,e.weight=t.weight}),o):[]}).catch(function(e){console.log("ERR GET DBs",e)})}))}(e)}function z(){let e=R.get("cfg");return e||(e=function(e,t){let n=L.resolve(e,"pouch"),o=S.readdirSync(n),i=[];return o.forEach((e,t)=>{if("cfg.json"==e)return;L.resolve(n,e);let o={name:e,active:!0,idx:t};i.push(o)}),R.set("cfg",i),j("__ZERO CFG__",i),i}(N)),e}function P(){let e=R.get("cfg");j("===setDBs CFG===",e),i.a.compact(e.map(e=>e.active?e.name:null)).forEach((e,t)=>{let n=L.resolve(N,"pouch",e),o=new J(n);o.dname=e,o.weight=t,_.push(o)})}S.ensureDirSync(k);const A=console.log;function K(){let e=z();A("CLONE DICTS: CFG:",e);let t=r("#server-dicts-table"),n=["terms","verbs","lobsang"];!function(e){let t="something goes wrong, no connection?";O.get("http://localhost:5984/_all_dbs",{},function(n,o,i){if(n)e(t);else if(200==o.statusCode)try{let o=JSON.parse(i);e(o)}catch(n){e(t)}else e(t)})}(function(e){i.a.difference(e,n).forEach(e=>{let n=c("tr");t.appendChild(n);let o=c("td");n.appendChild(o),o.textContent=i.a.capitalize(e);let s=c("td","link");s.textContent="clone",s.dataset.clone=e,n.appendChild(s)})})}const T=console.log,B=(n(5),n(0).remote.require("electron-settings")),F=n(16),{getCurrentWindow:G}=(n(4),n(2),n(6),n(0).remote);let I,M=[],W=0;function U(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){T("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),function(e){!function(){const e=document.querySelectorAll(".section.is-shown");Array.prototype.forEach.call(e,e=>{e.classList.remove("is-shown")}),r("#transcript").classList.add("is-hidden"),r("#ambi").classList.add("is-hidden")}();const t=["#",e].join("");T("SEC ID",t),r(t).classList.add("is-shown")}(e.section),e.old||(e.old=!1,delete e.old,M.push(e),W=M.length-1);let n=r("#progress");T("BEFORE"),"main"==t?(function(e){let t=B.get("split-sizes")||[50,50];I&&e.mono?I.collapse(1):I&&I.setSizes(t),I||(B.set("split-sizes",t),I=h()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){B.set("split-sizes",e),G().reload()}}),e.mono&&I.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),v(e)):"clone"==t?K():n.classList.remove("is-shown"),B.set("state",e)}F.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(W<=0)return;W--;let e=M[W];e.old=!0,U(e)}():39==e.which&&function(){if(W>=M.length-1)return;W++;let e=M[W];e.old=!0,U(e)}()}),F.bind(["alt+1","alt+2"],function(e){}),F.bind(["esc"],function(e){}),F.bind(["ctrl+k"],function(e){T("CLICK CLONE"),function(){_.length||P();let e=i.a.find(_,e=>"vasilyev"==e.dname);j("DB-name",e.dname);let t=new J("http://localhost:5984/vasilyev");e.replicate.to(t).on("complete",function(){j("yay, were done!")}).on("error",function(e){j("boo, something went wrong!",e)})}()}),F.bind(["ctrl+p"],function(e){T("ZERO CFG"),B.set("cfg","")});console.log;let V={zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ']+)"};console.log;const Z=b;let $=b;console.log;function H(e,t){r("#progress").classList.add("is-shown");let n,o=e.textContent.trim(),s=new RegExp($+"$"),l=o.replace(s,""),c=i.a.last(o)==$,d=function(e){let t=e.split(Z),n=t.length<10?10:2,o=e,s=(t.length,[[t]]);!function e(t,r){(function(e){let t,n,o=[];for(let i=1;i<e.length+1;i++){t=e.slice(0,i),n=e.slice(i);let s={head:t,tail:n};n.length&&o.push(s)}return o.reverse()})(t).forEach(t=>{r.push(t.head),r.push(t.tail),i.a.flatten(r).join(Z)==o&&(s.push(i.a.clone(r)),r.pop()),r.length<n&&e(t.tail,r),r.pop()})}(t,[]);let r=[];return s.forEach(e=>{let t=[];e.forEach(e=>{t.push(e.join(Z))}),r.push(t)}),r}(l),u=function(e){let t=i.a.uniq(i.a.flatten(e)),n=[];return t.forEach(e=>{x.forEach(t=>{let o=new RegExp(t+"$"),i=e.replace(o,"");e!=i&&n.push(i)})}),{main:t,added:n}}(d);D(n=t?i.a.filter(u.main,e=>e!=l):i.a.uniq(u.main.concat(u.added))).then(n=>{n=i.a.flatten(n);let o,s=function(e,t){let n,o,s=[],r=[];e.forEach(e=>{let n=[],o=!1,l=!0;e.forEach(e=>{let s=i.a.filter(t,t=>(function(e,t){if(e==t)return!0;let n=new RegExp("^"+t),o=e.replace(n,"");return!(e==o||!x.includes(o))})(e,t.dict));s.length&&(o=!0),s.length||(l=!1);let r={seg:e,docs:s};n.push(r)}),o&&s.push(n),l&&r.push(n)}),r.length?(n=Q(r),o=!0):n=Q(s);return{chains:n,full:o}}(d,n).chains;if(s.length>1)o=function(e){let t,n=e[0],o=[];for(let s=0;s<n.length;s++){let r=e.map(e=>e[s].seg);if(1==i.a.uniq(r).length)o.push(n[s]),t=null;else{t||(t={ambi:!0,seg:"",docs:[]},o.push(t));let n=e.map(e=>({seg:e[s].seg,docs:e[s].docs}));t.docs.push(n)}}return i.a.filter(o,e=>e.ambi).forEach(e=>{let t=e.docs[0],n=[];for(let o=0;o<t.length;o++){let t=e.docs.map(e=>e[o]);n.push(t)}e.chains=n;let o=n[0];e.seg=o.map(e=>e.seg).join($)}),o}(s);else{if(1!=s.length)return void function(e){C("NO RESULT"),r("#progress").classList.remove("is-shown")}();o=s[0]}t?(e.dataset.chains=JSON.stringify(o),w(e,!0)):function(e,t,n){e.textContent="",t.forEach((n,o)=>{let i;n.ambi?(i=a(n.seg,"tibambi")).dataset.chains=JSON.stringify(n.chains):n.docs.length?(i=a(n.seg,"tibwf")).dataset.docs=JSON.stringify(n.docs):i=a(n.seg,"tibphrase"),e.appendChild(i),o<t.length-1&&e.appendChild(a(E,"tsek"))}),n&&e.appendChild(a(E,"tsek")),r("#progress").classList.remove("is-shown")}(e,o,c)})}function Q(e){let t=i.a.max(e.map(e=>i.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length)),n=i.a.filter(e,e=>i.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=t-1),o=i.a.min(n.map(e=>e.length));return i.a.filter(n,e=>e.length==o)}const X=n(0).remote.require("electron-settings"),Y=(n(17),n(18),n(6),console.log,n(2),n(5)),{dialog:ee,getCurrentWindow:te}=n(0).remote;n(19);r("#new-version");let ne=r("#container");l('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");ne.appendChild(t.cloneNode(!0))}),s.ipcRenderer.on("section",function(e,t){U({section:t})}),s.ipcRenderer.on("action",function(e,t){"clonedicts"==t?U({section:"clone"}):"csv"==t?ee.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},parseCSV):"cleanupdb"==t&&j("CLEAN UP")}),s.ipcRenderer.on("reread",function(e){let t=X.get("state");te().reload(),U(t)});let oe=X.get("state");oe||(oe={section:"home"}),U(oe),document.addEventListener("click",e=>{let t=e.target.dataset;if(t)if(t.external){let t=e.target.textContent;s.shell.openExternal(t)}else t.section?U({section:t.section}):t.clone?function(e){A("CLONING DB",e),r("#cloning-text").textContent="...cloning, please wait...",r("#progress").classList.add("is-shown")}(t.clone):t.docs&&H(e.target,!0)}),document.addEventListener("mouseover",function(e){if(!e.target.textContent)return;if(1==e.ctrlKey)return;e.target.closest(".tibpar")&&l(".popup").forEach(e=>{e.classList.add("is-hidden")}),e.target.classList.contains("tibphrase")?1==e.shiftKey?y(e.target):H(e.target):e.target.classList.contains("tibwf")?function(e){r("#source");let t=r("#result");d(t);let n=e.textContent,o=JSON.parse(e.dataset.docs);try{o=JSON.parse(e.dataset.docs)}catch(e){return void C("ERR: JSON docs")}let i=c("div","dict");t.appendChild(i);let s=c("p","dict-wf");s.textContent=n,i.appendChild(s),o.forEach(e=>{let t=c("p","dict-dname");t.textContent=e.dname,i.appendChild(t);let n=c("p","dict-article");n.textContent=e.dict,i.appendChild(n);let o=c("ul","dict-ul");i.appendChild(o),e.trns||C("NO TRNS",e),e.trns&&e.trns.forEach(e=>{let t=c("li","dict-line");t.textContent=e,o.appendChild(t)})})}(e.target):e.target.classList.contains("tibambi")&&w(e.target)},!1),document.addEventListener("mouseleave",function(e){if(e.target.classList&&1!=e.ctrlKey&&e.target.classList.contains("tibphrase")){r("#transcript").classList.add("is-hidden")}},!1),document.addEventListener("keyup",function(e){if(1==e.ctrlKey)return;r("#transcript").classList.add("is-hidden")},!1),document.addEventListener("keydown",function(e){if(1==e.ctrlKey)return;if(1!=e.shiftKey)return;let t=[].slice.call(document.querySelectorAll(":hover")).pop();"source"==t.id&&(t=r(".tibpar")),y(t)},!1),Y.on("text-changed",()=>{let e=((e,t)=>{let n=new RegExp(V[e]);if(!n.test(t))return;let o=t.trim().replace(/᾽/g,"'"),s=o.split("'").join("");if(!n.test(s))return;let r=new RegExp("([.,!:;·།])"),l=o.replace(/\r?\n+/,"\n").split("\n"),c=(l.map(e=>e.split(r)),[]);return l.forEach(t=>{let o=[];t.split(r).forEach(t=>{if(r.test(t)){let e={text:t,punct:!0};o.push(e)}else{let s=t.split(n);(s=i.a.compact(s)).forEach(t=>{let i={text:t};!!n.test(t)&&(i[e]=!0),o.push(i)})}}),c.push(o)}),c})("tib",Y.readText());e&&e.length&&U({section:"main",pars:e})}).startWatching(),z()}]);
//# sourceMappingURL=app.js.map