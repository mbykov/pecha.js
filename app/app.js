!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=19)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("path")},,function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},function(e,t){e.exports=require("cholok")},,,,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("pouchdb")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("electron-is-dev")},function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),i=n(0);n(13);function s(e){return document.querySelector(e)}function c(e){return document.querySelectorAll(e)}function l(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}var a=n(8),u=n.n(a),f=n(9),p=n.n(f);const d=console.log;function h(e){if(!e||!e.pars||!e.pars.length)return;let t=e.pars,n=s("#source"),o=s("#result");l(n),l(o),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=function(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}(e.text);e.tib&&n.classList.add("tibphrase"),e.punct&&n.classList.add("punct")," "==e.text&&n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});let r=c("span.tibetan");var i;1==r.length&&(i=r[0].textContent,d("ONLYWF",i))}const g=n(2);let m=n(4);const x=i.remote.app,v=(x.getAppPath(),x.getPath("userData")),E=i.remote.require("electron-settings"),b=console.log,y=n(14);let w=[],C=g.resolve(v,"pouch");function S(e){return w.length||L(),function(e){return Promise.all(w.map(function(t){return t.allDocs({keys:e,include_docs:!0}).then(function(e){if(!e||!e.rows)throw new Error("no dbn result");let n=r.a.compact(e.rows.map(e=>e.doc)),o=r.a.flatten(r.a.compact(n.map(e=>e.docs)));return o.length?(o.forEach(e=>{e.dname=t.dname,e.weight=t.weight}),o):[]}).catch(function(e){console.log("ERR GET DBs",e)})}))}(e)}function L(){let e=E.get("cfg");b("===setDBs CFG===",e);let t=r.a.compact(e.map(e=>e.active?e.name:null));b("DBNS",t),t.forEach((e,t)=>{let n=g.resolve(v,"pouch",e),o=new y(n);o.dname=e,o.weight=t,w.push(o)})}m.ensureDirSync(C);const q=console.log,j=(n(5),n(0).remote.require("electron-settings")),O=n(15),{getCurrentWindow:R}=(n(4),n(2),n(6),n(0).remote);let k,D=[],N=0;function A(e){!function(){const e=document.querySelectorAll(".section.is-shown");Array.prototype.forEach.call(e,e=>{e.classList.remove("is-shown")})}(),s(["#",e].join("")).classList.add("is-shown")}function P(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){q("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),A(e.section),e.old||(e.old=!1,delete e.old,D.push(e),N=D.length-1);let n=s("#progress");"main"==t?(function(e){let t=j.get("split-sizes")||[50,50];k&&e.mono?k.collapse(1):k&&k.setSizes(t),k||(j.set("split-sizes",t),k=u()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){j.set("split-sizes",e),R().reload()}}),e.mono&&k.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),h(e)):n.classList.remove("is-shown"),e={section:"home"},j.set("state",e)}O.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(N<=0)return;N--;let e=D[N];e.old=!0,P(e)}():39==e.which&&function(){if(N>=D.length-1)return;N++;let e=D[N];e.old=!0,P(e)}()}),O.bind(["alt+1","alt+2"],function(e){}),O.bind(["esc"],function(e){}),O.bind(["ctrl+k"],function(e){q("CLICK CLONE"),function(){w.length||L();let e=w[0];b("DB-name",e.dname);let t=new y("http://localhost:5984/vasilyev");e.replicate.to(t).on("complete",function(){b("yay, were done!")}).on("error",function(e){b("boo, something went wrong!",e)})}()});console.log;let z={zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ']+)"};const T={tsek:"་",connective:"འི",subordinative:"ར",narrative:"འོ",interrog:"འམ",coupling:"འི",ergative:"ས",concessive:"འང"},_=["འི","ར","འོ","འམ","འི","ས","འང"];console.log;const B=console.log;function M(e){let t=function(e){let t,n,o=[];o.push([e.join(T.tsek)]);for(let i=1;i<e.length+1;i++){let s,c;t=e.slice(0,i).join(T.tsek),n=e.slice(i);for(let e=1;e<n.length+1;e++){let i=[t,s=n.slice(0,e).join(T.tsek),(c=n.slice(e)).join(T.tsek)];o.push(r.a.compact(i))}}return o}(r.a.compact(e.split(T.tsek))),n=function(e){let t=r.a.flatten(e),n=[];t.forEach(e=>{_.forEach(t=>{let o=new RegExp(t+"$"),r=e.replace(o,"");e!=r&&n.push(r)})});let o=t.concat(n);return r.a.uniq(o)}(t);B("MAIN pdchs:",t,n.length),S(n).then(e=>{e=r.a.flatten(e),B("DOCS",e);let n=function(e,t){let n=[];return e.forEach(e=>{let o=[],i=!1;e.forEach(e=>{let n=r.a.filter(t,t=>(function(e,t){if(e==t)return!0;let n=new RegExp("^"+t),o=e.replace(n,"");return!(e==o||!_.includes(o))})(e,t.dict));n.length&&(i=!0);let s={seg:e,docs:n};o.push(s)}),i&&n.push(o)}),n}(t,e);B("CHs",n);let o=function(e){let t=[];return e.forEach(e=>{let n=!0;e.forEach(e=>{e.docs.length||(n=!1)}),n&&t.push(e)}),t}(n);B("chains: ",n.length,"fulls: ",o.length),o.length&&(n=o),B("CHs",n)})}const F=console.log;function J(e){F("PARSE STAR DICT")}function W(e){F("PARSE STAR CSV")}const I=n(0).remote.require("electron-settings"),G=(n(16),n(17),n(6),console.log,n(2),n(5)),{dialog:H,getCurrentWindow:K}=n(0).remote;n(18);s("#new-version");let V=s("#container");c('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");V.appendChild(t.cloneNode(!0))}),i.ipcRenderer.on("section",function(e,t){P({section:t})}),i.ipcRenderer.on("action",function(e,t){"stardict"==t?H.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},J):"csv"==t?H.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["stardict"]}]},W):"cleanupdb"==t&&b("CLEAN UP")});let U=I.get("state");U||(U={section:"home"}),P(U),document.addEventListener("click",e=>{let t=e.target.dataset;if(t)if(t.external){let t=e.target.textContent;i.shell.openExternal(t)}else t.section&&P({section:t.section})}),document.addEventListener("mouseover",function(e){if(e.target.textContent&&e.target.classList.contains("tibphrase"))if(1==e.shiftKey){let t=function(e){let t=e.getBoundingClientRect();return{top:t.top,left:t.left}}(e.target);!function(e,t){let n=p()(e),o={top:t.top-40,left:t.left+15},r=s("#transcript");r.textContent=n,r.classList.remove("is-hidden"),function(e,t){let n=[e.top,"px"].join(""),o=[e.left,"px"].join("");t.style.top=n,t.style.left=o}(o,r)}(e.target.textContent,t)}else M(e.target.textContent)},!1),document.addEventListener("mouseout",function(e){if(e.target.classList.contains("tibphrase")){s("#transcript").classList.add("is-hidden")}},!1),document.addEventListener("keyup",function(e){s("#transcript").classList.add("is-hidden")},!1),G.on("text-changed",()=>{let e=((e,t)=>{let n=new RegExp(z[e]);if(!n.test(t))return;let o=t.trim().replace(/᾽/g,"'"),i=o.split("'").join("");if(!n.test(i))return;let s=new RegExp("([.,!:;·།])"),c=o.replace(/\r?\n+/,"\n").split("\n"),l=(c.map(e=>e.split(s)),[]);return c.forEach(t=>{let o=[];t.split(s).forEach(t=>{if(s.test(t)){let e={text:t,punct:!0};o.push(e)}else{let i=t.split(n);(i=r.a.compact(i)).forEach(t=>{let r={text:t};!!n.test(t)&&(r[e]=!0),o.push(r)})}}),l.push(o)}),l})("tib",G.readText());e&&e.length&&P({section:"main",pars:e})}).startWatching(),function(){let e=E.get("cfg");e||(e=function(e,t){let n=g.resolve(e,"pouch"),o=m.readdirSync(n),r=[];return o.forEach((e,t)=>{if("cfg.json"==e)return;g.resolve(n,e);let o={name:e,active:!0,idx:t};r.push(o)}),E.set("cfg",r),r}(v))}()}]);
//# sourceMappingURL=app.js.map