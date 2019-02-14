!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=19)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("path")},,function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},function(e,t){e.exports=require("cholok")},,,,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("pouchdb")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("electron-is-dev")},function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),i=n(0);n(13);function s(e){return document.querySelector(e)}function l(e){return document.querySelectorAll(e)}function c(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}function a(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}function u(e){let t=e.getBoundingClientRect();return{top:t.top,left:t.left}}var f=n(8),p=n.n(f),d=n(9),h=n.n(d);const g={tsek:"་",connective:"འི",subordinative:"ར",narrative:"འོ",interrog:"འམ",coupling:"འི",ergative:"ས",concessive:"འང"},m=["འི","ར","འོ","འམ","འི","ས","འང"],x=console.log;function v(e){if(!e||!e.pars||!e.pars.length)return;let t=e.pars,n=s("#source"),o=s("#result");a(n),a(o),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=c(e.text);e.tib&&n.classList.add("tibphrase"),e.punct&&n.classList.add("punct")," "==e.text&&n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});l("span.tibetan")}function E(e,t){1==t.length?function(e,t){e.textContent="",t.forEach((n,o)=>{let r=c(n.seg,"tibwf");if(e.appendChild(r),o<t.length-1){let t=c(g.tsek,"tibtsek");e.appendChild(t)}})}(e,t[0]):function(e,t){let n=u(e);x("SHOW AMBIS",n);let o=s("#ambis");o.textContent="kukuku",o.classList.remove("is-hidden")}(e),s("#progress").classList.remove("is-shown")}const b=n(2);let y=n(4);const C=i.remote.app,w=(C.getAppPath(),C.getPath("userData")),L=i.remote.require("electron-settings"),S=console.log,q=n(14);let O=[],R=b.resolve(w,"pouch");function j(e){return O.length||k(),function(e){return Promise.all(O.map(function(t){return t.allDocs({keys:e,include_docs:!0}).then(function(e){if(!e||!e.rows)throw new Error("no dbn result");let n=r.a.compact(e.rows.map(e=>e.doc)),o=r.a.flatten(r.a.compact(n.map(e=>e.docs)));return o.length?(o.forEach(e=>{e.dname=t.dname,e.weight=t.weight}),o):[]}).catch(function(e){console.log("ERR GET DBs",e)})}))}(e)}function k(){let e=L.get("cfg");S("===setDBs CFG===",e),r.a.compact(e.map(e=>e.active?e.name:null)).forEach((e,t)=>{let n=b.resolve(w,"pouch",e),o=new q(n);o.dname=e,o.weight=t,O.push(o)})}y.ensureDirSync(R);const _=console.log,A=(n(5),n(0).remote.require("electron-settings")),D=n(15),{getCurrentWindow:N}=(n(4),n(2),n(6),n(0).remote);let P,z=[],F=0;function M(e){!function(){const e=document.querySelectorAll(".section.is-shown");Array.prototype.forEach.call(e,e=>{e.classList.remove("is-shown")})}(),s(["#",e].join("")).classList.add("is-shown")}function T(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){_("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),M(e.section),e.old||(e.old=!1,delete e.old,z.push(e),F=z.length-1);let n=s("#progress");"main"==t?(function(e){let t=A.get("split-sizes")||[50,50];P&&e.mono?P.collapse(1):P&&P.setSizes(t),P||(A.set("split-sizes",t),P=p()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){A.set("split-sizes",e),N().reload()}}),e.mono&&P.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),v(e)):n.classList.remove("is-shown"),e={section:"home"},A.set("state",e)}D.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(F<=0)return;F--;let e=z[F];e.old=!0,T(e)}():39==e.which&&function(){if(F>=z.length-1)return;F++;let e=z[F];e.old=!0,T(e)}()}),D.bind(["alt+1","alt+2"],function(e){}),D.bind(["esc"],function(e){}),D.bind(["ctrl+k"],function(e){_("CLICK CLONE"),function(){O.length||k();let e=r.a.find(O,e=>"vasilyev"==e.dname);S("DB-name",e.dname);let t=new q("http://localhost:5984/vasilyev");e.replicate.to(t).on("complete",function(){S("yay, were done!")}).on("error",function(e){S("boo, something went wrong!",e)})}()}),D.bind(["ctrl+p"],function(e){_("ZERO CFG"),A.set("cfg","")});console.log;let B={zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ']+)"};const G=console.log,I=g.tsek;function J(e){let t,n,o=[];for(let r=1;r<e.length+1;r++){let i={head:t=e.slice(0,r),tail:n=e.slice(r)};n.length&&o.push(i)}return o.reverse()}const W=console.log;function H(e){s("#progress").classList.add("is-shown");let t=e.textContent.trim(),n=(t.split(g.tsek),function(e){let t=e.split(I),n=e,o=(t.length,[[t]]);!function e(t,i){J(t).forEach(t=>{i.push(t.head),i.push(t.tail),r.a.flatten(i).join(I)==n&&(o.push(r.a.clone(i)),i.pop()),i.length<2&&e(t.tail,i),i.pop()})}(t,[]);let i=[];return o.forEach(e=>{let t=[];e.forEach(e=>{t.push(e.join(I))}),i.push(t)}),i}(t)),o=function(e){return G("totalKeys"),r.a.uniq(r.a.flatten(e))}(n);W("MAIN keys:",o.length),j(o).then(t=>{W("UNFDOCS",t),t=r.a.flatten(t),W("DOCS",t);let o=function(e,t){let n=[];return e.forEach(e=>{let o=[],i=!1;e.forEach(e=>{let n=r.a.filter(t,t=>(function(e,t){if(e==t)return!0;let n=new RegExp("^"+t),o=e.replace(n,"");return!(e==o||!m.includes(o))})(e,t.dict));n.length&&(i=!0);let s={seg:e,docs:n};o.push(s)}),i&&n.push(o)}),n}(n,t);W("CHs",o.length);let i=function(e){let t=[];return e.forEach(e=>{let n=!0;e.forEach(e=>{e.docs.length||(n=!1)}),n&&t.push(e)}),t}(o);W("chains: ",o.length,"fulls: ",i.length),i.length&&(o=i),W("CHs",o);let s=function(e){let t=r.a.max(e.map(e=>r.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length));return W("MAX",t),r.a.filter(e,e=>r.a.sum(e.map(e=>e.docs.length?e.seg.length:0))/e.length>=t-1)}(o);W("bests =>",s.length,s),E(e,s)})}const K=console.log;function Z(e){K("PARSE STAR DICT")}function U(e){K("PARSE STAR CSV")}const V=n(0).remote.require("electron-settings"),X=(n(16),n(17),n(6),console.log,n(2),n(5)),{dialog:Q,getCurrentWindow:Y}=n(0).remote;n(18);s("#new-version");let $=s("#container");l('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");$.appendChild(t.cloneNode(!0))}),i.ipcRenderer.on("section",function(e,t){T({section:t})}),i.ipcRenderer.on("action",function(e,t){"stardict"==t?Q.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},Z):"csv"==t?Q.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},U):"cleanupdb"==t&&S("CLEAN UP")});let ee=V.get("state");ee||(ee={section:"home"}),T(ee),document.addEventListener("click",e=>{let t=e.target.dataset;if(t)if(t.external){let t=e.target.textContent;i.shell.openExternal(t)}else t.section&&T({section:t.section})}),document.addEventListener("mouseover",function(e){e.target.textContent&&e.target.classList.contains("tibphrase")&&(1==e.shiftKey?function(e){let t=u(e),n=h()(e.textContent),o={top:t.top-40,left:t.left+15},r=s("#transcript");r.textContent=n,r.classList.remove("is-hidden"),function(e,t){let n=[e.top,"px"].join(""),o=[e.left,"px"].join("");t.style.top=n,t.style.left=o}(o,r)}(e.target):H(e.target))},!1),document.addEventListener("mouseout",function(e){if(e.target.classList.contains("tibphrase")){s("#transcript").classList.add("is-hidden"),s("#ambis").classList.add("is-hidden")}},!1),document.addEventListener("keyup",function(e){s("#transcript").classList.add("is-hidden"),s("#ambis").classList.add("is-hidden")},!1),X.on("text-changed",()=>{let e=((e,t)=>{let n=new RegExp(B[e]);if(!n.test(t))return;let o=t.trim().replace(/᾽/g,"'"),i=o.split("'").join("");if(!n.test(i))return;let s=new RegExp("([.,!:;·།])"),l=o.replace(/\r?\n+/,"\n").split("\n"),c=(l.map(e=>e.split(s)),[]);return l.forEach(t=>{let o=[];t.split(s).forEach(t=>{if(s.test(t)){let e={text:t,punct:!0};o.push(e)}else{let i=t.split(n);(i=r.a.compact(i)).forEach(t=>{let r={text:t};!!n.test(t)&&(r[e]=!0),o.push(r)})}}),c.push(o)}),c})("tib",X.readText());e&&e.length&&T({section:"main",pars:e})}).startWatching(),function(){let e=L.get("cfg");e||(e=function(e,t){S("__ZERO CFG__");let n=b.resolve(e,"pouch"),o=y.readdirSync(n),r=[];return o.forEach((e,t)=>{if("cfg.json"==e)return;b.resolve(n,e);let o={name:e,active:!0,idx:t};r.push(o)}),L.set("cfg",r),S("__ZERO CFG__",r),r}(w))}()}]);
//# sourceMappingURL=app.js.map