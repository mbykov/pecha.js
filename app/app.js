!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=19)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("path")},,function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},function(e,t){e.exports=require("cholok")},,,,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("pouchdb")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("electron-is-dev")},function(e,t,n){"use strict";n.r(t);var o=n(1),s=n.n(o),i=n(0);n(13);function r(e){return document.querySelector(e)}function l(e){return document.querySelectorAll(e)}function c(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}function a(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}function u(e){return e.getBoundingClientRect()}function d(e,t){let n=[e.top,"px"].join(""),o=[e.left,"px"].join("");t.style.top=n,t.style.left=o}var f=n(8),p=n.n(f),h=n(9),g=n.n(h);const m={tsek:"་",connective:"འི",subordinative:"ར",narrative:"འོ",interrog:"འམ",coupling:"འི",ergative:"ས",concessive:"འང"},x=["འི","ར","འོ","འམ","འི","ས","འང"],E=console.log;function v(e){if(!e||!e.pars||!e.pars.length)return;let t=e.pars,n=r("#source"),o=r("#result");a(n),a(o),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=c(e.text);e.tib&&n.classList.add("tibphrase"),e.punct&&n.classList.add("punct")," "==e.text&&n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});l("span.tibetan")}function b(e,t){e.parentNode;1==t.length?function(e,t){e.textContent="",t.forEach((n,o)=>{let s;n.docs.length?(s=c(n.seg,"tibwf")).dataset.docs=JSON.stringify(n.docs):s=c(n.seg,"tibphrase"),e.appendChild(s),o<t.length-1&&e.appendChild(c(m.tsek,"tibtsek"))})}(e,t[0]):E("AMBI"),r("#progress").classList.remove("is-shown")}function y(e){r("#source");let t=r("#result");a(t);let n=e.textContent;JSON.parse(e.dataset.docs);t.textContent=n}const L=n(2);let w=n(4);const C=i.remote.app,S=(C.getAppPath(),C.getPath("userData")),q=i.remote.require("electron-settings"),O=console.log,R=n(14);let j=[],_=L.resolve(S,"pouch");function N(e){return j.length||k(),function(e){return Promise.all(j.map(function(t){return t.allDocs({keys:e,include_docs:!0}).then(function(e){if(!e||!e.rows)throw new Error("no dbn result");let n=s.a.compact(e.rows.map(e=>e.doc)),o=s.a.flatten(s.a.compact(n.map(e=>e.docs)));return o.length?(o.forEach(e=>{e.dname=t.dname,e.weight=t.weight}),o):[]}).catch(function(e){console.log("ERR GET DBs",e)})}))}(e)}function k(){let e=q.get("cfg");O("===setDBs CFG===",e),s.a.compact(e.map(e=>e.active?e.name:null)).forEach((e,t)=>{let n=L.resolve(S,"pouch",e),o=new R(n);o.dname=e,o.weight=t,j.push(o)})}w.ensureDirSync(_);const A=console.log,P=(n(5),n(0).remote.require("electron-settings")),D=n(15),{getCurrentWindow:z}=(n(4),n(2),n(6),n(0).remote);let T,M=[],F=0;function J(e){!function(){const e=document.querySelectorAll(".section.is-shown");Array.prototype.forEach.call(e,e=>{e.classList.remove("is-shown")}),r("#transcript").classList.add("is-hidden"),r("#ambi").classList.add("is-hidden")}(),r(["#",e].join("")).classList.add("is-shown")}function B(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){A("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),J(e.section),e.old||(e.old=!1,delete e.old,M.push(e),F=M.length-1);let n=r("#progress");"main"==t?(function(e){let t=P.get("split-sizes")||[50,50];T&&e.mono?T.collapse(1):T&&T.setSizes(t),T||(P.set("split-sizes",t),T=p()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){P.set("split-sizes",e),z().reload()}}),e.mono&&T.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),v(e)):n.classList.remove("is-shown"),e={section:"home"},P.set("state",e)}D.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(F<=0)return;F--;let e=M[F];e.old=!0,B(e)}():39==e.which&&function(){if(F>=M.length-1)return;F++;let e=M[F];e.old=!0,B(e)}()}),D.bind(["alt+1","alt+2"],function(e){}),D.bind(["esc"],function(e){}),D.bind(["ctrl+k"],function(e){A("CLICK CLONE"),function(){j.length||k();let e=s.a.find(j,e=>"vasilyev"==e.dname);O("DB-name",e.dname);let t=new R("http://localhost:5984/vasilyev");e.replicate.to(t).on("complete",function(){O("yay, were done!")}).on("error",function(e){O("boo, something went wrong!",e)})}()}),D.bind(["ctrl+p"],function(e){A("ZERO CFG"),P.set("cfg","")});console.log;let G={zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ']+)"};const I=console.log,K=m.tsek;function U(e){let t,n,o=[];for(let s=1;s<e.length+1;s++){let i={head:t=e.slice(0,s),tail:n=e.slice(s)};n.length&&o.push(i)}return o.reverse()}const V=console.log;function W(e){r("#progress").classList.add("is-shown");let t=e.textContent.trim(),n=(t.split(m.tsek),function(e){let t=e.split(K),n=e,o=(t.length,[[t]]);!function e(t,i){U(t).forEach(t=>{i.push(t.head),i.push(t.tail),s.a.flatten(i).join(K)==n&&(o.push(s.a.clone(i)),i.pop()),i.length<2&&e(t.tail,i),i.pop()})}(t,[]);let i=[];return o.forEach(e=>{let t=[];e.forEach(e=>{t.push(e.join(K))}),i.push(t)}),i}(t)),o=function(e){return I("totalKeys"),s.a.uniq(s.a.flatten(e))}(n);V("MAIN keys:",o.length),N(o).then(t=>{t=s.a.flatten(t);let o=function(e,t){let n=[];return e.forEach(e=>{let o=[],i=!1;e.forEach(e=>{let n=s.a.filter(t,t=>(function(e,t){if(e==t)return!0;let n=new RegExp("^"+t),o=e.replace(n,"");return!(e==o||!x.includes(o))})(e,t.dict));n.length&&(i=!0);let r={seg:e,docs:n};o.push(r)}),i&&n.push(o)}),n}(n,t);V("CHs",o.length);let i=function(e){let t=[];return e.forEach(e=>{let n=!0;e.forEach(e=>{e.docs.length||(n=!1)}),n&&t.push(e)}),t}(o);V("chains: ",o.length,"fulls: ",i.length),i.length&&(o=i),V("CHs",o.length);let l=function(e){let t=s.a.max(e.map(e=>s.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length)),n=s.a.filter(e,e=>s.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=t-1),o=s.a.min(n.map(e=>e.length));return s.a.filter(n,e=>e.length==o)}(o);if(V("bests =>",l.length,l),l.length){l[0];b(e,l)}else!function(e){E("NO RESULT",e.textContent),a(r("#result")),r("#progress").classList.remove("is-shown")}(e)})}const Z=console.log;function H(e){Z("PARSE STAR DICT")}function Q(e){Z("PARSE STAR CSV")}const X=n(0).remote.require("electron-settings"),Y=(n(16),n(17),n(6),console.log),$=(n(2),n(5)),{dialog:ee,getCurrentWindow:te}=n(0).remote;n(18);r("#new-version");let ne=r("#container");l('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");ne.appendChild(t.cloneNode(!0))}),i.ipcRenderer.on("section",function(e,t){B({section:t})}),i.ipcRenderer.on("action",function(e,t){"stardict"==t?ee.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},H):"csv"==t?ee.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},Q):"cleanupdb"==t&&O("CLEAN UP")});let oe=X.get("state");oe||(oe={section:"home"}),B(oe),document.addEventListener("click",e=>{let t=e.target.dataset;if(t)if(t.external){let t=e.target.textContent;i.shell.openExternal(t)}else t.section&&B({section:t.section})}),document.addEventListener("mouseover",function(e){e.target.textContent&&(e.target.classList.contains("tibphrase")?1==e.shiftKey?function(e){let t=u(e),n=g()(e.textContent),o={top:t.top-40,left:t.left+15},s=r("#transcript");s.textContent=n,s.classList.remove("is-hidden"),d(o,s)}(e.target):W(e.target):e.target.classList.contains("tibwf")&&y(e.target))},!1),document.addEventListener("mouseleave",function(e){if(e.target.classList)if(e.target.classList.contains("tibphrase")){r("#transcript").classList.add("is-hidden")}else if(e.target.classList.contains("ambi")){Y("MOUSE LEAVE"),r("#ambi").classList.add("is-hidden")}},!1),document.addEventListener("keyup",function(e){r("#transcript").classList.add("is-hidden"),r("#ambi").classList.add("is-hidden")},!1),$.on("text-changed",()=>{let e=((e,t)=>{let n=new RegExp(G[e]);if(!n.test(t))return;let o=t.trim().replace(/᾽/g,"'"),i=o.split("'").join("");if(!n.test(i))return;let r=new RegExp("([.,!:;·།])"),l=o.replace(/\r?\n+/,"\n").split("\n"),c=(l.map(e=>e.split(r)),[]);return l.forEach(t=>{let o=[];t.split(r).forEach(t=>{if(r.test(t)){let e={text:t,punct:!0};o.push(e)}else{let i=t.split(n);(i=s.a.compact(i)).forEach(t=>{let s={text:t};!!n.test(t)&&(s[e]=!0),o.push(s)})}}),c.push(o)}),c})("tib",$.readText());e&&e.length&&B({section:"main",pars:e})}).startWatching(),function(){let e=q.get("cfg");e||(e=function(e,t){O("__ZERO CFG__");let n=L.resolve(e,"pouch"),o=w.readdirSync(n),s=[];return o.forEach((e,t)=>{if("cfg.json"==e)return;L.resolve(n,e);let o={name:e,active:!0,idx:t};s.push(o)}),q.set("cfg",s),O("__ZERO CFG__",s),s}(S))}()}]);
//# sourceMappingURL=app.js.map