!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=18)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("path")},,function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},function(e,t){e.exports=require("cholok")},,,,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("electron-is-dev")},function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),i=n(0);n(12);function s(e){return document.querySelector(e)}function c(e){return document.querySelectorAll(e)}function l(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}var u=n(7),a=n.n(u),p=n(8),f=n.n(p);const d=n(2);let h=n(14);const g=i.remote.app,m=(g.getAppPath(),g.getPath("userData")),x=i.remote.require("electron-settings"),v=console.log,E=n(20);let b=[],y=d.resolve(m,"pouch");function S(e){v("START GET POSSIBLE"),b.length||function(){let e=x.get("cfg");r.a.compact(e.map(e=>e.active?e.name:null)).forEach((e,t)=>{let n=d.resolve(m,"pouch",e),o=new E(n);o.dname=e,o.weight=t,b.push(o)})}(cfg)}h.ensureDirSync(y);const L={tsek:"་",connective:"འི",subordinative:"ར",narrative:"འོ",interrog:"འམ",coupling:"འི",ergative:"ས",concessive:"འང"},q=["འི","ར","འོ","འམ","འི","ས","འང"];console.log;function C(e){let t=function(e){let t,n,o=[];for(let r=1;r<e.length+1;r++){let i;t=e.slice(0,r).join(L.tsek),n=e.slice(r),o.push(t);for(let e=1;e<n.length+1;e++)i=n.slice(0,e).join(L.tsek),o.push(i)}return o}(r.a.compact(e.split(L.tsek))),n=[];return t.forEach(e=>{q.forEach(t=>{let o=new RegExp(t+"$"),r=e.replace(o,"");e!=r&&n.push(r)})}),t.concat(n)}const w=console.log;function j(e){if(!e||!e.pars||!e.pars.length)return;let t=e.pars;w("PARS",t);let n=s("#source"),o=s("#result");l(n),l(o),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=function(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}(e.text);e.tib&&n.classList.add("tibphrase"),e.punct&&n.classList.add("punct")," "==e.text&&n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});let r=c("span.tibetan");var i;1==r.length&&(i=r[0].textContent,w("ONLYWF",i))}const O=console.log,R=(n(4),n(0).remote.require("electron-settings")),A=n(13),{getCurrentWindow:P}=(n(14),n(2),n(5),n(0).remote);let T,k=[],z=0;function N(e){!function(){const e=document.querySelectorAll(".section.is-shown");Array.prototype.forEach.call(e,e=>{e.classList.remove("is-shown")})}(),s(["#",e].join("")).classList.add("is-shown")}function D(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){O("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),N(e.section),e.old||(e.old=!1,delete e.old,k.push(e),z=k.length-1);let n=s("#progress");"main"==t?(function(e){let t=R.get("split-sizes")||[50,50];T&&e.mono?T.collapse(1):T&&T.setSizes(t),T||(R.set("split-sizes",t),T=a()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){R.set("split-sizes",e),P().reload()}}),e.mono&&T.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),j(e)):n.classList.remove("is-shown"),e={section:"home"},R.set("state",e)}A.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(z<=0)return;z--;let e=k[z];e.old=!0,D(e)}():39==e.which&&function(){if(z>=k.length-1)return;z++;let e=k[z];e.old=!0,D(e)}()}),A.bind(["alt+1","alt+2"],function(e){}),A.bind(["esc"],function(e){});console.log;let _={zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ']+)"};const F=console.log;function J(e){F("PARSE STAR DICT")}function M(e){F("PARSE STAR CSV")}const W=n(0).remote.require("electron-settings"),B=(n(15),n(16),n(5),console.log),G=(n(2),n(4)),{dialog:I,getCurrentWindow:V}=n(0).remote;n(17);s("#new-version");let K=s("#container");c('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");K.appendChild(t.cloneNode(!0))}),i.ipcRenderer.on("section",function(e,t){D({section:t})}),i.ipcRenderer.on("action",function(e,t){"stardict"==t?I.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},J):"csv"==t?I.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},M):"cleanupdb"==t&&v("CLEAN UP")});let U=W.get("state");B("STATE1",U),D(U),document.addEventListener("click",e=>{let t=e.target.dataset;if(t)if(t.external){let t=e.target.textContent;i.shell.openExternal(t)}else t.section&&D({section:t.section})}),document.addEventListener("mouseover",function(e){if(e.target.textContent&&e.target.classList.contains("tibphrase"))if(1==e.shiftKey){let t=function(e){let t=e.getBoundingClientRect();return{top:t.top,left:t.left}}(e.target);!function(e,t){let n=f()(e),o={top:t.top-40,left:t.left+15},r=s("#transcript");r.textContent=n,r.classList.remove("is-hidden"),function(e,t){let n=[e.top,"px"].join(""),o=[e.left,"px"].join("");t.style.top=n,t.style.left=o}(o,r)}(e.target.textContent,t)}else!function(e){let t=C(e);w("keys:",t.length),S()}(e.target.textContent)},!1),document.addEventListener("mouseout",function(e){if(e.target.classList.contains("tibphrase")){s("#transcript").classList.add("is-hidden")}},!1),document.addEventListener("keyup",function(e){s("#transcript").classList.add("is-hidden")},!1),G.on("text-changed",()=>{let e=((e,t)=>{let n=new RegExp(_[e]);if(!n.test(t))return;let o=t.trim().replace(/᾽/g,"'"),i=o.split("'").join("");if(!n.test(i))return;let s=new RegExp("([.,!:;·།])"),c=o.replace(/\r?\n+/,"\n").split("\n"),l=(c.map(e=>e.split(s)),[]);return c.forEach(t=>{let o=[];t.split(s).forEach(t=>{if(s.test(t)){let e={text:t,punct:!0};o.push(e)}else{let i=t.split(n);(i=r.a.compact(i)).forEach(t=>{let r={text:t};!!n.test(t)&&(r[e]=!0),o.push(r)})}}),l.push(o)}),l})("tib",G.readText());e&&e.length&&D({section:"main",pars:e})}).startWatching(),B("CFG",function(){let e=x.get("cfg");return e||(e=function(e,t){let n=d.resolve(e,"pouch"),o=h.readdirSync(n),r=[];return o.forEach((e,t)=>{if("cfg.json"==e)return;d.resolve(n,e);let o={name:e,active:!0,idx:t};r.push(o)}),x.set("cfg",r),r}(m)),e}())},,function(e,t){e.exports=require("pouchdb")}]);
//# sourceMappingURL=app.js.map