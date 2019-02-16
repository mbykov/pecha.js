!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=19)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("path")},,function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},function(e,t){e.exports=require("cholok")},,,,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("pouchdb")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("electron-is-dev")},function(e,t,n){"use strict";n.r(t);var o=n(1),s=n.n(o),i=n(0);n(13);function r(e){return document.querySelector(e)}function l(e){return document.querySelectorAll(e)}function c(e,t){let n=document.createElement(e);return t&&n.classList.add(t),n}function a(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}function u(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}function d(e){return e.getBoundingClientRect()}function p(e,t){let n=[e.top,"px"].join(""),o=[e.left,"px"].join("");t.style.top=n,t.style.left=o}var f=n(8),h=n.n(f),g=n(9),m=n.n(g);const E="་",b=["འི","ར","འོ","འམ","འི","ས","འང"];let x=E;const C=console.log;function v(e){if(!e||!e.pars||!e.pars.length)return;let t=e.pars,n=r("#source"),o=r("#result");u(n),u(o),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=a(e.text);e.tib&&n.classList.add("tibphrase"),e.punct&&n.classList.add("punct")," "==e.text&&n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});l("span.tibetan")}function y(e){let t=d(e),n=m()(e.textContent),o={top:t.top-40,left:t.left+15},s=r("#transcript");s.textContent=n,s.classList.remove("is-hidden"),p(o,s)}function L(e){let t=r("#ambi"),n=d(e);u(t),t.classList.remove("is-hidden"),p({top:n.bottom+2,left:n.left},t);let o=c("ul","ambilist");return t.appendChild(o),o}function w(e,t){if(!t)try{t=JSON.parse(e.dataset.chains)}catch(t){return void C("ERR: JSON chains",e)}let n=L(e);n.classList.add("danger"),t.forEach(e=>{let t=c("li","ambiline");n.appendChild(t),e.forEach(e=>{let n=e.docs.length?a(e.seg,"tibwf"):a(e.seg,"tibphrase");e.docs.length&&(n.dataset.docs=JSON.stringify(e.docs)),t.appendChild(n)})})}const S=n(2);let O=n(4);const q=i.remote.app,R=(q.getAppPath(),q.getPath("userData")),N=i.remote.require("electron-settings"),_=console.log,j=n(14);let A=[],J=S.resolve(R,"pouch");function P(e){return A.length||D(),function(e){return Promise.all(A.map(function(t){return t.allDocs({keys:e,include_docs:!0}).then(function(e){if(!e||!e.rows)throw new Error("no dbn result");let n=s.a.compact(e.rows.map(e=>e.doc)),o=s.a.flatten(s.a.compact(n.map(e=>e.docs)));return o.length?(o.forEach(e=>{e.dname=t.dname,e.weight=t.weight}),o):[]}).catch(function(e){console.log("ERR GET DBs",e)})}))}(e)}function D(){let e=N.get("cfg");_("===setDBs CFG===",e),s.a.compact(e.map(e=>e.active?e.name:null)).forEach((e,t)=>{let n=S.resolve(R,"pouch",e),o=new j(n);o.dname=e,o.weight=t,A.push(o)})}O.ensureDirSync(J);const k=console.log,z=(n(5),n(0).remote.require("electron-settings")),T=n(15),{getCurrentWindow:F}=(n(4),n(2),n(6),n(0).remote);let M,B=[],G=0;function I(e){!function(){const e=document.querySelectorAll(".section.is-shown");Array.prototype.forEach.call(e,e=>{e.classList.remove("is-shown")}),r("#transcript").classList.add("is-hidden"),r("#ambi").classList.add("is-hidden")}(),r(["#",e].join("")).classList.add("is-shown")}function K(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){k("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),I(e.section),e.old||(e.old=!1,delete e.old,B.push(e),G=B.length-1);let n=r("#progress");"main"==t?(function(e){let t=z.get("split-sizes")||[50,50];M&&e.mono?M.collapse(1):M&&M.setSizes(t),M||(z.set("split-sizes",t),M=h()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){z.set("split-sizes",e),F().reload()}}),e.mono&&M.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),v(e)):n.classList.remove("is-shown"),e={section:"home"},z.set("state",e)}T.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(G<=0)return;G--;let e=B[G];e.old=!0,K(e)}():39==e.which&&function(){if(G>=B.length-1)return;G++;let e=B[G];e.old=!0,K(e)}()}),T.bind(["alt+1","alt+2"],function(e){}),T.bind(["esc"],function(e){}),T.bind(["ctrl+k"],function(e){k("CLICK CLONE"),function(){A.length||D();let e=s.a.find(A,e=>"vasilyev"==e.dname);_("DB-name",e.dname);let t=new j("http://localhost:5984/vasilyev");e.replicate.to(t).on("complete",function(){_("yay, were done!")}).on("error",function(e){_("boo, something went wrong!",e)})}()}),T.bind(["ctrl+p"],function(e){k("ZERO CFG"),z.set("cfg","")});console.log;let U={zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ']+)"};console.log;const V=E;let W=E;const Z=console.log;function $(e,t){let n=r("#progress");n.classList.add("is-shown");let o=new RegExp(W+"$"),i=e.textContent.trim().replace(o,""),l=(i.split(W),!1);e.parentNode.classList.contains("tibphrase")&&(l=!0);let d=function(e){let t=e.split(V),n=t.length<15?10:2,o=e,i=(t.length,[[t]]);!function e(t,r){(function(e){let t,n,o=[];for(let s=1;s<e.length+1;s++){t=e.slice(0,s),n=e.slice(s);let i={head:t,tail:n};n.length&&o.push(i)}return o.reverse()})(t).forEach(t=>{r.push(t.head),r.push(t.tail),s.a.flatten(r).join(V)==o&&(i.push(s.a.clone(r)),r.pop()),r.length<n&&e(t.tail,r),r.pop()})}(t,[]);let r=[];return i.forEach(e=>{let t=[];e.forEach(e=>{t.push(e.join(V))}),r.push(t)}),r}(i),p=function(e){let t=s.a.uniq(s.a.flatten(e)),n=[];t.forEach(e=>{b.forEach(t=>{let o=new RegExp(t+"$"),s=e.replace(o,"");e!=s&&n.push(s)})});let o=t.concat(n);return s.a.uniq(o)}(d);t&&(p=s.a.filter(p,e=>e!=i)),P(p).then(o=>{o=s.a.flatten(o);let i,l=function(e,t){let n,o,i=[],r=[];e.forEach(e=>{let n=[],o=!1,l=!0;e.forEach(e=>{let i=s.a.filter(t,t=>(function(e,t){if(e==t)return!0;let n=new RegExp("^"+t),o=e.replace(n,"");return!(e==o||!b.includes(o))})(e,t.dict));i.length&&(o=!0),i.length||(l=!1);let r={seg:e,docs:i};n.push(r)}),o&&i.push(n),l&&r.push(n)}),r.length?(n=H(r),o=!0):n=H(i);return{chains:n,full:o}}(d,o).chains;l.length?(l.length>1?i=function(e){let t,n=e[0],o=[];for(let i=0;i<n.length;i++){let r=e.map(e=>e[i].seg);if(1==s.a.uniq(r).length)o.push(n[i]),t=null;else{t||(t={ambi:!0,seg:"",docs:[]},o.push(t));let n=e.map(e=>({seg:e[i].seg,docs:e[i].docs}));t.docs.push(n)}}let i=s.a.filter(o,e=>e.ambi);return i.forEach(e=>{let t=e.docs[0],n=[];for(let o=0;o<t.length;o++){let t=e.docs.map(e=>e[o]);n.push(t)}e.chains=n;let o=n[0];e.seg=o.map(e=>e.seg).join(W)}),Z("___AMBIS___",i),o}(l):1==l.length&&(i=l[0]),t?function(e,t){let n=L(e);t.length>1?w(e,t):t[0].forEach(e=>{let t=c("li","ambiline");n.appendChild(t);let o=e.docs.length?a(e.seg,"tibwf"):a(e.seg,"tibphrase");t.appendChild(o),o.dataset.docs=JSON.stringify(e.docs)})}(e,l):function(e,t){e.textContent="",t.forEach((n,o)=>{let s;n.ambi?(s=a(n.seg,"tibambi")).dataset.chains=JSON.stringify(n.chains):n.docs.length?(s=a(n.seg,"tibwf")).dataset.docs=JSON.stringify(n.docs):s=a(n.seg,"tibphrase"),e.appendChild(s),o<t.length-1&&e.appendChild(a(x,"tsek"))})}(e,i),n.classList.remove("is-shown")):function(e){C("NO RESULT"),u(r("#result")),r("#progress").classList.remove("is-shown")}()})}function H(e){let t=s.a.max(e.map(e=>s.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length)),n=s.a.filter(e,e=>s.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=t-1),o=s.a.min(n.map(e=>e.length));return s.a.filter(n,e=>e.length==o)}const Q=console.log;function X(e){Q("PARSE STAR DICT")}function Y(e){Q("PARSE STAR CSV")}const ee=n(0).remote.require("electron-settings"),te=(n(16),n(17),n(6),console.log),ne=(n(2),n(5)),{dialog:oe,getCurrentWindow:se}=n(0).remote;n(18);r("#new-version");let ie=r("#container");l('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");ie.appendChild(t.cloneNode(!0))}),i.ipcRenderer.on("section",function(e,t){K({section:t})}),i.ipcRenderer.on("action",function(e,t){"stardict"==t?oe.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},X):"csv"==t?oe.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},Y):"cleanupdb"==t&&_("CLEAN UP")});let re=ee.get("state");function le(){r("#transcript").classList.add("is-hidden"),r("#ambi").classList.add("is-hidden")}re||(re={section:"home"}),K(re),document.addEventListener("click",e=>{let t=e.target.dataset;if(t)if(t.external){let t=e.target.textContent;i.shell.openExternal(t)}else t.section?K({section:t.section}):t.docs&&$(e.target,!0)}),document.addEventListener("mouseover",function(e){if(e.target.textContent)if(e.target.classList.contains("tibphrase"))1==e.shiftKey?y(e.target):$(e.target);else if(e.target.classList.contains("tibwf")){let t=e.target.parentNode.parentNode;t&&t.classList.contains("tibpar")&&le(),function(e){r("#source");let t=r("#result");u(t);let n=e.textContent,o=JSON.parse(e.dataset.docs);try{o=JSON.parse(e.dataset.docs)}catch(e){return void C("ERR: JSON docs")}let s=c("div","dict");t.appendChild(s);let i=c("p","dict-wf");i.textContent=n,s.appendChild(i),o.forEach(e=>{let t=c("p","dict-dname");t.textContent=e.dname,s.appendChild(t);let n=c("p","dict-article");n.textContent=e.dict,s.appendChild(n);let o=c("ul","dict-ul");s.appendChild(o),e.trns||C("NO TRNS",e),e.trns&&e.trns.forEach(e=>{let t=c("li","dict-line");t.textContent=e,o.appendChild(t)})})}(e.target)}else e.target.classList.contains("tibambi")&&w(e.target)},!1),document.addEventListener("mouseleave",function(e){if(e.target.classList)if(e.target.classList.contains("tibphrase")){r("#transcript").classList.add("is-hidden")}else e.target.classList.contains("ambi")&&te("MOUSE LEAVE")},!1),document.addEventListener("keyup",function(e){le()},!1),document.addEventListener("keydown",function(e){if(le(),1!=e.shiftKey)return;y([].slice.call(document.querySelectorAll(":hover")).pop())},!1),ne.on("text-changed",()=>{let e=((e,t)=>{let n=new RegExp(U[e]);if(!n.test(t))return;let o=t.trim().replace(/᾽/g,"'"),i=o.split("'").join("");if(!n.test(i))return;let r=new RegExp("([.,!:;·།])"),l=o.replace(/\r?\n+/,"\n").split("\n"),c=(l.map(e=>e.split(r)),[]);return l.forEach(t=>{let o=[];t.split(r).forEach(t=>{if(r.test(t)){let e={text:t,punct:!0};o.push(e)}else{let i=t.split(n);(i=s.a.compact(i)).forEach(t=>{let s={text:t};!!n.test(t)&&(s[e]=!0),o.push(s)})}}),c.push(o)}),c})("tib",ne.readText());e&&e.length&&K({section:"main",pars:e})}).startWatching(),function(){let e=N.get("cfg");e||(e=function(e,t){_("__ZERO CFG__");let n=S.resolve(e,"pouch"),o=O.readdirSync(n),s=[];return o.forEach((e,t)=>{if("cfg.json"==e)return;S.resolve(n,e);let o={name:e,active:!0,idx:t};s.push(o)}),N.set("cfg",s),_("__ZERO CFG__",s),s}(R))}()}]);
//# sourceMappingURL=app.js.map