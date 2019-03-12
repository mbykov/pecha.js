!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=31)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("lodash")},function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return i});const r={tsek:"་"},i=["འི","ར","འོ","འམ","འི","ས","འང"]},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(1),i=(console.log,n(5)("app"),{zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ' ]+)"});t.default=function(e,t){var n=new RegExp(i[t]);if(n.test(e)){var o=e.trim().replace(/᾽/g,"'"),l=o.split("'").join("");if(n.test(l)){var s=new RegExp("([.,!:;·།])"),a=o.replace(/\r?\n+/,"\n").split("\n"),c=(a.map(function(e){return e.split(s)}),[]);return a.forEach(function(e){var i=[];e.split(s).forEach(function(e){if(s.test(e)){var o={text:e,punct:!0};i.push(o)}else{var l=e.split(n);(l=r.compact(l)).forEach(function(e){if(e=e.trim()){var r={text:e};!!n.test(e)&&(r.lang=t),i.push(r)}})}}),c.push(i)}),c}}}},function(e,t){e.exports=require("debug")},function(e,t){e.exports=require("electron-settings")},,function(e,t){e.exports=require("electron-is-dev")},function(e,t){e.exports=require("pouchdb")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=[];return function(e){var t=e.split(""),n=[],r=[];t.forEach(function(e){if(l.letter[e]||l.lower[e]||l.vowel[e])r.push(e);else{r.length&&n.push({tib:r}),r=[];var t=void 0;t=e==l.tsek?{space:"."}:e==l.shad?{space:"|"}:{space:e},n.push(t)}}),r.length&&n.push({tib:r});return n}(e).forEach(function(e,r){if(e.tib){var i=function(e,t){if(s("DATA:",e),e.errs.length)return"unreal sequence";var n,r,i={},d=[],u=void 0;if(e.prefix){var p=l.letter[e.prefix];3==(u=c(e.main)).col?u.trl=l.voiced[u.row]:4==u.col&&u.row<5&&(u.trl=l.nasalHigh[u.row]);var f=[p.trl,"ao"].join("");l.maa.includes(e.prefix)&&(u.trl=["`",u.trl].join("")),f=l.a==e.prefix?[p.trl,"o"].join(""):[p.trl,"ao"].join(""),"ད"==e.prefix&&"བ"==e.main&&(u.trl="w"),d.push(f)}if(e.superfix){var h=l.letter[e.superfix],v=[h.trl,"a"].join("");d.push(v),3==(n=e.main,r=l.lower[n],u=r?o.default.clone(r):{trl:n}).col?u.trl=l.voiced[u.row]:4==u.col&&(u.trl=l.nasalHigh[u.row]);var m=[u.trl,"a"].join(""),g=[m,"tak"].join("");d.push(g),"l"==h.trl&&"h"==u.trl&&(u.trl="hl")}else u||(u=c(e.main));i.main=u;var w=[u.trl,"a"].join("");if(d.push(w),e.wasur&&d.push("wasur"),e.subfix){var x=l.lower[e.subfix],b=[x.trl,"a"].join(""),y=[b,"tak"].join("");d.push(y),"ྱ"==e.subfix?4==u.row?(i.main.trl=l.up2rows[u.col],"ད"==e.prefix&&"བ"==e.main&&(u.trl="y")):i.main.trl=[i.main.trl,x.trl].join(""):"ླ"==e.subfix&&("ཟ"==e.main?i.main.trl="nd":i.main.trl="l"),"ྲ"==e.subfix&&(l.sama.includes(e.main)||[1,3].includes(u.row)&&(i.main.trl="ṫ")),d.push(a(i))}if(e.vow){var C=o.default.clone(l.vowel[e.vow]);d.push(C.descr),"ད"!=e.prefix||"བ"!=e.main||e.subfix||(u.trl="");var L=[u.trl,C.trl].join("");i.vow=C,d.push(L)}else i.vow={trl:"a"};if(e.suffix){var E=c(e.suffix);if(i.suffix=E,e.avow){var O=l.vowel[e.avow];s("Avow",O,"Stack",d,"Res",i),e.suffix==l.a&&(i.vow=null,d.push(i.suffix.trl),d.push(O.descr),d.push(O.trl),"i"==O.trl?i.suffix.trl="ä:":i.suffix.trl=O.trl),s("Stack2",d),s("PRETTY",a(i))}else{var R=[E.trl,"a"].join("");if(l.kanapamara.includes(e.suffix));else if(l.tanalasa.includes(e.suffix))i.vow.trl=l.umlaut[i.vow.trl]||i.vow.trl;else{if(l.a!=e.suffix)return"IMPOSSIBLE SUFFIX";R=E.trl}d.push(R)}if(l.tasa.includes(e.suffix)&&(i.suffix=null),e.secsuf){var S=l.letter[e.secsuf],j=[S.trl,"a"].join("");d.push(j)}d.push(a(i))}var k=t?d.join("-"):a(i);return e.quest&&(k=[k,e.quest.trl].join("")),k=k.replace("aa","a").replace("aä","ä")}(function(e){var t,n=void 0,r=e.tib,i=void 0,s=void 0,a=void 0,c=[],d=void 0,u=void 0,p=void 0,f=[],h=void 0,v=o.default.last(r),m=r[r.length-2];t=v,o.default.keys(l.vowel).includes(t)?l.a==m&&(p=v,r.pop()):m==l.a&&v==l.maa[0]&&(r.pop(),r.pop(),h={trl:"am"});var g=o.default.intersection(r,o.default.keys(l.vowel)),w=void 0,x=void 0;if(1==g.length)w=g[0],x=r.indexOf(w);else if(g.length>1)return{errs:["TOO MANY VOWELS"]};var b=r.includes(l.wasur),y=o.default.intersection(r,o.default.keys(l.lower)),C=o.default.intersection(r,l.yaralaa),L=void 0,E=void 0;if(1==C.length&&(L=C[0],E=r.indexOf(L)),b){var O=r.indexOf(l.wasur);n="wasur",i=r[O-1],s=r[O-2],f=r.slice(O+1)}else if(y.length){n=1;var R=y[0],S=r.indexOf(R);if(c=r.slice(0,S),w&&L)n="vow&&sub",L=r[x-1],i=r[x-2],c=r.slice(0,x-2),f=r.slice(x+1);else if(w)n=3,i=r[x-1],c=r.slice(0,x-1),f=r.slice(x+1);else if(L)n="sub",i=r[E-1],c=r.slice(0,E-1),f=r.slice(E+1);else{n=4;var j=y.slice(-1)[0],k=r.indexOf(j);i=r[k],c=r.slice(0,k),f=r.slice(k+1)}}else if(L)n=8,i=r[E-1],c=r.slice(0,E-1),f=w?r.slice(x+1):r.slice(E+1),l.a;else if(w)n=5,i=r[x-1],c=r.slice(0,x-1),f=r.slice(x+1),l.a;else{if(n=6,r.length>4)throw new Error("TOO MANY SYMS IN PLAIN WF");1==r.length?i=r[0]:2==r.length?(n=7,i=r[0],d=r[1]):3!=r.length&&4!=r.length||(n=9,s=r[0],i=r[1],f=r.slice(2))}c&&c.length&&(2==c.length?(s=c[0],l.ralasa.includes(c[1])&&(a=c[1])):c&&1==c.length&&(l.ralasa.includes(c[0])?a=c[0]:s=c[0])),f&&f.length&&(2==f.length?(d=f[0],u=f[1]):1==f.length&&(d=f[0]));var N={point:n,prefix:s,superfix:a,main:i,subfix:L,vow:w,suffix:d,secsuf:u,errs:[],syms:r};for(var q in b&&(N.wasur=!0),p&&(N.avow=p),h&&(N.quest=h),N)N[q]||delete N[q];return c&&c.length>2&&N.errs.push("TOO MANY PREFS"),C.length>1&&N.errs.push("TOO MANY SUBFIXES"),f.length>2&&N.errs.push("TOO MANY SUFFIXES"),i||N.errs.push("NO MAIN!"),N}(e),t);n.push(i)}else n.push(e.space)}),n.join("")};var r,i=n(1),o=(r=i)&&r.__esModule?r:{default:r},l=n(25);console.log;var s=n(5)("app");function a(e){e.vow||(e.vow={trl:"a"});var t=e.main.trl;return t=[t,e.vow.trl].join(""),e.suffix&&(t=[t,e.suffix.trl].join("")),t}function c(e){var t=l.letter[e];return t?o.default.clone(t):{trl:e}}},function(e,t){e.exports=require("electron-clipboard-extended")},function(e,t){e.exports=require("slash")},,function(e,t){e.exports=require("split.js")},,,,,,,,,,function(e,t){e.exports=require("util")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.tsek="་",t.shad="།",t.ralasa=["ར","ལ","ས"],t.kanatanapamaaralasa=["ག","ང","ད","ན","བ","མ","འ","ར","ལ","ས"],t.kanapamara=["ག","ང","བ","མ","ར"],t.tanalasa=["ད","ན","ལ","ས"],t.tasa=["ད","ས"],t.sa=["ས"],t.maa=["མ","འ"],t.a="འ",t.sama=["ས","མ"],t.la=["ལ"],t.yaralaa=["ྱ","ྲ","ླ","ྰ"],t.wasur="ྭ",t.umlaut={a:"ä",u:"ü",o:"ö"},t.voiced={1:"g",2:"j",3:"d",4:"b",5:"dz"},t.nasalHigh={1:"ŋ",2:"ñ",3:"n",4:"m"},t.up2rows={1:"c",2:"cʰ",3:"c̣ʰ",4:"ṇ̃"};var r=t.letter={},i=t.lower={},o=t.vowel={};i["ྐ"]={trl:"k",row:1,col:1},i["ྑ"]={trl:"kʰ",row:1,col:2},i["ྒ"]={trl:"ḳʰ",row:1,col:3},i["ྔ"]={trl:"ŋ",row:1,col:4},i["ྕ"]={trl:"c",row:2,col:1},i["ྖ"]={trl:"cʰ",row:2,col:2},i["ྗ"]={trl:"c̣ʰ",row:2,col:3},i["ྙ"]={trl:"ṇ̃",row:2,col:4},i["ྟ"]={trl:"t",row:3,col:1},i["ྠ"]={trl:"tʰ",row:3,col:2},i["ྡ"]={trl:"ṭʰ",row:3,col:3},i["ྣ"]={trl:"n",row:3,col:4},i["ྤ"]={trl:"p",row:4,col:1},i["ྥ"]={trl:"pʰ",row:4,col:2},i["ྦ"]={trl:"p̣ʰ",row:4,col:3},i["ྨ"]={trl:"ṃ",row:4,col:4},i["ྩ"]={trl:"ç",row:5,col:1},i["ྪ"]={trl:"çʰ",row:5,col:2},i["ྫ"]={trl:"ç̣ʰ",row:5,col:3},i["ྱ"]={trl:"y",row:6,col:4},i["ྲ"]={trl:"r",row:7,col:1},i["ླ"]={trl:"l",row:7,col:2},i["ྷ"]={trl:"h",row:8,col:1},i[""]={trl:"",row:1,col:1},i[""]={trl:"",row:1,col:1},r["ཀ"]={trl:"k",row:1,col:1},r["ཁ"]={trl:"kʰ",row:1,col:2},r["ག"]={trl:"ḳʰ",row:1,col:3},r["ང"]={trl:"ŋ",row:1,col:4},r["ཅ"]={trl:"c",row:2,col:1},r["ཆ"]={trl:"cʰ",row:2,col:2},r["ཇ"]={trl:"c̣ʰ",row:2,col:3},r["ཉ"]={trl:"ñ",row:2,col:4},r["ཏ"]={trl:"t",row:3,col:1},r["ཐ"]={trl:"tʰ",row:3,col:2},r["ད"]={trl:"ṭʰ",row:3,col:3},r["ན"]={trl:"n",row:3,col:4},r["པ"]={trl:"p",row:4,col:1},r["ཕ"]={trl:"pʰ",row:4,col:2},r["བ"]={trl:"p̣ʰ",row:4,col:3},r["མ"]={trl:"m",row:4,col:4},r["ཙ"]={trl:"ç",row:5,col:1},r["ཚ"]={trl:"çʰ",row:5,col:2},r["ཛ"]={trl:"ç̣ʰ",row:5,col:3},r["ཝ"]={trl:"w",row:5,col:4},r["ཞ"]={trl:"ṣ̂",row:6,col:1},r["ཟ"]={trl:"ṣ",row:6,col:2},r["འ"]={trl:"a",row:6,col:3},r["ཡ"]={trl:"y",row:6,col:4},r["ར"]={trl:"r",row:7,col:1},r["ལ"]={trl:"l",row:7,col:2},r["ཤ"]={trl:"ŝ",row:7,col:3},r["ས"]={trl:"s",row:7,col:4},r["ཧ"]={trl:"h",row:8,col:1},r["ཨ"]={trl:"a",row:8,col:2},o["ཱ"]={trl:"a",descr:"a-chung"},o["ི"]={trl:"i",descr:"kiku"},o["ུ"]={trl:"u",descr:"ŝapkyu"},o["ོ"]={trl:"o",descr:"naro"},o["ེ"]={trl:"e",descr:"ḋeŋbu"}},function(e,t){e.exports=require("pouchdb-authentication")},function(e,t){e.exports=require("mousetrap")},function(e,t){e.exports=require("json5")},function(e,t){e.exports=require("axios")},,function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),o=n(0);n(24);function l(e){return document.querySelector(e)}function s(e){return document.querySelectorAll(e)}function a(e,t){let n=document.createElement(e);return t&&n.classList.add(t),n}function c(e,t){let n=document.createElement("span");return n.textContent=e,t&&n.classList.add(t),n}function d(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.lastChild)}function u(e){return e.getBoundingClientRect()}function p(e,t){let n=[e.top,"px"].join(""),r=[e.left,"px"].join("");t.style.top=n,t.style.left=r}function f(){return[].slice.call(document.querySelectorAll(":hover")).pop()}var h=n(14),v=n.n(h),m=n(10),g=n.n(m),w=n(2);const x=n(0).remote.require("electron-settings");let b=w.b.tsek;const y=console.log;function C(e){let t=e.pars,n=l("#source"),r=l("#result");d(n),d(r),t.forEach(e=>{let t=function(e,t){let n=document.createElement("p");return n.textContent=e,t&&n.classList.add(t),n}();t.classList.add("tibpar"),e.forEach(e=>{let n=c(e.text);e.lang?n.classList.add("tibphrase"):e.punct?n.classList.add("punct"):n.classList.add("space"),t.appendChild(n)}),n.appendChild(t)});s("span.tibetan")}function L(e,t){let n=u(e),r=t?g()(e.textContent,!0):g()(e.textContent),i={top:n.top-40,left:n.left+15},o=l("#transcript");o.textContent=r,o.classList.remove("is-hidden"),p(i,o)}function E(e,t){let n;try{n=JSON.parse(e.dataset.chains)}catch(t){return void y("ERR: JSON chains",e)}let r=!e.closest(".tibpar"),i=function(e,t){let n;t?((n=a("div","popup")).classList.add("upper"),document.body.appendChild(n)):n=l("#ambi");let r=u(e);d(n),n.classList.remove("is-hidden"),p({top:r.bottom-3,left:r.left},n);let i=a("ul","ambilist");return n.appendChild(i),i}(e,r);t?function(e,t){t.forEach(t=>{let n,r=a("li","ambiline");e.appendChild(r),t.ambi?(n=c(t.seg,"tibambi")).dataset.chains=JSON.stringify(t.chains):t.docs.length?(n=c(t.seg,"tibwf")).dataset.docs=JSON.stringify(t.docs):n=c(t.seg,"tibphrase"),r.appendChild(n)})}(i,n):function(e,t){e.classList.add("danger"),t.forEach(t=>{let n=a("li","ambiline");e.appendChild(n),t.forEach(e=>{let t=e.docs.length?c(e.seg,"tibwf"):c(e.seg,"tibphrase");e.docs.length&&(t.dataset.docs=JSON.stringify(e.docs)),n.appendChild(t)})})}(i,n)}function O(e,t){l("#progress").classList.remove("is-hidden");let n=e.textContent.trim(),r=new RegExp(b+"$"),s={str:n.replace(r,""),compound:t,lastsek:i.a.last(n)==b};o.ipcRenderer.send("queryDBs",s)}o.ipcRenderer.on("replayDBs",function(e,t){l("#progress").classList.add("is-hidden");let n=t.chain,r=f();n&&(t.compound?(r.dataset.chains=JSON.stringify(n),E(r,!0)):function(e,t,n){e&&(e.textContent="",t.forEach((n,r)=>{let i;n.ambi?(i=c(n.seg,"tibambi")).dataset.chains=JSON.stringify(n.chains):n.docs.length?(i=c(n.seg,"tibwf")).dataset.docs=JSON.stringify(n.docs):i=c(n.seg,"tibphrase"),e.appendChild(i),r<t.length-1&&e.appendChild(c(b,"tsek"))}),n&&e.appendChild(c(b,"tsek")))}(r,n,t.lastsek))});console.log;const R=n(6);function S(e){let t=l("#cloneERR"),n=l("#progress");e?n.classList.add("is-hidden"):t.classList.remove("is-hidden")}function j(){let e=R.get("cfg"),t=e.map(e=>e.name),n=l("#adictmessage");t.length&&(n.textContent="click dict's name to move it first");let r=l("#local-dicts-table tbody");d(r),e.forEach(e=>{let t=e.dname,n=a("tr");r.appendChild(n);let o=a("td","dictname");n.appendChild(o),o.textContent=i.a.capitalize(t),o.dataset.firstdict=t;let l=a("td","active-dict");if(e.active){let e=k();l.appendChild(e)}else l.textContent="activate";l.dataset.activedict=t,n.appendChild(l);let s=a("td","dictcsv");s.textContent="toCSV",s.dataset.csv=t,n.appendChild(s)})}function k(){let e=a("img","dict-check");return e.setAttribute("src","../resources/check.png"),e}o.ipcRenderer.on("remoteDictsReply",function(e,t){S(t),function(e){let t=R.get("cfg"),n=["_users"],r=t.map(e=>e.dname),o=i.a.uniq(n.concat(r)),s=l("#server-dicts-table tbody");d(s),e.forEach(e=>{if(n.includes(e.dname))return;let t=a("tr");s.appendChild(t);let r=a("td");t.appendChild(r),r.textContent=i.a.capitalize(e.dname);let l=a("td","dsize");l.textContent=i.a.capitalize(e.size),t.appendChild(l);let c=a("td","link");if(o.includes(e.dname)){let e=k();c.appendChild(e)}else c.textContent="sync";c.dataset.clone=e.dname,t.appendChild(c)})}(t)}),o.ipcRenderer.on("replicateReply",function(e,t){S(t);F({section:"activedicts"})}),o.ipcRenderer.on("csvReply",function(e,t){S(t);F({section:"activedicts"})}),o.ipcRenderer.on("cleanupReply",function(e,t){S(t);F({section:"clonedicts"})});const N=n(3),q=(n(6),console.log),P=n(9);P.plugin(n(26));const A=o.remote.app,M=(A.getAppPath(),A.getPath("userData")),_=console.log,z=(n(11),n(0).remote.require("electron-settings")),D=n(27),{getCurrentWindow:T}=(n(3),n(12),n(0).remote);let J,I=[],B=0;function F(e){try{e=JSON.parse(JSON.stringify(e))}catch(t){_("NAV-state ERR",t),e={}}let t=e.section||"home";t||(e.section="home"),function(e){K();const t=["#",e].join("");l(t).classList.remove("is-hidden"),l(t).classList.add("is-shown")}(e.section),e.old||(e.old=!1,delete e.old,I.push(e),B=I.length-1),"main"==t?(function(e){let t=z.get("split-sizes")||[50,50];J&&e.mono?J.collapse(1):J&&J.setSizes(t),J||(z.set("split-sizes",t),J=v()(["#source","#result"],{sizes:t,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(e){z.set("split-sizes",e),T().reload()}}),e.mono&&J.collapse(1),document.addEventListener("keydown",function(e){},!1),document.addEventListener("wheel",function(e){},!1))}(e),C(e)):"clonedicts"==t?o.ipcRenderer.send("remoteDicts",""):"activedicts"==t&&j(),l("#progress").classList.add("is-hidden"),z.set("state",e)}function K(){const e=s(".section");Array.prototype.forEach.call(e,e=>{e.classList.add("is-hidden"),e.classList.remove("is-shown")}),l("#transcript").classList.add("is-hidden"),l("#ambi").classList.add("is-hidden")}D.bind(["alt+left","alt+right"],function(e){37==e.which?function(){if(B<=0)return;B--;let e=I[B];e.old=!0,K(),F(e)}():39==e.which&&function(){if(B>=I.length-1)return;B++;let e=I[B];e.old=!0,K(),F(e)}()}),D.bind(["alt+1","alt+2"],function(e){}),D.bind(["esc"],function(e){}),D.bind(["ctrl+d"],function(e){o.ipcRenderer.send("scanLocalDict","/home/michael/diglossa.texts/Tibetan")}),D.bind(["ctrl+j"],function(e){let t="/home/michael/tibetan/utils/csv/csvdict.json";_("IMPORT",t),o.ipcRenderer.send("importcsv",t)}),D.bind(["ctrl+i"],function(e){o.ipcRenderer.send("infoDB","csvdict")}),D.bind(["ctrl+v"],function(e){o.ipcRenderer.send("infoDB","vasilyev")}),D.bind(["ctrl+u"],function(e){_("CLICK SIGNUP"),function(e){let t=new P("http://localhost:5984/mydb",{skip_setup:!0}),n=N.resolve(e,"pouch","auth");new P(n).sync(t,{live:!0,retry:!0}).on("error",console.log.bind(console)),t.signUp("batman","brucewayne",function(e,t){e&&("conflict"===e.name||e.name)}).then(function(e){q("SIGNUP RES",e)})}(M)});var Y=n(4),U=n.n(Y);n.d(t,"scrollPane",function(){return ee});const W=n(0).remote.require("electron-settings"),H=(n(28),n(29)),V=(n(12),console.log,n(3),n(11)),{dialog:X,getCurrentWindow:G}=n(0).remote;n(8);l("#new-version");let $=l("#progress"),Q=l("#container");s('link[rel="import"]').forEach(e=>{let t=e.import.querySelector(".section");Q.appendChild(t.cloneNode(!0))}),o.ipcRenderer.on("version",function(e,t){H.get("https://api.github.com/repos/mbykov/pecha.js/releases/latest").then(function(e){if(!e||!e.data)return;let n=e.data.name;if(t&&n&&n>t){let e=l("#new-version"),t=["new version available:",n].join(" ");e.textContent=t,e.classList.remove("is-hidden")}}).catch(function(e){console.log("API ERR")})}),o.ipcRenderer.on("section",function(e,t){F({section:t})}),o.ipcRenderer.on("reread",function(e){let t=W.get("state");G().reload(),F(t)});let Z=W.get("state");function ee(e,t){if(1==e.shiftKey)return;let n=e.deltaY>0?24:-24,r=l(".section.is-shown");r&&(r.scrollTop+=n)}function te(e){if(!e)return;let t=e[0];t&&($.classList.remove("is-hidden"),o.ipcRenderer.send("scanLocalDict",t))}function ne(e){if(!e)return;let t=e[0];t&&($.classList.remove("is-hidden"),o.ipcRenderer.send("import-from-csv",t))}Z||(Z={section:"home"}),F(Z),document.addEventListener("click",e=>{let t=e.target.dataset;if(!t)return;let n=e.target.parentElement;if(e.target.classList.contains("external")){let t=e.target.textContent;o.shell.openExternal(t)}else t.section?F({section:t.section}):t.clone?($.classList.remove("is-hidden"),o.ipcRenderer.send("replicate",t.clone)):t.firstdict?function(e){let t=R.get("cfg"),n=i.a.find(t,t=>t.dname==e),r=i.a.reject(t,t=>t.dname==e);r.unshift(n),(t=r).forEach((e,t)=>{e.idx=t}),R.set("cfg",t),j()}(t.firstdict):t.activedict?function(e){let t=R.get("cfg"),n=i.a.find(t,t=>t.dname==e.dataset.activedict),r=k();e.textContent?(e.textContent="",e.appendChild(r),n.active=!0):(d(e),e.textContent="activate",n.active=!1),R.set("cfg",t)}(e.target):t.csv?($.classList.remove("is-hidden"),o.ipcRenderer.send("export-to-csv",t.csv)):n&&n.dataset&&n.dataset.activedict||("cleanupdb"==e.target.id?o.ipcRenderer.send("cleanupDB"):"scandir"==e.target.id?X.showOpenDialog({properties:["openDirectory"]},te):"importcsv"==e.target.id?X.showOpenDialog({properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]},ne):t.docs&&O(e.target,!0))}),document.addEventListener("mouseover",function(e){if(!e.target.textContent)return;if(1==e.ctrlKey)return;e.target.closest(".tibpar")&&s(".popup").forEach(e=>{e.classList.add("is-hidden")}),e.target.classList.contains("tibphrase")?1==e.shiftKey||O(e.target):e.target.classList.contains("tibwf")?function(e){l("#source");let t=l("#result");d(t);let n=e.textContent,r=JSON.parse(e.dataset.docs);try{r=JSON.parse(e.dataset.docs)}catch(e){return void y("ERR: JSON docs",e)}let o=x.get("cfg");r.forEach(e=>{e.weight=i.a.find(o,t=>e.dname==t.dname).idx}),r=i.a.sortBy(r,"weight");let s=a("div","dict");t.appendChild(s);let c=a("p","dict-wf");c.textContent=n,s.appendChild(c),r.forEach(e=>{let t=a("p","dict-dname");t.textContent=e.dname,s.appendChild(t);let n=a("p","dict-article");n.textContent=e.dict,s.appendChild(n);let r=a("ul","dict-ul");s.appendChild(r),e.trns||y("NO TRNS",e),e.trns&&e.trns.forEach(e=>{let t=a("li","dict-line");t.textContent=e,r.appendChild(t)})})}(e.target):e.target.classList.contains("tibambi")&&E(e.target)},!1),document.addEventListener("mouseleave",function(e){if(e.target.classList&&1!=e.ctrlKey&&e.target.classList.contains("tibphrase")){l("#transcript").classList.add("is-hidden")}},!1),document.addEventListener("keyup",function(e){if(1==e.ctrlKey)return;l("#transcript").classList.add("is-hidden")},!1),document.addEventListener("keydown",function(e){if(1!=e.shiftKey)return;let t=f();if(!t)return;"source"==t.id&&(t=l(".tibpar"));let n=t.textContent;U()(n,"tib")&&(L(t),1==e.ctrlKey&&L(t,!0))},!1),document.addEventListener("wheel",function(e){ee(e,Z)},!1),V.on("text-changed",()=>{let e=V.readText(),t=U()(e,"tib");t&&t.length&&F({section:"main",pars:t})}).startWatching(),o.ipcRenderer.on("scanLocalReply",function(e,t){$.classList.add("is-hidden"),F({section:"publish",datapath:t})})}]);
//# sourceMappingURL=app.js.map