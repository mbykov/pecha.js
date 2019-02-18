!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=19)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("path")},,function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},function(e,t){e.exports=require("cholok")},,,,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("pouchdb")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("electron-is-dev")},function(e,t,n){"use strict";n.r(t);var i=n(1),o=n.n(i),s=n(0);n(13);function r(e){return document.querySelector(e)}function l(e){return document.querySelectorAll(e)}function c(e,t){let n=document.createElement(e);return t&&n.classList.add(t),n}function a(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}function u(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}function d(e){return e.getBoundingClientRect()}function p(e,t){let n=[e.top,"px"].join(""),i=[e.left,"px"].join("");t.style.top=n,t.style.left=i}var f=n(8),h=n.n(f),g=n(9),m=n.n(g);const b="་",E=["འི","ར","འོ","འམ","འི","ས","འང"];let x=b;const y=console.log;function v(e){if(!e||!e.pars||!e.pars.length)return;let t=e.pars,n=r("#source"),i=r("#result");u(n),u(i),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=a(e.text);e.tib&&n.classList.add("tibphrase"),e.punct&&n.classList.add("punct")," "==e.text&&n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});l("span.tibetan")}function C(e){let t=d(e),n=m()(e.textContent),i={top:t.top-40,left:t.left+15},o=r("#transcript");o.textContent=n,o.classList.remove("is-hidden"),p(i,o)}function w(e,t){let n;try{n=JSON.parse(e.dataset.chains)}catch(t){return void y("ERR: JSON chains",e)}let i=!e.closest(".tibpar"),o=function(e,t){let n;t?((n=c("div","popup")).classList.add("upper"),document.body.appendChild(n)):n=r("#ambi");let i=d(e);u(n),n.classList.remove("is-hidden"),p({top:i.bottom-3,left:i.left},n);let o=c("ul","ambilist");return n.appendChild(o),o}(e,i);t?function(e,t){t.forEach(t=>{let n,i=c("li","ambiline");e.appendChild(i),t.ambi?(n=a(t.seg,"tibambi")).dataset.chains=JSON.stringify(t.chains):t.docs.length?(n=a(t.seg,"tibwf")).dataset.docs=JSON.stringify(t.docs):n=a(t.seg,"tibphrase"),i.appendChild(n)})}(o,n):function(e,t){e.classList.add("danger"),t.forEach(t=>{let n=c("li","ambiline");e.appendChild(n),t.forEach(e=>{let t=e.docs.length?a(e.seg,"tibwf"):a(e.seg,"tibphrase");e.docs.length&&(t.dataset.docs=JSON.stringify(e.docs)),n.appendChild(t)})})}(o,n),r("#progress").classList.remove("is-shown")}const L=n(2);let S=n(4);const O=s.remote.app,R=(O.getAppPath(),O.getPath("userData")),q=s.remote.require("electron-settings"),N=console.log,j=n(14);let J=[],_=L.resolve(R,"pouch");function A(e){return J.length||P(),function(e){return Promise.all(J.map(function(t){return t.allDocs({keys:e,include_docs:!0}).then(function(e){if(!e||!e.rows)throw new Error("no dbn result");let n=o.a.compact(e.rows.map(e=>e.doc)),i=o.a.flatten(o.a.compact(n.map(e=>e.docs)));return i.length?(i.forEach(e=>{e.dname=t.dname,e.weight=t.weight}),i):[]}).catch(function(e){console.log("ERR GET DBs",e)})}))}(e)}function P(){let e=q.get("cfg");N("===setDBs CFG===",e),o.a.compact(e.map(e=>e.active?e.name:null)).forEach((e,t)=>{let n=L.resolve(R,"pouch",e),i=new j(n);i.dname=e,i.weight=t,J.push(i)})}S.ensureDirSync(_);const k=console.log,D=(n(5),n(0).remote.require("electron-settings")),z=n(15),{getCurrentWindow:T}=(n(4),n(2),n(6),n(0).remote);let K,F=[],G=0;function B(e){!function(){const e=document.querySelectorAll(".section.is-shown");Array.prototype.forEach.call(e,e=>{e.classList.remove("is-shown")}),r("#transcript").classList.add("is-hidden"),r("#ambi").classList.add("is-hidden")}(),r(["#",e].join("")).classList.add("is-shown")}function M(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){k("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),B(e.section),e.old||(e.old=!1,delete e.old,F.push(e),G=F.length-1);let n=r("#progress");"main"==t?(function(e){let t=D.get("split-sizes")||[50,50];K&&e.mono?K.collapse(1):K&&K.setSizes(t),K||(D.set("split-sizes",t),K=h()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){D.set("split-sizes",e),T().reload()}}),e.mono&&K.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),v(e)):n.classList.remove("is-shown"),D.set("state",e)}z.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(G<=0)return;G--;let e=F[G];e.old=!0,M(e)}():39==e.which&&function(){if(G>=F.length-1)return;G++;let e=F[G];e.old=!0,M(e)}()}),z.bind(["alt+1","alt+2"],function(e){}),z.bind(["esc"],function(e){}),z.bind(["ctrl+k"],function(e){k("CLICK CLONE"),function(){J.length||P();let e=o.a.find(J,e=>"vasilyev"==e.dname);N("DB-name",e.dname);let t=new j("http://localhost:5984/vasilyev");e.replicate.to(t).on("complete",function(){N("yay, were done!")}).on("error",function(e){N("boo, something went wrong!",e)})}()}),z.bind(["ctrl+p"],function(e){k("ZERO CFG"),D.set("cfg","")});console.log;let W={zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ']+)"};console.log;const Z=b;let I=b;console.log;function U(e,t){r("#progress").classList.add("is-shown");let n,i=e.textContent.trim(),s=new RegExp(I+"$"),l=i.replace(s,""),c=o.a.last(i)==I,u=function(e){let t=e.split(Z),n=t.length<10?10:2,i=e,s=(t.length,[[t]]);!function e(t,r){(function(e){let t,n,i=[];for(let o=1;o<e.length+1;o++){t=e.slice(0,o),n=e.slice(o);let s={head:t,tail:n};n.length&&i.push(s)}return i.reverse()})(t).forEach(t=>{r.push(t.head),r.push(t.tail),o.a.flatten(r).join(Z)==i&&(s.push(o.a.clone(r)),r.pop()),r.length<n&&e(t.tail,r),r.pop()})}(t,[]);let r=[];return s.forEach(e=>{let t=[];e.forEach(e=>{t.push(e.join(Z))}),r.push(t)}),r}(l),d=function(e){let t=o.a.uniq(o.a.flatten(e)),n=[];return t.forEach(e=>{E.forEach(t=>{let i=new RegExp(t+"$"),o=e.replace(i,"");e!=o&&n.push(o)})}),{main:t,added:n}}(u);A(n=t?o.a.filter(d.main,e=>e!=l):o.a.uniq(d.main.concat(d.added))).then(n=>{n=o.a.flatten(n);let i,s=function(e,t){let n,i,s=[],r=[];e.forEach(e=>{let n=[],i=!1,l=!0;e.forEach(e=>{let s=o.a.filter(t,t=>(function(e,t){if(e==t)return!0;let n=new RegExp("^"+t),i=e.replace(n,"");return!(e==i||!E.includes(i))})(e,t.dict));s.length&&(i=!0),s.length||(l=!1);let r={seg:e,docs:s};n.push(r)}),i&&s.push(n),l&&r.push(n)}),r.length?(n=V(r),i=!0):n=V(s);return{chains:n,full:i}}(u,n).chains;if(s.length>1)i=function(e){let t,n=e[0],i=[];for(let s=0;s<n.length;s++){let r=e.map(e=>e[s].seg);if(1==o.a.uniq(r).length)i.push(n[s]),t=null;else{t||(t={ambi:!0,seg:"",docs:[]},i.push(t));let n=e.map(e=>({seg:e[s].seg,docs:e[s].docs}));t.docs.push(n)}}return o.a.filter(i,e=>e.ambi).forEach(e=>{let t=e.docs[0],n=[];for(let i=0;i<t.length;i++){let t=e.docs.map(e=>e[i]);n.push(t)}e.chains=n;let i=n[0];e.seg=i.map(e=>e.seg).join(I)}),i}(s);else{if(1!=s.length)return void function(e){y("NO RESULT"),r("#progress").classList.remove("is-shown")}();i=s[0]}t?(e.dataset.chains=JSON.stringify(i),w(e,!0)):function(e,t,n){e.textContent="",t.forEach((n,i)=>{let o;n.ambi?(o=a(n.seg,"tibambi")).dataset.chains=JSON.stringify(n.chains):n.docs.length?(o=a(n.seg,"tibwf")).dataset.docs=JSON.stringify(n.docs):o=a(n.seg,"tibphrase"),e.appendChild(o),i<t.length-1&&e.appendChild(a(x,"tsek"))}),n&&e.appendChild(a(x,"tsek")),r("#progress").classList.remove("is-shown")}(e,i,c)})}function V(e){let t=o.a.max(e.map(e=>o.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length)),n=o.a.filter(e,e=>o.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=t-1),i=o.a.min(n.map(e=>e.length));return o.a.filter(n,e=>e.length==i)}const $=console.log;function H(e){$("PARSE STAR DICT")}function Q(e){$("PARSE STAR CSV")}const X=n(0).remote.require("electron-settings"),Y=(n(16),n(17),n(6),console.log,n(2),n(5)),{dialog:ee,getCurrentWindow:te}=n(0).remote;n(18);r("#new-version");let ne=r("#container");l('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");ne.appendChild(t.cloneNode(!0))}),s.ipcRenderer.on("section",function(e,t){M({section:t})}),s.ipcRenderer.on("action",function(e,t){"stardict"==t?ee.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},H):"csv"==t?ee.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},Q):"cleanupdb"==t&&N("CLEAN UP")}),s.ipcRenderer.on("reread",function(e){let t=X.get("state");te().reload(),M(t)});let ie=X.get("state");ie||(ie={section:"home"}),M(ie),document.addEventListener("click",e=>{let t=e.target.dataset;if(t)if(t.external){let t=e.target.textContent;s.shell.openExternal(t)}else t.section?M({section:t.section}):t.docs&&U(e.target,!0)}),document.addEventListener("mouseover",function(e){if(!e.target.textContent)return;if(1==e.ctrlKey)return;e.target.closest(".tibpar")&&l(".popup").forEach(e=>{e.classList.add("is-hidden")}),e.target.classList.contains("tibphrase")?1==e.shiftKey?C(e.target):U(e.target):e.target.classList.contains("tibwf")?function(e){r("#source");let t=r("#result");u(t);let n=e.textContent,i=JSON.parse(e.dataset.docs);try{i=JSON.parse(e.dataset.docs)}catch(e){return void y("ERR: JSON docs")}let o=c("div","dict");t.appendChild(o);let s=c("p","dict-wf");s.textContent=n,o.appendChild(s),i.forEach(e=>{let t=c("p","dict-dname");t.textContent=e.dname,o.appendChild(t);let n=c("p","dict-article");n.textContent=e.dict,o.appendChild(n);let i=c("ul","dict-ul");o.appendChild(i),e.trns||y("NO TRNS",e),e.trns&&e.trns.forEach(e=>{let t=c("li","dict-line");t.textContent=e,i.appendChild(t)})})}(e.target):e.target.classList.contains("tibambi")&&w(e.target)},!1),document.addEventListener("mouseleave",function(e){if(e.target.classList&&1!=e.ctrlKey&&e.target.classList.contains("tibphrase")){r("#transcript").classList.add("is-hidden")}},!1),document.addEventListener("keyup",function(e){if(1==e.ctrlKey)return;r("#transcript").classList.add("is-hidden")},!1),document.addEventListener("keydown",function(e){if(1==e.ctrlKey)return;if(1!=e.shiftKey)return;let t=[].slice.call(document.querySelectorAll(":hover")).pop();"source"==t.id&&(t=r(".tibpar")),C(t)},!1),Y.on("text-changed",()=>{let e=((e,t)=>{let n=new RegExp(W[e]);if(!n.test(t))return;let i=t.trim().replace(/᾽/g,"'"),s=i.split("'").join("");if(!n.test(s))return;let r=new RegExp("([.,!:;·།])"),l=i.replace(/\r?\n+/,"\n").split("\n"),c=(l.map(e=>e.split(r)),[]);return l.forEach(t=>{let i=[];t.split(r).forEach(t=>{if(r.test(t)){let e={text:t,punct:!0};i.push(e)}else{let s=t.split(n);(s=o.a.compact(s)).forEach(t=>{let o={text:t};!!n.test(t)&&(o[e]=!0),i.push(o)})}}),c.push(i)}),c})("tib",Y.readText());e&&e.length&&M({section:"main",pars:e})}).startWatching(),function(){let e=q.get("cfg");e||(e=function(e,t){N("__ZERO CFG__");let n=L.resolve(e,"pouch"),i=S.readdirSync(n),o=[];return i.forEach((e,t)=>{if("cfg.json"==e)return;L.resolve(n,e);let i={name:e,active:!0,idx:t};o.push(i)}),q.set("cfg",o),N("__ZERO CFG__",o),o}(R))}()}]);
//# sourceMappingURL=app.js.map