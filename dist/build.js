var app=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const n=new class{constructor(){}render(e,t){e.innerHTML=`\n      <div class="slider_handle"></div>\n      <div class="test">\n        ${t.map(e=>`<div class='dot' style='left: ${e.x}px; top: ${e.y}px'></div>`).join("")}\n      </div>\n    `}createArray(e,t,r){const n=(t-e)/r,o=[e];for(let e=1;e<=r;e++)o.push(o[e-1]+n);return o}findCurveLength(e,t){const r=t||e.length-1;return e.slice(0,r+1).reduce((e,t,r,n)=>e+(0===r?0:Math.sqrt(Math.pow(t.x-n[r-1].x,2)+Math.pow(t.y-n[r-1].y,2))),0)}init(e,t){let r;const n=100,o=20;if("circle"===t.type.curve){const e=t.type.r;r=this.createArray(0,360,n).map(e=>e*Math.PI/180).map((t,r)=>{return{x:200+e*Math.cos(t),y:200+e*Math.sin(t)}})}if("spiral"===t.type.curve){const{fi1:e,fi2:o,r1:i,r2:u}=t.type;r=this.createArray(e,o,n).map(e=>e*Math.PI/180).map((e,t)=>{return{x:200+this.createArray(i,u,n)[t]*Math.cos(e),y:200+this.createArray(i,u,n)[t]*Math.sin(e)}})}if("line"===t.type.curve){const{x1:e,x2:o,y1:i,y2:u}=t.type,c=this.createArray(e,o,n),s=this.createArray(i,u,n);r=c.map((e,t)=>{return{x:e,y:s[t]}})}this.render(e,r);const i=document.querySelector(".slider_handle");let u=0;i.style.left=r[0].x-i.offsetWidth/2+"px",i.style.top=r[0].y-i.offsetHeight/2+"px",i.addEventListener("mousedown",function(e){e.preventDefault(),document.addEventListener("mousemove",n),document.addEventListener("mouseup",function e(t){t.preventDefault();document.removeEventListener("mousemove",n);document.addEventListener("mouseup",e)});let t={x:e.clientX,y:e.clientY};function n(e){e.preventDefault();const n=function(e,t,r){const n=r.map(r=>Math.sqrt(Math.pow(r.x-e,2)+Math.pow(r.y-t,2))),o=n.indexOf(Math.min(...n));return r[o]}(t.x,t.y,r),c=r.indexOf(n);c-u<o&&c-u>-o&&(u=c,i.style.left=n.x-i.offsetWidth/2+"px",i.style.top=n.y-i.offsetHeight/2+"px"),t={x:e.clientX,y:e.clientY}}})}},o=document.querySelector(".slider");n.init(o,{type:{curve:"spiral",fi1:0,fi2:720,r1:0,r2:200}})}]);
//# sourceMappingURL=build.js.map