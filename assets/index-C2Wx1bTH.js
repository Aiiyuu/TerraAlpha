var E1=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Z5=E1((K5,kn)=>{(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function Ze(){return Math.floor(Math.random()*1e6)}const b1=()=>{};var ho={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw Bt(e)},Bt=function(t){return new Error("Firebase Database ("+Qa.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},w1=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},ar={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,h=r>>2,u=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,m=c&63;l||(m=64,o||(d=64)),i.push(n[h],n[u],n[d],n[m])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ja(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):w1(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const u=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new S1;const d=r<<2|a>>4;if(i.push(d),c!==64){const m=a<<4&240|c>>2;if(i.push(m),u!==64){const C=c<<6&192|u;i.push(C)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class S1 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Za=function(t){const e=ja(t);return ar.encodeByteArray(e,!0)},Xn=function(t){return Za(t).replace(/\./g,"")},Ss=function(t){try{return ar.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I1(t){return Ja(void 0,t)}function Ja(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!T1(n)||(t[n]=Ja(t[n],e[n]));return t}function T1(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R1(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M1=()=>R1().__FIREBASE_DEFAULTS__,N1=()=>{if(typeof process>"u"||typeof ho>"u")return;const t=ho.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},k1=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ss(t[1]);return e&&JSON.parse(e)},Ka=()=>{try{return b1()||M1()||N1()||k1()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},D1=t=>Ka()?.emulatorHosts?.[t],P1=t=>{const e=D1(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Xa=()=>Ka()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function L1(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x1(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Xn(JSON.stringify(n)),Xn(JSON.stringify(o)),""].join(".")}const Xt={};function O1(){const t={prod:[],emulator:[]};for(const e of Object.keys(Xt))Xt[e]?t.emulator.push(e):t.prod.push(e);return t}function B1(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let fo=!1;function F1(t,e){if(typeof window>"u"||typeof document>"u"||!lr(window.location.host)||Xt[t]===e||Xt[t]||fo)return;Xt[t]=e;function n(d){return`__firebase__banner__${d}`}const i="__firebase__banner",r=O1().prod.length>0;function o(){const d=document.getElementById(i);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,m){d.setAttribute("width","24"),d.setAttribute("id",m),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{fo=!0,o()},d}function h(d,m){d.setAttribute("id",m),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function u(){const d=B1(i),m=n("text"),C=document.getElementById(m)||document.createElement("span"),A=n("learnmore"),v=document.getElementById(A)||document.createElement("a"),x=n("preprendIcon"),$=document.getElementById(x)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const Y=d.element;a(Y),h(v,A);const me=c();l($,x),Y.append($,C,v,me),document.body.appendChild(Y)}r?(C.innerText="Preview backend disconnected.",$.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):($.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H1(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $a(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(H1())}function W1(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function U1(){return Qa.NODE_ADMIN===!0}function V1(){try{return typeof indexedDB=="object"}catch{return!1}}function q1(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G1="FirebaseError";class vn extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=G1,Object.setPrototypeOf(this,vn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,el.prototype.create)}}class el{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?z1(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new vn(s,a,i)}}function z1(t,e){return t.replace(Y1,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Y1=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t){return JSON.parse(t)}function J(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=on(Ss(r[0])||""),n=on(Ss(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},Q1=function(t){const e=tl(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},j1=function(t){const e=tl(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function pt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function po(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function $n(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function ei(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(mo(r)&&mo(o)){if(!ei(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function mo(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z1(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J1{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let u=0;u<16;u++)i[u]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let u=16;u<80;u++){const d=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(d<<1|d>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),h=1518500249):(c=r^o^a,h=1859775393):u<60?(c=r&o|a&(r|o),h=2400959708):(c=r^o^a,h=3395469782);const d=(s<<5|s>>>27)+c+l+h+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=d}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Ei(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K1=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,g(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},bi=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(t){return t&&t._delegate?t._delegate:t}class an{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X1{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Ft;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(eu(e))try{this.getOrInitializeService({instanceIdentifier:it})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=it){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=it){return this.instances.has(e)}getOptions(e=it){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:$1(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=it){return this.component?this.component.multipleInstances?e:it:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function $1(t){return t===it?void 0:t}function eu(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new X1(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var F;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(F||(F={}));const nu={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},iu=F.INFO,su={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},ru=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=su[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class nl{constructor(e){this.name=e,this._logLevel=iu,this._logHandler=ru,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in F))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?nu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...e),this._logHandler(this,F.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...e),this._logHandler(this,F.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,F.INFO,...e),this._logHandler(this,F.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,F.WARN,...e),this._logHandler(this,F.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...e),this._logHandler(this,F.ERROR,...e)}}const ou=(t,e)=>e.some(n=>t instanceof n);let go,Co;function au(){return go||(go=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function lu(){return Co||(Co=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const il=new WeakMap,Is=new WeakMap,sl=new WeakMap,Ki=new WeakMap,cr=new WeakMap;function cu(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(ze(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&il.set(n,t)}).catch(()=>{}),cr.set(e,t),e}function uu(t){if(Is.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Is.set(t,e)}let Ts={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Is.get(t);if(e==="objectStoreNames")return t.objectStoreNames||sl.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ze(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function du(t){Ts=t(Ts)}function hu(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Xi(this),e,...n);return sl.set(i,e.sort?e.sort():[e]),ze(i)}:lu().includes(t)?function(...e){return t.apply(Xi(this),e),ze(il.get(this))}:function(...e){return ze(t.apply(Xi(this),e))}}function fu(t){return typeof t=="function"?hu(t):(t instanceof IDBTransaction&&uu(t),ou(t,au())?new Proxy(t,Ts):t)}function ze(t){if(t instanceof IDBRequest)return cu(t);if(Ki.has(t))return Ki.get(t);const e=fu(t);return e!==t&&(Ki.set(t,e),cr.set(e,t)),e}const Xi=t=>cr.get(t);function pu(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=ze(o);return i&&o.addEventListener("upgradeneeded",l=>{i(ze(o.result),l.oldVersion,l.newVersion,ze(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const mu=["get","getKey","getAll","getAllKeys","count"],gu=["put","add","delete","clear"],$i=new Map;function yo(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if($i.get(e))return $i.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=gu.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||mu.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return $i.set(e,r),r}du(t=>({...t,get:(e,n,i)=>yo(e,n)||t.get(e,n,i),has:(e,n)=>!!yo(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(yu(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function yu(t){return t.getComponent()?.type==="VERSION"}const Rs="@firebase/app",_o="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le=new nl("@firebase/app"),_u="@firebase/app-compat",vu="@firebase/analytics-compat",Au="@firebase/analytics",Eu="@firebase/app-check-compat",bu="@firebase/app-check",wu="@firebase/auth",Su="@firebase/auth-compat",Iu="@firebase/database",Tu="@firebase/data-connect",Ru="@firebase/database-compat",Mu="@firebase/functions",Nu="@firebase/functions-compat",ku="@firebase/installations",Du="@firebase/installations-compat",Pu="@firebase/messaging",Lu="@firebase/messaging-compat",xu="@firebase/performance",Ou="@firebase/performance-compat",Bu="@firebase/remote-config",Fu="@firebase/remote-config-compat",Hu="@firebase/storage",Wu="@firebase/storage-compat",Uu="@firebase/firestore",Vu="@firebase/ai",qu="@firebase/firestore-compat",Gu="firebase",zu="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ms="[DEFAULT]",Yu={[Rs]:"fire-core",[_u]:"fire-core-compat",[Au]:"fire-analytics",[vu]:"fire-analytics-compat",[bu]:"fire-app-check",[Eu]:"fire-app-check-compat",[wu]:"fire-auth",[Su]:"fire-auth-compat",[Iu]:"fire-rtdb",[Tu]:"fire-data-connect",[Ru]:"fire-rtdb-compat",[Mu]:"fire-fn",[Nu]:"fire-fn-compat",[ku]:"fire-iid",[Du]:"fire-iid-compat",[Pu]:"fire-fcm",[Lu]:"fire-fcm-compat",[xu]:"fire-perf",[Ou]:"fire-perf-compat",[Bu]:"fire-rc",[Fu]:"fire-rc-compat",[Hu]:"fire-gcs",[Wu]:"fire-gcs-compat",[Uu]:"fire-fst",[qu]:"fire-fst-compat",[Vu]:"fire-vertex","fire-js":"fire-js",[Gu]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti=new Map,Qu=new Map,Ns=new Map;function vo(t,e){try{t.container.addComponent(e)}catch(n){Le.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ni(t){const e=t.name;if(Ns.has(e))return Le.debug(`There were multiple attempts to register component ${e}.`),!1;Ns.set(e,t);for(const n of ti.values())vo(n,t);for(const n of Qu.values())vo(n,t);return!0}function ju(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Zu(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ye=new el("app","Firebase",Ju);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new an("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ye.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu=zu;function rl(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Ms,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw Ye.create("bad-app-name",{appName:String(s)});if(n||(n=Xa()),!n)throw Ye.create("no-options");const r=ti.get(s);if(r){if(ei(n,r.options)&&ei(i,r.config))return r;throw Ye.create("duplicate-app",{appName:s})}const o=new tu(s);for(const l of Ns.values())o.addComponent(l);const a=new Ku(n,i,o);return ti.set(s,a),a}function $u(t=Ms){const e=ti.get(t);if(!e&&t===Ms&&Xa())return rl();if(!e)throw Ye.create("no-app",{appName:t});return e}function Nt(t,e,n){let i=Yu[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Le.warn(o.join(" "));return}ni(new an(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="firebase-heartbeat-database",td=1,ln="firebase-heartbeat-store";let es=null;function ol(){return es||(es=pu(ed,td,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ln)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ye.create("idb-open",{originalErrorMessage:t.message})})),es}async function nd(t){try{const n=(await ol()).transaction(ln),i=await n.objectStore(ln).get(al(t));return await n.done,i}catch(e){if(e instanceof vn)Le.warn(e.message);else{const n=Ye.create("idb-get",{originalErrorMessage:e?.message});Le.warn(n.message)}}}async function Ao(t,e){try{const i=(await ol()).transaction(ln,"readwrite");await i.objectStore(ln).put(e,al(t)),await i.done}catch(n){if(n instanceof vn)Le.warn(n.message);else{const i=Ye.create("idb-set",{originalErrorMessage:n?.message});Le.warn(i.message)}}}function al(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id=1024,sd=30;class rd{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new ad(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Eo();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>sd){const s=ld(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Le.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Eo(),{heartbeatsToSend:n,unsentEntries:i}=od(this._heartbeatsCache.heartbeats),s=Xn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Le.warn(e),""}}}function Eo(){return new Date().toISOString().substring(0,10)}function od(t,e=id){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),bo(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),bo(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class ad{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return V1()?q1().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await nd(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ao(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ao(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function bo(t){return Xn(JSON.stringify({version:2,heartbeats:t})).length}function ld(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(t){ni(new an("platform-logger",e=>new Cu(e),"PRIVATE")),ni(new an("heartbeat",e=>new rd(e),"PRIVATE")),Nt(Rs,_o,t),Nt(Rs,_o,"esm2020"),Nt("fire-js","")}cd("");var ud="firebase",dd="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nt(ud,dd,"app");var wo={};const So="@firebase/database",Io="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ll="";function hd(t){ll=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),J(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:on(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Ee(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cl=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new fd(e)}}catch{}return new pd},ct=cl("localStorage"),md=cl("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt=new nl("@firebase/database"),ul=(function(){let t=1;return function(){return t++}})(),dl=function(t){const e=K1(t),n=new J1;n.update(e);const i=n.digest();return ar.encodeByteArray(i)},An=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=An.apply(null,i):typeof i=="object"?e+=J(i):e+=i,e+=" "}return e};let $t=null,To=!0;const gd=function(t,e){g(!0,"Can't turn on custom loggers persistently."),kt.logLevel=F.VERBOSE,$t=kt.log.bind(kt)},te=function(...t){if(To===!0&&(To=!1,$t===null&&md.get("logging_enabled")===!0&&gd()),$t){const e=An.apply(null,t);$t(e)}},En=function(t){return function(...e){te(t,...e)}},ks=function(...t){const e="FIREBASE INTERNAL ERROR: "+An(...t);kt.error(e)},xe=function(...t){const e=`FIREBASE FATAL ERROR: ${An(...t)}`;throw kt.error(e),new Error(e)},oe=function(...t){const e="FIREBASE WARNING: "+An(...t);kt.warn(e)},Cd=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&oe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ur=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},yd=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},mt="[MIN_NAME]",Je="[MAX_NAME]",_t=function(t,e){if(t===e)return 0;if(t===mt||e===Je)return-1;if(e===mt||t===Je)return 1;{const n=Ro(t),i=Ro(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},_d=function(t,e){return t===e?0:t<e?-1:1},Gt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+J(e))},dr=function(t){if(typeof t!="object"||t===null)return J(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=J(e[i]),n+=":",n+=dr(t[e[i]]);return n+="}",n},hl=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function ne(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const fl=function(t){g(!ur(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const h=c.join("");let u="";for(l=0;l<64;l+=8){let d=parseInt(h.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),u=u+d}return u.toLowerCase()},vd=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Ad=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Ed(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const bd=new RegExp("^-?(0*)\\d{1,10}$"),wd=-2147483648,Sd=2147483647,Ro=function(t){if(bd.test(t)){const e=Number(t);if(e>=wd&&e<=Sd)return e}return null},Ht=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw oe("Exception was thrown by user callback.",n),e},Math.floor(0))}},Id=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},en=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Zu(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){oe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(te("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',oe(e)}}class Zn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Zn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hr="5",pl="v",ml="s",gl="r",Cl="f",yl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,_l="ls",vl="p",Ds="ac",Al="websocket",El="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ct.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ct.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Md(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function wl(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let i;if(e===Al)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===El)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Md(t)&&(n.ns=t.namespace);const s=[];return ne(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{constructor(){this.counters_={}}incrementCounter(e,n=1){Ee(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return I1(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ts={},ns={};function fr(t){const e=t.toString();return ts[e]||(ts[e]=new Nd),ts[e]}function kd(t,e){const n=t.toString();return ns[n]||(ns[n]=e()),ns[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Ht(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo="start",Pd="close",Ld="pLPCommand",xd="pRTLPCB",Sl="id",Il="pw",Tl="ser",Od="cb",Bd="seg",Fd="ts",Hd="d",Wd="dframe",Rl=1870,Ml=30,Ud=Rl-Ml,Vd=25e3,qd=3e4;class Tt{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=En(e),this.stats_=fr(n),this.urlFn=l=>(this.appCheckToken&&(l[Ds]=this.appCheckToken),wl(n,El,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Dd(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(qd)),yd(()=>{if(this.isClosed_)return;this.scriptTagHolder=new pr((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Mo)this.id=a,this.password=l;else if(o===Pd)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Mo]="t",i[Tl]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Od]=this.scriptTagHolder.uniqueCallbackIdentifier),i[pl]=hr,this.transportSessionId&&(i[ml]=this.transportSessionId),this.lastSessionId&&(i[_l]=this.lastSessionId),this.applicationId&&(i[vl]=this.applicationId),this.appCheckToken&&(i[Ds]=this.appCheckToken),typeof location<"u"&&location.hostname&&yl.test(location.hostname)&&(i[gl]=Cl);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Tt.forceAllow_=!0}static forceDisallow(){Tt.forceDisallow_=!0}static isAvailable(){return Tt.forceAllow_?!0:!Tt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!vd()&&!Ad()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=J(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Za(n),s=hl(i,Ud);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[Wd]="t",i[Sl]=e,i[Il]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=J(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class pr{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ul(),window[Ld+this.uniqueCallbackIdentifier]=e,window[xd+this.uniqueCallbackIdentifier]=n,this.myIFrame=pr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){te("frame writing exception"),a.stack&&te(a.stack),te(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||te("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Sl]=this.myID,e[Il]=this.myPW,e[Tl]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ml+i.length<=Rl;){const o=this.pendingSegs.shift();i=i+"&"+Bd+s+"="+o.seg+"&"+Fd+s+"="+o.ts+"&"+Hd+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(Vd)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{te("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd=16384,zd=45e3;let ii=null;typeof MozWebSocket<"u"?ii=MozWebSocket:typeof WebSocket<"u"&&(ii=WebSocket);class _e{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=En(this.connId),this.stats_=fr(n),this.connURL=_e.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[pl]=hr,typeof location<"u"&&location.hostname&&yl.test(location.hostname)&&(o[gl]=Cl),n&&(o[ml]=n),i&&(o[_l]=i),s&&(o[Ds]=s),r&&(o[vl]=r),wl(e,Al,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ct.set("previous_websocket_failure",!0);try{let i;U1(),this.mySock=new ii(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){_e.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&ii!==null&&!_e.forceDisallow_}static previouslyFailed(){return ct.isInMemoryStorage||ct.get("previous_websocket_failure")===!0}markConnectionHealthy(){ct.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=on(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=J(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=hl(n,Gd);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(zd))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}_e.responsesRequiredToBeHealthy=2;_e.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{static get ALL_TRANSPORTS(){return[Tt,_e]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=_e&&_e.isAvailable();let i=n&&!_e.previouslyFailed();if(e.webSocketOnly&&(n||oe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[_e];else{const s=this.transports_=[];for(const r of cn.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);cn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}cn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd=6e4,Qd=5e3,jd=10*1024,Zd=100*1024,is="t",No="d",Jd="s",ko="r",Kd="e",Do="o",Po="a",Lo="n",xo="p",Xd="h";class $d{constructor(e,n,i,s,r,o,a,l,c,h){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=En("c:"+this.id+":"),this.transportManager_=new cn(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=en(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Zd?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>jd?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(is in e){const n=e[is];n===Po?this.upgradeIfSecondaryHealthy_():n===ko?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Do&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Gt("t",e),i=Gt("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:xo,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Po,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Lo,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Gt("t",e),i=Gt("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Gt(is,e);if(No in e){const i=e[No];if(n===Xd){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Lo){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Jd?this.onConnectionShutdown_(i):n===ko?this.onReset_(i):n===Kd?ks("Server Error: "+i):n===Do?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ks("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),hr!==i&&oe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),en(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Yd))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):en(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Qd))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:xo,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ct.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nl{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si extends kl{static getInstance(){return new si}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!$a()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo=32,Bo=768;class L{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function P(){return new L("")}function T(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Ke(t){return t.pieces_.length-t.pieceNum_}function H(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new L(t.pieces_,e)}function mr(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function e2(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function un(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Dl(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new L(e,0)}function z(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof L)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new L(n,0)}function R(t){return t.pieceNum_>=t.pieces_.length}function re(t,e){const n=T(t),i=T(e);if(n===null)return e;if(n===i)return re(H(t),H(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function t2(t,e){const n=un(t,0),i=un(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=_t(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function gr(t,e){if(Ke(t)!==Ke(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function he(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Ke(t)>Ke(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class n2{constructor(e,n){this.errorPrefix_=n,this.parts_=un(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=bi(this.parts_[i]);Pl(this)}}function i2(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=bi(e),Pl(t)}function s2(t){const e=t.parts_.pop();t.byteLength_-=bi(e),t.parts_.length>0&&(t.byteLength_-=1)}function Pl(t){if(t.byteLength_>Bo)throw new Error(t.errorPrefix_+"has a key path longer than "+Bo+" bytes ("+t.byteLength_+").");if(t.parts_.length>Oo)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Oo+") or object contains a cycle "+st(t))}function st(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr extends kl{static getInstance(){return new Cr}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt=1e3,r2=300*1e3,Fo=30*1e3,o2=1.3,a2=3e4,l2="server_kill",Ho=3;class De extends Nl{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=De.nextPersistentConnectionId_++,this.log_=En("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=zt,this.maxReconnectDelay_=r2,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Cr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&si.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(J(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Ft,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;De.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Ee(e,"w")){const i=pt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();oe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||j1(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Fo)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Q1(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+J(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):ks("Unrecognized action received from server: "+J(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=zt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=zt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>a2&&(this.reconnectDelay_=zt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*o2)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+De.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,d]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?te("getToken() completed but was canceled"):(te("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=d&&d.token,a=new $d(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,m=>{oe(m+" ("+this.repoInfo_.toString()+")"),this.interrupt(l2)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&oe(u),l())}}}interrupt(e){te("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){te("Resuming connection for reason: "+e),delete this.interruptReasons_[e],po(this.interruptReasons_)&&(this.reconnectDelay_=zt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>dr(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new L(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){te("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ho&&(this.reconnectDelay_=Fo,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){te("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ho&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+ll.replace(/\./g,"-")]=1,$a()?e["framework.cordova"]=1:W1()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=si.getInstance().currentlyOnline();return po(this.interruptReasons_)&&e}}De.nextPersistentConnectionId_=0;De.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new M(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new M(mt,e),s=new M(mt,n);return this.compare(i,s)!==0}minPost(){return M.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pn;class Ll extends wi{static get __EMPTY_NODE(){return Pn}static set __EMPTY_NODE(e){Pn=e}compare(e,n){return _t(e.name,n.name)}isDefinedOn(e){throw Bt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return M.MIN}maxPost(){return new M(Je,Pn)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new M(e,Pn)}toString(){return".key"}}const ht=new Ll;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class X{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??X.RED,this.left=s??ce.EMPTY_NODE,this.right=r??ce.EMPTY_NODE}copy(e,n,i,s,r){return new X(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return ce.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return ce.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,X.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,X.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}X.RED=!0;X.BLACK=!1;class c2{copy(e,n,i,s,r){return this}insert(e,n,i){return new X(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ce{constructor(e,n=ce.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ce(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,X.BLACK,null,null))}remove(e){return new ce(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,X.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ln(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Ln(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Ln(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Ln(this.root_,null,this.comparator_,!0,e)}}ce.EMPTY_NODE=new c2;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u2(t,e){return _t(t.name,e.name)}function yr(t,e){return _t(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ps;function d2(t){Ps=t}const xl=function(t){return typeof t=="number"?"number:"+fl(t):"string:"+t},Ol=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ee(e,".sv"),"Priority must be a string or number.")}else g(t===Ps||t.isEmpty(),"priority of unexpected type.");g(t===Ps||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wo;class K{static set __childrenNodeConstructor(e){Wo=e}static get __childrenNodeConstructor(){return Wo}constructor(e,n=K.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Ol(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new K(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:K.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return R(e)?this:T(e)===".priority"?this.priorityNode_:K.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:K.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=T(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(g(i!==".priority"||Ke(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,K.__childrenNodeConstructor.EMPTY_NODE.updateChild(H(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+xl(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=fl(this.value_):e+=this.value_,this.lazyHash_=dl(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===K.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof K.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=K.VALUE_TYPE_ORDER.indexOf(n),r=K.VALUE_TYPE_ORDER.indexOf(i);return g(s>=0,"Unknown leaf type: "+n),g(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}K.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bl,Fl;function h2(t){Bl=t}function f2(t){Fl=t}class p2 extends wi{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?_t(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return M.MIN}maxPost(){return new M(Je,new K("[PRIORITY-POST]",Fl))}makePost(e,n){const i=Bl(e);return new M(n,new K("[PRIORITY-POST]",i))}toString(){return".priority"}}const V=new p2;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m2=Math.log(2);class g2{constructor(e){const n=r=>parseInt(Math.log(r)/m2,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const ri=function(t,e,n,i){t.sort(e);const s=function(l,c){const h=c-l;let u,d;if(h===0)return null;if(h===1)return u=t[l],d=n?n(u):u,new X(d,u.node,X.BLACK,null,null);{const m=parseInt(h/2,10)+l,C=s(l,m),A=s(m+1,c);return u=t[m],d=n?n(u):u,new X(d,u.node,X.BLACK,C,A)}},r=function(l){let c=null,h=null,u=t.length;const d=function(C,A){const v=u-C,x=u;u-=C;const $=s(v+1,x),Y=t[v],me=n?n(Y):Y;m(new X(me,Y.node,A,null,$))},m=function(C){c?(c.left=C,c=C):(h=C,c=C)};for(let C=0;C<l.count;++C){const A=l.nextBitIsOne(),v=Math.pow(2,l.count-(C+1));A?d(v,X.BLACK):(d(v,X.BLACK),d(v,X.RED))}return h},o=new g2(t.length),a=r(o);return new ce(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss;const wt={};class Ne{static get Default(){return g(wt&&V,"ChildrenNode.ts has not been loaded"),ss=ss||new Ne({".priority":wt},{".priority":V}),ss}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=pt(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ce?n:null}hasIndex(e){return Ee(this.indexSet_,e.toString())}addIndex(e,n){g(e!==ht,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(M.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=ri(i,e.getCompare()):a=wt;const l=e.toString(),c={...this.indexSet_};c[l]=e;const h={...this.indexes_};return h[l]=a,new Ne(h,c)}addToIndexes(e,n){const i=$n(this.indexes_,(s,r)=>{const o=pt(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),s===wt)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(M.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),ri(a,o.getCompare())}else return wt;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new M(e.name,a))),l.insert(e,e.node)}});return new Ne(i,this.indexSet_)}removeFromIndexes(e,n){const i=$n(this.indexes_,s=>{if(s===wt)return s;{const r=n.get(e.name);return r?s.remove(new M(e.name,r)):s}});return new Ne(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yt;class _{static get EMPTY_NODE(){return Yt||(Yt=new _(new ce(yr),null,Ne.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Ol(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Yt}updatePriority(e){return this.children_.isEmpty()?this:new _(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Yt:n}}getChild(e){const n=T(e);return n===null?this:this.getImmediateChild(n).getChild(H(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new M(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Yt:this.priorityNode_;return new _(s,o,r)}}updateChild(e,n){const i=T(e);if(i===null)return n;{g(T(e)!==".priority"||Ke(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(H(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(V,(o,a)=>{n[o]=a.val(e),i++,r&&_.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+xl(this.getPriority().val())+":"),this.forEachChild(V,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":dl(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new M(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new M(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new M(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,M.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,M.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===bn?-1:0}withIndex(e){if(e===ht||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new _(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===ht||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(V),s=n.getIterator(V);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===ht?null:this.indexMap_.get(e.toString())}}_.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class C2 extends _{constructor(){super(new ce(yr),_.EMPTY_NODE,Ne.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return _.EMPTY_NODE}isEmpty(){return!1}}const bn=new C2;Object.defineProperties(M,{MIN:{value:new M(mt,_.EMPTY_NODE)},MAX:{value:new M(Je,bn)}});Ll.__EMPTY_NODE=_.EMPTY_NODE;K.__childrenNodeConstructor=_;d2(bn);f2(bn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y2=!0;function j(t,e=null){if(t===null)return _.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new K(n,j(e))}if(!(t instanceof Array)&&y2){const n=[];let i=!1;if(ne(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=j(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new M(o,l)))}}),n.length===0)return _.EMPTY_NODE;const r=ri(n,u2,o=>o.name,yr);if(i){const o=ri(n,V.getCompare());return new _(r,j(e),new Ne({".priority":o},{".priority":V}))}else return new _(r,j(e),Ne.Default)}else{let n=_.EMPTY_NODE;return ne(t,(i,s)=>{if(Ee(t,i)&&i.substring(0,1)!=="."){const r=j(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(j(e))}}h2(j);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r extends wi{constructor(e){super(),this.indexPath_=e,g(!R(e)&&T(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?_t(e.name,n.name):r}makePost(e,n){const i=j(e),s=_.EMPTY_NODE.updateChild(this.indexPath_,i);return new M(n,s)}maxPost(){const e=_.EMPTY_NODE.updateChild(this.indexPath_,bn);return new M(Je,e)}toString(){return un(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _2 extends wi{compare(e,n){const i=e.node.compareTo(n.node);return i===0?_t(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return M.MIN}maxPost(){return M.MAX}makePost(e,n){const i=j(e);return new M(n,i)}toString(){return".value"}}const Hl=new _2;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(t){return{type:"value",snapshotNode:t}}function Dt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function dn(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function hn(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function v2(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(dn(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Dt(n,i)):o.trackChildChange(hn(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(V,(s,r)=>{n.hasChild(s)||i.trackChildChange(dn(s,r))}),n.isLeafNode()||n.forEachChild(V,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(hn(s,r,o))}else i.trackChildChange(Dt(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?_.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e){this.indexedFilter_=new vr(e.getIndex()),this.index_=e.getIndex(),this.startPost_=fn.getStartPost_(e),this.endPost_=fn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new M(n,i))||(i=_.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=_.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(_.EMPTY_NODE);const r=this;return n.forEachChild(V,(o,a)=>{r.matches(new M(o,a))||(s=s.updateImmediateChild(o,_.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A2{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new fn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new M(n,i))||(i=_.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=_.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=_.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(_.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,_.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(d,m)=>u(m,d)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const l=new M(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(n)){const u=a.getImmediateChild(n);let d=s.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===n||a.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const m=d==null?1:o(d,l);if(h&&!i.isEmpty()&&m>=0)return r?.trackChildChange(hn(n,i,u)),a.updateImmediateChild(n,i);{r?.trackChildChange(dn(n,u));const A=a.updateImmediateChild(n,_.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r?.trackChildChange(Dt(d.name,d.node)),A.updateImmediateChild(d.name,d.node)):A}}else return i.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(dn(c.name,c.node)),r.trackChildChange(Dt(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,_.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=V}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:mt}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Je}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===V}copy(){const e=new Ar;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function E2(t){return t.loadsAllData()?new vr(t.getIndex()):t.hasLimit()?new A2(t):new fn(t)}function b2(t,e){const n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="r",n}function w2(t,e){const n=t.copy();return n.index_=e,n}function Uo(t){const e={};if(t.isDefault())return e;let n;if(t.index_===V?n="$priority":t.index_===Hl?n="$value":t.index_===ht?n="$key":(g(t.index_ instanceof _r,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=J(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=J(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+J(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=J(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+J(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Vo(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==V&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi extends Nl{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=En("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=oi.getListenId_(e,i),a={};this.listens_[o]=a;const l=Uo(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),pt(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",s(d,null)}})}unlisten(e,n){const i=oi.getListenId_(e,n);delete this.listens_[i]}get(e){const n=Uo(e._queryParams),i=e._path.toString(),s=new Ft;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Z1(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=on(a.responseText)}catch{oe("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&oe("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S2{constructor(){this.rootNode_=_.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(){return{value:null,children:new Map}}function Ul(t,e,n){if(R(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=T(e);t.children.has(i)||t.children.set(i,ai());const s=t.children.get(i);e=H(e),Ul(s,e,n)}}function Ls(t,e,n){t.value!==null?n(e,t.value):I2(t,(i,s)=>{const r=new L(e.toString()+"/"+i);Ls(s,r,n)})}function I2(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T2{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ne(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qo=10*1e3,R2=30*1e3,M2=300*1e3;class N2{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new T2(e);const i=qo+(R2-qo)*Math.random();en(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;ne(e,(s,r)=>{r>0&&Ee(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),en(this.reportStats_.bind(this),Math.floor(Math.random()*2*M2))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ve;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ve||(ve={}));function Er(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function br(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function wr(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=ve.ACK_USER_WRITE,this.source=Er()}operationForChild(e){if(R(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new L(e));return new li(P(),n,this.revert)}}else return g(T(this.path)===e,"operationForChild called for unrelated child."),new li(H(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,n){this.source=e,this.path=n,this.type=ve.LISTEN_COMPLETE}operationForChild(e){return R(this.path)?new pn(this.source,P()):new pn(this.source,H(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=ve.OVERWRITE}operationForChild(e){return R(this.path)?new gt(this.source,P(),this.snap.getImmediateChild(e)):new gt(this.source,H(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=ve.MERGE}operationForChild(e){if(R(this.path)){const n=this.children.subtree(new L(e));return n.isEmpty()?null:n.value?new gt(this.source,P(),n.value):new Pt(this.source,P(),n)}else return g(T(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Pt(this.source,H(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(R(e))return this.isFullyInitialized()&&!this.filtered_;const n=T(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k2{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function D2(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(v2(o.childName,o.snapshotNode))}),Qt(t,s,"child_removed",e,i,n),Qt(t,s,"child_added",e,i,n),Qt(t,s,"child_moved",r,i,n),Qt(t,s,"child_changed",e,i,n),Qt(t,s,"value",e,i,n),s}function Qt(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>L2(t,a,l)),o.forEach(a=>{const l=P2(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function P2(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function L2(t,e,n){if(e.childName==null||n.childName==null)throw Bt("Should only compare child_ events.");const i=new M(e.childName,e.snapshotNode),s=new M(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(t,e){return{eventCache:t,serverCache:e}}function tn(t,e,n,i){return Si(new Xe(e,n,i),t.serverCache)}function Vl(t,e,n,i){return Si(t.eventCache,new Xe(e,n,i))}function ci(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Ct(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rs;const x2=()=>(rs||(rs=new ce(_d)),rs);class B{static fromObject(e){let n=new B(null);return ne(e,(i,s)=>{n=n.set(new L(i),s)}),n}constructor(e,n=x2()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:P(),value:this.value};if(R(e))return null;{const i=T(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(H(e),n);return r!=null?{path:z(new L(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(R(e))return this;{const n=T(e),i=this.children.get(n);return i!==null?i.subtree(H(e)):new B(null)}}set(e,n){if(R(e))return new B(n,this.children);{const i=T(e),r=(this.children.get(i)||new B(null)).set(H(e),n),o=this.children.insert(i,r);return new B(this.value,o)}}remove(e){if(R(e))return this.children.isEmpty()?new B(null):new B(null,this.children);{const n=T(e),i=this.children.get(n);if(i){const s=i.remove(H(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new B(null):new B(this.value,r)}else return this}}get(e){if(R(e))return this.value;{const n=T(e),i=this.children.get(n);return i?i.get(H(e)):null}}setTree(e,n){if(R(e))return n;{const i=T(e),r=(this.children.get(i)||new B(null)).setTree(H(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new B(this.value,o)}}fold(e){return this.fold_(P(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(z(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,P(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(R(e))return null;{const r=T(e),o=this.children.get(r);return o?o.findOnPath_(H(e),z(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,P(),n)}foreachOnPath_(e,n,i){if(R(e))return this;{this.value&&i(n,this.value);const s=T(e),r=this.children.get(s);return r?r.foreachOnPath_(H(e),z(n,s),i):new B(null)}}foreach(e){this.foreach_(P(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(z(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.writeTree_=e}static empty(){return new Ae(new B(null))}}function nn(t,e,n){if(R(e))return new Ae(new B(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=re(s,e);return r=r.updateChild(o,n),new Ae(t.writeTree_.set(s,r))}else{const s=new B(n),r=t.writeTree_.setTree(e,s);return new Ae(r)}}}function xs(t,e,n){let i=t;return ne(n,(s,r)=>{i=nn(i,z(e,s),r)}),i}function Go(t,e){if(R(e))return Ae.empty();{const n=t.writeTree_.setTree(e,new B(null));return new Ae(n)}}function Os(t,e){return vt(t,e)!=null}function vt(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(re(n.path,e)):null}function zo(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(V,(i,s)=>{e.push(new M(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new M(i,s.value))}),e}function Qe(t,e){if(R(e))return t;{const n=vt(t,e);return n!=null?new Ae(new B(n)):new Ae(t.writeTree_.subtree(e))}}function Bs(t){return t.writeTree_.isEmpty()}function Lt(t,e){return ql(P(),t.writeTree_,e)}function ql(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=ql(z(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(z(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ii(t,e){return Ql(e,t)}function O2(t,e,n,i,s){g(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=nn(t.visibleWrites,e,n)),t.lastWriteId=i}function B2(t,e,n,i){g(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=xs(t.visibleWrites,e,n),t.lastWriteId=i}function F2(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function H2(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&W2(a,i.path)?s=!1:he(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return U2(t),!0;if(i.snap)t.visibleWrites=Go(t.visibleWrites,i.path);else{const a=i.children;ne(a,l=>{t.visibleWrites=Go(t.visibleWrites,z(i.path,l))})}return!0}else return!1}function W2(t,e){if(t.snap)return he(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&he(z(t.path,n),e))return!0;return!1}function U2(t){t.visibleWrites=Gl(t.allWrites,V2,P()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function V2(t){return t.visible}function Gl(t,e,n){let i=Ae.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)he(n,o)?(a=re(n,o),i=nn(i,a,r.snap)):he(o,n)&&(a=re(o,n),i=nn(i,P(),r.snap.getChild(a)));else if(r.children){if(he(n,o))a=re(n,o),i=xs(i,a,r.children);else if(he(o,n))if(a=re(o,n),R(a))i=xs(i,P(),r.children);else{const l=pt(r.children,T(a));if(l){const c=l.getChild(H(a));i=nn(i,P(),c)}}}else throw Bt("WriteRecord should have .snap or .children")}}return i}function zl(t,e,n,i,s){if(!i&&!s){const r=vt(t.visibleWrites,e);if(r!=null)return r;{const o=Qe(t.visibleWrites,e);if(Bs(o))return n;if(n==null&&!Os(o,P()))return null;{const a=n||_.EMPTY_NODE;return Lt(o,a)}}}else{const r=Qe(t.visibleWrites,e);if(!s&&Bs(r))return n;if(!s&&n==null&&!Os(r,P()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(he(c.path,e)||he(e,c.path))},a=Gl(t.allWrites,o,e),l=n||_.EMPTY_NODE;return Lt(a,l)}}}function q2(t,e,n){let i=_.EMPTY_NODE;const s=vt(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(V,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=Qe(t.visibleWrites,e);return n.forEachChild(V,(o,a)=>{const l=Lt(Qe(r,new L(o)),a);i=i.updateImmediateChild(o,l)}),zo(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Qe(t.visibleWrites,e);return zo(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function G2(t,e,n,i,s){g(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=z(e,n);if(Os(t.visibleWrites,r))return null;{const o=Qe(t.visibleWrites,r);return Bs(o)?s.getChild(n):Lt(o,s.getChild(n))}}function z2(t,e,n,i){const s=z(e,n),r=vt(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=Qe(t.visibleWrites,s);return Lt(o,i.getNode().getImmediateChild(n))}else return null}function Y2(t,e){return vt(t.visibleWrites,e)}function Q2(t,e,n,i,s,r,o){let a;const l=Qe(t.visibleWrites,e),c=vt(l,P());if(c!=null)a=c;else if(n!=null)a=Lt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],u=o.getCompare(),d=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let m=d.getNext();for(;m&&h.length<s;)u(m,i)!==0&&h.push(m),m=d.getNext();return h}else return[]}function j2(){return{visibleWrites:Ae.empty(),allWrites:[],lastWriteId:-1}}function ui(t,e,n,i){return zl(t.writeTree,t.treePath,e,n,i)}function Sr(t,e){return q2(t.writeTree,t.treePath,e)}function Yo(t,e,n,i){return G2(t.writeTree,t.treePath,e,n,i)}function di(t,e){return Y2(t.writeTree,z(t.treePath,e))}function Z2(t,e,n,i,s,r){return Q2(t.writeTree,t.treePath,e,n,i,s,r)}function Ir(t,e,n){return z2(t.writeTree,t.treePath,e,n)}function Yl(t,e){return Ql(z(t.treePath,e),t.writeTree)}function Ql(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J2{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,hn(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,dn(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,Dt(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,hn(i,e.snapshotNode,s.oldSnap));else throw Bt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K2{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const jl=new K2;class Tr{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Xe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ir(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ct(this.viewCache_),r=Z2(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X2(t){return{filter:t}}function $2(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function eh(t,e,n,i,s){const r=new J2;let o,a;if(n.type===ve.OVERWRITE){const c=n;c.source.fromUser?o=Fs(t,e,c.path,c.snap,i,s,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!R(c.path),o=hi(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===ve.MERGE){const c=n;c.source.fromUser?o=nh(t,e,c.path,c.children,i,s,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Hs(t,e,c.path,c.children,i,s,a,r))}else if(n.type===ve.ACK_USER_WRITE){const c=n;c.revert?o=rh(t,e,c.path,i,s,r):o=ih(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===ve.LISTEN_COMPLETE)o=sh(t,e,n.path,i,r);else throw Bt("Unknown operation type: "+n.type);const l=r.getChanges();return th(e,o,l),{viewCache:o,changes:l}}function th(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=ci(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Wl(ci(e)))}}function Zl(t,e,n,i,s,r){const o=e.eventCache;if(di(i,n)!=null)return e;{let a,l;if(R(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ct(e),h=c instanceof _?c:_.EMPTY_NODE,u=Sr(i,h);a=t.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=ui(i,Ct(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=T(n);if(c===".priority"){g(Ke(n)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const u=Yo(i,n,h,l);u!=null?a=t.filter.updatePriority(h,u):a=o.getNode()}else{const h=H(n);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=Yo(i,n,o.getNode(),l);d!=null?u=o.getNode().getImmediateChild(c).updateChild(h,d):u=o.getNode().getImmediateChild(c)}else u=Ir(i,c,e.serverCache);u!=null?a=t.filter.updateChild(o.getNode(),c,u,h,s,r):a=o.getNode()}}return tn(e,a,o.isFullyInitialized()||R(n),t.filter.filtersNodes())}}function hi(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const h=o?t.filter:t.filter.getIndexedFilter();if(R(n))c=h.updateFullNode(l.getNode(),i,null);else if(h.filtersNodes()&&!l.isFiltered()){const m=l.getNode().updateChild(n,i);c=h.updateFullNode(l.getNode(),m,null)}else{const m=T(n);if(!l.isCompleteForPath(n)&&Ke(n)>1)return e;const C=H(n),v=l.getNode().getImmediateChild(m).updateChild(C,i);m===".priority"?c=h.updatePriority(l.getNode(),v):c=h.updateChild(l.getNode(),m,v,C,jl,null)}const u=Vl(e,c,l.isFullyInitialized()||R(n),h.filtersNodes()),d=new Tr(s,u,r);return Zl(t,u,n,s,d,a)}function Fs(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const h=new Tr(s,e,r);if(R(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=tn(e,c,!0,t.filter.filtersNodes());else{const u=T(n);if(u===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=tn(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=H(n),m=a.getNode().getImmediateChild(u);let C;if(R(d))C=i;else{const A=h.getCompleteChild(u);A!=null?mr(d)===".priority"&&A.getChild(Dl(d)).isEmpty()?C=A:C=A.updateChild(d,i):C=_.EMPTY_NODE}if(m.equals(C))l=e;else{const A=t.filter.updateChild(a.getNode(),u,C,d,h,o);l=tn(e,A,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function Qo(t,e){return t.eventCache.isCompleteForChild(e)}function nh(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const h=z(n,l);Qo(e,T(h))&&(a=Fs(t,a,h,c,s,r,o))}),i.foreach((l,c)=>{const h=z(n,l);Qo(e,T(h))||(a=Fs(t,a,h,c,s,r,o))}),a}function jo(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Hs(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;R(n)?c=i:c=new B(null).setTree(n,i);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,d)=>{if(h.hasChild(u)){const m=e.serverCache.getNode().getImmediateChild(u),C=jo(t,m,d);l=hi(t,l,new L(u),C,s,r,o,a)}}),c.children.inorderTraversal((u,d)=>{const m=!e.serverCache.isCompleteForChild(u)&&d.value===null;if(!h.hasChild(u)&&!m){const C=e.serverCache.getNode().getImmediateChild(u),A=jo(t,C,d);l=hi(t,l,new L(u),A,s,r,o,a)}}),l}function ih(t,e,n,i,s,r,o){if(di(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(R(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return hi(t,e,n,l.getNode().getChild(n),s,r,a,o);if(R(n)){let c=new B(null);return l.getNode().forEachChild(ht,(h,u)=>{c=c.set(new L(h),u)}),Hs(t,e,n,c,s,r,a,o)}else return e}else{let c=new B(null);return i.foreach((h,u)=>{const d=z(n,h);l.isCompleteForPath(d)&&(c=c.set(h,l.getNode().getChild(d)))}),Hs(t,e,n,c,s,r,a,o)}}function sh(t,e,n,i,s){const r=e.serverCache,o=Vl(e,r.getNode(),r.isFullyInitialized()||R(n),r.isFiltered());return Zl(t,o,n,i,jl,s)}function rh(t,e,n,i,s,r){let o;if(di(i,n)!=null)return e;{const a=new Tr(i,e,s),l=e.eventCache.getNode();let c;if(R(n)||T(n)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=ui(i,Ct(e));else{const u=e.serverCache.getNode();g(u instanceof _,"serverChildren would be complete if leaf node"),h=Sr(i,u)}h=h,c=t.filter.updateFullNode(l,h,r)}else{const h=T(n);let u=Ir(i,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=l.getImmediateChild(h)),u!=null?c=t.filter.updateChild(l,h,u,H(n),a,r):e.eventCache.getNode().hasChild(h)?c=t.filter.updateChild(l,h,_.EMPTY_NODE,H(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=ui(i,Ct(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||di(i,P())!=null,tn(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new vr(i.getIndex()),r=E2(i);this.processor_=X2(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(_.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(_.EMPTY_NODE,a.getNode(),null),h=new Xe(l,o.isFullyInitialized(),s.filtersNodes()),u=new Xe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Si(u,h),this.eventGenerator_=new k2(this.query_)}get query(){return this.query_}}function ah(t){return t.viewCache_.serverCache.getNode()}function lh(t){return ci(t.viewCache_)}function ch(t,e){const n=Ct(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!R(e)&&!n.getImmediateChild(T(e)).isEmpty())?n.getChild(e):null}function Zo(t){return t.eventRegistrations_.length===0}function uh(t,e){t.eventRegistrations_.push(e)}function Jo(t,e,n){const i=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function Ko(t,e,n,i){e.type===ve.MERGE&&e.source.queryId!==null&&(g(Ct(t.viewCache_),"We should always have a full cache before handling merges"),g(ci(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=eh(t.processor_,s,e,n,i);return $2(t.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Jl(t,r.changes,r.viewCache.eventCache.getNode(),null)}function dh(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(V,(r,o)=>{i.push(Dt(r,o))}),n.isFullyInitialized()&&i.push(Wl(n.getNode())),Jl(t,i,n.getNode(),e)}function Jl(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return D2(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fi;class Kl{constructor(){this.views=new Map}}function hh(t){g(!fi,"__referenceConstructor has already been defined"),fi=t}function fh(){return g(fi,"Reference.ts has not been loaded"),fi}function ph(t){return t.views.size===0}function Rr(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return g(r!=null,"SyncTree gave us an op for an invalid query."),Ko(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(Ko(o,e,n,i));return r}}function Xl(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=ui(n,s?i:null),l=!1;a?l=!0:i instanceof _?(a=Sr(n,i),l=!1):(a=_.EMPTY_NODE,l=!1);const c=Si(new Xe(a,l,!1),new Xe(i,s,!1));return new oh(e,c)}return o}function mh(t,e,n,i,s,r){const o=Xl(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),uh(o,n),dh(o,n)}function gh(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=$e(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(Jo(c,n,i)),Zo(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(Jo(l,n,i)),Zo(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!$e(t)&&r.push(new(fh())(e._repo,e._path)),{removed:r,events:o}}function $l(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function je(t,e){let n=null;for(const i of t.views.values())n=n||ch(i,e);return n}function ec(t,e){if(e._queryParams.loadsAllData())return Ti(t);{const i=e._queryIdentifier;return t.views.get(i)}}function tc(t,e){return ec(t,e)!=null}function $e(t){return Ti(t)!=null}function Ti(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pi;function Ch(t){g(!pi,"__referenceConstructor has already been defined"),pi=t}function yh(){return g(pi,"Reference.ts has not been loaded"),pi}let _h=1;class Xo{constructor(e){this.listenProvider_=e,this.syncPointTree_=new B(null),this.pendingWriteTree_=j2(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Mr(t,e,n,i,s){return O2(t.pendingWriteTree_,e,n,i,s),s?Wt(t,new gt(Er(),e,n)):[]}function vh(t,e,n,i){B2(t.pendingWriteTree_,e,n,i);const s=B.fromObject(n);return Wt(t,new Pt(Er(),e,s))}function Ve(t,e,n=!1){const i=F2(t.pendingWriteTree_,e);if(H2(t.pendingWriteTree_,e)){let r=new B(null);return i.snap!=null?r=r.set(P(),!0):ne(i.children,o=>{r=r.set(new L(o),!0)}),Wt(t,new li(i.path,r,n))}else return[]}function wn(t,e,n){return Wt(t,new gt(br(),e,n))}function Ah(t,e,n){const i=B.fromObject(n);return Wt(t,new Pt(br(),e,i))}function Eh(t,e){return Wt(t,new pn(br(),e))}function bh(t,e,n){const i=Nr(t,n);if(i){const s=kr(i),r=s.path,o=s.queryId,a=re(r,e),l=new pn(wr(o),a);return Dr(t,r,l)}else return[]}function mi(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||tc(o,e))){const l=gh(o,e,n,i);ph(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const h=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,u=t.syncPointTree_.findOnPath(r,(d,m)=>$e(m));if(h&&!u){const d=t.syncPointTree_.subtree(r);if(!d.isEmpty()){const m=Ih(d);for(let C=0;C<m.length;++C){const A=m[C],v=A.query,x=rc(t,A);t.listenProvider_.startListening(sn(v),mn(t,v),x.hashFn,x.onComplete)}}}!u&&c.length>0&&!i&&(h?t.listenProvider_.stopListening(sn(e),null):c.forEach(d=>{const m=t.queryToTagMap.get(Mi(d));t.listenProvider_.stopListening(sn(d),m)}))}Th(t,c)}return a}function nc(t,e,n,i){const s=Nr(t,i);if(s!=null){const r=kr(s),o=r.path,a=r.queryId,l=re(o,e),c=new gt(wr(a),l,n);return Dr(t,o,c)}else return[]}function wh(t,e,n,i){const s=Nr(t,i);if(s){const r=kr(s),o=r.path,a=r.queryId,l=re(o,e),c=B.fromObject(n),h=new Pt(wr(a),l,c);return Dr(t,o,h)}else return[]}function Ws(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(d,m)=>{const C=re(d,s);r=r||je(m,C),o=o||$e(m)});let a=t.syncPointTree_.get(s);a?(o=o||$e(a),r=r||je(a,P())):(a=new Kl,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=_.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((m,C)=>{const A=je(C,P());A&&(r=r.updateImmediateChild(m,A))}));const c=tc(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=Mi(e);g(!t.queryToTagMap.has(d),"View does not exist, but we have a tag");const m=Rh();t.queryToTagMap.set(d,m),t.tagToQueryMap.set(m,d)}const h=Ii(t.pendingWriteTree_,s);let u=mh(a,e,n,h,r,l);if(!c&&!o&&!i){const d=ec(a,e);u=u.concat(Mh(t,e,d))}return u}function Ri(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=re(o,e),c=je(a,l);if(c)return c});return zl(s,e,r,n,!0)}function Sh(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(c,h)=>{const u=re(c,n);i=i||je(h,u)});let s=t.syncPointTree_.get(n);s?i=i||je(s,P()):(s=new Kl,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new Xe(i,!0,!1):null,a=Ii(t.pendingWriteTree_,e._path),l=Xl(s,e,a,r?o.getNode():_.EMPTY_NODE,r);return lh(l)}function Wt(t,e){return ic(e,t.syncPointTree_,null,Ii(t.pendingWriteTree_,P()))}function ic(t,e,n,i){if(R(t.path))return sc(t,e,n,i);{const s=e.get(P());n==null&&s!=null&&(n=je(s,P()));let r=[];const o=T(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,h=Yl(i,o);r=r.concat(ic(a,l,c,h))}return s&&(r=r.concat(Rr(s,t,i,n))),r}}function sc(t,e,n,i){const s=e.get(P());n==null&&s!=null&&(n=je(s,P()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=Yl(i,o),h=t.operationForChild(o);h&&(r=r.concat(sc(h,a,l,c)))}),s&&(r=r.concat(Rr(s,t,i,n))),r}function rc(t,e){const n=e.query,i=mn(t,n);return{hashFn:()=>(ah(e)||_.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?bh(t,n._path,i):Eh(t,n._path);{const r=Ed(s,n);return mi(t,n,null,r)}}}}function mn(t,e){const n=Mi(e);return t.queryToTagMap.get(n)}function Mi(t){return t._path.toString()+"$"+t._queryIdentifier}function Nr(t,e){return t.tagToQueryMap.get(e)}function kr(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new L(t.substr(0,e))}}function Dr(t,e,n){const i=t.syncPointTree_.get(e);g(i,"Missing sync point for query tag that we're tracking");const s=Ii(t.pendingWriteTree_,e);return Rr(i,n,s,null)}function Ih(t){return t.fold((e,n,i)=>{if(n&&$e(n))return[Ti(n)];{let s=[];return n&&(s=$l(n)),ne(i,(r,o)=>{s=s.concat(o)}),s}})}function sn(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(yh())(t._repo,t._path):t}function Th(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=Mi(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function Rh(){return _h++}function Mh(t,e,n){const i=e._path,s=mn(t,e),r=rc(t,n),o=t.listenProvider_.startListening(sn(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)g(!$e(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,u)=>{if(!R(c)&&h&&$e(h))return[Ti(h).query];{let d=[];return h&&(d=d.concat($l(h).map(m=>m.query))),ne(u,(m,C)=>{d=d.concat(C)}),d}});for(let c=0;c<l.length;++c){const h=l[c];t.listenProvider_.stopListening(sn(h),mn(t,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Pr(n)}node(){return this.node_}}class Lr{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=z(this.path_,e);return new Lr(this.syncTree_,n)}node(){return Ri(this.syncTree_,this.path_)}}const Nh=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},$o=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return kh(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Dh(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},kh=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},Dh=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&g(!1,"Unexpected increment value: "+i);const s=e.node();if(g(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},oc=function(t,e,n,i){return Or(e,new Lr(n,t),i)},xr=function(t,e,n){return Or(t,new Pr(e),n)};function Or(t,e,n){const i=t.getPriority().val(),s=$o(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=$o(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new K(a,j(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new K(s))),o.forEachChild(V,(a,l)=>{const c=Or(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Ni(t,e){let n=e instanceof L?e:new L(e),i=t,s=T(n);for(;s!==null;){const r=pt(i.node.children,s)||{children:{},childCount:0};i=new Br(s,i,r),n=H(n),s=T(n)}return i}function At(t){return t.node.value}function Fr(t,e){t.node.value=e,Us(t)}function ac(t){return t.node.childCount>0}function Ph(t){return At(t)===void 0&&!ac(t)}function ki(t,e){ne(t.node.children,(n,i)=>{e(new Br(n,t,i))})}function lc(t,e,n,i){n&&e(t),ki(t,s=>{lc(s,e,!0)})}function Lh(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Sn(t){return new L(t.parent===null?t.name:Sn(t.parent)+"/"+t.name)}function Us(t){t.parent!==null&&xh(t.parent,t.name,t)}function xh(t,e,n){const i=Ph(n),s=Ee(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,Us(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Us(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=/[\[\].#$\/\u0000-\u001F\u007F]/,Bh=/[\[\].#$\u0000-\u001F\u007F]/,os=10*1024*1024,Hr=function(t){return typeof t=="string"&&t.length!==0&&!Oh.test(t)},cc=function(t){return typeof t=="string"&&t.length!==0&&!Bh.test(t)},Fh=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),cc(t)},gi=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!ur(t)||t&&typeof t=="object"&&Ee(t,".sv")},uc=function(t,e,n,i){i&&e===void 0||In(Ei(t,"value"),e,n)},In=function(t,e,n){const i=n instanceof L?new n2(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+st(i));if(typeof e=="function")throw new Error(t+"contains a function "+st(i)+" with contents = "+e.toString());if(ur(e))throw new Error(t+"contains "+e.toString()+" "+st(i));if(typeof e=="string"&&e.length>os/3&&bi(e)>os)throw new Error(t+"contains a string greater than "+os+" utf8 bytes "+st(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(ne(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Hr(o)))throw new Error(t+" contains an invalid key ("+o+") "+st(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);i2(i,o),In(t,a,i),s2(i)}),s&&r)throw new Error(t+' contains ".value" child '+st(i)+" in addition to actual children.")}},Hh=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=un(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Hr(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(t2);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&he(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Wh=function(t,e,n,i){const s=Ei(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];ne(e,(o,a)=>{const l=new L(o);if(In(s,a,z(n,l)),mr(l)===".priority"&&!gi(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Hh(s,r)},Wr=function(t,e,n,i){if(!cc(n))throw new Error(Ei(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Uh=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Wr(t,e,n)},Di=function(t,e){if(T(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},Vh=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Hr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Fh(n))throw new Error(Ei(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Pi(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!gr(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function dc(t,e,n){Pi(t,n),hc(t,i=>gr(i,e))}function de(t,e,n){Pi(t,n),hc(t,i=>he(i,e)||he(e,i))}function hc(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(Gh(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Gh(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();$t&&te("event: "+n.toString()),Ht(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh="repo_interrupt",Yh=25;class Qh{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new qh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ai(),this.transactionQueueTree_=new Br,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function jh(t,e,n){if(t.stats_=fr(t.repoInfo_),t.forceRestClient_||Id())t.server_=new oi(t.repoInfo_,(i,s,r,o)=>{ea(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>ta(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{J(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new De(t.repoInfo_,e,(i,s,r,o)=>{ea(t,i,s,r,o)},i=>{ta(t,i)},i=>{Zh(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=kd(t.repoInfo_,()=>new N2(t.stats_,t.server_)),t.infoData_=new S2,t.infoSyncTree_=new Xo({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=wn(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Ur(t,"connected",!1),t.serverSyncTree_=new Xo({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);de(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function fc(t){const n=t.infoData_.getNode(new L(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Tn(t){return Nh({timestamp:fc(t)})}function ea(t,e,n,i,s){t.dataUpdateCount++;const r=new L(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=$n(n,c=>j(c));o=wh(t.serverSyncTree_,r,l,s)}else{const l=j(n);o=nc(t.serverSyncTree_,r,l,s)}else if(i){const l=$n(n,c=>j(c));o=Ah(t.serverSyncTree_,r,l)}else{const l=j(n);o=wn(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=xt(t,r)),de(t.eventQueue_,a,o)}function ta(t,e){Ur(t,"connected",e),e===!1&&$h(t)}function Zh(t,e){ne(e,(n,i)=>{Ur(t,n,i)})}function Ur(t,e,n){const i=new L("/.info/"+e),s=j(n);t.infoData_.updateSnapshot(i,s);const r=wn(t.infoSyncTree_,i,s);de(t.eventQueue_,i,r)}function Li(t){return t.nextWriteId_++}function Jh(t,e,n){const i=Sh(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=j(s).withIndex(e._queryParams.getIndex());Ws(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=wn(t.serverSyncTree_,e._path,r);else{const a=mn(t.serverSyncTree_,e);o=nc(t.serverSyncTree_,e._path,r,a)}return de(t.eventQueue_,e._path,o),mi(t.serverSyncTree_,e,n,null,!0),r},s=>(Ut(t,"get for query "+J(e)+" failed: "+s),Promise.reject(new Error(s))))}function Kh(t,e,n,i,s){Ut(t,"set",{path:e.toString(),value:n,priority:i});const r=Tn(t),o=j(n,i),a=Ri(t.serverSyncTree_,e),l=xr(o,a,r),c=Li(t),h=Mr(t.serverSyncTree_,e,l,c,!0);Pi(t.eventQueue_,h),t.server_.put(e.toString(),o.val(!0),(d,m)=>{const C=d==="ok";C||oe("set at "+e+" failed: "+d);const A=Ve(t.serverSyncTree_,c,!C);de(t.eventQueue_,e,A),Vs(t,s,d,m)});const u=qr(t,e);xt(t,u),de(t.eventQueue_,u,[])}function Xh(t,e,n,i){Ut(t,"update",{path:e.toString(),value:n});let s=!0;const r=Tn(t),o={};if(ne(n,(a,l)=>{s=!1,o[a]=oc(z(e,a),j(l),t.serverSyncTree_,r)}),s)te("update() called with empty data.  Don't do anything."),Vs(t,i,"ok",void 0);else{const a=Li(t),l=vh(t.serverSyncTree_,e,o,a);Pi(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,h)=>{const u=c==="ok";u||oe("update at "+e+" failed: "+c);const d=Ve(t.serverSyncTree_,a,!u),m=d.length>0?xt(t,e):e;de(t.eventQueue_,m,d),Vs(t,i,c,h)}),ne(n,c=>{const h=qr(t,z(e,c));xt(t,h)}),de(t.eventQueue_,e,[])}}function $h(t){Ut(t,"onDisconnectEvents");const e=Tn(t),n=ai();Ls(t.onDisconnect_,P(),(s,r)=>{const o=oc(s,r,t.serverSyncTree_,e);Ul(n,s,o)});let i=[];Ls(n,P(),(s,r)=>{i=i.concat(wn(t.serverSyncTree_,s,r));const o=qr(t,s);xt(t,o)}),t.onDisconnect_=ai(),de(t.eventQueue_,P(),i)}function e3(t,e,n){let i;T(e._path)===".info"?i=Ws(t.infoSyncTree_,e,n):i=Ws(t.serverSyncTree_,e,n),dc(t.eventQueue_,e._path,i)}function t3(t,e,n){let i;T(e._path)===".info"?i=mi(t.infoSyncTree_,e,n):i=mi(t.serverSyncTree_,e,n),dc(t.eventQueue_,e._path,i)}function n3(t){t.persistentConnection_&&t.persistentConnection_.interrupt(zh)}function Ut(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),te(n,...e)}function Vs(t,e,n,i){e&&Ht(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function i3(t,e,n,i,s,r){Ut(t,"transaction on "+e);const o={path:e,update:n,onComplete:i,status:null,order:ul(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Vr(t,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{In("transaction failed: Data returned ",l,o.path),o.status=0;const c=Ni(t.transactionQueueTree_,e),h=At(c)||[];h.push(o),Fr(c,h);let u;typeof l=="object"&&l!==null&&Ee(l,".priority")?(u=pt(l,".priority"),g(gi(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(Ri(t.serverSyncTree_,e)||_.EMPTY_NODE).getPriority().val();const d=Tn(t),m=j(l,u),C=xr(m,a,d);o.currentOutputSnapshotRaw=m,o.currentOutputSnapshotResolved=C,o.currentWriteId=Li(t);const A=Mr(t.serverSyncTree_,e,C,o.currentWriteId,o.applyLocally);de(t.eventQueue_,e,A),xi(t,t.transactionQueueTree_)}}function Vr(t,e,n){return Ri(t.serverSyncTree_,e,n)||_.EMPTY_NODE}function xi(t,e=t.transactionQueueTree_){if(e||Oi(t,e),At(e)){const n=mc(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&s3(t,Sn(e),n)}else ac(e)&&ki(e,n=>{xi(t,n)})}function s3(t,e,n){const i=n.map(c=>c.currentWriteId),s=Vr(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const h=n[c];g(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=re(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{Ut(t,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let d=0;d<n.length;d++)n[d].status=2,h=h.concat(Ve(t.serverSyncTree_,n[d].currentWriteId)),n[d].onComplete&&u.push(()=>n[d].onComplete(null,!0,n[d].currentOutputSnapshotResolved)),n[d].unwatcher();Oi(t,Ni(t.transactionQueueTree_,e)),xi(t,t.transactionQueueTree_),de(t.eventQueue_,e,h);for(let d=0;d<u.length;d++)Ht(u[d])}else{if(c==="datastale")for(let u=0;u<n.length;u++)n[u].status===3?n[u].status=4:n[u].status=0;else{oe("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<n.length;u++)n[u].status=4,n[u].abortReason=c}xt(t,e)}},o)}function xt(t,e){const n=pc(t,e),i=Sn(n),s=mc(t,n);return r3(t,s,i),i}function r3(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=re(n,l.path);let h=!1,u;if(g(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,u=l.abortReason,s=s.concat(Ve(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Yh)h=!0,u="maxretry",s=s.concat(Ve(t.serverSyncTree_,l.currentWriteId,!0));else{const d=Vr(t,l.path,o);l.currentInputSnapshot=d;const m=e[a].update(d.val());if(m!==void 0){In("transaction failed: Data returned ",m,l.path);let C=j(m);typeof m=="object"&&m!=null&&Ee(m,".priority")||(C=C.updatePriority(d.getPriority()));const v=l.currentWriteId,x=Tn(t),$=xr(C,d,x);l.currentOutputSnapshotRaw=C,l.currentOutputSnapshotResolved=$,l.currentWriteId=Li(t),o.splice(o.indexOf(v),1),s=s.concat(Mr(t.serverSyncTree_,l.path,$,l.currentWriteId,l.applyLocally)),s=s.concat(Ve(t.serverSyncTree_,v,!0))}else h=!0,u="nodata",s=s.concat(Ve(t.serverSyncTree_,l.currentWriteId,!0))}de(t.eventQueue_,n,s),s=[],h&&(e[a].status=2,(function(d){setTimeout(d,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}Oi(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)Ht(i[a]);xi(t,t.transactionQueueTree_)}function pc(t,e){let n,i=t.transactionQueueTree_;for(n=T(e);n!==null&&At(i)===void 0;)i=Ni(i,n),e=H(e),n=T(e);return i}function mc(t,e){const n=[];return gc(t,e,n),n.sort((i,s)=>i.order-s.order),n}function gc(t,e,n){const i=At(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);ki(e,s=>{gc(t,s,n)})}function Oi(t,e){const n=At(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Fr(e,n.length>0?n:void 0)}ki(e,i=>{Oi(t,i)})}function qr(t,e){const n=Sn(pc(t,e)),i=Ni(t.transactionQueueTree_,e);return Lh(i,s=>{as(t,s)}),as(t,i),lc(i,s=>{as(t,s)}),n}function as(t,e){const n=At(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Ve(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Fr(e,void 0):n.length=r+1,de(t.eventQueue_,Sn(e),s);for(let o=0;o<i.length;o++)Ht(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o3(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function a3(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):oe(`Invalid query segment '${n}' in query '${t}'`)}return e}const na=function(t,e){const n=l3(t),i=n.namespace;n.domain==="firebase.com"&&xe(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&xe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Cd();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new bl(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new L(n.pathString)}},l3=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let h=t.indexOf("/");h===-1&&(h=t.length);let u=t.indexOf("?");u===-1&&(u=t.length),e=t.substring(0,Math.min(h,u)),h<u&&(s=o3(t.substring(h,u)));const d=a3(t.substring(Math.min(t.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const m=e.slice(0,c);if(m.toLowerCase()==="localhost")n="localhost";else if(m.split(".").length<=2)n=m;else{const C=e.indexOf(".");i=e.substring(0,C).toLowerCase(),n=e.substring(C+1),r=i}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ia="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",c3=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=ia.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=ia.charAt(e[s]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+J(this.snapshot.exportVal())}}class yc{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return R(this._path)?null:mr(this._path)}get ref(){return new be(this._repo,this._path)}get _queryIdentifier(){const e=Vo(this._queryParams),n=dr(e);return n==="{}"?"default":n}get _queryObject(){return Vo(this._queryParams)}isEqual(e){if(e=He(e),!(e instanceof Rn))return!1;const n=this._repo===e._repo,i=gr(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+e2(this._path)}}function u3(t,e){if(t._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function d3(t){let e=null,n=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(n=t.getIndexEndValue()),t.getIndex()===ht){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(t.hasStart()){if(t.getIndexStartName()!==mt)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(t.hasEnd()){if(t.getIndexEndName()!==Je)throw new Error(i);if(typeof n!="string")throw new Error(s)}}else if(t.getIndex()===V){if(e!=null&&!gi(e)||n!=null&&!gi(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(g(t.getIndex()instanceof _r||t.getIndex()===Hl,"unknown index type."),e!=null&&typeof e=="object"||n!=null&&typeof n=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class be extends Rn{constructor(e,n){super(e,n,new Ar,!1)}get parent(){const e=Dl(this._path);return e===null?null:new be(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class yt{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new L(e),i=Oe(this.ref,e);return new yt(this._node.getChild(n),i,V)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new yt(s,Oe(this.ref,i),V)))}hasChild(e){const n=new L(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Ie(t,e){return t=He(t),t._checkNotDeleted("ref"),e!==void 0?Oe(t._root,e):t._root}function Oe(t,e){return t=He(t),T(t._path)===null?Uh("child","path",e):Wr("child","path",e),new be(t._repo,z(t._path,e))}function h3(t,e){t=He(t),Di("push",t._path),uc("push",e,t._path,!0);const n=fc(t._repo),i=c3(n),s=Oe(t,i),r=Oe(t,i);let o;return e!=null?o=Mn(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Gr(t){return Di("remove",t._path),Mn(t,null)}function Mn(t,e){t=He(t),Di("set",t._path),uc("set",e,t._path,!1);const n=new Ft;return Kh(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Et(t,e){Wh("update",e,t._path);const n=new Ft;return Xh(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Re(t){t=He(t);const e=new _c(()=>{}),n=new Bi(e);return Jh(t._repo,t,n).then(i=>new yt(i,new be(t._repo,t._path),t._queryParams.getIndex()))}class Bi{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Cc("value",this,new yt(e.snapshotNode,new be(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new yc(this,e,n):null}matches(e){return e instanceof Bi?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class zr{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new yc(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const i=Oe(new be(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new Cc(e.type,this,new yt(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof zr?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function vc(t,e,n,i,s){const r=new _c(n,void 0),o=e==="value"?new Bi(r):new zr(e,r);return e3(t._repo,t,o),()=>t3(t._repo,t,o)}function Fi(t,e,n,i){return vc(t,"value",e)}function f3(t,e,n,i){return vc(t,"child_added",e)}class Ac{}class p3 extends Ac{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Rn(e._repo,e._path,b2(e._queryParams,this._limit),e._orderByCalled)}}function m3(t){if(Math.floor(t)!==t||t<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new p3(t)}class g3 extends Ac{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){u3(e,"orderByChild");const n=new L(this._path);if(R(n))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const i=new _r(n),s=w2(e._queryParams,i);return d3(s),new Rn(e._repo,e._path,s,!0)}}function C3(t){return Wr("orderByChild","path",t),new g3(t)}function y3(t,...e){let n=He(t);for(const i of e)n=i._apply(n);return n}hh(be);Ch(be);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _3="FIREBASE_DATABASE_EMULATOR_HOST",qs={};let v3=!1;function A3(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=lr(r);t.repoInfo_=new bl(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function E3(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||xe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),te("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=na(r,s),a=o.repoInfo,l;typeof process<"u"&&wo&&(l=wo[_3]),l?(r=`http://${l}?ns=${a.namespace}`,o=na(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Rd(t.name,t.options,e);Vh("Invalid Firebase Database URL",o),R(o.path)||xe("Database URL must point to the root of a Firebase Database (not including a child path).");const h=w3(a,t,c,new Td(t,n));return new S3(h,t)}function b3(t,e){const n=qs[e];(!n||n[t.key]!==t)&&xe(`Database ${e}(${t.repoInfo_}) has already been deleted.`),n3(t),delete n[t.key]}function w3(t,e,n,i){let s=qs[e.name];s||(s={},qs[e.name]=s);let r=s[t.toURLString()];return r&&xe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Qh(t,v3,n,i),s[t.toURLString()]=r,r}class S3{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(jh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new be(this._repo,P())),this._rootInternal}_delete(){return this._rootInternal!==null&&(b3(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&xe("Cannot call "+e+" on a deleted database.")}}function Ec(t=$u(),e){const n=ju(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=P1("database");i&&I3(n,...i)}return n}function I3(t,e,n,i={}){t=He(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&ei(i,r.repoInfo_.emulatorOptions))return;xe("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&xe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Zn(Zn.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:x1(i.mockUserToken,t.app.options.projectId);o=new Zn(a)}lr(e)&&(L1(e),F1("Database",!0)),A3(r,s,i,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T3(t){hd(Xu),ni(new an("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return E3(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),Nt(So,Io,t),Nt(So,Io,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R3={".sv":"timestamp"};function bc(){return R3}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M3{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function N3(t,e,n){if(t=He(t),Di("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const i=!0,s=new Ft,r=(a,l,c)=>{let h=null;a?s.reject(a):(h=new yt(c,new be(t._repo,t._path),V),s.resolve(new M3(l,h)))},o=Fi(t,()=>{});return i3(t._repo,t._path,e,r,o,i),s.promise}De.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};De.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};T3();const k3={apiKey:"AIzaSyDe5xEX7kUStK3rxZJGm5qbBCnG9WLGQXg",authDomain:"terraalpha-fbc73.firebaseapp.com",databaseURL:"https://terraalpha-fbc73-default-rtdb.europe-west1.firebasedatabase.app",projectId:"terraalpha-fbc73",storageBucket:"terraalpha-fbc73.firebasestorage.app",messagingSenderId:"563122821683",appId:"1:563122821683:web:276cb02e848b762a2c2146"},D3=rl(k3),Pe=Ec(D3),Yr=20;Array.from({length:8},(t,e)=>`p1-cell-${e+1}`),Array.from({length:8},(t,e)=>`p2-cell-${e+1}`);const pe=t=>Ie(Pe,`rooms/${t}`),Gs=(t,e)=>Oe(pe(t),`currentStepsStrike/${e}`),P3=Ie(Pe,"globalChat"),Ci=Oe(P3,"messages");function zs(t){return{...t,itsTurn:!1,diceHistory:[],diceStreak:[]}}function wc({id:t,name:e},n,i){const s=i?[]:[zs(n)];return Mn(pe(t),{id:t,authorId:n.id,name:e,players:s,date:new Date().toISOString(),ships:{left:{},right:{}},suggestRestartSide:null,timeWhenSuggestRestart:null,restartConfirmedAt:null,restartBy:null})}function L3(t){const e=Ie(Pe,"rooms");Fi(e,n=>{const i=n.val();t(i?Object.values(i):[])})}async function x3(){const t=Ie(Pe,"rooms"),e=await Re(t);return e.val()?Object.values(e.val()):[]}function Hi(t,e){Fi(pe(t),n=>{e(n.val()||void 0)})}async function Ys(t,e){const n=pe(t),i=await Re(n);if(!i.exists())throw new Error(`Room ${t} does not exist.`);const r=i.val().actions||[];e.id=Ze(),r.push(e),await Et(n,{actions:r})}async function gn(t,e){await Et(pe(t),e)}async function O3(t,e,n){const i=pe(t),s=await Re(i);if(!s.exists())throw new Error(`Room ${t} does not exist.`);const o=s.val().players||[],a=e==="left"?0:1;if(!o[a])throw new Error(`Player '${e}' does not exist in room ${t}.`);o[a]={...o[a],...n},await Et(i,{players:o})}async function B3(t,e){const n=pe(t),i=await Re(n);if(!i.exists())throw new Error("Room does not exist");const r=i.val().phrases||[];r.some(a=>a.id===e.id)||await Et(n,{phrases:[...r,e]})}async function Qr(t,e){const n=Ec(),i=Ie(n,`rooms/${e}`),s=U3();try{await N3(i,r=>{if(r===null)throw new Error(`Room ${e} does not exist.`);const o=r.players||[null,null];if(o.some(d=>d&&d.color===t.color))throw new Error("Your color is already taken");let a=s;const l=0,c=1,h=!o[l],u=!o[c];if(s==="left"?!h&&u&&(a="right"):s==="right"&&!u&&h&&(a="left"),!h&&!u)throw new Error("The room is already full");return a==="left"?o[l]=zs(t):o[c]=zs(t),r.players=o,W3(a),r})}catch(r){throw console.error("Error adding player to room: ",r),r}}async function Sc(t){const e=await Re(pe(t));if(!e.exists())throw new Error(`Room ${t} does not exist.`);return e.val()}function Wi(t){localStorage.setItem("currentRoomId",String(t))}function fe(){return Number(localStorage.getItem("currentRoomId"))}function Ic(t){localStorage.setItem("restartRoomId",String(t))}function Tc(){return Number(localStorage.getItem("restartRoomId"))}function F3(){return Number(localStorage.removeItem("restartRoomId"))}function H3(t){localStorage.setItem("currentPlayerName",t)}function qe(){return localStorage.getItem("currentPlayerName")||"Невідомий гравець"}function W3(t){localStorage.setItem("side",t)}function U3(){return localStorage.getItem("side")||"left"}function V3(t){localStorage.setItem("currentPlayerId",String(t))}function q3(){return Number(localStorage.getItem("currentPlayerId"))}function Be(){const t=localStorage.getItem("playerInfo");if(t){const e=JSON.parse(t);return e.avatar&&(e.avatar=Number(e.avatar)),e}return null}function Ui(t){try{const e=JSON.stringify(t);localStorage.setItem("playerInfo",e)}catch(e){console.error("Failed to save player info:",e)}}async function G3(){const t=Ie(Pe,"rooms"),e=await Re(t);if(!e.exists())return;const n=e.val(),i=Date.now(),s=3600*1e3,r=Object.entries(n).filter(([,o])=>o.date&&i-new Date(o.date).getTime()>s).map(([o])=>Gr(Ie(Pe,`rooms/${o}`)));await Promise.all(r)}async function xn(t,e){const n=await Re(pe(t));if(!n.exists())return;const s=n.val().isTurn;if(!s)return;const r=await Re(Gs(t,s));if(!r.exists())return;const o=r.val();if(!Array.isArray(o))return;const a=o.filter((l,c)=>!e.includes(c));await Mn(Gs(t,s),a)}async function z3(t){const e=await Re(pe(t));if(!e.exists())return;const i=e.val().isTurn;i&&await Mn(Gs(t,i),[])}async function Y3(t,e){await Et(pe(t),{suggestRestartSide:e,timeWhenSuggestRestart:new Date().toISOString()})}async function Qs(t){await Et(pe(t),{suggestRestartSide:null,timeWhenSuggestRestart:null})}async function Q3(t,e,n="#ffffff"){const i=t.trim().slice(0,14),s=e.trim().slice(0,200);if(!i||i.length<3)throw new Error("Invalid name");if(!s)throw new Error("Empty message");const r=await h3(Ci,{ts:bc(),name:i,text:s,color:n});return await j3(Yr),r.key}async function j3(t=Yr){const e=await Re(Ci);if(!e.exists())return;const n=Object.entries(e.val());n.sort((r,o)=>(r[1].ts??0)-(o[1].ts??0));const i=n.length-t;if(i<=0)return;const s=n.slice(0,i).map(([r])=>Gr(Oe(Ci,r)));await Promise.all(s)}function Z3(t){const e=y3(Ci,C3("ts"),m3(Yr)),n=Fi(e,i=>{if(!i.exists()){t([]);return}const s=[];i.forEach(r=>{const o=r.val();s.push({id:r.key||void 0,...o})}),s.sort((r,o)=>(r.ts??0)-(o.ts??0)),t(s)});return()=>n()}const J3="/Testing_game/assets/lucky-BWspT3q7.png",K3="/Testing_game/assets/looser-B8k8vyPt.png",X3="/Testing_game/assets/angry-B2B9_9Ii.png",$3="/Testing_game/assets/win-DSD2HYYl.png",ef="/Testing_game/assets/laugh-DRXkMQrf.png",tf="/Testing_game/assets/avatar-1-k7iEtTdy.png",nf="/Testing_game/assets/avatar-2-neOZXC27.png",sf="/Testing_game/assets/avatar-3-BHNbHzqL.png",rf="/Testing_game/assets/avatar-4-BzIs1Mf1.png",of="/Testing_game/assets/avatar-5-Bie7X0vt.png",af="/Testing_game/assets/avatar-6-CHk5S2XK.png",lf="/Testing_game/assets/avatar-7-BiCxFzL8.png",cf="/Testing_game/assets/avatar-8-f7o7SH1i.png",uf="/Testing_game/assets/avatar-9-BGb1iwdq.png",df={logo:"Some <span>Logo</span>",fastGameBtn:"Fast Game",selectRoomBtn:"Select Room",createRoomBtn:"Create Room",backToHomePageBtn:"Back to home page",playerNameInput:"Player's name",playerColorInput:"Player's color",playerAvatarInput:"Player's avatar",roomNameInput:"Room's name",noRooms:"No available rooms found",name:"Name",author:"Author",date:"Date",playersCount:"Players",throwPhrase:"Throw Phrase",gameWinner:"🎉 Congrats! You won the game! 🏆",gameLoser:"💀 Not this time — try again! 🍀",restart:"Restart",exit:"Exit",helper:{welcome:`🤖 Welcome, Commander! I’m your navigator-bot, ready to guide the fleet through the stars! 🚀

🎲 Roll the dice to see how many steps you’ll take.
🛰️ Move your ships from start to finish.
💫 Whoever completes the fleet first rules the galaxy!

If something goes wrong — we’ll blame Sergey! 😉`,restartGame:"🛰️ Signal from {name}: game restart initiated 🔄. Prepare for system reboot ⚡...",acceptRestart:"✅ Data confirmed: {name} approved your game restart proposal 🔄. Reboot starting 🚀!",rejectRestart:"⚠️ Alarm! {name} rejected your game restart proposal ❌. System continues in current mode 🛸!",coinWinner:{current:"🤖 Beep-beep! You won the coin toss ☘️! It’s your turn now 🎲. Don’t delay!",other:"🛰️ Signal from {name}: won the coin toss ☘️. Their turn now!"},diceStreak:{current:"🎲 Bingo! You rolled a 6️⃣! Roll again 🤖",other:"🎲 Oh! Opponent rolled a 6️⃣! Their turn 🚀"},diceRes:{current:"🎲 You rolled {res}️⃣. Your turn ⚡",other:"🎲 Opponent rolled {res}️⃣. Their turn 🛸"},notYourTurn:"🚨ERROR! Unauthorized action! It’s not your turn, organic being!",timerWarning:"🚨Your seconds burn faster than a meteor in the atmosphere! MOVE!",otherPlayerTurnEnded:"⚡ Opponent ended their turn 🛸. Your turn to roll the dice 🎲! Don’t delay, earthling 🤖"},phrases:{1:"Oh, lucky, lucky!",2:"Eh, you loser!",3:"Now I’ll show you where the crayfish winter!",4:"One more step and victory!",5:"You won’t outrun me!"}},hf={logo:"Якийсь <span>Логотип</span>",fastGameBtn:"Швидка Гра",selectRoomBtn:"Вибрати Кімнату",createRoomBtn:"Створити Кімнату",backToHomePageBtn:"Назад на головну сторінку",playerNameInput:"Імʼя гравця",playerColorInput:"Колір гравця",playerAvatarInput:"Аватарка гравця",roomNameInput:"Імʼя кімнати",noRooms:"Незнайдено вільних кімнат",name:"Назва",author:"Автор",date:"Дата",playersCount:"Ігроки",throwPhrase:"Кинути Фразу",gameWinner:"🎉 Вітаємо! Ви виграли гру! 🏆",gameLoser:"💀 Цього разу не вийшло — спробуй ще! 🍀",restart:"Перезапустити",exit:"Вийти",helper:{welcome:`🤖 Вітаю, командире! Я — твій навігатор-бот, готовий вести флот серед зірок! 🚀

🎲 Кинь кубик, щоб дізнатись, скільки кроків зробиш.
🛰️ Рухай кораблі від старту до фінішу.
💫 Хто першим проведе весь флот — той володар галактики!

Якщо щось піде не так — звинуватимо Сергія! 😉`,restartGame:"🛰️ Сигнал від {name}: ініційовано перезапуск гри 🔄. Готуйтеся до перезавантаження системи ⚡...",acceptRestart:"✅ Дані підтверджено: {name} схвалив(ла) вашу пропозицію перезапустити гру 🔄. Перезавантаження починається 🚀!",rejectRestart:"⚠️ Аларм! {name} відхилив(ла) вашу пропозицію перезапустити гру ❌. Система продовжує роботу в поточному режимі 🛸!",coinWinner:{current:"🤖 Біп-біп! Ти виграв у монетку ☘️! Твій хід зараз 🎲. Не зволікай!",other:"🛰️ Сигнал від {name}: виграв у монетку ☘️. Черга за ним!"},diceStreak:{current:"🎲 Бінго! Тобі випало 6️⃣! Знову твоя черга кидати кубик 🤖",other:"🎲 Ой! Суперник отримав 6️⃣! Його черга кидати кубик 🚀"},diceRes:{current:"🎲 Тобі випало {res}️⃣. Твоя черга робити хід ⚡",other:"🎲 Супернику випало {res}️⃣. Його черга робити хід 🛸"},notYourTurn:"🚨ПОМИЛКА! Несанкціонована дія! Це не твій хід, органічна істото!",timerWarning:"🚨Твої секунди згорають швидше, ніж метеор у атмосфері! РУХАЙСЯ!",otherPlayerTurnEnded:"⚡ Суперник завершив свій хід 🛸. Твоя черга кидати кубик 🎲! Не зволікай, землянин 🤖"},phrases:{1:"О, повезло, повезло",2:"Ех ти, лузер",3:"Зараз я тобі покажу, де раки зимують",4:"Ще один крок і перемога",5:"Ти мене не доженеш"}},Vi={en:df,ua:hf};var ft=(t=>(t.EN="en",t.UA="ua",t))(ft||{});const ff="data:image/svg+xml,%3csvg%20width='56'%20height='39'%20viewBox='0%200%2056%2039'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_245_56)'%3e%3cpath%20d='M0%2038.4546H55.2V35.37V3.03001V0H0V3.03001V35.36V38.4546Z'%20fill='%23FEFEFE'/%3e%3cpath%20d='M23.74%2023.03V38.4H31.42V23.03H55.2V15.35H31.42V0H23.74V15.35H0V23.03H23.74Z'%20fill='%23C8102E'/%3e%3cpath%20d='M33.98%2012.43V0H55.207V1.91016L33.98%2012.43Z'%20fill='%23012169'/%3e%3cpath%20d='M33.98%2025.97V38.4H55.2009V36.4863L33.98%2025.97Z'%20fill='%23012169'/%3e%3cpath%20d='M21.18%2025.97V38.4H0.00665283L0.00665392%2036.4849L21.18%2025.97Z'%20fill='%23012169'/%3e%3cpath%20d='M21.18%2012.43V0H0.0117188V1.97266L21.18%2012.43Z'%20fill='%23012169'/%3e%3cpath%20d='M0%2012.8H7.65L0%208.96997V12.8Z'%20fill='%23012169'/%3e%3cpath%20d='M55.2%2012.8H47.51L55.2%208.95001V12.8Z'%20fill='%23012169'/%3e%3cpath%20d='M55.2%2025.6H47.51L55.2%2029.45V25.6Z'%20fill='%23012169'/%3e%3cpath%20d='M0%2025.6H7.65L0%2029.43V25.6Z'%20fill='%23012169'/%3e%3cpath%20d='M55.2%203.25L36.15%2012.8H40.41L55.2%205.4V3.25Z'%20fill='%23C8102E'/%3e%3cpath%20d='M19.01%2025.6H14.75L0%2032.98V35.13L19.05%2025.6H19.01Z'%20fill='%23C8102E'/%3e%3cpath%20d='M10.52%2012.81H14.78L0%205.40997V7.54997L10.52%2012.81Z'%20fill='%23C8102E'/%3e%3cpath%20d='M44.63%2025.59H40.37L55.2%2033.02V30.88L44.63%2025.59Z'%20fill='%23C8102E'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_245_56'%3e%3crect%20width='55.2'%20height='38.4'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",pf="data:image/svg+xml,%3csvg%20width='56'%20height='39'%20viewBox='0%200%2056%2039'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_245_72)'%3e%3crect%20width='55.2'%20height='19.2'%20fill='%230054B1'/%3e%3crect%20y='19.2'%20width='55.2'%20height='19.2'%20fill='%23F7D104'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_245_72'%3e%3crect%20width='55.2'%20height='38.4'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",mf="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAYdJREFUeJztm7suBGEYht8lhEStUBGNjnAJrkDiUNBK3INK7x5cgohNHKJxDUoRvRCdOOZRCI1Y+38zm38O71P/s/M9z/wzm51kpYIAM8Ah8AjcAHvAaNHPrQXAAnDPby6BidzzDZQe8s2PAEwCdz3kv7kAxnPPWzrAfh/yzY0AnCcEqHSEoeBxt4nrlyUdVzVCMsAc8JS4C6BJD0ZgDXgLRKjs7ZAMsAq8tn0nOIIjyBEkOYIkR5DkCJIcQZIjSHIESY4g6SdC5LeDIziCIziCIziCIzhCKyKsByOcAdFX/NWiQISd3LOXBrHboRs5V1W3zXDgmI/Sp8gBsAW8B26B7dyzF6aAfJe6PwSBDeLfAGO55y+E5S1vectb3vKWt7zlLW95y1u+zlje8pa3fJvkN4m9wDxpgvw88NLKKy9JwEFTrnz0Xfp04vpTSSudTuc5eL6BEQ1wlbC2svJhgCngoa7bvhSApX8iNOOB1wtg8Y8IzZf/BpgFjvj6+/w1sAuM5J6rXz4BVeWDWLYgD/oAAAAASUVORK5CYII=",gf=document.getElementById("dialog-container");let Rc;function Cf(t){const e=Vi[Nn()].phrases,n=document.createElement("div");n.classList.add("dialog-phrase"),n.style.left=`${t.x}%`;const i=document.createElement("img");i.src=t.img,n.appendChild(i);const s=document.createElement("div");s.classList.add("dialog-phrase-wrapper"),n.appendChild(s);const r=document.createElement("span");r.innerText=t.userName||"",s.appendChild(r);const o=document.createElement("p");o.innerText=e[String(t.index)],s.appendChild(o),gf.appendChild(n),setTimeout(()=>{n.remove()},wf)}function yf(){const t=document.querySelector(".dialog"),e=t.querySelector(".dialog-list"),n=t.querySelector(".dialog-button");Mc();const i=document.createElement("style");if(i.textContent=`
      .dialog-button::after {
        background-image: url(${mf});
      }
    `,document.head.appendChild(i),!e)throw new Error("Dialog is not found!");r();function s(){t.classList.add("dialog--active");const a=parseFloat(Rc.height);e.style.height=`${a*Nc.length}px`}function r(){t.classList.remove("dialog--active"),e.style.height="0px"}function o(){if(t.classList.contains("dialog--active")){r();return}s()}n?.addEventListener("click",o)}function Mc(){const t=Vi[Nn()].phrases,e=document.querySelector(".dialog"),n=e.querySelector(".dialog-list");n.innerHTML="";function i(){e.classList.remove("dialog--active"),n.style.height="0px"}Nc.forEach(s=>{const r=document.createElement("li");r.classList.add("dialog-list-item"),Rc=window.getComputedStyle(r);const o=document.createElement("img");o.src=s.img;const a=document.createElement("p"),l=t[String(s.id)];a.textContent=l,r.appendChild(o),r.appendChild(a),n.appendChild(r),r.addEventListener("click",()=>{const c=fe(),h=20,d=Math.floor(Math.random()*(80-h+1))+h,m={id:Ze(),userName:qe(),index:s.id,img:s.img,x:d};i(),B3(c,m)})})}let js=[];function _f(t=["#lng-btn"]){js=t.map(e=>document.querySelector(e)).filter(e=>!!e),js.forEach(e=>e.addEventListener("click",vf)),Cn()}function Cn(){const t=Nn();Af(t),Ef(t)}function vf(){const e=Nn()===ft.EN?ft.UA:ft.EN;bf(e),Cn(),Mc()}function Af(t){const n=`<img src="${t===ft.EN?ff:pf}" alt="${t}" />`;js.forEach(i=>i.innerHTML=n)}function Ef(t){const e=Vi[t];[...document.querySelectorAll("[data-lng]")].forEach(i=>{const s=i.getAttribute("data-lng"),r=s&&s in e?e[s]:"unknown";i.innerHTML=`${r}`})}function Nn(){return localStorage.getItem("language")||ft.EN}function bf(t){localStorage.setItem("language",t)}const wf=15e3,Nc=[{id:1,img:J3},{id:2,img:K3},{id:3,img:X3},{id:4,img:$3},{id:5,img:ef}],Ot=[{id:1,img:tf},{id:2,img:nf},{id:3,img:sf},{id:4,img:rf},{id:5,img:of},{id:6,img:af},{id:7,img:lf},{id:8,img:cf},{id:9,img:uf}],Zs=["#FF2D55","#FF9500","#FFD60A","#7B542F","#34C759","#0A84FF","#AF52DE","#561530"],Js=15e3,On=5e3,Sf=5e3,sa=3e3,If=8e3,kc=5e3,ra=5e3,oa=1e4;function Te(t,e){const n=Nn()||ft.EN,i=t.split(".");let s=Vi[n];for(const r of i)if(s&&r in s)s=s[r];else return t;return typeof s=="string"&&e&&(s=s.replace(/\{(\w+)\}/g,(r,o)=>e[o]!==void 0?String(e[o]):`{${o}}`)),s}function Tf(t){return t&&typeof t.id=="number"&&!isNaN(t.id)&&typeof t.name=="string"&&t.name.trim()!==""&&typeof t.color=="string"&&t.color.trim()!==""&&typeof t.avatar=="number"&&!isNaN(t.avatar)}function qi(){const t=Be();if(!Tf(t)){const e={id:Ze(),name:`Player-${Ze()}`,color:Dc(),avatar:Rf()};return H3(e.name),V3(e.id),Ui(e),e}return t}function Dc(){const t=Math.floor(Math.random()*Zs.length);return Zs[t]}function Rf(){return Math.floor(Math.random()*Ot.length)}const jr=document.getElementById("ribbons-container");function Mf(){for(let t=0;t<4;t++){const e=document.createElement("span");e.classList.add("ribbon"),jr.appendChild(e)}}function Nf(){jr.classList.add("is-active")}function kf(){jr.classList.remove("is-active")}const Df=window.AudioContext??window.webkitAudioContext,yn=new Df,Gi=yn.createGain();Gi.gain.value=1;Gi.connect(yn.destination);function Pf(){return yn}function Lf(){return Gi}function aa(t){Gi.gain.value=t?0:1}function xf(){const t=document.getElementById("mute-btn");if(!t)return;let e=!1;const n=localStorage.getItem("is-muted");n!==null&&(e=JSON.parse(n)),t.setAttribute("data-is-muted",String(e)),aa(e),t.addEventListener("click",()=>{yn.state==="suspended"&&yn.resume(),e=!e,t.setAttribute("data-is-muted",String(e)),localStorage.setItem("is-muted",String(e)),aa(e)})}function bt({src:t,loudness:e=1,infinite:n=!1}){const i=Pf(),s=Lf();let r=null,o=null;const a=async h=>{const d=await(await fetch(h)).arrayBuffer();return i.decodeAudioData(d)};return{startSound:async()=>{const h=await a(t);r=i.createBufferSource(),o=i.createGain(),o.gain.value=e,r.buffer=h,r.connect(o),o.connect(s),n&&(r.loop=!0),r.start()},stopSound:()=>{r&&r.stop()}}}const Of="/Testing_game/assets/swipe-BX8BxDgz.mp3",Bf="/Testing_game/assets/decoration1-gEPLjrjI.png",Pc="/Testing_game/assets/decoration2-DuWQqdkr.png",Ff="/Testing_game/assets/coin-DGaJsrbG.mp3",Hf=`
  <g id="face-regular">
    <path d="M169.557 160.541C169.557 172.531 159.838 166.564 147.848 166.564C135.859 166.564 126.139 172.531 126.139 160.541C126.139 148.55 135.859 138.832 147.848 138.832C159.838 138.832 169.557 148.55 169.557 160.541Z" fill="#7FD5DC"/>
    <path d="M231.899 160.541C231.899 172.531 241.618 166.564 253.608 166.564C265.597 166.564 275.317 172.531 275.317 160.541C275.317 148.55 265.597 138.832 253.608 138.832C241.618 138.832 231.899 148.55 231.899 160.541Z" fill="#7FD5DC"/>
    <path d="M214.367 187.526C214.367 191.2 212.877 194.524 210.47 196.931C208.063 199.338 204.739 200.828 201.065 200.828C193.718 200.828 187.763 194.873 187.763 187.526C187.763 187.003 187.975 186.526 188.319 186.184C188.664 185.839 189.139 185.625 189.662 185.625H212.466C213.514 185.625 214.367 186.478 214.367 187.526Z" fill="#7FD5DC"/>
  </g>
`,Wf=`
  <g id="face-angry">
    <path d="M182.287 198.585C182.287 198.158 182.441 197.745 182.72 197.421L186.896 192.584C194.459 183.822 208.04 183.822 215.603 192.584L219.779 197.421C220.058 197.745 220.212 198.158 220.212 198.585C220.212 199.989 218.663 200.841 217.477 200.09L206.152 192.911C203.159 191.014 199.34 191.014 196.347 192.911L185.022 200.09C183.836 200.841 182.287 199.989 182.287 198.585Z" fill="#FF3C3C"/>
    <path d="M127.041 135.957L144.642 143.135L168.605 151.3L168.267 156.629C167.578 167.496 158.563 175.957 147.675 175.957C136.279 175.957 127.041 166.719 127.041 155.323V135.957Z" fill="#FF3C3C"/>
    <path d="M275.317 135.957L257.716 143.135L233.753 151.3L234.091 156.629C234.78 167.496 243.795 175.957 254.683 175.957C266.079 175.957 275.317 166.719 275.317 155.323V135.957Z" fill="#FF3C3C"/>
  </g>
`,Uf=`
  <g id="face-offer">
    <circle cx="201.064" cy="191.343" r="15"/>
    <g>
      <path d="M252.451 167.762C251.346 167.762 250.287 167.323 249.505 166.542C248.724 165.76 248.285 164.701 248.285 163.596V158.04C248.285 156.935 248.724 155.875 249.505 155.094C250.287 154.312 251.346 153.873 252.451 153.873C253.289 153.865 260.785 152.484 260.785 146.929C260.785 144.151 258.007 141.373 253.84 141.373C250.45 141.373 248.285 144.151 248.285 145.54C248.285 146.087 248.177 146.629 247.968 147.135C247.758 147.64 247.451 148.099 247.064 148.486C246.677 148.873 246.218 149.18 245.713 149.39C245.207 149.599 244.665 149.707 244.118 149.707C243.571 149.707 243.029 149.599 242.524 149.39C242.018 149.18 241.559 148.873 241.172 148.486C240.785 148.099 240.478 147.64 240.269 147.135C240.059 146.629 239.951 146.087 239.951 145.54C239.951 138.765 246.313 133.04 253.84 133.04C264.951 133.04 269.118 141.348 269.118 148.318C269.118 154.075 265.956 158.475 260.211 160.707C258.961 161.194 257.725 161.522 256.618 161.744V163.596C256.618 164.701 256.179 165.76 255.398 166.542C254.616 167.323 253.556 167.762 252.451 167.762Z" fill="#63A361"/>
      <path d="M252.451 178.873C254.753 178.873 256.618 177.008 256.618 174.707C256.618 172.406 254.753 170.54 252.451 170.54C250.15 170.54 248.285 172.406 248.285 174.707C248.285 177.008 250.15 178.873 252.451 178.873Z" fill="#63A361"/>
    </g>
    <g>
      <path d="M145.88 167.762C144.775 167.762 143.715 167.323 142.934 166.542C142.153 165.76 141.714 164.701 141.714 163.596V158.04C141.714 156.935 142.153 155.875 142.934 155.094C143.715 154.312 144.775 153.873 145.88 153.873C146.718 153.865 154.214 152.484 154.214 146.929C154.214 144.151 151.436 141.373 147.269 141.373C143.879 141.373 141.714 144.151 141.714 145.54C141.714 146.087 141.606 146.629 141.397 147.135C141.187 147.64 140.88 148.099 140.493 148.486C140.106 148.873 139.647 149.18 139.142 149.39C138.636 149.599 138.094 149.707 137.547 149.707C137 149.707 136.458 149.599 135.953 149.39C135.447 149.18 134.988 148.873 134.601 148.486C134.214 148.099 133.907 147.64 133.698 147.135C133.488 146.629 133.38 146.087 133.38 145.54C133.38 138.765 139.741 133.04 147.269 133.04C158.38 133.04 162.547 141.348 162.547 148.318C162.547 154.075 159.385 158.475 153.64 160.707C152.39 161.194 151.154 161.522 150.047 161.744V163.596C150.047 164.701 149.608 165.76 148.827 166.542C148.045 167.323 146.985 167.762 145.88 167.762Z" fill="#63A361"/>
      <path d="M145.88 178.873C148.181 178.873 150.047 177.008 150.047 174.707C150.047 172.406 148.181 170.54 145.88 170.54C143.579 170.54 141.714 172.406 141.714 174.707C141.714 177.008 143.579 178.873 145.88 178.873Z" fill="#63A361"/>
    </g>
  </g>
`,Vf=`
  <g id="face-warning">
    <rect x="171.064" y="188.89" width="60" height="10"/>
    <circle cx="147.041" cy="155.957" r="20"/>
    <circle cx="255.317" cy="155.957" r="20"/>
  </g>
`;var Rt=(t=>(t.REGULAR="regular",t.ANGRY="angry",t.OFFER="offer",t.INFORM="inform",t))(Rt||{});const qf={regular:Hf,angry:Wf,offer:Uf,inform:Vf},Gf=t=>`
  <svg viewBox="-50 0 500 500">
    <g id="robot">
      <g id="hand-right">
        <path d="M272.095 275.694C272.824 285.664 279.922 286.434 287.868 305.343C298.023 329.504 300.518 352.976 305.967 378.79C312.763 410.999 331.822 413.289 340.374 411.536C355.781 408.368 362.88 389.941 358.698 370.129C343.268 297.017 314.022 262.437 285.777 262.703C280.518 262.753 271.384 265.98 272.095 275.694Z" fill="#DEE4EB"/>
        <path d="M340.374 411.536C337.517 412.12 333.49 412.256 329.141 410.975C343.049 406.603 349.294 388.993 345.314 370.129C331.375 304.098 306.169 269.494 280.613 263.611C282.436 262.993 284.268 262.717 285.779 262.703C314.022 262.437 343.268 297.017 358.698 370.129C362.88 389.941 355.781 408.368 340.374 411.536Z" fill="#C7D0DC"/>
      </g>

      <g id="hand-left">
        <path d="M122.689 275.986C121.959 285.954 114.861 286.726 106.913 305.635C98.4371 325.802 95.2975 345.488 91.3202 366.46C90.5352 370.614 89.7137 374.815 88.8139 379.082C82.0183 411.291 62.9601 413.582 54.4086 411.826C39.0019 408.661 31.901 390.234 36.0828 370.419C49.8485 305.201 74.6076 270.642 99.8419 264.131C102.894 263.345 105.956 262.964 109.004 262.995C114.264 263.043 123.398 266.272 122.689 275.986Z" fill="#DEE4EB"/>
        <path d="M122.689 275.986C121.959 285.954 114.86 286.726 106.913 305.635C98.4369 325.802 95.2973 345.488 91.3201 366.46C90.324 363.093 89.4106 359.629 88.5821 356.069C88.2354 354.598 87.9073 353.111 87.5974 351.607C84.5243 336.86 82.8674 320.539 82.8674 302.713C82.8674 287.567 88.9171 274.501 99.8417 264.131C102.894 263.345 105.956 262.964 109.003 262.995C114.264 263.043 123.398 266.272 122.689 275.986Z" fill="#C7D0DC"/>
      </g>

      <g id="body">
        <path d="M302.579 302.713C302.579 320.539 300.923 336.86 297.848 351.607C297.539 353.111 297.211 354.598 296.864 356.069C282.816 416.424 244.406 449.103 199.228 449.103C154.049 449.103 115.638 416.424 101.589 356.069C101.244 354.598 100.916 353.111 100.607 351.607C97.5319 336.86 95.8755 320.539 95.8755 302.713C95.8755 263.059 137.348 237.644 199.228 237.644C261.105 237.644 302.579 263.059 302.579 302.713Z" fill="#DEE4EB"/>
        <path d="M302.579 302.713C302.579 320.539 300.922 336.86 297.848 351.607C297.539 353.111 297.211 354.598 296.866 356.069C282.816 416.424 244.406 449.103 199.228 449.103C165.18 449.103 134.974 430.543 116.148 395.563C129.127 406.083 143.528 414.463 159.247 419.052C184.55 426.441 213.58 422.823 233.896 405.268C245.394 395.33 253.321 381.81 258.579 367.019C259.088 365.598 259.565 364.165 260.026 362.722C262.391 355.249 264.121 347.517 265.321 339.809C267.559 325.441 268.196 310.54 264.703 296.454C261.207 282.37 253.186 269.116 241.205 261.912C233.663 257.376 225.002 255.427 216.46 253.802C192.254 249.197 167.688 246.702 143.094 246.346C158.765 240.7 177.769 237.646 199.228 237.646C261.108 237.646 302.579 263.059 302.579 302.713Z" fill="#C7D0DC"/>
        <path d="M157.184 225.345V250.178C157.184 263.344 176.008 274.018 199.228 274.018C222.448 274.018 241.272 263.344 241.272 250.178V225.345H157.184Z" fill="#CBD3DB"/>
        <path d="M241.271 225.345V246.854C229.521 252.374 216.155 254.669 199.228 254.669C184.108 254.669 168.932 252.832 157.184 247.298V225.345H241.271Z" fill="#ABB7C6"/>
        <path id="changing-line" d="M297.841 351.605L296.887 356.072C296.887 356.072 252.219 368.328 249.039 368.865V380.489L247.528 380.836C247.309 380.886 225.38 385.819 199.228 385.819C173.075 385.819 151.146 380.886 150.925 380.836L149.415 380.489V368.865C131.73 365.876 113.638 360.256 101.589 356.069C101.244 354.598 100.916 353.111 100.606 351.607C112.761 355.912 132.586 362.245 151.665 365.296L153.301 365.555V377.364C158.637 378.45 177.436 381.934 199.228 381.934C221.041 381.934 239.822 378.453 245.154 377.364V365.555L246.789 365.296C251.197 364.59 297.841 351.605 297.841 351.605Z" fill="#FF3C3C"/>
      </g>

      <g id="head">
        <path d="M245.611 79.3519C245.611 97.1089 225.668 111.501 201.065 111.501C176.462 111.501 156.517 97.1089 156.517 79.3519C156.517 61.5949 156.517 47.2025 201.065 47.2025C245.611 47.2025 245.611 61.5949 245.611 79.3519Z" fill="#CBD3DB"/>
        <path d="M76.7715 183.617C76.7715 198.789 85.0766 212.749 98.4213 219.968C115.385 229.142 145.533 237.646 199.015 237.646C252.495 237.646 282.643 229.142 299.607 219.968C312.951 212.749 321.258 198.789 321.258 183.617V117.097C321.258 101.925 312.951 87.9654 299.607 80.7491C282.643 71.5747 252.495 63.0705 199.015 63.0705C145.533 63.0705 115.385 71.5747 98.4213 80.7491C85.0766 87.9654 76.7715 101.925 76.7715 117.097V183.617Z" fill="#DEE4EB"/>
        <path d="M320.638 116.268V182.791C320.638 197.962 312.331 211.922 298.989 219.141C282.025 228.313 251.874 236.817 198.394 236.817C144.914 236.817 114.766 228.313 97.8003 219.141C91.062 215.496 85.609 210.133 81.8613 203.758C103.882 217.202 131.423 220.99 157.619 221.296C176.042 221.51 194.909 220.208 211.839 212.932C242.584 199.721 262.983 166.697 263.423 133.233C263.712 111.328 256.018 82.8353 242.22 64.5199C269.524 67.654 287.358 73.6277 298.989 79.9197C312.331 87.1385 320.638 101.098 320.638 116.268Z" fill="#C7D0DC"/>
      
        <g id="face-monitor">
          <path id="face-bg" d="M201.065 225.609C147.645 225.609 120.223 216.843 106.625 209.489C97.4544 204.528 91.7573 194.959 91.7573 184.518V133.483C91.7573 123.042 97.4544 113.473 106.625 108.512C120.223 101.158 147.645 92.3922 201.065 92.3922C254.483 92.3922 281.907 101.158 295.503 108.512C304.675 113.473 310.371 123.042 310.371 133.483V184.518C310.371 194.959 304.675 204.528 295.503 209.487C281.907 216.843 254.483 225.609 201.065 225.609Z" fill="#23445E"/>
        
          <g id="face">
            ${qf[t]}
          </g>
        </g>

        <g id="shadow">
          <path d="M111.51 92.0334C112.385 91.6485 113.271 91.292 114.168 90.9617C113.842 91.0805 113.516 91.1994 113.189 91.3205C118.091 89.5313 123.149 88.1246 128.234 86.9698C133.739 85.7199 139.314 84.798 144.906 84.04C148.594 83.541 152.291 83.1133 155.992 82.7236C156.52 82.6238 156.986 82.4076 157.392 82.0725C157.842 81.8112 158.205 81.4524 158.481 80.9985C158.797 80.5518 158.98 80.0623 159.03 79.53C159.176 79.0025 159.179 78.4679 159.038 77.9261C158.772 76.94 158.217 75.9753 157.313 75.4383C157.001 75.2886 156.688 75.1366 156.375 74.9869C155.674 74.7611 154.963 74.7255 154.242 74.8799C150.753 75.2482 147.266 75.6498 143.788 76.1132C140.709 76.5242 137.636 76.9805 134.576 77.5151C131.758 78.007 128.95 78.563 126.162 79.2022C123.514 79.8105 120.884 80.4948 118.277 81.2599C115.177 82.1723 112.073 83.1584 109.076 84.3679C108.649 84.5413 108.225 84.7196 107.804 84.9049C107.324 85.133 106.932 85.4586 106.627 85.8815C106.253 86.2522 105.992 86.6942 105.842 87.2098C105.648 87.7349 105.598 88.2672 105.691 88.8066C105.688 89.3412 105.822 89.8473 106.093 90.3201C106.602 91.2041 107.388 92.0001 108.399 92.2829C108.752 92.3494 109.105 92.4135 109.458 92.4801C110.182 92.5133 110.866 92.3637 111.51 92.0334Z" fill="white"/>
          <path d="M97.6213 102.002C98.5231 100.982 99.48 100.017 100.484 99.1002C100.893 98.7557 101.191 98.3398 101.377 97.8504C101.652 97.3846 101.793 96.8762 101.8 96.3225C101.848 95.7713 101.758 95.2485 101.531 94.759C101.393 94.2529 101.138 93.8109 100.765 93.426C100.505 93.205 100.245 92.9816 99.9844 92.7583C99.3768 92.3662 98.711 92.15 97.987 92.1119C97.6292 92.1405 97.2713 92.1714 96.9135 92.2023C96.2244 92.3591 95.6173 92.6727 95.0922 93.1456C94.0882 94.0628 93.1311 95.0299 92.2296 96.0469C91.8204 96.3914 91.5225 96.8073 91.3362 97.2967C91.0612 97.7625 90.9206 98.2709 90.9139 98.8246C90.8659 99.3759 90.9555 99.8962 91.1829 100.388C91.32 100.892 91.5752 101.336 91.9483 101.719C92.2087 101.942 92.4689 102.165 92.7291 102.386C93.3369 102.781 94.0027 102.997 94.7267 103.035C95.0843 103.004 95.4422 102.976 95.8 102.945C96.4891 102.788 97.0962 102.472 97.6213 102.002Z" fill="white"/>
        </g>

        <g id="ear">
          <path d="M319.077 184.518L325.704 183.496C336.399 181.85 344.293 172.647 344.293 161.826V140.688C344.293 129.867 336.399 120.664 325.704 119.017L319.077 117.995V184.518Z" fill="#ABB7C6"/>
          <path d="M79.38 184.518L72.7532 183.496C62.0579 181.85 54.1631 172.647 54.1631 161.826V140.688C54.1631 129.867 62.0579 120.664 72.7532 119.017L79.38 117.995V184.518Z" fill="#CBD3DB"/>
          <path d="M93.896 184.518V133.483C93.896 123.829 99.1634 114.98 107.643 110.394C121.023 103.156 148.092 94.5309 201.065 94.5309C254.037 94.5309 281.106 103.156 294.486 110.394C302.967 114.98 308.232 123.829 308.232 133.483V184.518C308.232 194.173 302.967 203.021 294.486 207.607C281.106 214.843 254.037 223.47 201.065 223.47C148.092 223.47 121.023 214.843 107.643 207.607C99.1634 203.021 93.896 194.173 93.896 184.518ZM296.52 211.369C306.384 206.034 312.509 195.746 312.509 184.518V133.483C312.509 122.256 306.384 111.967 296.52 106.633C271.492 93.0957 230.796 90.2538 201.065 90.2538C171.333 90.2538 130.637 93.0957 105.608 106.633C95.7456 111.967 89.6189 122.256 89.6189 133.483V184.518C89.6189 195.746 95.7456 206.037 105.608 211.369C130.636 224.906 171.332 227.748 201.065 227.748C230.796 227.748 271.492 224.906 296.52 211.369Z" fill="#141A2F"/>
        </g>

        <g id="robot-shadow">
          <path d="M114.779 302.634C114.668 298.778 114.712 294.89 115.219 291.06C115.178 291.367 115.137 291.671 115.096 291.977C115.285 290.566 115.539 289.162 115.932 287.793C116.271 286.61 116.697 285.45 117.175 284.317C117.059 284.592 116.943 284.865 116.828 285.141C118.012 282.351 119.572 279.735 121.422 277.34C121.243 277.571 121.063 277.803 120.884 278.036C122.543 275.895 124.426 273.933 126.476 272.163C127.081 271.64 127.701 271.136 128.333 270.647C128.101 270.825 127.869 271.005 127.636 271.184C130.282 269.142 133.145 267.391 136.149 265.927C137.028 265.5 137.919 265.098 138.82 264.716C138.546 264.832 138.272 264.949 137.997 265.065C139.619 264.383 141.271 263.779 142.948 263.25C143.794 262.983 144.552 262.442 145.006 261.667C145.437 260.93 145.62 259.842 145.353 259.015C145.083 258.181 144.567 257.378 143.771 256.957C142.968 256.535 142.008 256.33 141.118 256.611C137.18 257.853 133.329 259.486 129.739 261.532C126.371 263.449 123.193 265.768 120.36 268.415C117.659 270.936 115.26 273.838 113.313 276.979C112.439 278.39 111.664 279.861 111.003 281.382C110.222 283.183 109.497 285.015 109.039 286.928C108.499 289.188 108.223 291.523 108.047 293.838C107.869 296.171 107.826 298.514 107.856 300.852C107.864 301.446 107.877 302.04 107.894 302.634C107.92 303.535 108.26 304.428 108.902 305.07C109.5 305.666 110.479 306.115 111.337 306.077C112.227 306.039 113.15 305.745 113.771 305.07C114.379 304.407 114.806 303.559 114.779 302.634Z" fill="white"/>
          <path d="M116.155 318.022C116.026 317.21 115.908 316.397 115.799 315.584C115.84 315.888 115.881 316.195 115.922 316.499C115.908 316.392 115.893 316.283 115.879 316.176C115.897 315.703 115.798 315.261 115.582 314.85C115.443 314.422 115.206 314.054 114.871 313.743C114.559 313.405 114.19 313.17 113.763 313.03C113.352 312.814 112.91 312.716 112.436 312.733C112.131 312.776 111.826 312.816 111.521 312.856C110.938 313.02 110.432 313.315 110.002 313.743C109.823 313.973 109.643 314.206 109.464 314.439C109.152 314.976 108.996 315.556 108.994 316.176C109.156 317.404 109.322 318.631 109.516 319.852C109.622 320.301 109.828 320.691 110.132 321.023C110.375 321.396 110.697 321.693 111.098 321.91C111.493 322.161 111.92 322.297 112.378 322.318C112.835 322.42 113.293 322.399 113.751 322.257C114.025 322.14 114.299 322.026 114.573 321.91C115.09 321.603 115.502 321.192 115.808 320.674C115.924 320.401 116.039 320.125 116.155 319.852C116.319 319.241 116.319 318.631 116.155 318.022Z" fill="white"/>
        </g>
      </g>
    </g>
  </svg>
`,zf="/Testing_game/assets/helper-B4AVoC-5.mp3",Lc=document.getElementById("helper-container"),ls=document.getElementById("helper-icon"),la=document.getElementById("helper-text"),Ks=document.getElementById("helper-btns"),cs=document.getElementById("helper-progress-bar"),xc=document.getElementById("helper-accept-btn"),Oc=document.getElementById("helper-reject-btn");var ue=(t=>(t.HELPER_HINT="helper_hint",t.HELPER_WARNING="helper_warning",t.HELPER_OFFER="helper_offer",t.HELPER_INFORM="helper_inform",t))(ue||{});const Yf={helper_hint:Rt.REGULAR,helper_warning:Rt.ANGRY,helper_offer:Rt.OFFER,helper_inform:Rt.INFORM},Qf=3e3,jf=500,Zf=20,Jf=3e3,{startSound:Kf,stopSound:Xf}=bt({src:zf,loudness:.2,infinite:!0}),Xs=[];let Zr=!1,ke=null;const ca=new Map;function $f(){const t=$s(),e=document.getElementById("helper-btn");t&&e.classList.add("is-off"),e.addEventListener("click",()=>{const n=$s();localStorage.setItem("helperIsDisabled",String(!n)),n?e.classList.remove("is-off"):e.classList.add("is-off")})}function Fe(t){const e={duration:t.duration??Qf,text:t.text,type:t.type,onAccept:t.onAccept,onReject:t.onReject,priority:t.priority??0,dedupeKey:t.dedupeKey,delayBeforeShow:t.delayBeforeShow??0};if($s()&&e.type==="helper_hint")return;if(e.dedupeKey){const i=Date.now(),s=ca.get(e.dedupeKey)??0;if(i-s<Jf)return;ca.set(e.dedupeKey,i)}(()=>{if(!Zr){setTimeout(()=>Jr(e),e.delayBeforeShow);return}if(e.priority>(ke?.args.priority??0)){e0(e);return}Xs.push(e),Xs.sort((s,r)=>(r.priority??0)-(s.priority??0))})()}function e0(t){ke?.timeoutId&&clearTimeout(ke.timeoutId),Fc(ke?.onAccept,ke?.onReject),Bc(),setTimeout(()=>Jr(t),t.delayBeforeShow)}function Jr(t){Zr=!0,Kf(),t0(Yf[t.type]),Lc.classList.add("visible"),la.innerText="",cs.style.animation="none",cs.offsetWidth,cs.style.animation=`helper-bar ${t.duration}ms linear`,t.type==="helper_offer"?Ks.classList.add("visible"):Ks.classList.remove("visible");let e=0;const n=t.text,i=setInterval(()=>{la.innerText=n.slice(0,e+1),e++,e>=n.length&&clearInterval(i)},Zf),s=()=>{us(),t.onAccept?.()},r=()=>{us(),t.onReject?.()};t.type==="helper_offer"&&(xc.addEventListener("click",s),Oc.addEventListener("click",r)),ke={timeoutId:setTimeout(()=>{us()},t.duration),onAccept:s,onReject:r,args:t}}function us(){Fc(ke?.onAccept,ke?.onReject),Bc(),setTimeout(()=>{const t=Xs.shift();t&&Jr(t)},jf)}function Bc(){Xf(),Lc.classList.remove("visible"),Ks.classList.remove("visible"),Zr=!1,ke=null}function Fc(t,e){t&&xc.removeEventListener("click",t),e&&Oc.removeEventListener("click",e)}function t0(t){Object.values(Rt).forEach(e=>ls.classList.remove(e)),ls.classList.add(t),ls.innerHTML=Gf(t)}function $s(){return localStorage.getItem("helperIsDisabled")==="true"}let rn=null,We=null;const Hc=500,Kr=5e3+Hc;let Jn=!1,er=null;function Wc(){return rn||(rn=document.querySelector(".coin-container")),We||(We=document.querySelector(".coin")),!!(rn&&We)}function n0(){Wc()}const{startSound:i0,stopSound:s0}=bt({src:Ff,infinite:!0});function r0(t){Wc()&&(Jn||t===er||(Jn=!0,er=t,i0(),rn.classList.add("is-active"),We.style.transition="none",We.style.transform="rotateX(0deg) rotateY(0deg) rotateZ(0deg)",We.offsetWidth,We.style.transition="transform 5s ease",setTimeout(()=>{const e=t==="left"?3600:3780;We.style.transform=`rotateY(${e}deg)`},Hc),setTimeout(()=>{rn.classList.remove("is-active"),Jn=!1,s0()},Kr)))}function o0(t,e,n){Jn||t===er||setTimeout(()=>{const i=e==="left"?n.players[1].name:n.players[0].name;Fe({duration:Sf,text:Te(`helper.coinWinner.${e===t?"current":"other"}`,{name:i}),type:ue.HELPER_INFORM,priority:1,dedupeKey:`coin:${t}`,delayBeforeShow:0})},Kr)}function Xr(){return Math.random()<.5?"left":"right"}const a0="/Testing_game/assets/dice-Dc250ONA.mp3",yi=document.querySelector(".dice-container");if(!yi)throw new Error("Dice container is not found.");const tr=2e3,l0=50,zi=tr+1e3;let ds=!1;const{startSound:c0,stopSound:u0}=bt({src:a0,loudness:.6,infinite:!0});function d0(){return document.querySelector('[data-type="dice"]')}function Uc(t){const e=d0();e&&(e.toggleAttribute("disabled",t),e.classList.toggle("is-hidden",t))}window.addEventListener("coin:start",()=>Uc(!0));window.addEventListener("coin:end",()=>Uc(!1));function h0(t){if(ds)return;c0();const e=document.querySelector(".dice");yi?.classList.add("dice-container--roling"),e.style.animation=`rolling ${tr}ms linear`,ds=!0,setTimeout(()=>{switch(t){case 1:e.style.transform="rotateX(0deg) rotateY(0deg)";break;case 6:e.style.transform="rotateX(180deg) rotateY(0deg)";break;case 2:e.style.transform="rotateX(-90deg) rotateY(0deg)";break;case 5:e.style.transform="rotateX(90deg) rotateY(0deg)";break;case 3:e.style.transform="rotateX(0deg) rotateY(90deg)";break;case 4:e.style.transform="rotateX(0deg) rotateY(-90deg)";break}e.style.animation="none"},tr+l0),setTimeout(()=>{yi?.classList.remove("dice-container--roling"),ds=!1,e.style.transform="none",u0()},zi)}function f0(){const t=`
		<div class="dice">
			<div class="face front"></div>
			<div class="face back"></div>
			<div class="face top"></div>
			<div class="face bottom"></div>
			<div class="face right"></div>
			<div class="face left"></div>
		</div>
  `,e=document.createElement("div");e.innerHTML=t,yi.appendChild(e.firstElementChild)}function p0(t,e,n){setTimeout(()=>{const i=e===t?.isTurn?"current":"other";t.lastDiceResult===6?Fe({duration:sa,text:Te(`helper.diceStreak.${i}`),type:ue.HELPER_HINT,priority:2,dedupeKey:`dice:streak:${i}`,delayBeforeShow:0}):Fe({duration:sa,text:Te(`helper.diceRes.${i}`,{res:n}),type:ue.HELPER_HINT,priority:2,dedupeKey:`dice:${n}:${i}`,delayBeforeShow:0})},zi)}var Ge=(t=>(t.RESET="reset",t.INFORM="inform",t.HINT="hint",t.WARNING="warning",t))(Ge||{});function nr(t){return new Date(Date.now()+t).toISOString()}let Ue,hs;function ir(t){t.classList.remove("is-hidden"),t.setAttribute("aria-hidden","false")}function ot(t){t.classList.add("is-hidden"),t.setAttribute("aria-hidden","true")}function St(t){const e=t.querySelector(".gm-restart"),n=t.querySelector(".gm-yes"),i=t.querySelector(".gm-no"),s=t.querySelector(".gm-exit"),r=t.querySelector(".gm-timer");e?.classList.remove("is-hidden"),n?.classList.add("is-hidden"),i?.classList.add("is-hidden"),s?.classList.remove("is-hidden"),r?.classList.add("is-hidden")}function Vc(t,e,n,i=!1){const s=t.querySelector(".gm-timer"),r=t.querySelector(".gm-yes"),o=t.querySelector(".gm-no"),a=t.querySelector(".gm-exit"),l=t.querySelector(".gm-restart");if(i?(a?.classList.add("is-hidden"),l?.classList.add("is-hidden"),r?.classList.remove("is-hidden"),o?.classList.remove("is-hidden")):(l?.classList.add("is-hidden"),a?.classList.add("is-hidden"),r?.classList.add("is-hidden"),o?.classList.add("is-hidden")),!s)return;s.classList.remove("is-hidden"),clearInterval(hs);const c=()=>{const h=Date.now()-e,u=Math.max(0,Math.ceil((n-h)/1e3));s.textContent=String(u),u<=0&&(clearInterval(hs),ot(t),St(t),Qs(fe()))};c(),hs=window.setInterval(c,500)}function m0(t){if(Ue=document.getElementById("reset-btn"),!Ue)return;const e=t||document.body.getAttribute("data-my-side")||"left",i=Ue.closest(".player-navigation")?.querySelector(".game-menu");if(!i)return;const s=i.querySelector(".gm-close"),r=i.querySelector(".gm-exit"),o=i.querySelector(".gm-restart"),a=i.querySelector(".gm-yes"),l=i.querySelector(".gm-no");Ue.addEventListener("click",()=>{Ue?.classList.contains("is-off")||(i.classList.contains("is-hidden")?(ir(i),St(i)):ot(i))}),s?.addEventListener("click",()=>{ot(i),St(i)}),o?.addEventListener("click",async()=>{ir(i),Vc(i,Date.now(),1e4,!1),await Y3(fe(),e)}),r?.addEventListener("click",()=>{ot(i),St(i),window.location.reload()}),a?.addEventListener("click",async()=>{ot(i),St(i),await Qs(fe()),sr.onAccept()}),l?.addEventListener("click",async()=>{ot(i),St(i),await Qs(fe()),sr.onReject()})}const sr={onAccept:()=>{const t={type:Ge.INFORM,endsAt:nr(On),authorName:qe(),duration:On,text:Te("helper.acceptRestart",{name:qe()})};Ys(fe(),t),y0()},onReject:()=>{const t={type:Ge.INFORM,endsAt:nr(On),authorName:qe(),duration:On,text:Te("helper.rejectRestart",{name:qe()})};Ys(fe(),t)}};function g0(t){if(!t)return;const e=new Date(t).getTime(),n=Date.now();if(n-e>=Js)Ue?.classList.remove("is-off");else{Ue?.classList.add("is-off"),C0();const i=Js-(n-e);setTimeout(()=>Ue?.classList.remove("is-off"),i)}}function C0(){const t=document.getElementById("reset-cooldown");t.style.animation="none",t.offsetWidth,t.style.animation=`cooldown-progress ${Js}ms linear forwards`}async function y0(){try{const t=await c5();gn(fe(),{restartRoomId:t.id})}catch(t){alert(`Failed creating restart room: ${t}`)}}function _0(){Tc()&&v0()}async function v0(){try{const t=Be(),e=Tc(),n=await Sc(e);if(!e||!n)throw new Error("Restart room not found or invalid room ID.");await Qr(t,e),Wi(e),F3(),dt(()=>ji(n))}catch(t){alert(`Failed logging into restart room: ${t}`)}}const qc="data:image/png;base64,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",A0=document.querySelector("#player1"),E0=document.querySelector("#player2"),ua=`
  <div class="btn-group" style="position: relative; z-index: 50">
    <button id="lng-btn" class="btn btn--purple"></button>
    <button id="helper-btn" class="btn btn--purple"></button>
    <button id="reset-btn" class="btn btn--purple">
      <img src="${qc}" alt="reset" />
      <div id="reset-cooldown" class="reset-cooldown"></div>
    </button>
    <button id="mute-btn" class="btn btn--purple"></button>
  </div>

  <div class="game-menu is-hidden" role="dialog" aria-label="Game Menu" aria-hidden="true">
    <div class="gm-header">
      <span class="gm-title">Game Menu</span>
      <button class="gm-close" aria-label="Close">×</button>
    </div>

    <div class="gm-actions">
      <button class="gm-btn gm-exit">Exit</button>
      <button class="gm-btn gm-restart">Restart</button>
      <button class="gm-btn gm-yes is-hidden">Yes</button>
      <button class="gm-btn gm-no is-hidden">No</button>
    </div>

    <div class="gm-timer is-hidden">10</div>
  </div>
`,da=`
  <div class="dialog">
    <div class="btn dialog-button" data-lng="throwPhrase"></div>
    <ul class="dialog-list"></ul>
  </div>
`;function $r(t){const e=A0?.querySelector(".player-navigation"),n=E0?.querySelector(".player-navigation");switch(t){default:case"left":e.innerHTML=ua,n.innerHTML=da;break;case"right":e.innerHTML=da,n.innerHTML=ua;break}_f(["#lng-btn","#header-lng-btn"]),$f(),m0(t),yf(),xf()}const b0=document.querySelector("#player1"),ha=document.querySelector("#player2");function w0(t,e){document.body.style.setProperty("--player1-color",t.color),Gc(b0,t),$r(e)}function S0(t,e){document.body.style.setProperty("--player2-color",t.color),ha.classList.add("is-visible"),Gc(ha,t),$r(e)}function fa(t,e){const n=t.players.find(s=>s.id===e);n&&document.documentElement.style.setProperty("--current-player-color",n.color);const i=t.players.find(s=>s.id!==e);i&&document.documentElement.style.setProperty("--not-current-player-color",i.color)}function Gc(t,e){const n=t.querySelector(".player-info"),i=t.querySelector(".player-name");if(i&&(i.innerText=e.name),n){const s=document.createElement("img");s.classList.add("player-avatar"),s.src=Ot.find(r=>r.id===e.avatar)?.img||Ot[0].img,n.appendChild(s)}}const eo=document.getElementById("timer");let fs=[];const I0=38;if(!eo)throw new Error("Timer is not found");function T0(){const t=document.createElement("div");t.classList.add("timer-text");const e=document.createElement("div");e.classList.add("timer-text-list");const n=document.createElement("div");n.classList.add("timer-text-list");for(let r=9;r>=0;r--){const o=document.createElement("span");o.innerText=String(r),e.appendChild(o.cloneNode(!0)),n.appendChild(o)}const i=document.createElement("div");i.appendChild(e);const s=document.createElement("div");s.appendChild(n),t.appendChild(i),t.appendChild(s),eo.appendChild(t),zc(60)}function zc(t){fs.length||(fs=[...document.querySelectorAll(".timer-text-list")]),fs.forEach((e,n)=>{let i;t<10&&n===0?i=0:t<10&&n===1?i=t:i=Number(String(t).at(n)),e.style.top=`-${(9-i)*I0}px`})}function R0(t,e,n,i){if(eo.classList.contains("timer--isActive"))return()=>!1;const s=new Date(t),r=new Date(s.getTime()+e*1e3),o=Math.max(0,i?.thresholdSeconds??20);let a=!1;const l=setInterval(()=>{const c=Math.ceil((r.getTime()-Date.now())/1e3);n&&c===oa/1e3&&Fe({duration:oa,text:Te("helper.timerWarning"),type:ue.HELPER_WARNING}),!a&&c<=o&&(a=!0,i?.onThreshold?.()),i?.onTick?.(Math.max(0,c)),zc(Math.max(0,c)),c<=0&&(clearInterval(l),i?.onExpire?.())},1e3);return()=>{clearInterval(l)}}let Bn=null;const M0=60;function N0(t,e,n,i){t!==e&&(Bn&&(Bn(),Bn=null),Bn=R0(e,M0,n,i))}function k0(t,e){const n=new Date(t);return new Date(n.getTime()+e).toISOString()}class D0{streak=[];selectedIndices=[];total=null;prevStreakKey="";setStreak(e){const n=e.join(","),i=n!==this.prevStreakKey;return i&&(this.streak=e.slice(),this.prevStreakKey=n,this.clearSelection()),i}selectIndex(e){if(e<0||e>=this.streak.length)return{total:this.total??0,indices:this.selectedIndices.slice()};if(!this.selectedIndices.includes(e))this.selectedIndices.push(e),this.total=(this.total??0)+this.streak[e];else{this.selectedIndices=this.selectedIndices.filter(i=>i!==e);const n=this.selectedIndices.reduce((i,s)=>i+this.streak[s],0);this.total=this.selectedIndices.length?n:null}return{total:this.total??0,indices:this.selectedIndices.slice()}}clearSelection(){this.selectedIndices=[],this.total=null}clear(){this.streak=[],this.prevStreakKey="",this.clearSelection()}getSelectedIndices(){return this.selectedIndices.slice()}getTotal(){return this.total}}class P0{el;value;index;constructor(e,n,i){const s=document.createElement("button");s.type="button",s.className="steps-btn",s.textContent=String(e),s.dataset.value=String(e),s.dataset.index=String(n),s.addEventListener("click",()=>{typeof i=="function"?i(e,n):console.warn("[StepsButton] Missing onClick callback",{value:e,index:n})}),this.el=s,this.value=e,this.index=n}setEnabled(e){this.el.disabled=!e}setHidden(e){this.el.style.display=e?"none":""}setDimmed(e){this.el.style.opacity=e?"0.6":""}destroy(){this.el.remove()}consume(){this.setHidden(!0)}}class L0{map=new Map;on(e,n){this.map.has(e)||this.map.set(e,new Set),this.map.get(e).add(n)}off(e,n){this.map.get(e)?.delete(n)}emit(e,n){this.map.get(e)?.forEach(i=>i(n))}}class x0{emitter=new L0;state=new D0;host=null;wrap=null;comboBtn=null;buttons=[];enabled=!1;pending=!1;stepsForMove=null;mountBefore(e){const n=document.createElement("div");n.id="steps-container",e.parentElement?.insertBefore(n,e),this.host=n;const i=document.createElement("div");i.className="steps-wrap",n.appendChild(i),this.wrap=i;const s=document.createElement("button");s.type="button",s.className="steps-btn",s.style.display="none",s.addEventListener("click",()=>{!this.enabled||this.pending||(this.state.clearSelection(),this.paint(),this.emitter.emit("step:clear",void 0))}),i.appendChild(s),this.comboBtn=s}render(e,n){if(!this.host||!this.wrap||!this.comboBtn)return;const i=this.state.setStreak(e);this.enabled=n,i&&(this.buttons.forEach(s=>s.destroy()),this.buttons=e.map((s,r)=>{const o=new P0(s,r,()=>{if(!this.enabled||this.pending)return;const a=this.state.getSelectedIndices().length,{total:l,indices:c}=this.state.selectIndex(r);this.paint(),a===0&&c.length===1?this.emitter.emit("step:select",{index:r,value:s,total:l}):this.emitter.emit("step:combine",{indices:c,lastIndex:r,total:l})});return this.wrap.appendChild(o.el),o})),this.paint()}clear(){this.host&&(this.state.clear(),this.paint())}getChosenStepsTotal(){return this.state.getTotal()}getSelectedCount(){return this.state.getSelectedIndices().length}getSelectedIndices(){return this.state.getSelectedIndices()}getStepsForMove(){return this.stepsForMove}consumeCurrent(){this.state.clearSelection(),this.paint(),this.emitter.emit("step:clear",void 0)}setPending(e){this.pending=e,this.paint()}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}paint(){if(!this.wrap||!this.comboBtn)return;const e=new Set(this.state.getSelectedIndices()),n=this.state.getTotal();if(this.stepsForMove=n,this.buttons.forEach((i,s)=>{i.setEnabled(this.enabled&&!this.pending);const r=e.has(s);i.setHidden(r),i.setDimmed(n!==null&&!r)}),n!==null&&e.size>0){this.comboBtn.style.display="",this.comboBtn.disabled=!this.enabled||this.pending,this.comboBtn.textContent=String(n),this.comboBtn.classList.remove("steps-btn--left","steps-btn--right");const i=n5();this.comboBtn.classList.add(i==="left"?"steps-btn--left":"steps-btn--right")}else this.comboBtn.style.display="none"}}const Mt=new x0,O0={6:["6-1","6-2"],12:["12-1","12-2"],18:["18-1","18-2"],24:["final-2","final-1"]};function ye(t){const e=String(t);return e==="25"?document.querySelector('[data-qa="final-2"]')||document.getElementById("final-2"):e==="26"?document.querySelector('[data-qa="final-1"]')||document.getElementById("final-1"):e==="27"||e==="final-0"?document.querySelector('[data-qa="final-0"]')||document.getElementById("final-0"):document.querySelector(`.board [data-qa="field-${e}"]`)||document.querySelector(`.board [data-qa="cell-${e}"]`)||document.querySelector(`.board [data-qa="${e}"]`)||document.querySelector(`.board .cell[data-index="${e}"]`)||document.getElementById(`field-${e}`)||document.getElementById(`cell-${e}`)}function B0(t){const n=(t.getAttribute("data-qa")||"").match(/(?:field|cell)-(\d+)(?:-(\d))?|final-(\d)/);if(!n)return null;if(n[3]!==void 0){if(n[3]==="2")return{base:25,sub:n[3]};if(n[3]==="1")return{base:26,sub:n[3]};if(n[3]==="0")return{base:27,sub:n[3]}}return{base:Number(n[1]),sub:n[2]||null}}function F0(t){const e=t.closest('.board [data-qa^="field-"], .board [data-qa^="cell-"], .board [data-qa^="final-"], .board .cell[data-index]');return e?B0(e):null}function to(t){const e=t.getAttribute("data-side")||t.dataset.side||"";if(e==="left"||e==="right")return e;const i=(t.getAttribute("data-qa")||"").match(/^(p[12])-/)?.[1];return i==="p1"?"left":i==="p2"?"right":t.classList.contains("left")?"left":t.classList.contains("right")?"right":null}function Yc(t){if(!t)return!1;if(t.matches('[data-role="mother"],[data-ship="mother"],[data-mother="1"],.mother-ship'))return!0;const e=t.getAttribute("data-qa")||"";return!!/-cell-8$/.test(e)}function Qc(t){if(!t)return null;const e=t.querySelector('.ship, [data-role="ship"], button.ship, .cell-btn, [data-ship]')||null;return e?{el:e,side:to(e),isMother:Yc(e)}:null}function jc(t){return!!Qc(t)}function Zc(){document.querySelectorAll(".board .is-predicted").forEach(t=>t.classList.remove("is-predicted")),document.querySelectorAll(".board .ta-bump").forEach(t=>t.closest(".cell-btn")?.classList.remove("ta-bump"))}function pa(t){return t&&(t.closest(".cell-btn, [data-ship], .ship, button.ship")||t.querySelector(".cell-btn, [data-ship], .ship, button.ship"))||null}function ma(t,e){e?(t.classList.add("is-disabled"),t.setAttribute("aria-disabled","true"),t.setAttribute("data-prediction-locked","1")):(t.classList.remove("is-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("data-prediction-locked"))}function Fn(t){if(String(t)==="27"||String(t)==="final-0")return ye("final-0");const e=O0[String(t)];if(e){for(const i of e){const s=ye(i);if(s&&!jc(s))return s}return null}const n=ye(t);return n||null}function H0(t,e){if(!Number.isFinite(e)||e<=0)return null;if(!t){const r=e;return r>=27?ye("final-0"):Fn(r)}const{base:n,sub:i}=t;if(n==null)return null;if(n===6||n===12||n===18){if(i==="1"){if(e<=1)return null;const r=n+(e-1);return r>=27?ye("final-0"):Fn(r)}if(i==="2"){if(e<=2)return null;const r=n+(e-3);return r>=27?ye("final-0"):Fn(r)}}if(n===24){const r=["final-2","final-1"];for(const o of r){const a=ye(o);if(a&&!jc(a))return a}return null}if(n===23&&e>=4||n===25&&e>=2||n===26&&e>=1)return ye("final-0");const s=n+e;return s>=27?ye("final-0"):Fn(s)}function W0(t,e){if(Zc(),!Number.isFinite(e)||e<=0)return!1;const n=e,i=F0(t),s=H0(i,n);if(!s)return!1;const r=Qc(s),o=to(t),a=Yc(t);return r?!r.side||!o||r.side!==o?!1:a&&!r.isMother||!a&&r.isMother?(r.el.closest(".cell-btn")?.classList.add("ta-bump"),!0):!1:(s.classList.add("is-predicted"),!0)}function U0(t){const e=t;return typeof e.composedPath=="function"?e.composedPath():null}function ga(t){return t instanceof Element?t:null}function Ca(t){const e=".cell, .cell-btn, [data-ship], .ship, button.ship",n=U0(t);if(n&&n.length){for(const r of n){const o=ga(r);if(o){const a=o.closest(e);if(a)return a;const l=o.parentElement?.closest(e)??null;if(l)return l}}return null}const i=ga(t.target);if(!i)return null;const s=i.closest(e);return s||(i.parentElement?.closest(e)??null)}function V0(){document.addEventListener("pointerenter",t=>{const e=Ca(t),n=pa(e);if(!n)return;const i=to(n),s=document.body.getAttribute("data-turn-side");if(s&&i&&s!==i)return;const r=Mt.getStepsForMove(),o=W0(n,r);ma(n,!o)},!0),document.addEventListener("pointerleave",t=>{const e=Ca(t),n=pa(e);n&&(ma(n,!1),Zc())},!0)}function rr(t,e){t.style.pointerEvents="none",t.style.willChange="transform, opacity",t.style.transformOrigin="center center",setTimeout(()=>{t.style.transform="scale(1.2)";const n=t.animate([{transform:"scale(1.2) rotate(0deg)",opacity:1,transformOrigin:"center center"},{transform:"scale(0.1) rotate(1440deg)",opacity:0,transformOrigin:"center center"}],{duration:2e3,easing:"cubic-bezier(.2,.7,.3,1)",fill:"forwards"});n.onfinish=()=>{t.remove(),document.dispatchEvent(new CustomEvent("ship:finalized",{detail:{shipQa:e??null}}))}},1e3)}const Se=25,at=26,_i=27,Jc=new Set([6,12,18]),q0=160,G0=100;function z0(){const t=document.querySelector(".board");let e=t.querySelector(".ta-fly-layer");return e||(e=document.createElement("div"),e.className="ta-fly-layer",e.style.position="absolute",e.style.left="0",e.style.top="0",e.style.right="0",e.style.bottom="0",e.style.pointerEvents="none",e.style.zIndex="10",t.style.position||="relative",t.appendChild(e)),e}function ps(t){const n=document.querySelector(".board").getBoundingClientRect(),i=t.getBoundingClientRect();return{x:i.left-n.left+i.width/2,y:i.top-n.top+i.height/2}}function Y0(t){return t===Se?document.querySelector('.board [data-qa="final-2"]'):t===at?document.querySelector('.board [data-qa="final-1"]'):t>=_i?document.querySelector('.board [data-qa="final-0"]'):document.querySelector(`.board [data-qa="field-${t}"]`)}function Q0(t,e){const n=t==null?1:t+1,i=e,s=[],r=[],o=l=>{const c=Y0(l);c&&(s.push(c),r.push(l))},a=Math.min(i,Se-1);for(let l=n;l<=a;l++)o(l);return i===Se?(n<=Se&&o(Se),{nodes:s,indices:r}):i===at?(n<=Se&&o(Se),n<=at&&o(at),{nodes:s,indices:r}):(i>=_i&&(n<=Se&&o(Se),n<=at&&o(at),o(_i)),{nodes:s,indices:r})}function j0(t){t.classList.add("ta-special-pulse"),setTimeout(()=>t.classList.remove("ta-special-pulse"),300)}function Z0(t){const e=t.cloneNode(!0);return e.classList.add("ta-flyer"),e.style.position="absolute",e.style.transform="translate(-50%, -50%)",e.style.transitionProperty="transform",e.style.transitionTimingFunction="linear",e.style.pointerEvents="none",e.style.zIndex="10",e}function ya(t,e,n){e.style.left=`${n.x}px`,e.style.top=`${n.y}px`,e.isConnected||t.appendChild(e)}function J0(t,e){return new Promise(n=>{let i=!1;const s=()=>{i||(i=!0,t.removeEventListener("transitionend",s),n())};t.addEventListener("transitionend",s,{once:!0}),setTimeout(s,e+30)})}function K0(t,e){return Jc.has(e)?t+G0:t}function X0(t){if(typeof t=="number")return t;if(t==="final-2")return Se;if(t==="final-1")return at;if(t==="final-0")return _i;const e=t.match(/(?:field|cell)-(\d+)/);return e?Number(e[1]):NaN}async function or(t){const{shipEl:e,fromIndex:n,to:i,stepMs:s=q0,hideOriginal:r=!0}=t,o=X0(i);if(!Number.isFinite(o))return;const a=z0(),{nodes:l,indices:c}=Q0(n,o);if(!l.length)return;const h=Z0(e);let u;if(n==null)u=ps(l[0]);else{const m=e.closest('.cell,[data-qa^="field-"],[data-qa^="cell-"],[data-qa^="final-"]');u=ps(m||l[0])}ya(a,h,u);const d=e.style.visibility;r&&(e.style.visibility="hidden");for(let m=0;m<l.length;m++){const C=l[m],A=c[m],v=K0(s,A);h.style.transitionDuration=`${v}ms`,Jc.has(A)&&j0(C);const x=ps(C);ya(a,h,x),await J0(h,v)}h.remove(),r&&(e.style.visibility=d||"")}function _a(t,e){return new Promise(n=>{let i=!1;const s=()=>{i||(i=!0,t.removeEventListener("animationend",s),n())};t.addEventListener("animationend",s,{once:!0}),setTimeout(s,e+50)})}function va(t){if(!t)return null;const e=t.getAttribute("data-qa")||t.id||t.getAttribute("data-index")||"";if(/^final-0$/.test(e))return 27;if(/^final-1$/.test(e))return 26;if(/^final-2$/.test(e))return 25;const n=e.match(/\b(?:field|cell)-(\d+)\b/)||e.match(/\b(\d+)\b/);return n?Number(n[1]):null}function $0(t){return t>=27?26:t===26?25:t===25?24:Math.max(1,t-1)}async function Kc({cellEl:t,outBtn:e,motherBtn:n,spinMs:i=500,popMs:s=200,stepMs:r=160}){const o=n.closest('.cell,[data-qa^="field-"],[data-qa^="cell-"],[data-qa^="final-"]'),a=va(o),l=va(t)??27,c=$0(l);(a==null||c>a)&&await or({shipEl:n,fromIndex:a,to:c,stepMs:r,hideOriginal:!1}),e.classList.remove("ta-bump"),e.classList.add("swap-out"),await _a(e,i),e.remove(),t.appendChild(n),n.classList.add("swap-in"),await _a(n,s),n.classList.remove("swap-in")}const _n={boardCellAny:'.board [data-qa^="field-"], .board [data-qa^="cell-"], .board [data-qa^="final-"], .board .cell[data-index]',shipAny:'.ship, [data-role="ship"], button.ship, .cell-btn, [data-ship]',predicted:'.board [data-qa^="field-"].is-predicted, .board [data-qa^="cell-"].is-predicted, .board [data-qa^="final-"].is-predicted, .board .cell.is-predicted',bump:".board .cell-btn.ta-bump, .board .ta-bump"},Aa={"final-2":25,"final-1":26,"final-0":27},Hn={stepMs:160,replaceSpinMs:500,replacePopMs:180};function Xc(t){if(!t)return null;if(t in Aa)return Aa[t];const e=t.match(/(?:^|\s)(?:field|cell)-(\d+)/)?.[1]||t.match(/\d+/)?.[0];return e?Number(e):null}function Ea(t){if(!t)return null;const e=t.getAttribute("data-qa")||t.getAttribute("data-index")||"",n=Xc(e);if(n!=null)return n;const i=t.getAttribute("data-index");return i&&/^\d+$/.test(i)?Number(i):null}function e4(t){return t>=27?26:t===26?25:t===25?24:Math.max(1,t-1)}function no(t){const e=t.getAttribute("data-side")||t.dataset?.side||"";if(e==="left"||e==="right")return e;const i=(t.getAttribute("data-qa")||"").match(/^(p[12])-/)?.[1];return i==="p1"?"left":i==="p2"?"right":t.classList.contains("left")?"left":t.classList.contains("right")?"right":null}function rt(t){const e=no(t);e&&t.setAttribute("data-side",e)}function $c(t){if(!t)return!1;if(t.matches('[data-role="mother"],[data-ship="mother"],[data-mother="1"],.mother-ship'))return!0;const e=t.getAttribute("data-qa")||"";return/-cell-8$/.test(e)}function t4(t){if(!t)return null;const e=t.querySelector(_n.shipAny);return e?(rt(e),{el:e,side:no(e),isMother:$c(e)}):null}function n4(){return document.querySelector(_n.predicted)}function i4(){const t=document.querySelector(_n.bump);return t?t.closest(_n.boardCellAny):null}function ms(){document.querySelectorAll(".board .is-predicted").forEach(t=>t.classList.remove("is-predicted")),document.querySelectorAll(".board .ta-bump").forEach(t=>t.closest(".cell-btn")?.classList.remove("ta-bump"))}function ba(t,e,n){t instanceof HTMLButtonElement&&(t.disabled=e),t.classList.toggle("is-disabled",e),e&&n?t.setAttribute("data-disabled-reason",n):t.removeAttribute("data-disabled-reason"),t.setAttribute("aria-disabled",String(e))}function gs(t,e){ba(t,!0,e),setTimeout(()=>ba(t,!1),400)}function Cs(t){document.dispatchEvent(new CustomEvent("shipmove:done",{detail:t}))}let wa=0,Sa=!1;function s4(){Sa||(Sa=!0,document.addEventListener("click",async t=>{const e=Date.now();if(e-wa<120)return;wa=e;const n=t.target?.closest(".cell-btn, [data-ship], .ship, button.ship");if(!n)return;rt(n);const i=Mt,s=i.getStepsForMove?.()??null,r=i.getSelectedIndices?.()??[];if(!Number.isFinite(s)||s<=0||r.length===0)return;const o=n4(),a=i4(),l=o||a;if(!l){gs(n,"no-prediction");return}const c=n.closest(_n.boardCellAny),h=Ea(c),u=no(n),d=$c(n),m=t4(l);if(m){if(!u||!m.side||m.side!==u){gs(n,"blocked");return}if(d&&!m.isMother){try{await xn(fe(),r),i.consumeCurrent?.()}catch{return}ms();const x=m.el.closest(".cell-btn")||m.el;rt(x),rt(n);const $=n.getAttribute("data-qa")||null,Y=l.getAttribute("data-qa")||l.getAttribute("data-index")||"";Cs({shipQa:$,fromIndex:h,toIndex:Y,usedStep:s,finalizedQa:x.getAttribute("data-qa")||null,finalizedToIndex:"final-0",moveKind:"replaceOwn"}),await Kc({cellEl:l,outBtn:x,motherBtn:n,spinMs:Hn.replaceSpinMs,popMs:Hn.replacePopMs}),l.getAttribute("data-qa")==="final-0"&&rr(n,$);return}if(!d&&m.isMother){const x=l.getAttribute("data-qa")||l.getAttribute("data-index")||"",$=Xc(x)??NaN,Y=e4($);if(h==null||Y>h){try{await xn(fe(),r),i.consumeCurrent?.()}catch{return}await or({shipEl:n,fromIndex:h,to:Y,stepMs:Hn.stepMs,hideOriginal:!1})}else try{await xn(fe(),r),i.consumeCurrent?.()}catch{return}const me=n.getAttribute("data-qa")||null;Cs({shipQa:me,fromIndex:h,toIndex:x,usedStep:s,finalizedQa:me,finalizedToIndex:"final-0",moveKind:"overMother"}),await(async function(ae,ie){rt(ie);const et=ae.querySelector(".cell-btn");et?.classList.remove("ta-bump"),ie.classList.add("is-overlay","over-spin"),rt(et||ie),ae.appendChild(ie),await new Promise(Vt=>{let Dn=!1;const qt=()=>{Dn||(Dn=!0,ie.removeEventListener("animationend",qt),Vt())};ie.addEventListener("animationend",qt,{once:!0}),setTimeout(qt,350)}),ie.remove()})(l,n),ms();return}gs(n,"blocked");return}try{await xn(fe(),r),i.consumeCurrent?.()}catch{return}ms(),rt(n);const C=Ea(l)??NaN;await or({shipEl:n,fromIndex:h,to:C,stepMs:Hn.stepMs}),l.appendChild(n);const A=n.getAttribute("data-qa")||null,v=l.getAttribute("data-qa")||l.getAttribute("data-index")||"";Cs({shipQa:A,fromIndex:h,toIndex:v,usedStep:s,moveKind:v==="final-0"?"finalize":"move"}),l.getAttribute("data-qa")==="final-0"&&rr(n,A)},!0))}function r4(t){return t.moveKind?t.moveKind:t.finalizedQa&&t.finalizedToIndex==="final-0"?t.finalizedQa===t.shipQa?"overMother":"replaceOwn":t.toIndex==="0"||/final-0/.test(t.toIndex)?"finalize":"move"}function e1(t){document.addEventListener("shipmove:done",n=>{(async()=>{const s=n.detail,r=Math.random().toString(36).slice(2)+Date.now().toString(36),o=r4(s),a=s.shipQa?.startsWith("p1-")?"left":"right",l=s.fromIndex===null?null:s.fromIndex===27?"final-0":`field-${s.fromIndex}`,c=s.toIndex==="0"?"final-0":/^\d+$/.test(s.toIndex)?`field-${s.toIndex}`:s.toIndex,h=c==="field-25"?"final-2":c==="field-26"?"final-1":c,u=s.shipQa||"",d=`rooms/${t}/ships/${a}/${u}`,C={[`rooms/${t}/events/${r}`]:{id:r,type:o,side:a,shipId:u,from:l,to:h,usedStep:s.usedStep,ts:bc(),ttl:12e4,applied:!0}};if(o==="overMother")C[d]="final-0";else if(o==="replaceOwn"){if(C[d]=h,s.finalizedQa){const A=s.finalizedQa.startsWith("p1-")?"left":"right";C[`rooms/${t}/ships/${A}/${s.finalizedQa}`]="final-0"}}else C[d]=h;await Et(Ie(Pe),C)})()},!1);const e=Ie(Pe,`rooms/${t}/events`);f3(e,async n=>{const i=n.val();if(i)try{if(i.type==="replaceOwn"){const s=ys(i.to),r=s?.querySelector('.cell-btn:not([data-qa$="cell-8"])'),o=Wn(i.shipId);s&&r&&o&&await Kc({cellEl:s,outBtn:r,motherBtn:o,spinMs:500,popMs:180})}else if(i.type==="overMother"){const s=ys(i.to),r=Wn(i.shipId);s&&r&&await o4(s,r)}else if(i.type==="finalize"){const s=Wn(i.shipId);rr(s,i.shipId)}else if(i.type==="move"){const s=ys(i.to),r=Wn(i.shipId);s&&r&&s.appendChild(r)}}finally{setTimeout(()=>{Gr(Ie(Pe,`rooms/${t}/events/${i.id}`)).catch(()=>{})},i.ttl??12e4)}})}function ys(t){if(/^final-(0|1|2)$/.test(t))return document.querySelector(`.board [data-qa="${t}"]`)||document.getElementById(t);const e=t.replace(/^field-/,"");return e==="25"?document.querySelector('.board [data-qa="final-2"]')||document.getElementById("final-2"):e==="26"?document.querySelector('.board [data-qa="final-1"]')||document.getElementById("final-1"):document.querySelector(`.board [data-qa="field-${e}"]`)||document.querySelector(`.board [data-qa="cell-${e}"]`)||document.querySelector(`.board [data-qa="${e}"]`)||document.querySelector(`.board .cell[data-index="${e}"]`)||document.getElementById(`field-${e}`)||document.getElementById(`cell-${e}`)}function Wn(t){return document.querySelector(`.cell-btn[data-qa="${t}"], [data-qa="${t}"].cell-btn`)}async function o4(t,e){t.querySelector(".cell-btn")?.classList.remove("ta-bump"),e.classList.add("is-overlay","over-spin"),t.appendChild(e),await a4(e,600),e.remove()}function a4(t,e){return new Promise(n=>{let i=!1;const s=()=>{i||(i=!0,t.removeEventListener("animationend",s),n())};t.addEventListener("animationend",s,{once:!0}),setTimeout(s,e+50)})}const l4={left:Array.from({length:8},(t,e)=>`p1-cell-${e+1}`),right:Array.from({length:8},(t,e)=>`p2-cell-${e+1}`)},Un=(t,e)=>gn(t,e).then(()=>{}).catch(()=>{});function c4(t){const e=t.filter(i=>Number.isFinite(i)&&i>0),n=new Set;e.forEach(i=>n.add(i));for(let i=0;i<e.length;i++)for(let s=i+1;s<e.length;s++)n.add(e[i]+e[s]);return e.length>1&&n.add(e.reduce((i,s)=>i+s,0)),Array.from(n).sort((i,s)=>i-s)}function Ia(t,e){const n=t.ships?.[e]||{},i={};for(const s of l4[e])i[s]=n[s]??"hand";return i}function ut(t){return t.endsWith("-cell-8")}function u4(t){const e=String(t);if(e==="hand")return{base:null,sub:null};if(e==="final-2")return{base:25,sub:null};if(e==="final-1")return{base:26,sub:null};if(e==="final-0"||e==="final")return{base:27,sub:null};const n=e.match(/^field-(\d+)(?:-(\d))?$/);return n?{base:Number(n[1]),sub:n[2]??null}:{base:null,sub:null}}function d4(t){return t>=27?"final-0":t===26?"final-1":t===25?"final-2":`field-${t}`}function Vn(t){return t>=27?"final-0":t===24?null:d4(t)}function Ta(t){const e=new Map;for(const[n,i]of Object.entries(t)){const s=String(i);if(s==="hand")continue;const r=e.get(s)||[];r.push(n),e.set(s,r)}return e}function h4(t,e){return t==="final-0"?!1:(e.get(t)?.length||0)>0}function t1(t,e,n){if(t==="final-0")return!0;const i=n.get(t)||[];if(i.length===0)return!0;if(i.length>=2)return!1;const s=i[0];return ut(e)&&!ut(s)||!ut(e)&&ut(s)}function f4(t,e){if(!Number.isFinite(e)||e<=0)return null;const{base:n,sub:i}=u4(t);if(n===null){const r=e;return r>=27?"final-0":r===24?null:Vn(r)}if(n===24)return null;if(n===6||n===12||n===18){if(i==="1"){if(e<=1)return null;const r=n+(e-1);return r>=27?"final-0":r===24?null:Vn(r)}if(i==="2"){if(e<=2)return null;const r=n+(e-3);return r>=27?"final-0":r===24?null:Vn(r)}}if(n===23&&e>=4||n===25&&e>=2||n===26&&e>=1)return"final-0";const s=n+e;return s===24?null:s>=27?"final-0":Vn(s)}function p4(t){return/^field-(6|12|18)$/.test(t)}function m4(t,e,n,i){const s=[`${t}-1`,`${t}-2`];for(const r of s)if(!((i.get(r)?.length||0)>0)&&t1(r,e,n))return r;return null}function n1(t,e,n,i,s,r){if(e==="hand"&&!r&&ut(t))return!1;const o=Ta(i),a=Ta(s);for(const l of n){let c=f4(e,l);if(c){if(c==="final-0")return!0;if(p4(c)){const h=m4(c,t,o,a);if(!h)continue;c=h}if(!h4(c,a)&&t1(c,t,o))return!0}}return!1}function g4(t,e,n){const s=!Object.entries(t).some(([r,o])=>!ut(r)&&String(o)==="hand");return Object.entries(t).some(([r,o])=>n1(r,o,n,t,e,s))}function C4(t,e){const n=e==="left"?"right":"left",i=Ia(t,e),s=Ia(t,n),r=t.isTurn,o=e==="left"?0:1,a=t.players?.[o]?.diceStreak??[],l=c4(a),c=g4(i,s,l);return{side:e,turnSide:r,isPlayersTurn:r===e,stepsStrike:a,availableSteps:l,shipsMine:i,shipsOpp:s,canMove:c}}function y4(t){const e=Object.entries(t.shipsMine).sort(([i],[s])=>i.localeCompare(s)),n=Object.entries(t.shipsOpp).sort(([i],[s])=>i.localeCompare(s));return JSON.stringify({turnSide:t.turnSide,stepsStrike:t.stepsStrike,availableSteps:t.availableSteps,shipsMine:e,shipsOpp:n,canMove:t.canMove})}function _4(t,e,n){const s=!Object.entries(t).some(([o,a])=>!ut(o)&&String(a)==="hand"),r={};for(const[o,a]of Object.entries(t)){const l=n1(o,a,n,t,e,s);r[o]=l?"canMove":"blocked"}return r}function v4(t){let e=null,n,i=null;const s=Hi(t,async r=>{if(!r)return;const o=r.isTurn;if(!o)return;const a=C4(r,o);y4(a),n!==a.turnSide&&n!==void 0&&(await Un(t,{"shipsState/left":null,"shipsState/right":null,"currentStepsStrike/left":[],"currentStepsStrike/right":[],"canPlayerMoveShips/left":null,"canPlayerMoveShips/right":null}),e=null),n=a.turnSide;const l=JSON.stringify(a.stepsStrike);if((!i||i.side!==o||i.json!==l)&&(await Un(t,{[`currentStepsStrike/${o}`]:a.stepsStrike}),i={side:o,json:l}),r.lastDiceResult!==6&&a.stepsStrike.length>0){const u=_4(a.shipsMine,a.shipsOpp,a.availableSteps),d={};for(const[C,A]of Object.entries(u))(!e||e[C]!==A)&&(d[`shipsState/${o}/${C}`]=A);Object.keys(d).length&&(await Un(t,d),e=u);const m=Object.values(u).some(C=>C==="canMove");await Un(t,{[`canPlayerMoveShips/${o}`]:m})}});return typeof s=="function"?s:()=>{}}function A4(t){let e,n=!1;const i=Hi(t,s=>{if(!s)return;const r=s.isTurn;if(!r){e=void 0,n=!1;return}e&&e!==r&&(n=!1),e=r;const o=s.canPlayerMoveShips?.[r];if(o==null){n=!1;return}if(o===!1&&!n){const a=r==="left"?"Гравець Left заблокований":"Гравець Right заблокований";z3(t),Fe({duration:kc,text:`${a} — SIMPLE`,type:ue.HELPER_WARNING,delayBeforeShow:s.isDiceRolling?zi+300:300,priority:0,dedupeKey:`blocked:${r}`}),n=!0}});return()=>{i?.()}}function Ra(t,e){const n=t.ships?.[e];if(!n)return!1;const i=e==="left"?"p1":"p2",s=new RegExp(`^${i}-cell-\\d+$`),r=Object.entries(n).filter(([o,a])=>s.test(o)&&a!=null).map(([,o])=>String(o).trim());return r.length!==8?!1:r.every(o=>o==="final-0")}function E4(t){let e=null;const n=Hi(t,i=>{if(!i){e=null;return}const s=i,r=Ra(s,"left"),o=Ra(s,"right");let a=null;r?a="left":o&&(a="right"),a&&e!==a&&(Fe({duration:4e3,text:Te("helper.win",{side:a}),type:ue.HELPER_INFORM,priority:10,dedupeKey:`win:${a}`,delayBeforeShow:0}),e=a),a||(e=null)});return()=>{n?.()}}const b4="/Testing_game/assets/background-music-z-IQj7jW.mp3",Ma=[];function w4(t){switch(t){case Ge.RESET:return ue.HELPER_OFFER;case Ge.INFORM:return ue.HELPER_INFORM;case Ge.WARNING:return ue.HELPER_WARNING;case Ge.HINT:default:return ue.HELPER_HINT}}function S4(t){for(const e of t)Ma.includes(e.id)||e.authorName!==qe()&&(Ma.push(e.id),Fe({duration:e.duration,text:e.text,type:w4(e.type),...sr}))}function I4(t){const e=Math.max(0,t.thresholdSec??20);let n=!1,i=Number.POSITIVE_INFINITY,s=!1;const r=()=>typeof t.getRemainingSec=="function"?t.getRemainingSec():i,o=()=>{if(s||n||!t.getIsMyTurn())return;const u=r();if(!Number.isFinite(u)||u>e||!t.getIsStrikeEmpty())return;const d=t.mainBtn,m=d.classList.contains("disabled"),C=d.getAttribute("data-type")==="end-turn";m||!C||(console.log("WE CAN END TURN"),n=!0,d.click())};return{onTick:u=>{i=Math.max(0,u),o()},notifyStrikeChanged:()=>{o()},reset:()=>{n=!1,i=Number.POSITIVE_INFINITY},destroy:()=>{s=!0}}}var kn={};(function t(e,n,i,s){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),o=typeof Path2D=="function"&&typeof DOMMatrix=="function",a=(function(){if(!e.OffscreenCanvas)return!1;try{var p=new OffscreenCanvas(1,1),f=p.getContext("2d");f.fillRect(0,0,1,1);var y=p.transferToImageBitmap();f.createPattern(y,"no-repeat")}catch{return!1}return!0})();function l(){}function c(p){var f=n.exports.Promise,y=f!==void 0?f:e.Promise;return typeof y=="function"?new y(p):(p(l,l),null)}var h=(function(p,f){return{transform:function(y){if(p)return y;if(f.has(y))return f.get(y);var b=new OffscreenCanvas(y.width,y.height),S=b.getContext("2d");return S.drawImage(y,0,0),f.set(y,b),b},clear:function(){f.clear()}}})(a,new Map),u=(function(){var p=Math.floor(16.666666666666668),f,y,b={},S=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(f=function(I){var N=Math.random();return b[N]=requestAnimationFrame(function E(k){S===k||S+p-1<k?(S=k,delete b[N],I()):b[N]=requestAnimationFrame(E)}),N},y=function(I){b[I]&&cancelAnimationFrame(b[I])}):(f=function(I){return setTimeout(I,p)},y=function(I){return clearTimeout(I)}),{frame:f,cancel:y}})(),d=(function(){var p,f,y={};function b(S){function I(N,E){S.postMessage({options:N||{},callback:E})}S.init=function(E){var k=E.transferControlToOffscreen();S.postMessage({canvas:k},[k])},S.fire=function(E,k,O){if(f)return I(E,null),f;var q=Math.random().toString(36).slice(2);return f=c(function(W){function G(ee){ee.data.callback===q&&(delete y[q],S.removeEventListener("message",G),f=null,h.clear(),O(),W())}S.addEventListener("message",G),I(E,q),y[q]=G.bind(null,{data:{callback:q}})}),f},S.reset=function(){S.postMessage({reset:!0});for(var E in y)y[E](),delete y[E]}}return function(){if(p)return p;if(!i&&r){var S=["var CONFETTI, SIZE = {}, module = {};","("+t.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{p=new Worker(URL.createObjectURL(new Blob([S])))}catch(I){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",I),null}b(p)}return p}})(),m={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function C(p,f){return f?f(p):p}function A(p){return p!=null}function v(p,f,y){return C(p&&A(p[f])?p[f]:m[f],y)}function x(p){return p<0?0:Math.floor(p)}function $(p,f){return Math.floor(Math.random()*(f-p))+p}function Y(p){return parseInt(p,16)}function me(p){return p.map(w)}function w(p){var f=String(p).replace(/[^0-9a-f]/gi,"");return f.length<6&&(f=f[0]+f[0]+f[1]+f[1]+f[2]+f[2]),{r:Y(f.substring(0,2)),g:Y(f.substring(2,4)),b:Y(f.substring(4,6))}}function ae(p){var f=v(p,"origin",Object);return f.x=v(f,"x",Number),f.y=v(f,"y",Number),f}function ie(p){p.width=document.documentElement.clientWidth,p.height=document.documentElement.clientHeight}function et(p){var f=p.getBoundingClientRect();p.width=f.width,p.height=f.height}function Vt(p){var f=document.createElement("canvas");return f.style.position="fixed",f.style.top="0px",f.style.left="0px",f.style.pointerEvents="none",f.style.zIndex=p,f}function Dn(p,f,y,b,S,I,N,E,k){p.save(),p.translate(f,y),p.rotate(I),p.scale(b,S),p.arc(0,0,1,N,E,k),p.restore()}function qt(p){var f=p.angle*(Math.PI/180),y=p.spread*(Math.PI/180);return{x:p.x,y:p.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:p.startVelocity*.5+Math.random()*p.startVelocity,angle2D:-f+(.5*y-Math.random()*y),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:p.color,shape:p.shape,tick:0,totalTicks:p.ticks,decay:p.decay,drift:p.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:p.gravity*3,ovalScalar:.6,scalar:p.scalar,flat:p.flat}}function c1(p,f){f.x+=Math.cos(f.angle2D)*f.velocity+f.drift,f.y+=Math.sin(f.angle2D)*f.velocity+f.gravity,f.velocity*=f.decay,f.flat?(f.wobble=0,f.wobbleX=f.x+10*f.scalar,f.wobbleY=f.y+10*f.scalar,f.tiltSin=0,f.tiltCos=0,f.random=1):(f.wobble+=f.wobbleSpeed,f.wobbleX=f.x+10*f.scalar*Math.cos(f.wobble),f.wobbleY=f.y+10*f.scalar*Math.sin(f.wobble),f.tiltAngle+=.1,f.tiltSin=Math.sin(f.tiltAngle),f.tiltCos=Math.cos(f.tiltAngle),f.random=Math.random()+2);var y=f.tick++/f.totalTicks,b=f.x+f.random*f.tiltCos,S=f.y+f.random*f.tiltSin,I=f.wobbleX+f.random*f.tiltCos,N=f.wobbleY+f.random*f.tiltSin;if(p.fillStyle="rgba("+f.color.r+", "+f.color.g+", "+f.color.b+", "+(1-y)+")",p.beginPath(),o&&f.shape.type==="path"&&typeof f.shape.path=="string"&&Array.isArray(f.shape.matrix))p.fill(d1(f.shape.path,f.shape.matrix,f.x,f.y,Math.abs(I-b)*.1,Math.abs(N-S)*.1,Math.PI/10*f.wobble));else if(f.shape.type==="bitmap"){var E=Math.PI/10*f.wobble,k=Math.abs(I-b)*.1,O=Math.abs(N-S)*.1,q=f.shape.bitmap.width*f.scalar,W=f.shape.bitmap.height*f.scalar,G=new DOMMatrix([Math.cos(E)*k,Math.sin(E)*k,-Math.sin(E)*O,Math.cos(E)*O,f.x,f.y]);G.multiplySelf(new DOMMatrix(f.shape.matrix));var ee=p.createPattern(h.transform(f.shape.bitmap),"no-repeat");ee.setTransform(G),p.globalAlpha=1-y,p.fillStyle=ee,p.fillRect(f.x-q/2,f.y-W/2,q,W),p.globalAlpha=1}else if(f.shape==="circle")p.ellipse?p.ellipse(f.x,f.y,Math.abs(I-b)*f.ovalScalar,Math.abs(N-S)*f.ovalScalar,Math.PI/10*f.wobble,0,2*Math.PI):Dn(p,f.x,f.y,Math.abs(I-b)*f.ovalScalar,Math.abs(N-S)*f.ovalScalar,Math.PI/10*f.wobble,0,2*Math.PI);else if(f.shape==="star")for(var D=Math.PI/2*3,le=4*f.scalar,ge=8*f.scalar,Ce=f.x,Me=f.y,tt=5,we=Math.PI/tt;tt--;)Ce=f.x+Math.cos(D)*ge,Me=f.y+Math.sin(D)*ge,p.lineTo(Ce,Me),D+=we,Ce=f.x+Math.cos(D)*le,Me=f.y+Math.sin(D)*le,p.lineTo(Ce,Me),D+=we;else p.moveTo(Math.floor(f.x),Math.floor(f.y)),p.lineTo(Math.floor(f.wobbleX),Math.floor(S)),p.lineTo(Math.floor(I),Math.floor(N)),p.lineTo(Math.floor(b),Math.floor(f.wobbleY));return p.closePath(),p.fill(),f.tick<f.totalTicks}function u1(p,f,y,b,S){var I=f.slice(),N=p.getContext("2d"),E,k,O=c(function(q){function W(){E=k=null,N.clearRect(0,0,b.width,b.height),h.clear(),S(),q()}function G(){i&&!(b.width===s.width&&b.height===s.height)&&(b.width=p.width=s.width,b.height=p.height=s.height),!b.width&&!b.height&&(y(p),b.width=p.width,b.height=p.height),N.clearRect(0,0,b.width,b.height),I=I.filter(function(ee){return c1(N,ee)}),I.length?E=u.frame(G):W()}E=u.frame(G),k=W});return{addFettis:function(q){return I=I.concat(q),O},canvas:p,promise:O,reset:function(){E&&u.cancel(E),k&&k()}}}function ro(p,f){var y=!p,b=!!v(f||{},"resize"),S=!1,I=v(f,"disableForReducedMotion",Boolean),N=r&&!!v(f||{},"useWorker"),E=N?d():null,k=y?ie:et,O=p&&E?!!p.__confetti_initialized:!1,q=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,W;function G(D,le,ge){for(var Ce=v(D,"particleCount",x),Me=v(D,"angle",Number),tt=v(D,"spread",Number),we=v(D,"startVelocity",Number),p1=v(D,"decay",Number),m1=v(D,"gravity",Number),g1=v(D,"drift",Number),ao=v(D,"colors",me),C1=v(D,"ticks",Number),lo=v(D,"shapes"),y1=v(D,"scalar"),_1=!!v(D,"flat"),co=ae(D),uo=Ce,Ji=[],v1=p.width*co.x,A1=p.height*co.y;uo--;)Ji.push(qt({x:v1,y:A1,angle:Me,spread:tt,startVelocity:we,color:ao[uo%ao.length],shape:lo[$(0,lo.length)],ticks:C1,decay:p1,gravity:m1,drift:g1,scalar:y1,flat:_1}));return W?W.addFettis(Ji):(W=u1(p,Ji,k,le,ge),W.promise)}function ee(D){var le=I||v(D,"disableForReducedMotion",Boolean),ge=v(D,"zIndex",Number);if(le&&q)return c(function(we){we()});y&&W?p=W.canvas:y&&!p&&(p=Vt(ge),document.body.appendChild(p)),b&&!O&&k(p);var Ce={width:p.width,height:p.height};E&&!O&&E.init(p),O=!0,E&&(p.__confetti_initialized=!0);function Me(){if(E){var we={getBoundingClientRect:function(){if(!y)return p.getBoundingClientRect()}};k(we),E.postMessage({resize:{width:we.width,height:we.height}});return}Ce.width=Ce.height=null}function tt(){W=null,b&&(S=!1,e.removeEventListener("resize",Me)),y&&p&&(document.body.contains(p)&&document.body.removeChild(p),p=null,O=!1)}return b&&!S&&(S=!0,e.addEventListener("resize",Me,!1)),E?E.fire(D,Ce,tt):G(D,Ce,tt)}return ee.reset=function(){E&&E.reset(),W&&W.reset()},ee}var Zi;function oo(){return Zi||(Zi=ro(null,{useWorker:!0,resize:!0})),Zi}function d1(p,f,y,b,S,I,N){var E=new Path2D(p),k=new Path2D;k.addPath(E,new DOMMatrix(f));var O=new Path2D;return O.addPath(k,new DOMMatrix([Math.cos(N)*S,Math.sin(N)*S,-Math.sin(N)*I,Math.cos(N)*I,y,b])),O}function h1(p){if(!o)throw new Error("path confetti are not supported in this browser");var f,y;typeof p=="string"?f=p:(f=p.path,y=p.matrix);var b=new Path2D(f),S=document.createElement("canvas"),I=S.getContext("2d");if(!y){for(var N=1e3,E=N,k=N,O=0,q=0,W,G,ee=0;ee<N;ee+=2)for(var D=0;D<N;D+=2)I.isPointInPath(b,ee,D,"nonzero")&&(E=Math.min(E,ee),k=Math.min(k,D),O=Math.max(O,ee),q=Math.max(q,D));W=O-E,G=q-k;var le=10,ge=Math.min(le/W,le/G);y=[ge,0,0,ge,-Math.round(W/2+E)*ge,-Math.round(G/2+k)*ge]}return{type:"path",path:f,matrix:y}}function f1(p){var f,y=1,b="#000000",S='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof p=="string"?f=p:(f=p.text,y="scalar"in p?p.scalar:y,S="fontFamily"in p?p.fontFamily:S,b="color"in p?p.color:b);var I=10*y,N=""+I+"px "+S,E=new OffscreenCanvas(I,I),k=E.getContext("2d");k.font=N;var O=k.measureText(f),q=Math.ceil(O.actualBoundingBoxRight+O.actualBoundingBoxLeft),W=Math.ceil(O.actualBoundingBoxAscent+O.actualBoundingBoxDescent),G=2,ee=O.actualBoundingBoxLeft+G,D=O.actualBoundingBoxAscent+G;q+=G+G,W+=G+G,E=new OffscreenCanvas(q,W),k=E.getContext("2d"),k.font=N,k.fillStyle=b,k.fillText(f,ee,D);var le=1/y;return{type:"bitmap",bitmap:E.transferToImageBitmap(),matrix:[le,0,0,le,-q*le/2,-W*le/2]}}n.exports=function(){return oo().apply(this,arguments)},n.exports.reset=function(){oo().reset()},n.exports.create=ro,n.exports.shapeFromPath=h1,n.exports.shapeFromText=f1})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),kn,!1);const T4=kn.exports;kn.exports.create;const R4=500,M4={startVelocity:30,spread:360,ticks:60,zIndex:10},N4=50;function k4(){setInterval(()=>{T4({...M4,particleCount:N4,origin:{x:Math.random(),y:Math.random()-.2}})},R4)}let Kn,vi,io,se=null;const lt=[],It=[],D4=300,P4=4,Na=4,L4=12;function x4(){Kn=document.getElementById("fireworks"),i1(Kn),se=Kn.getContext("2d"),lt.push(new so(Math.random()*(vi-200)+100)),window.addEventListener("resize",U4),document.addEventListener("click",W4)}function O4(){if(se){se.save(),se.globalCompositeOperation="destination-out",se.fillStyle="rgba(0, 0, 0, 0.2)",se.fillRect(0,0,vi,io),se.restore();for(let t=0;t<lt.length;t++){const e=lt[t].update();lt[t].draw(),e&&lt.splice(t,1)}for(let t=0;t<It.length;t++)It[t].update(),It[t].draw(),It[t].lifetime>80&&It.splice(t,1);Math.random()<1/60&&lt.push(new so(Math.random()*(vi-200)+100))}}setInterval(O4,1e3/60);class B4{x;y;col;vel;lifetime;constructor(e,n,i){this.x=e,this.y=n,this.col=i,this.vel=H4(P4),this.lifetime=0}update(){this.x+=this.vel.x,this.y+=this.vel.y,this.vel.y+=.02,this.vel.x*=.99,this.vel.y*=.99,this.lifetime++}draw(){se&&(se.globalAlpha=Math.max(1-this.lifetime/80,0),se.fillStyle=this.col,se.fillRect(this.x,this.y,Na,Na))}}class so{x;y;isBlown;col;constructor(e){this.x=e,this.y=io,this.isBlown=!1,this.col=F4()}update(){if(this.y-=L4,this.y<350-Math.sqrt(Math.random()*500)*40){this.isBlown=!0;for(let e=0;e<D4;e++)It.push(new B4(this.x,this.y,this.col))}return this.isBlown}draw(){se&&(se.globalAlpha=1,se.fillStyle=this.col,se.fillRect(this.x,this.y,2,2))}}function F4(){const t="0123456789ABCDEF",e=[];for(let s=0;s<3;s++)e[s]=Math.floor(Math.random()*256);let n=Math.max(...e);n/=255;for(let s=0;s<3;s++)e[s]/=n;let i="#";for(let s=0;s<3;s++)i+=t[Math.floor(e[s]/16)],i+=t[Math.floor(e[s]%16)];return i}function H4(t){const e=Math.random()*Math.PI*2,n=Math.random()*t;return{x:Math.cos(e)*n,y:Math.sin(e)*n}}function i1(t){t.style.width=`${innerWidth}px`,t.style.height=`${innerHeight}px`,vi=innerWidth,io=innerHeight,t.width=innerWidth*window.devicePixelRatio,t.height=innerHeight*window.devicePixelRatio,t.getContext("2d").scale(window.devicePixelRatio,window.devicePixelRatio)}function W4(t){lt.push(new so(t.clientX))}function U4(){se&&i1(Kn)}const V4=`
<svg viewBox="0 0 395 497" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="robot">
    <g id="body">
      <path d="M276.55 368.077C276.55 381.492 275.304 393.775 272.99 404.873C272.757 406.004 272.511 407.124 272.25 408.231C261.678 453.65 232.772 478.243 198.773 478.243C164.774 478.243 135.868 453.65 125.295 408.231C125.035 407.124 124.788 406.004 124.556 404.873C122.242 393.775 120.996 381.492 120.996 368.077C120.996 338.236 152.206 319.11 198.773 319.11C245.339 319.11 276.55 338.236 276.55 368.077Z" fill="#DEE4EB"/>
      <path d="M276.55 368.077C276.55 381.492 275.304 393.775 272.99 404.873C272.757 406.004 272.51 407.124 272.251 408.231C261.678 453.65 232.772 478.243 198.773 478.243C173.151 478.243 150.419 464.276 136.252 437.952C146.019 445.868 156.856 452.175 168.686 455.628C187.728 461.189 209.574 458.466 224.863 445.255C233.516 437.777 239.481 427.602 243.438 416.471C243.821 415.401 244.18 414.323 244.527 413.238C246.307 407.614 247.608 401.795 248.511 395.994C250.196 385.181 250.675 373.968 248.046 363.367C245.416 352.769 239.379 342.794 230.363 337.373C224.687 333.959 218.17 332.493 211.741 331.27C193.525 327.804 175.038 325.926 156.53 325.658C168.323 321.41 182.624 319.112 198.773 319.112C245.341 319.112 276.55 338.236 276.55 368.077Z" fill="#C7D0DC"/>
      <path d="M167.133 309.854V328.542C167.133 338.451 181.299 346.483 198.773 346.483C216.247 346.483 230.413 338.451 230.413 328.542V309.854H167.133Z" fill="#CBD3DB"/>
      <path d="M230.413 309.854V326.041C221.571 330.195 211.512 331.922 198.773 331.922C187.395 331.922 175.974 330.54 167.133 326.375V309.854H230.413Z" fill="#ABB7C6"/>
      <path id="changing-line" d="M272.985 404.871L272.267 408.233C272.267 408.233 238.652 417.456 236.259 417.86V426.608L235.122 426.869C234.957 426.906 218.454 430.619 198.773 430.619C179.092 430.619 162.589 426.906 162.423 426.869L161.287 426.608V417.86C147.978 415.611 134.362 411.381 125.295 408.231C125.036 407.124 124.789 406.004 124.556 404.873C133.703 408.113 148.622 412.878 162.98 415.174L164.211 415.369V424.256C168.227 425.074 182.374 427.695 198.773 427.695C215.189 427.695 229.323 425.075 233.335 424.256V415.369L234.566 415.174C237.883 414.643 272.985 404.871 272.985 404.871Z" fill="#7FD5DC"/>
    </g>

    <g id="head">
      <path d="M233.679 199.987C233.679 213.35 218.671 224.181 200.156 224.181C181.641 224.181 166.631 213.35 166.631 199.987C166.631 186.624 166.631 175.793 200.156 175.793C233.679 175.793 233.679 186.624 233.679 199.987Z" fill="#CBD3DB"/>
      <path d="M106.619 278.452C106.619 289.87 112.869 300.375 122.911 305.808C135.677 312.712 158.365 319.112 198.613 319.112C238.859 319.112 261.548 312.712 274.314 305.808C284.356 300.375 290.607 289.87 290.607 278.452V228.392C290.607 216.975 284.356 206.469 274.314 201.039C261.548 194.135 238.859 187.735 198.613 187.735C158.365 187.735 135.677 194.135 122.911 201.039C112.869 206.469 106.619 216.975 106.619 228.392V278.452Z" fill="#DEE4EB"/>
      <path d="M290.141 227.768V277.83C290.141 289.247 283.889 299.753 273.849 305.185C261.083 312.088 238.393 318.488 198.146 318.488C157.899 318.488 135.211 312.088 122.444 305.185C117.373 302.442 113.27 298.406 110.449 293.609C127.021 303.726 147.747 306.577 167.461 306.807C181.325 306.968 195.523 305.988 208.264 300.513C231.401 290.571 246.752 265.719 247.083 240.536C247.301 224.05 241.511 202.608 231.127 188.825C251.675 191.184 265.095 195.679 273.849 200.414C283.889 205.847 290.141 216.352 290.141 227.768Z" fill="#C7D0DC"/>
      
    <g id="face-monitor">
      <path id="face-bg" d="M200.156 310.053C159.955 310.053 139.318 303.456 129.085 297.922C122.184 294.188 117.896 286.987 117.896 279.13V240.723C117.896 232.866 122.184 225.665 129.085 221.932C139.318 216.397 159.955 209.801 200.156 209.801C240.356 209.801 260.993 216.397 271.225 221.932C278.128 225.665 282.414 232.866 282.414 240.723V279.13C282.414 286.987 278.128 294.188 271.225 297.92C260.993 303.456 240.356 310.053 200.156 310.053Z" fill="#23445E"/>
        
      <g id="face">
        <g id="face-sad" transform="translate(40, 80) scale(0.8)">
          <path d="M165.748 199.814C166.169 200.295 166.59 200.775 167.162 201.44C167.458 201.822 167.604 202.019 167.749 202.217C167.749 202.217 167.754 202.178 167.755 202.3C167.887 202.619 168.018 202.816 168.148 203.013C168.148 203.013 168.145 202.97 168.137 203.141C168.299 204.659 168.467 206.007 168.636 207.355C168.612 207.544 168.588 207.733 168.556 208.236C168.518 209.025 168.488 209.5 168.458 209.975C168.458 209.975 168.512 210.007 168.402 210.072C168.203 210.544 168.113 210.952 168.024 211.36C164.046 221.503 156.174 225.999 145.726 227.069C141.923 227.459 138.353 226.826 134.833 225.735C133.309 225.263 131.795 224.314 130.64 223.204C128.936 221.564 128.151 219.397 128.949 216.992C129.745 214.596 131.641 213.646 133.982 212.97C138.565 211.647 143.284 210.476 147.524 208.383C151.398 206.471 154.809 203.545 158.234 200.825C159.845 199.546 161.351 198.603 163.739 198.946C164.208 199.002 164.377 199.028 164.547 199.053C164.547 199.053 164.56 199.008 164.599 199.114C165.007 199.418 165.378 199.616 165.748 199.814Z" fill="#7FD5DC"/>
          <path d="M233.032 201.687C233.021 201.551 233.064 201.436 233.368 201.246C233.659 200.997 233.744 200.845 233.829 200.692C233.829 200.592 233.871 200.515 234.163 200.403C234.512 200.209 234.653 200.074 234.795 199.939C237.247 198.403 239.482 198.483 241.495 200.492C248.606 207.588 257.184 211.651 267.063 213.083C269.69 213.463 271.578 214.761 272.313 217.341C273.094 220.086 272.174 222.634 269.937 224.07C267.639 225.546 264.851 226.259 261.998 227.185C261.249 227.018 260.779 226.94 260.309 226.934C257.611 226.899 254.911 226.919 252.214 226.843C250.918 226.807 249.627 226.601 248.334 226.472C248.104 226.432 247.874 226.392 247.52 226.136C246.886 225.819 246.374 225.719 245.863 225.618C241.06 223.768 237.212 220.726 234.436 216.201C233.901 214.397 232.95 212.855 232.777 211.229C232.47 208.342 232.634 205.405 232.602 202.489C232.602 202.489 232.612 202.518 232.707 202.456C232.878 202.159 232.955 201.923 233.032 201.687Z" fill="#7FD5DC"/>
          <path d="M197.84 249.918C193.172 251.003 189.436 253.338 187.084 257.677C186.086 259.52 184.294 260.083 182.753 259.281C181.147 258.444 180.632 256.592 181.61 254.688C184.716 248.643 189.757 245.13 196.512 243.698C196.512 243.698 200.824 243.091 201.532 243.091C202.564 243.068 205.875 243.627 205.875 243.627C212.463 245.046 217.412 248.697 220.641 254.606C221.684 256.515 220.927 258.64 219.131 259.349C217.581 259.962 216.307 259.341 215.146 257.831C213.719 255.977 212.087 254.28 210.467 252.309C210.057 251.962 209.725 251.822 209.392 251.681C209.392 251.681 209.427 251.668 209.382 251.594C209.143 251.461 208.95 251.403 208.757 251.345C208.757 251.345 208.789 251.337 208.739 251.262C208.495 251.135 208.3 251.082 208.105 251.029C208.105 251.029 208.14 251.024 208.097 250.927C207.534 250.681 207.014 250.533 206.495 250.385C206.495 250.385 206.531 250.383 206.472 250.294C205.273 250.031 204.885 249.825 203.745 249.65L201.532 249.397L197.84 249.918Z" fill="#7FD5DC"/>
          <path d="M251.73 256.199C249.571 253.529 248.848 250.6 249.95 247.476C251.166 244.03 252.577 240.643 254.078 237.31C255.11 235.017 256.408 232.842 257.646 230.647C258.576 228.995 260.325 228.813 261.144 230.371C263.612 235.067 266.018 239.799 268.295 244.59C268.938 245.944 269.215 247.53 269.381 249.04C269.819 253.043 267.774 256.615 264.148 258.491C260.508 260.375 255.948 259.903 252.874 257.314C252.497 256.997 252.161 256.632 251.73 256.199Z" fill="#7FD5DC"/>
        </g>
      </g>
    </g>

    <g id="shadow">
      <path d="M132.761 209.531C133.42 209.241 134.086 208.973 134.761 208.724C134.516 208.813 134.271 208.903 134.025 208.994C137.714 207.648 141.52 206.589 145.347 205.72C149.49 204.779 153.685 204.086 157.893 203.515C160.669 203.14 163.451 202.818 166.236 202.524C166.634 202.449 166.985 202.287 167.289 202.034C167.629 201.838 167.902 201.568 168.109 201.226C168.347 200.89 168.485 200.522 168.523 200.121C168.633 199.724 168.634 199.322 168.529 198.914C168.328 198.172 167.911 197.446 167.231 197.042C166.995 196.929 166.76 196.815 166.525 196.702C165.997 196.532 165.462 196.505 164.92 196.622C162.293 196.899 159.67 197.201 157.052 197.55C154.735 197.859 152.423 198.202 150.12 198.605C147.999 198.975 145.886 199.393 143.787 199.874C141.795 200.332 139.816 200.847 137.854 201.423C135.521 202.11 133.185 202.852 130.929 203.762C130.608 203.892 130.289 204.027 129.972 204.166C129.611 204.338 129.316 204.583 129.087 204.901C128.805 205.18 128.608 205.513 128.495 205.901C128.35 206.296 128.312 206.696 128.382 207.102C128.38 207.505 128.481 207.885 128.685 208.241C129.068 208.906 129.659 209.506 130.42 209.718C130.686 209.768 130.951 209.817 131.217 209.867C131.762 209.892 132.277 209.779 132.761 209.531Z" fill="white"/>
      <path d="M122.309 217.032C122.988 216.265 123.708 215.539 124.464 214.849C124.771 214.59 124.996 214.277 125.136 213.908C125.343 213.558 125.449 213.175 125.454 212.758C125.49 212.344 125.422 211.95 125.251 211.582C125.148 211.201 124.956 210.868 124.675 210.579C124.479 210.412 124.283 210.244 124.088 210.076C123.63 209.781 123.129 209.618 122.585 209.59C122.315 209.611 122.046 209.635 121.777 209.658C121.258 209.776 120.801 210.012 120.406 210.368C119.65 211.058 118.93 211.786 118.252 212.551C117.944 212.81 117.72 213.123 117.579 213.492C117.373 213.842 117.267 214.225 117.262 214.641C117.226 215.056 117.293 215.448 117.464 215.818C117.567 216.197 117.759 216.532 118.04 216.819C118.236 216.987 118.432 217.156 118.628 217.322C119.085 217.619 119.586 217.781 120.131 217.81C120.4 217.787 120.669 217.765 120.939 217.742C121.457 217.624 121.914 217.386 122.309 217.032Z" fill="white"/>
    </g>

    <g id="ear">
      <path d="M288.966 279.13L293.953 278.361C302.002 277.122 307.942 270.196 307.942 262.053V246.145C307.942 238.002 302.002 231.076 293.953 229.837L288.966 229.068V279.13Z" fill="#ABB7C6"/>
      <path d="M108.582 279.13L103.595 278.361C95.5459 277.122 89.6047 270.196 89.6047 262.053V246.145C89.6047 238.002 95.5459 231.076 103.595 229.837L108.582 229.068V279.13Z" fill="#CBD3DB"/>
    </g>
      
    <path d="M119.506 279.13V240.724C119.506 233.458 123.47 226.799 129.851 223.348C139.921 217.901 160.291 211.41 200.156 211.41C240.02 211.41 260.391 217.901 270.46 223.348C276.842 226.799 280.805 233.458 280.805 240.724V279.13C280.805 286.395 276.842 293.055 270.46 296.506C260.391 301.951 240.02 308.444 200.156 308.444C160.291 308.444 139.92 301.951 129.851 296.506C123.47 293.055 119.506 286.395 119.506 279.13ZM271.991 299.336C279.413 295.322 284.023 287.579 284.023 279.13V240.724C284.023 232.275 279.413 224.532 271.991 220.517C253.156 210.33 222.53 208.191 200.156 208.191C177.781 208.191 147.155 210.33 128.32 220.517C120.898 224.532 116.287 232.275 116.287 240.724V279.13C116.287 287.579 120.898 295.324 128.32 299.336C147.155 309.524 177.78 311.662 200.156 311.662C222.53 311.662 253.156 309.524 271.991 299.336Z" fill="#141A2F"/>
    
    <g id="robot-shadow">
      <path d="M135.222 368.018C135.138 365.116 135.171 362.191 135.552 359.308C135.521 359.539 135.491 359.768 135.46 359.998C135.602 358.936 135.793 357.879 136.089 356.849C136.344 355.959 136.665 355.086 137.024 354.233C136.937 354.441 136.85 354.646 136.763 354.854C137.654 352.754 138.828 350.786 140.221 348.983C140.086 349.157 139.951 349.332 139.816 349.507C141.065 347.896 142.481 346.419 144.024 345.087C144.479 344.693 144.946 344.314 145.422 343.946C145.247 344.08 145.072 344.216 144.897 344.35C146.888 342.814 149.043 341.496 151.303 340.395C151.965 340.073 152.635 339.771 153.313 339.483C153.107 339.57 152.901 339.658 152.694 339.746C153.915 339.232 155.158 338.778 156.42 338.379C157.057 338.179 157.627 337.771 157.969 337.188C158.293 336.634 158.431 335.815 158.23 335.193C158.027 334.565 157.638 333.961 157.039 333.644C156.435 333.326 155.713 333.172 155.043 333.383C152.079 334.318 149.181 335.547 146.48 337.086C143.945 338.53 141.554 340.275 139.421 342.267C137.389 344.164 135.583 346.347 134.118 348.711C133.461 349.774 132.877 350.88 132.38 352.025C131.792 353.38 131.246 354.759 130.902 356.198C130.495 357.899 130.288 359.657 130.155 361.398C130.022 363.154 129.989 364.918 130.011 366.677C130.017 367.124 130.027 367.571 130.04 368.018C130.06 368.696 130.316 369.368 130.799 369.851C131.248 370.3 131.986 370.638 132.631 370.609C133.301 370.581 133.996 370.359 134.463 369.851C134.92 369.352 135.242 368.714 135.222 368.018Z" fill="white"/>
      <path d="M136.257 379.599C136.16 378.987 136.071 378.375 135.989 377.764C136.02 377.993 136.051 378.223 136.082 378.452C136.071 378.372 136.06 378.29 136.049 378.209C136.063 377.853 135.988 377.521 135.826 377.211C135.721 376.889 135.543 376.612 135.29 376.378C135.056 376.124 134.778 375.947 134.457 375.842C134.148 375.679 133.815 375.606 133.458 375.618C133.229 375.65 132.999 375.681 132.77 375.711C132.331 375.834 131.95 376.056 131.627 376.378C131.492 376.552 131.357 376.727 131.221 376.902C130.987 377.306 130.869 377.742 130.868 378.209C130.99 379.134 131.114 380.056 131.261 380.975C131.341 381.313 131.496 381.607 131.724 381.857C131.907 382.138 132.149 382.361 132.451 382.524C132.749 382.714 133.07 382.815 133.415 382.832C133.759 382.908 134.103 382.892 134.448 382.785C134.654 382.697 134.86 382.612 135.066 382.524C135.456 382.293 135.765 381.984 135.996 381.594C136.083 381.389 136.17 381.181 136.257 380.975C136.38 380.516 136.38 380.056 136.257 379.599Z" fill="white"/>
    </g>

    <g id="hand-right">
      <path d="M253.609 347.744C254.158 355.247 259.5 355.826 265.479 370.057C273.122 388.239 274.999 405.903 279.1 425.329C284.214 449.568 298.557 451.292 304.992 449.972C316.587 447.588 321.93 433.721 318.783 418.811C307.17 363.791 285.162 337.768 263.906 337.968C259.948 338.006 253.075 340.434 253.609 347.744Z" fill="#DEE4EB"/>
      <path d="M304.993 449.972C302.843 450.412 299.812 450.514 296.54 449.55C307.006 446.26 311.705 433.008 308.71 418.811C298.221 369.12 279.252 343.079 260.02 338.651C261.392 338.186 262.77 337.979 263.908 337.968C285.162 337.768 307.171 363.791 318.783 418.811C321.93 433.721 316.587 447.588 304.993 449.972Z" fill="#C7D0DC"/>
    </g>

    <g id="hand-left">
      <path d="M141.174 347.964C140.625 355.465 135.283 356.047 129.302 370.277C122.923 385.453 120.561 400.268 117.567 416.051C116.977 419.176 116.358 422.338 115.681 425.549C110.567 449.788 96.2251 451.512 89.7896 450.19C78.1953 447.809 72.8515 433.941 75.9985 419.03C86.3579 369.95 104.99 343.942 123.98 339.043C126.277 338.451 128.581 338.165 130.875 338.188C134.834 338.224 141.708 340.654 141.174 347.964Z" fill="#DEE4EB"/>
      <path d="M141.174 347.964C140.625 355.465 135.283 356.047 129.302 370.277C122.923 385.453 120.56 400.268 117.567 416.051C116.818 413.517 116.13 410.91 115.507 408.231C115.246 407.124 114.999 406.005 114.766 404.873C112.453 393.775 111.206 381.492 111.206 368.077C111.206 356.68 115.759 346.846 123.98 339.043C126.277 338.451 128.581 338.165 130.875 338.188C134.834 338.224 141.708 340.654 141.174 347.964Z" fill="#C7D0DC"/>
    </g>
  </g>
</svg>
`;function q4(){const t=document.querySelector(".loser-robot");t.innerHTML=V4}const G4=`
<svg viewBox="0 0 395 497" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="robot">
      <g id="hand-right">
        <path d="M253.609 347.744C254.158 355.247 259.5 355.826 265.479 370.057C273.122 388.239 274.999 405.903 279.1 425.329C284.214 449.568 298.557 451.292 304.992 449.972C316.587 447.588 321.93 433.721 318.783 418.811C307.17 363.791 285.162 337.768 263.906 337.968C259.948 338.006 253.075 340.434 253.609 347.744Z" fill="#DEE4EB"/>
        <path d="M304.993 449.972C302.843 450.412 299.812 450.514 296.54 449.55C307.006 446.26 311.705 433.008 308.71 418.811C298.221 369.12 279.252 343.079 260.02 338.651C261.392 338.186 262.77 337.979 263.908 337.968C285.162 337.768 307.171 363.791 318.783 418.811C321.93 433.721 316.587 447.588 304.993 449.972Z" fill="#C7D0DC"/>
      </g>

      <g id="hand-left">
        <path d="M141.174 347.964C140.625 355.465 135.283 356.047 129.302 370.277C122.923 385.453 120.561 400.268 117.567 416.051C116.977 419.176 116.358 422.338 115.681 425.549C110.567 449.788 96.2251 451.512 89.7896 450.19C78.1953 447.809 72.8515 433.941 75.9985 419.03C86.3579 369.95 104.99 343.942 123.98 339.043C126.277 338.451 128.581 338.165 130.875 338.188C134.834 338.224 141.708 340.654 141.174 347.964Z" fill="#DEE4EB"/>
        <path d="M141.174 347.964C140.625 355.465 135.283 356.047 129.302 370.277C122.923 385.453 120.56 400.268 117.567 416.051C116.818 413.517 116.13 410.91 115.507 408.231C115.246 407.124 114.999 406.005 114.766 404.873C112.453 393.775 111.206 381.492 111.206 368.077C111.206 356.68 115.759 346.846 123.98 339.043C126.277 338.451 128.581 338.165 130.875 338.188C134.834 338.224 141.708 340.654 141.174 347.964Z" fill="#C7D0DC"/>
      </g>

      <g id="body">
        <path d="M276.55 368.077C276.55 381.492 275.304 393.775 272.99 404.873C272.757 406.004 272.511 407.124 272.25 408.231C261.678 453.65 232.772 478.243 198.773 478.243C164.774 478.243 135.868 453.65 125.295 408.231C125.035 407.124 124.788 406.004 124.556 404.873C122.242 393.775 120.996 381.492 120.996 368.077C120.996 338.236 152.206 319.11 198.773 319.11C245.339 319.11 276.55 338.236 276.55 368.077Z" fill="#DEE4EB"/>
        <path d="M276.55 368.077C276.55 381.492 275.304 393.775 272.99 404.873C272.757 406.004 272.51 407.124 272.251 408.231C261.678 453.65 232.772 478.243 198.773 478.243C173.151 478.243 150.419 464.276 136.252 437.952C146.019 445.868 156.856 452.175 168.686 455.628C187.728 461.189 209.574 458.466 224.863 445.255C233.516 437.777 239.481 427.602 243.438 416.471C243.821 415.401 244.18 414.323 244.527 413.238C246.307 407.614 247.608 401.795 248.511 395.994C250.196 385.181 250.675 373.968 248.046 363.367C245.416 352.769 239.379 342.794 230.363 337.373C224.687 333.959 218.17 332.493 211.741 331.27C193.525 327.804 175.038 325.926 156.53 325.658C168.323 321.41 182.624 319.112 198.773 319.112C245.341 319.112 276.55 338.236 276.55 368.077Z" fill="#C7D0DC"/>
        <path d="M167.133 309.854V328.542C167.133 338.451 181.299 346.483 198.773 346.483C216.247 346.483 230.413 338.451 230.413 328.542V309.854H167.133Z" fill="#CBD3DB"/>
        <path d="M230.413 309.854V326.041C221.571 330.195 211.512 331.922 198.773 331.922C187.395 331.922 175.974 330.54 167.133 326.375V309.854H230.413Z" fill="#ABB7C6"/>
        <path id="changing-line" d="M272.985 404.871L272.267 408.233C272.267 408.233 238.652 417.456 236.259 417.86V426.608L235.122 426.869C234.957 426.906 218.454 430.619 198.773 430.619C179.092 430.619 162.589 426.906 162.423 426.869L161.287 426.608V417.86C147.978 415.611 134.362 411.381 125.295 408.231C125.036 407.124 124.789 406.004 124.556 404.873C133.703 408.113 148.622 412.878 162.98 415.174L164.211 415.369V424.256C168.227 425.074 182.374 427.695 198.773 427.695C215.189 427.695 229.323 425.075 233.335 424.256V415.369L234.566 415.174C237.883 414.643 272.985 404.871 272.985 404.871Z" fill="#7FD5DC"/>
      </g>

      <g id="head">
        <path d="M233.679 199.987C233.679 213.35 218.671 224.181 200.156 224.181C181.641 224.181 166.631 213.35 166.631 199.987C166.631 186.624 166.631 175.793 200.156 175.793C233.679 175.793 233.679 186.624 233.679 199.987Z" fill="#CBD3DB"/>
        <path d="M106.619 278.452C106.619 289.87 112.869 300.375 122.911 305.808C135.677 312.712 158.365 319.112 198.613 319.112C238.859 319.112 261.548 312.712 274.314 305.808C284.356 300.375 290.607 289.87 290.607 278.452V228.392C290.607 216.975 284.356 206.469 274.314 201.039C261.548 194.135 238.859 187.735 198.613 187.735C158.365 187.735 135.677 194.135 122.911 201.039C112.869 206.469 106.619 216.975 106.619 228.392V278.452Z" fill="#DEE4EB"/>
        <path d="M290.141 227.768V277.83C290.141 289.247 283.889 299.753 273.849 305.185C261.083 312.088 238.393 318.488 198.146 318.488C157.899 318.488 135.211 312.088 122.444 305.185C117.373 302.442 113.27 298.406 110.449 293.609C127.021 303.726 147.747 306.577 167.461 306.807C181.325 306.968 195.523 305.988 208.264 300.513C231.401 290.571 246.752 265.719 247.083 240.536C247.301 224.05 241.511 202.608 231.127 188.825C251.675 191.184 265.095 195.679 273.849 200.414C283.889 205.847 290.141 216.352 290.141 227.768Z" fill="#C7D0DC"/>
      
      <g id="face-monitor">
        <path id="face-bg" d="M200.156 310.053C159.955 310.053 139.318 303.456 129.085 297.922C122.184 294.188 117.896 286.987 117.896 279.13V240.723C117.896 232.866 122.184 225.665 129.085 221.932C139.318 216.397 159.955 209.801 200.156 209.801C240.356 209.801 260.993 216.397 271.225 221.932C278.128 225.665 282.414 232.866 282.414 240.723V279.13C282.414 286.987 278.128 294.188 271.225 297.92C260.993 303.456 240.356 310.053 200.156 310.053Z" fill="#23445E"/>
        
        <g id="face">
          <g id="face-regular">
            <path d="M176.445 261.086C176.445 270.109 169.13 265.619 160.108 265.619C151.085 265.619 143.771 270.109 143.771 261.086C143.771 252.063 151.085 244.749 160.108 244.749C169.13 244.749 176.445 252.063 176.445 261.086Z" fill="#7FD5DC"/>
            <path d="M223.36 261.086C223.36 270.109 230.674 265.619 239.697 265.619C248.72 265.619 256.034 270.109 256.034 261.086C256.034 252.063 248.72 244.749 239.697 244.749C230.674 244.749 223.36 252.063 223.36 261.086Z" fill="#7FD5DC"/>
            <path d="M210.166 281.394C210.166 284.158 209.045 286.66 207.234 288.471C205.422 290.283 202.92 291.404 200.156 291.404C194.627 291.404 190.146 286.923 190.146 281.394C190.146 281 190.305 280.641 190.564 280.383C190.823 280.124 191.181 279.963 191.575 279.963H208.736C209.524 279.963 210.166 280.605 210.166 281.394Z" fill="#7FD5DC"/>
          </g>
        </g>
      </g>

      <g id="shadow">
        <path d="M132.761 209.531C133.42 209.241 134.086 208.973 134.761 208.724C134.516 208.813 134.271 208.903 134.025 208.994C137.714 207.648 141.52 206.589 145.347 205.72C149.49 204.779 153.685 204.086 157.893 203.515C160.669 203.14 163.451 202.818 166.236 202.524C166.634 202.449 166.985 202.287 167.289 202.034C167.629 201.838 167.902 201.568 168.109 201.226C168.347 200.89 168.485 200.522 168.523 200.121C168.633 199.724 168.634 199.322 168.529 198.914C168.328 198.172 167.911 197.446 167.231 197.042C166.995 196.929 166.76 196.815 166.525 196.702C165.997 196.532 165.462 196.505 164.92 196.622C162.293 196.899 159.67 197.201 157.052 197.55C154.735 197.859 152.423 198.202 150.12 198.605C147.999 198.975 145.886 199.393 143.787 199.874C141.795 200.332 139.816 200.847 137.854 201.423C135.521 202.11 133.185 202.852 130.929 203.762C130.608 203.892 130.289 204.027 129.972 204.166C129.611 204.338 129.316 204.583 129.087 204.901C128.805 205.18 128.608 205.513 128.495 205.901C128.35 206.296 128.312 206.696 128.382 207.102C128.38 207.505 128.481 207.885 128.685 208.241C129.068 208.906 129.659 209.506 130.42 209.718C130.686 209.768 130.951 209.817 131.217 209.867C131.762 209.892 132.277 209.779 132.761 209.531Z" fill="white"/>
        <path d="M122.309 217.032C122.988 216.265 123.708 215.539 124.464 214.849C124.771 214.59 124.996 214.277 125.136 213.908C125.343 213.558 125.449 213.175 125.454 212.758C125.49 212.344 125.422 211.95 125.251 211.582C125.148 211.201 124.956 210.868 124.675 210.579C124.479 210.412 124.283 210.244 124.088 210.076C123.63 209.781 123.129 209.618 122.585 209.59C122.315 209.611 122.046 209.635 121.777 209.658C121.258 209.776 120.801 210.012 120.406 210.368C119.65 211.058 118.93 211.786 118.252 212.551C117.944 212.81 117.72 213.123 117.579 213.492C117.373 213.842 117.267 214.225 117.262 214.641C117.226 215.056 117.293 215.448 117.464 215.818C117.567 216.197 117.759 216.532 118.04 216.819C118.236 216.987 118.432 217.156 118.628 217.322C119.085 217.619 119.586 217.781 120.131 217.81C120.4 217.787 120.669 217.765 120.939 217.742C121.457 217.624 121.914 217.386 122.309 217.032Z" fill="white"/>
      </g>

      <g id="ear">
        <path d="M288.966 279.13L293.953 278.361C302.002 277.122 307.942 270.196 307.942 262.053V246.145C307.942 238.002 302.002 231.076 293.953 229.837L288.966 229.068V279.13Z" fill="#ABB7C6"/>
        <path d="M108.582 279.13L103.595 278.361C95.5459 277.122 89.6047 270.196 89.6047 262.053V246.145C89.6047 238.002 95.5459 231.076 103.595 229.837L108.582 229.068V279.13Z" fill="#CBD3DB"/>
      </g>
      
      <path d="M119.506 279.13V240.724C119.506 233.458 123.47 226.799 129.851 223.348C139.921 217.901 160.291 211.41 200.156 211.41C240.02 211.41 260.391 217.901 270.46 223.348C276.842 226.799 280.805 233.458 280.805 240.724V279.13C280.805 286.395 276.842 293.055 270.46 296.506C260.391 301.951 240.02 308.444 200.156 308.444C160.291 308.444 139.92 301.951 129.851 296.506C123.47 293.055 119.506 286.395 119.506 279.13ZM271.991 299.336C279.413 295.322 284.023 287.579 284.023 279.13V240.724C284.023 232.275 279.413 224.532 271.991 220.517C253.156 210.33 222.53 208.191 200.156 208.191C177.781 208.191 147.155 210.33 128.32 220.517C120.898 224.532 116.287 232.275 116.287 240.724V279.13C116.287 287.579 120.898 295.324 128.32 299.336C147.155 309.524 177.78 311.662 200.156 311.662C222.53 311.662 253.156 309.524 271.991 299.336Z" fill="#141A2F"/>
      
      <g id="crown">
        <path d="M272.645 196.157C272.645 196.157 273.7 197.501 272.4 201.608C271.1 205.716 269.273 206.813 269.273 206.813C269.273 206.813 259.073 208.35 229.159 198.882C199.246 189.414 191.788 182.289 191.788 182.289C191.788 182.289 190.925 180.34 192.225 176.233C193.525 172.125 195.161 171.632 195.161 171.632L272.645 196.157Z" fill="#FAB525"/>
        <path d="M212.355 145.856C216.18 139.638 219.733 132.94 221.241 130.038L224.497 130.09C225.905 133.023 229.215 139.775 232.819 146.083C232.819 146.083 230.115 154.625 221.802 155.039C215.876 155.334 212.355 145.856 212.355 145.856Z" fill="#CB852D"/>
        <path d="M232.819 146.083C232.819 146.083 230.115 154.625 221.802 155.039C215.876 155.334 212.355 145.856 212.355 145.856C212.892 144.983 214.954 141.475 215.476 140.594C217.266 143.976 222.345 147.539 223.072 147.647C224.114 147.802 226.138 146.66 227.028 145.964C227.909 145.276 228.255 144.102 227.889 143.046C226.401 138.747 224.986 134.424 223.646 130.076L224.497 130.09C225.657 132.508 228.111 137.52 230.955 142.741C231.561 143.853 232.186 144.975 232.819 146.083Z" fill="#B26C2C"/>
        <path d="M219.368 123.65C218.03 125.618 218.541 128.299 220.509 129.637C222.477 130.976 225.158 130.465 226.497 128.496C227.835 126.528 227.324 123.847 225.356 122.509C223.388 121.17 220.707 121.681 219.368 123.65Z" fill="#CB852D"/>
        <path d="M260.403 167.257C253.842 162.134 256.545 153.593 256.545 153.593C263.122 150.507 269.715 146.889 272.554 145.3L275.247 147.131C274.81 150.372 273.862 157.895 273.414 165.181C273.414 165.181 265.08 170.908 260.403 167.257Z" fill="#CB852D"/>
        <path d="M273.414 165.181C273.414 165.181 265.08 170.907 260.403 167.257C254.651 162.767 256.019 155.65 256.444 153.961C256.5 154.03 256.557 154.098 256.613 154.166C261.183 159.617 269.996 157.804 272.142 151.022L273.705 146.083L275.247 147.131C274.81 150.372 273.862 157.895 273.414 165.181Z" fill="#B26C2C"/>
        <path d="M272.581 140.491C271.242 142.46 271.753 145.141 273.721 146.479C275.69 147.817 278.37 147.306 279.709 145.338C281.047 143.37 280.537 140.689 278.568 139.351C276.6 138.012 273.919 138.523 272.581 140.491Z" fill="#CB852D"/>
        <path d="M279.709 145.338C278.371 147.307 275.69 147.818 273.721 146.479C272.594 145.713 271.945 144.506 271.848 143.244C272.066 143.49 272.319 143.713 272.604 143.907C274.471 145.177 277.016 144.693 278.286 142.824C278.957 141.838 279.138 140.664 278.885 139.588C280.588 140.987 280.972 143.48 279.709 145.338Z" fill="#B26C2C"/>
        <path d="M226.496 128.496C225.159 130.465 222.478 130.976 220.509 129.637C219.382 128.871 218.733 127.664 218.636 126.402C218.854 126.648 219.107 126.871 219.391 127.065C221.259 128.335 223.804 127.851 225.074 125.982C225.745 124.996 225.926 123.822 225.673 122.746C227.376 124.145 227.76 126.638 226.496 128.496Z" fill="#B26C2C"/>
        <path d="M252.124 131.723C253.162 138.296 257.25 162.447 261.64 165.303C265.513 167.824 287.453 162.471 296.024 160.243L297.41 162.138L272.645 196.156C272.645 196.156 262.446 197.694 232.532 188.226C202.618 178.758 195.161 171.632 195.161 171.632L194.479 129.56L196.703 128.808C202.431 135.561 217.296 152.562 221.914 152.73C227.148 152.92 244.388 135.518 249.019 130.74L252.124 131.723Z" fill="#FAB525"/>
        <path d="M198.375 126.554C197.657 128.824 195.235 130.081 192.965 129.363C190.696 128.644 189.438 126.223 190.157 123.953C190.875 121.684 193.297 120.426 195.566 121.144C197.836 121.863 199.093 124.285 198.375 126.554Z" fill="#FAB525"/>
        <path d="M295.954 157.438C295.235 159.708 296.493 162.13 298.762 162.848C301.031 163.566 303.453 162.309 304.172 160.039C304.89 157.77 303.632 155.348 301.363 154.63C299.094 153.912 296.672 155.169 295.954 157.438Z" fill="#FAB525"/>
        <path d="M255.885 128.726C255.167 130.996 252.744 132.253 250.475 131.535C248.205 130.817 246.949 128.395 247.667 126.125C248.385 123.856 250.807 122.598 253.077 123.316C255.346 124.035 256.603 126.457 255.885 128.726Z" fill="#FAB525"/>
        <path d="M198.375 126.554C197.657 128.824 195.235 130.081 192.965 129.363C191.566 128.92 190.551 127.829 190.148 126.526C190.419 126.684 190.711 126.815 191.022 126.914C193.292 127.632 195.714 126.375 196.432 124.105C196.707 123.235 196.693 122.343 196.441 121.532C198.144 122.525 198.994 124.597 198.375 126.554Z" fill="#E29B28"/>
        <path d="M304.172 160.039C303.453 162.309 301.031 163.566 298.762 162.848C297.363 162.405 296.349 161.315 295.945 160.012C296.215 160.169 296.508 160.3 296.819 160.399C299.089 161.117 301.51 159.86 302.228 157.59C302.504 156.72 302.489 155.828 302.237 155.017C303.941 156.01 304.791 158.082 304.172 160.039Z" fill="#E29B28"/>
        <path d="M255.885 128.727C255.167 130.995 252.744 132.253 250.475 131.535C249.076 131.092 248.061 130.002 247.658 128.698C247.929 128.857 248.22 128.987 248.533 129.086C250.801 129.804 253.224 128.546 253.942 126.278C254.218 125.408 254.202 124.515 253.951 123.704C255.654 124.697 256.505 126.769 255.885 128.727Z" fill="#E29B28"/>
        <path d="M202.049 173.345C202.049 173.345 199.174 171.927 196.987 170.528C196.62 157.857 196.288 137.358 196.15 131.411L198.435 134.161C200.125 165.448 202.049 173.345 202.049 173.345Z" fill="#FCD75C"/>
        <path d="M195.318 174.013C194.024 176.113 193.259 178.907 193.426 181.164C193.426 181.164 194.531 181.933 195.318 182.321C195.318 182.321 196.025 178.729 199.637 176.63L195.318 174.013Z" fill="#FCD75C"/>
        <path d="M191.362 124.602C191.658 123.666 192.247 122.925 193.049 122.529C193.852 122.133 194.779 122.096 195.563 122.427C195.563 122.427 193.521 123.006 192.417 124.936L191.362 124.602Z" fill="#FCD75C"/>
        <path d="M248.898 126.695C249.194 125.759 249.781 125.017 250.585 124.622C251.387 124.226 252.314 124.189 253.098 124.52C253.098 124.52 251.057 125.099 249.952 127.028L248.898 126.695Z" fill="#FCD75C"/>
        <path d="M219.936 125.386C220.232 124.451 220.82 123.709 221.623 123.313C222.426 122.918 223.353 122.88 224.137 123.212C224.137 123.212 222.095 123.79 220.991 125.72L219.936 125.386Z" fill="#D7A23E"/>
        <path d="M273.473 142.331C273.769 141.395 274.357 140.654 275.161 140.258C275.963 139.863 276.89 139.825 277.674 140.157C277.674 140.157 275.633 140.735 274.528 142.665L273.473 142.331Z" fill="#D7A23E"/>
        <path d="M297.159 158.087C297.456 157.151 298.044 156.41 298.846 156.014C299.65 155.619 300.576 155.581 301.36 155.913C301.36 155.913 299.318 156.491 298.214 158.421L297.159 158.087Z" fill="#FCD75C"/>
      </g>
    </g>

      <g id="robot-shadow">
        <path d="M135.222 368.018C135.138 365.116 135.171 362.191 135.552 359.308C135.521 359.539 135.491 359.768 135.46 359.998C135.602 358.936 135.793 357.879 136.089 356.849C136.344 355.959 136.665 355.086 137.024 354.233C136.937 354.441 136.85 354.646 136.763 354.854C137.654 352.754 138.828 350.786 140.221 348.983C140.086 349.157 139.951 349.332 139.816 349.507C141.065 347.896 142.481 346.419 144.024 345.087C144.479 344.693 144.946 344.314 145.422 343.946C145.247 344.08 145.072 344.216 144.897 344.35C146.888 342.814 149.043 341.496 151.303 340.395C151.965 340.073 152.635 339.771 153.313 339.483C153.107 339.57 152.901 339.658 152.694 339.746C153.915 339.232 155.158 338.778 156.42 338.379C157.057 338.179 157.627 337.771 157.969 337.188C158.293 336.634 158.431 335.815 158.23 335.193C158.027 334.565 157.638 333.961 157.039 333.644C156.435 333.326 155.713 333.172 155.043 333.383C152.079 334.318 149.181 335.547 146.48 337.086C143.945 338.53 141.554 340.275 139.421 342.267C137.389 344.164 135.583 346.347 134.118 348.711C133.461 349.774 132.877 350.88 132.38 352.025C131.792 353.38 131.246 354.759 130.902 356.198C130.495 357.899 130.288 359.657 130.155 361.398C130.022 363.154 129.989 364.918 130.011 366.677C130.017 367.124 130.027 367.571 130.04 368.018C130.06 368.696 130.316 369.368 130.799 369.851C131.248 370.3 131.986 370.638 132.631 370.609C133.301 370.581 133.996 370.359 134.463 369.851C134.92 369.352 135.242 368.714 135.222 368.018Z" fill="white"/>
        <path d="M136.257 379.599C136.16 378.987 136.071 378.375 135.989 377.764C136.02 377.993 136.051 378.223 136.082 378.452C136.071 378.372 136.06 378.29 136.049 378.209C136.063 377.853 135.988 377.521 135.826 377.211C135.721 376.889 135.543 376.612 135.29 376.378C135.056 376.124 134.778 375.947 134.457 375.842C134.148 375.679 133.815 375.606 133.458 375.618C133.229 375.65 132.999 375.681 132.77 375.711C132.331 375.834 131.95 376.056 131.627 376.378C131.492 376.552 131.357 376.727 131.221 376.902C130.987 377.306 130.869 377.742 130.868 378.209C130.99 379.134 131.114 380.056 131.261 380.975C131.341 381.313 131.496 381.607 131.724 381.857C131.907 382.138 132.149 382.361 132.451 382.524C132.749 382.714 133.07 382.815 133.415 382.832C133.759 382.908 134.103 382.892 134.448 382.785C134.654 382.697 134.86 382.612 135.066 382.524C135.456 382.293 135.765 381.984 135.996 381.594C136.083 381.389 136.17 381.181 136.257 380.975C136.38 380.516 136.38 380.056 136.257 379.599Z" fill="white"/>
      </g>
  </g>
</svg>
`;function z4(){const t=document.querySelector(".winner-robot");t.innerHTML=G4}const Y4="/Testing_game/assets/winner-BYAZKHhM.mp3",Q4="/Testing_game/assets/loser-DK8OlVhh.mp3";function j4(){const t=document.querySelector(".winner-msg"),e=document.querySelector(".winner-robot"),n=document.querySelector(".winner-section ");r1(e,t,n),x4(),k4(),z4(),s1(),J4()}function Z4(){const t=document.querySelector(".loser-msg"),e=document.querySelector(".loser-robot"),n=document.querySelector(".loser-section");r1(e,t,n),s1(),q4(),K4()}function s1(){document.querySelector(".end-game-section").classList.remove("is-hidden")}function r1(...t){for(const e of t)e.classList.remove("is-hidden")}function J4(){const{startSound:t}=bt({src:Y4,loudness:.5,infinite:!1});t()}function K4(){const{startSound:t}=bt({src:Q4,loudness:.5,infinite:!1});t()}const X4=15e3,U=document.getElementById("main-btn");let Z,ka=!1,Da=!1;const Pa=[];let jt=!1,Zt,Q,qn=null,Gn=null,zn=null,Yn=null,Jt=null,nt=null,_s=!1,vs=null,As=null;const{startSound:$4}=bt({src:b4,loudness:.4,infinite:!0}),e5=()=>window.dispatchEvent(new Event("coin:start")),t5=()=>window.dispatchEvent(new Event("coin:end")),Kt=(t,e)=>gn(t,e).catch(()=>{}),La=(t,e,n)=>O3(t,e,n).catch(()=>{});function Ai(t){const e=t==="left"?"p1":"p2",n=document.querySelector(`[data-qa="${e}-hand"]`);if(!n)return;const i=!!n.querySelector('.cell-btn:not([data-ship="mother"]) .ship, .cell-btn[data-ship="simple"], .cell-btn:not([data-ship="mother"])[data-has-ship="1"], .cell-btn:not([data-ship="mother"])[data-occupied="1"]')||Array.from(n.querySelectorAll(".cell-btn")).some(r=>r.getAttribute("data-ship")!=="mother"&&r.innerHTML.trim().length>0),s=n.querySelector('.cell-btn[data-ship="mother"]');s&&(s.toggleAttribute("disabled",i),s.setAttribute("aria-disabled",i?"true":"false"),s.setAttribute("data-locked",i?"1":"0"))}function xa(t){const e=t==="left"?"p1":"p2",n=document.querySelector(`[data-qa="${e}-hand"]`);if(!n)return()=>{};const i=new MutationObserver(()=>Ai(t));return i.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-ship","data-has-ship","data-occupied","class"]}),Ai(t),()=>i.disconnect()}function Oa(t,e){if(!e)return;const n=t.currentStepsStrike?.[e],i=Array.isArray(n)?n.length>0:n?Object.keys(n).length>0:!1;U.getAttribute("data-type")==="end-turn"&&(U.disabled=i,U.classList.toggle("disabled",i),U.style.cursor=i?"not-allowed":"pointer")}function n5(){return Q??"left"}function i5(t){const e=t.id;Fe({duration:If,text:Te("helper.welcome"),type:ue.HELPER_HINT,priority:-2,dedupeKey:"welcome",delayBeforeShow:0}),qn?.(),qn=null,Gn?.(),Gn=null,zn?.(),zn=null,Yn?.(),Yn=null,Jt&&(U.removeEventListener("click",Jt),Jt=null),n0(),Mt.mountBefore(U),V0(),s4(),$4();const n=e1(String(e));typeof n=="function"&&(qn=n,window.addEventListener("beforeunload",()=>{qn?.()},{once:!0})),vs?.(),As?.(),vs=xa("left"),As=xa("right"),Gn=v4(e),zn=A4(e),Yn=E4(e),window.addEventListener("beforeunload",()=>{Gn?.(),zn?.(),Yn?.(),nt?.destroy(),nt=null,vs?.(),As?.()},{once:!0}),nt||(nt=I4({mainBtn:U,thresholdSec:20,getIsMyTurn:()=>!Z||!Q?!1:Z.isTurn===Q,getIsStrikeEmpty:()=>{const i=Z?.isTurn;if(!Z||!i)return!1;const s=Z.currentStepsStrike?.[i];return s?Array.isArray(s)?s.length===0:Object.keys(s).length===0:!0}})),Hi(e,async i=>{if(!i)return;const s=Z,r=i;Z=i,s?.isTurn!==i.isTurn&&nt?.reset(),s?.timerState!==i.timerState&&(_s=!1),S4(i.actions||[]),g0(r.lastResetOffer),i.restartRoomId&&(Ic(i.restartRoomId),window.location.reload()),N0(s?.timerState,i.timerState,Q===i.isTurn,{onTick:w=>nt?.onTick(w),thresholdSeconds:45,onThreshold:()=>{_s||!Q||Q!==i.isTurn||!U||U.classList.contains("disabled")||i.isDiceRolling||U.getAttribute("data-type")!=="dice"||(_s=!0,U.click())}}),Zt||(Zt=q3(),fa(i,Zt));const o=i.players.findIndex(w=>w.id===Zt),a=o>=0,l=a?o===0?"left":"right":null,c=i.players.length===2,u=(s?.players?.length??0)<2&&c,d=o===0;if(a){Q=l;const w=Q,ae=w==="left"?"right":"left";document.body.dataset.mySide=w,document.body.setAttribute("data-my-side",w),document.body.setAttribute("data-opponent-side",ae)}if(i.suggestRestartSide&&i.timeWhenSuggestRestart&&Q){const w=new Date(i.timeWhenSuggestRestart).getTime(),ae=i.suggestRestartSide===Q,ie=document.querySelector(`[data-my-side="${Q}"] .game-menu`);if(ie){const et=ie.querySelector(".gm-timer"),Vt=!!et&&!et.classList.contains("is-hidden");ir(ie),Vt||Vc(ie,w,1e4,!ae)}}else document.querySelectorAll(".game-menu").forEach(ae=>ot(ae));document.body.classList.remove("side-left","side-right"),Q&&document.body.classList.add(`side-${Q}`),i.players.length>=1&&!ka&&(w0(i.players[0],Q),ka=!0),i.players.length>=2&&!Da&&(S0(i.players[1],Q),fa(i,Zt),Da=!0);const m=r.coin,C=s?.coin,A=s?.coinShown,v=r.coinShown;let x=i.isTurn;if(u&&d&&!r.coinInitialized){const w=m?.result??Xr();x=w,document.body.setAttribute("data-turn-side",w),a&&w===l?(U.classList.remove("disabled"),document.body.classList.remove("not-my-turn"),document.body.setAttribute("data-turn-active","1")):(U.classList.add("disabled"),document.body.classList.add("not-my-turn"),document.body.setAttribute("data-turn-active","0")),await Kt(e,{isTurn:w,coin:{result:w,shown:!0,at:new Date().toISOString()},coinShown:!0,timerState:new Date().toISOString(),coinInitialized:!0})}if((!u||u&&r.coinInitialized)&&document.body.setAttribute("data-turn-side",x||""),c&&((!C||!C?.shown)&&m?.shown&&m?.result||!A&&v&&i.isTurn)){const w=m?.result??x;e5(),o0(w,Q||"left",i),r0(w),setTimeout(()=>{t5(),w===Q?j4():Z4()},Kr)}i.phrases&&i.phrases.length!==(s?.phrases?.length??0)&&i.phrases.forEach(w=>{Pa.includes(w.id)||(Cf(w),Pa.push(w.id))}),i.isDiceRolling?document.body.classList.add("steps-hidden"):document.body.classList.remove("steps-hidden"),!jt&&i?.lastDiceResult&&i?.isDiceRolling?(jt=!0,h0(i.lastDiceResult),p0(i,Q||"left",i.lastDiceResult)):jt&&!i?.isDiceRolling&&(jt=!1);const Y=x?x==="left"?0:1:-1;if(a&&c&&Y!==-1&&o===Y?(U.classList.remove("disabled"),document.body.classList.remove("not-my-turn"),document.body.setAttribute("data-turn-active","1")):(U.classList.add("disabled"),document.body.classList.add("not-my-turn"),document.body.setAttribute("data-turn-active","0")),Ai("left"),Ai("right"),a){const w=i.currentStepsStrike?.[l||"left"],ae=Array.isArray(w)?w:w?Object.values(w):[],ie=c&&Y!==-1&&o===Y&&!i.isDiceRolling&&!!w&&(Array.isArray(w)?w.length>0:Object.keys(w).length>0);Mt.render(ae,ie)}else Mt.clear();Oa(i,l);const me=i.isTurn;if(me){const w=i.currentStepsStrike?.[me];(w?Array.isArray(w)?w.length===0:Object.keys(w).length===0:!0)&&nt?.notifyStrikeChanged()}}),Kt(e,{gameStarted:!0,isDiceRolling:!1,lastDiceResult:-1}),Jt=()=>{if(jt||U.classList.contains("disabled")||Z?.players.length!==2){Fe({duration:kc,text:Te("helper.notYourTurn"),type:ue.HELPER_WARNING,priority:-1,dedupeKey:"not-your-turn",delayBeforeShow:0});return}const i=U.getAttribute("data-type"),s=Z.isTurn?Z.isTurn==="left"?0:1:-1;if(i==="dice"){const r=Math.floor(Math.random()*6)+1;document.body.classList.add("steps-hidden"),Kt(e,{isDiceRolling:!0,lastDiceResult:r}),s!==-1&&La(e,Z.isTurn,{diceHistory:[...Z.players[s].diceHistory??[],r],diceStreak:[...Z.players[s].diceStreak??[],r===6?5:r]}),setTimeout(()=>{Kt(e,{isDiceRolling:!1}),r!==6?(U.innerText="Закінчити хід",U.setAttribute("data-type","end-turn"),Z&&Q&&Oa(Z,Q)):Z?.timerState&&gn(e,{timerState:k0(Z?.timerState,X4)})},zi)}else if(i==="end-turn"){La(e,Z.isTurn,{diceStreak:[]}),gn(e,{currentStepsStrike:{left:[],right:[]}}),Mt.clear();const r=Z?.isTurn==="left"?"right":"left";Kt(e,{isTurn:r,timerState:new Date().toISOString()}),U.innerText="",U.setAttribute("data-type","dice"),U.disabled=!1,U.classList.remove("disabled"),U.style.cursor="pointer",Ys(e,{type:Ge.HINT,endsAt:nr(ra),duration:ra,text:Te("helper.otherPlayerTurnEnded"),authorName:qe()})}},U.addEventListener("click",Jt)}const s5=1e3,o1=document.querySelector("#room-field"),a1=document.querySelector("#create-room-btn"),Yi=document.querySelector("#home"),Qi=document.querySelector("#form-section"),l1=document.querySelector("#table"),r5=document.querySelector("#game");function o5(){o1.classList.add("is-hidden"),a1.classList.add("is-hidden"),Yi.classList.add("is-hidden"),Qi.classList.remove("is-hidden"),l1.classList.remove("is-hidden"),document.body.style.backgroundImage=`url(${Pc})`}function a5(){l1.classList.add("is-hidden"),Yi.classList.add("is-hidden"),Qi.classList.remove("is-hidden"),o1.classList.remove("is-hidden"),a1.classList.remove("is-hidden"),document.body.style.backgroundImage=`url(${Pc})`}function ji(t){Yi.classList.add("is-hidden"),Qi.classList.add("is-hidden"),r5.classList.remove("is-hidden"),i5(t)}function Ba(){Yi.classList.remove("is-hidden"),Qi.classList.add("is-hidden"),document.body.style.backgroundImage=`url(${Bf})`}const{startSound:l5}=bt({src:Of,infinite:!1,loudness:.9});function dt(t){Nf(),l5(),setTimeout(()=>{t(),kf()},s5)}async function Fa(){const t=document.getElementById("room-name"),e=qi(),n=Xr(),i={id:Ze(),name:t.value||`Room-${Ze()}`,players:[],gameStarted:!1,isDiceRolling:!1,lastDiceResult:-1,timerState:new Date().toISOString(),isTurn:n,coinShown:!0,coin:{result:n,shown:!0,at:new Date().toISOString()}};return Wi(i.id),await wc(i,e),e1(String(i.id)),dt(()=>ji(i)),i}async function c5(){const t=document.getElementById("room-name"),e=qi(),n=Xr(),i={id:Ze(),name:t.value||`Room-${Ze()}`,players:[],gameStarted:!1,isDiceRolling:!1,lastDiceResult:-1,timerState:new Date().toISOString(),isTurn:n,coinShown:!0,coin:{result:n,shown:!0,at:new Date().toISOString()}};return Ic(i.id),await wc(i,e,!0),i}const u5=document.querySelector("#back-to-home"),d5=document.querySelector("#form");function h5(){const t=document.querySelector("#navigation-create-room-btn"),e=document.querySelector("#navigation-select-room-btn"),n=document.querySelector("#navigation-fast-game-btn");t.addEventListener("click",()=>{dt(a5)}),e.addEventListener("click",()=>{dt(o5)}),d5.addEventListener("submit",i=>{i.preventDefault(),Fa()}),u5.addEventListener("click",()=>{dt(Ba)}),n.addEventListener("click",async()=>{if(!n.disabled){n.disabled=!0;try{const i=qi(),r=(await x3()).filter(o=>(Array.isArray(o.players)?o.players:[]).length<2);if(r.length){const o=r.reduce((a,l)=>!l.date||!Array.isArray(l.players)?a:new Date(l.date)<new Date(a.date)?l:a);if(o.players&&o.players[0])for(;o.players[0].color===i.color;)i.color=Dc();await Qr(i,o.id),Wi(o.id),dt(()=>ji(o))}else Fa()}catch(i){alert("Failed fast game: "+i)}}}),Ba()}function f5(t){const e=new Date,n=new Date(t),i=Math.floor((e.getTime()-n.getTime())/1e3),s=Math.floor(i/60),r=Math.floor(s/60),o=Math.floor(r/24);return i<60?`${i} секунд${i===1?"":"s"} тому`:s<60?`${s} хвилин${s===1?"":"s"} тому`:r<24?`${r} годин${r===1?"":"s"} тому`:`${o} днів${o===1?"":"s"} тому`}const Qn=document.getElementById("table");function p5(){L3(m5)}function m5(t){Qn.innerHTML="";let e="";if(!t.length){Qn.innerHTML=`
      <h2 class="rooms-not-found" data-lng="noRooms"></h2>
    `,Cn();return}t.forEach(i=>{const s=Array.isArray(i.players)?i.players:[],r=s.find(a=>a.id===i.authorId),o=Ot.find(a=>a.id===r?.avatar)||Ot[0];e+=`
    <tr class="select-room-button" style="--author-color: ${r?.color||"#ccc"}" data-room-id="${i.id}">
      <td><img src="${o.img}" alt="${r?.name||"Unknown"}'s avatar"></td>
      <td>${i.name||"Unknown"}</td>
      <td>${r?.name||"Unknown"}</td>
      <td>${f5(String(i.date))}</td>
      <td>${s.length}/2</td>
    </tr>
  `}),Qn.innerHTML=`
    <table class="rooms-table">
      <thead>
        <tr>
          <th></th>
          <th data-lng="name"></th>
          <th data-lng="author"></th>
          <th data-lng="date"></th>
          <th data-lng="playersCount"></th>
        </tr>
      </thead>
      <tbody id="rooms-table-body">
        ${e}
      </tbody>
    </table>
  `,Qn.querySelectorAll(".select-room-button").forEach(i=>{i.addEventListener("click",async()=>{const s=Number(i.getAttribute("data-room-id"));if(Wi(s),s){const r=qi();try{await Qr(r,s);const o=await Sc(s);o?dt(()=>ji(o)):alert("Room not found.")}catch(o){alert(`Error during joining room: ${o}`);return}}})}),Cn()}const g5=document.getElementById("avatar-menu");let Es;function C5(){y5()}function y5(){const t=Be();Ot.forEach(e=>{const n=document.createElement("div");n.classList.add("avatar-item"),n.setAttribute("data-id",String(e.id));const i=document.createElement("img");i.src=e.img,t&&t.avatar&&t.avatar==e.id&&n.classList.add("is-selected"),n.appendChild(i),n.addEventListener("click",()=>{_5(n)}),g5.append(n)})}function _5(t){Es||(Es=[...document.querySelectorAll(".avatar-item")]),Es.forEach(n=>{n.classList.remove("is-selected")});const e=Be();Ui({...e,avatar:t.getAttribute("data-id")}),t.classList.add("is-selected")}const v5="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM6SURBVHgB7ZlLaxNRFMfPnUda06LVtj4QLIhFtBVRbGsRVMRlCoJfoO3CduHXcaEuIqLgyo2ubdz0aRCEbkyioqBoU6tgJs5MZq7nTjJJKHk4d+6dbuYHWSSZJP9z/uecO/cGICYmJmYvIRA9Gj4qh05eSavavllK3UJx/+8zkM06+DqtPf6bqAPwxB8Zn1l2TGOaug6KpiTRN2h9M94NQD5fwfedIF+oQHR44g+Pp1B8aZrSiovpU4EQxSr97BlKjL6FgOIZUQVQF++yzFPHRfObfptSFZTjwEEUAVTFj7UVb2s9/Ypl7CwAB7ID8MQfHZ9Zca3W4tVEn+6Y5Ts7n5af1a4PhMwAag2bWq6YpcvtxLu2uVgsvHqIL+jsegiIrClUFT+WWnUsY6qteLO8UCwsPYCqeBs4kOGAPypXOor3Mh9OvP9jImmI71Q2Fcx8Lrx4hgriqDdsR/GmsVjMZ4SIZ4gKoJr5s6xsumReoHiGiB5oZN7uMm3eLwkVzwg7hRqZt7tkXoJ4RpgSamS+U9nYWPO5jBTxDF4HaplPYeaNbuLvgyTxDB4HvBWTrbBOu9sDHcVb4hu2FTzrgD10+uZTxyq3EA+OqvXq6Mrd7YJ88QyuKaTqvbeqmxGy6/NEpUAfb+cz9/DJPpAs3tMCHPQPjJynQM4BuMyBpj4iDlG0C8kDI1+NnY9rUHXYBYnwNLFXFjg613F0TrRrYGqX5rdyr9MguYxCTaHhsZl1anUKwpjbymUe+deDBHhXYiZG29p8MYk78jeEqPg9tKlUiI5rg030ZHp49Nqcfz1IQMhKvJdOhL0XanIimW3rhIZOnLo6DxKcELUj853YQCcuRemEqB2Z78SE2rUnbgjtCdF74qBOhB6xovfEAZzwphMTH8oJqacSUTgh83A3ksaWebAVoJyuzwJnY0dxvO4fcq3h/mGytRP9uvV3+/avD6vPISBRHO56mf2++XJKTSQ3Wjph/nESvYNp4CCq43U/iEkMYn1XEHhnDgp13c/AQZR/cNSd8G4AFQyCsj80KPQkD5ZP9P24CBz7kygDYNQbGyv/iaISFQMpHNO/DGSzWeaI1M1PTExMjHj+AcfQWAyPO7ekAAAAAElFTkSuQmCC",A5="data:image/png;base64,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",E5="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABLCAYAAADakmGTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANDSURBVHgB7dpNTxNBGAfw/2xb0QpFLYhwIiH4RqImeNRYD+hVE4lHuHjzwEHjlegn4GY8aeKNb2A0Vq/GhJh4UGokmmgiSFWwiO3u4zOFxUKXtrx1n4bnd6DtdLps/jszO7O7gFJKKaWUUkoppZRSSimllFJKKaWUUkoppdRGmaDC/v7+2Fd0xez7+M+Cm2uNRta+Bn23lfr+/y793InOfEvLe0qn0wUIURZYsid1k0uv8VftAHm2DleKE5DjdwYexfk1ByKX6zkgNMPQL8CJBNSf5/odXG+ey/avbIM8t6R+C29jeU/Mb95u3K8PMnPkIENebGT2w5PPEGBVYIdOXuzDX3rBhUmIYTwC3ZvNpO4Cox5C5pR+INeJFI+sKOQ4BmclhGWtCiz77tkbDuwxhCHCAgYHIxDAWVswk0nf4I76CILwqFfA+LgLAZygwu+T6WFZoZmE2BbmkxQaD/oLEMKp9KWU0HhcbYIQTrUKEkLjadofCFE1MCvs0LiF7RM96AcJNTQPc+IH/SBNBre4e3xEnfHyKNZwLcwqUCHBC8G6L5sM8Tys0VpY27GBLpei94tzovprhRA1BWbDIjf/kN8OIAwGbsN0ydDDgvC1ZCkJYVni15KWlLCWCF9LygrLXpelbxCiLDBpYVncJQ+K7JISw1piFsV1SblhFZGoFiY8LDuvIDEtrOPUpcOiw0JxLRkV08LchcUhCA7LMp6ktSQZYbfVyhVbmBAbuloRFr6AuLchL++ExsN8Q15ADI3dy93cwvgi5Ev+86rmHxDX3q0tzDPmTnPBXD6yp/1crfcIyD7VI0SU12lTRKgLMridTfSOZV8/yC8XDSd7UzaRoUq/M4baJXXJCdSBDWs2cXQM/8MqquVuFB9QOWvJ6cn0BO/wFHbQemH5qoVmjCNrWsF3ZXbsfmO1sHyVQ+Opq6RBfyaTHqUd6Jq1huVbLzQC5SDEylnSi+Iqv/zANtloWL6g0BwyOYz31enUVNmqZ1wPHE91R1w850PajS3YbFilkj0Xxnjsus5b++I2Ra9k3z79BAHKnqJeDm202ql+PdsRlq/txPnOmY7INCQ/du4rBpfHCM/TTnNfOGOLUMV2hiXVP0oBlmWGUGFSAAAAAElFTkSuQmCC";function b5(){const t=[...document.querySelectorAll(".cell--arrow")],e=[...document.querySelectorAll(".cell--double-arrow")],n=document.querySelector(".cell--start");if(t.forEach(i=>{const s=document.createElement("img");s.src=v5,s.alt="Arrow",i.appendChild(s)}),e.forEach(i=>{const s=document.createElement("img");s.src=A5,s.alt="Double arrow",i.appendChild(s)}),n){const i=document.createElement("img");i.src=E5,i.alt="Start arrow",n.appendChild(i)}}const w5="/Testing_game/assets/astronaut-BZusMVgG.png",S5="/Testing_game/assets/planet1-DCkJW2Zp.png",I5="/Testing_game/assets/comet-Ba75elL3.png",T5="/Testing_game/assets/rocket-BO2zcYnT.png",R5="data:image/png;base64,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",M5="/Testing_game/assets/dice-CbYfOLls.png",N5="data:image/png;base64,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",k5="data:image/png;base64,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",D5="data:image/png;base64,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",P5="data:image/png;base64,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",L5="/Testing_game/assets/bg_main-bdAfiV8x.jpg",Ha=document.querySelector(".astronaut"),Wa=document.querySelector(".planet-1"),Ua=document.querySelector(".comet"),Va=document.querySelector(".rocket"),qa=document.querySelector(".star"),Ga=document.querySelector("#reset-btn"),za=document.querySelector("#game");function x5(){if(za&&(za.style.backgroundImage=`url(${L5})`),Ga){const e=document.createElement("img");e.src=qc,Ga.append(e)}Ha&&(Ha.style.backgroundImage=`url(${w5})`),Wa&&(Wa.style.backgroundImage=`url(${S5})`),Ua&&(Ua.style.backgroundImage=`url(${I5})`),Va&&(Va.style.backgroundImage=`url(${T5})`),qa&&(qa.style.backgroundImage=`url(${R5})`);const t=document.createElement("style");t.textContent=`
    #main-btn[data-type="dice"]::after {
      background-image: url(${M5});
    }

    #mute-btn[data-is-muted="true"]::after {
      background-image: url(${N5});
    }

    #mute-btn[data-is-muted="false"]::after {
      background-image: url(${k5});
    }

    #helper-btn::after {
      background-image: url(${D5});
    }

    #helper-btn.is-off::after {
      background-image: url(${P5});
    }
  `,document.head.appendChild(t)}const O5=document.querySelector("#color-palette");let bs;function B5(){const t=Be();Zs.forEach(e=>{const n=document.createElement("span");n.classList.add("color-item"),n.setAttribute("data-color",`${e}`),n.style.backgroundColor=`${e}`,O5.append(n),t&&t.color&&t.color===e&&n.classList.add("is-selected"),n.addEventListener("click",F5)})}function F5(t){bs||(bs=[...document.querySelectorAll(".color-item")]),bs.forEach(i=>{i.classList.remove("is-selected")});const e=t.target;e.classList.add("is-selected");const n=Be();Ui({...n,color:e.getAttribute("data-color")})}const H5="/Testing_game/assets/ship-BVXSRTHs.svg",W5="/Testing_game/assets/ship-main-DwOV0C6-.svg",U5=[...document.querySelectorAll(".cell-btn")];async function V5(){const[t,e]=await Promise.all([fetch(H5).then(n=>n.text()),fetch(W5).then(n=>n.text())]);U5.forEach(n=>{n.classList.contains("cell-btn-main")?n.innerHTML=e:n.innerHTML=t})}const Ya=document.getElementById("player-name");function q5(){const t=Be();if(t){const e=t.name?.trim()??"";e&&(Ya.value=e)}Ya.addEventListener("input",e=>{const n=e.target,i=Be();Ui({...i,name:n.value?.trim()??""})})}function jn(t){const e=document.querySelector(t);if(!e)throw new Error(`Missing element: ${t}`);return e}function G5(){const e=(document.getElementById("player-name")?.value??"").trim();return e.length>=3?e.slice(0,14):qe()}function z5(){const t=Be();return t&&t?.color?t.color:"#ffffff"}function ws(t){return t<10?`0${t}`:String(t)}function Y5(t){const e=t?new Date(t):new Date;return`${ws(e.getHours())}:${ws(e.getMinutes())}:${ws(e.getSeconds())}`}function Q5(t,e,n,i){const s=document.createElement("li");s.className="gchat-log__item";const r=document.createElement("span");r.className="gchat-log__name",r.textContent=`[${Y5(t)}] ${e}:`,r.style.color=i;const o=document.createElement("span");return o.className="gchat-log__msg",o.textContent=` ${n}`,s.appendChild(r),s.appendChild(o),s}function j5(){const t=jn("#gchat-message"),e=jn("#gchat-send"),n=jn("#gchat-log-list"),i=jn("#gchat-log"),s=()=>{const r=t.value.trim();e.disabled=r.length===0};Z3(r=>{const o=document.createDocumentFragment();for(let a=r.length-1;a>=0;a--){const l=r[a],c=Q5(l.ts??null,l.name,l.text,l.color);a===r.length-1?c.style.animation="slideIn 500ms ease forwards":c.style.animation="none",o.appendChild(c)}n.innerHTML="",n.appendChild(o)}),t.addEventListener("input",s),t.addEventListener("keydown",r=>{r.key==="Enter"&&!e.disabled&&e.click()}),e.addEventListener("click",async()=>{const r=t.value.trim().slice(0,200);if(r){e.disabled=!0;try{await Q3(G5(),r,z5()),t.value="",t.focus(),i.scrollTo({top:0,behavior:"smooth"})}finally{s()}}}),s()}window.addEventListener("load",()=>{_0(),Cn(),$r(),h5(),C5(),p5(),Mf(),T0(),f0(),B5(),q5(),b5(),V5(),x5(),G3(),j5()})});export default Z5();
