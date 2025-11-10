(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function be(){return Math.floor(Math.random()*1e6)}const sc=()=>{};var gr={};/**
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
 */const zo={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const p=function(t,e){if(!t)throw ut(e)},ut=function(t){return new Error("Firebase Database ("+zo.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const Qo=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},ic=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],a=t[n++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},vi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,a=o?t[i+1]:0,l=i+2<t.length,c=l?t[i+2]:0,h=r>>2,u=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(d=64)),s.push(n[h],n[u],n[d],n[f])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Qo(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ic(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const u=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new rc;const d=r<<2|a>>4;if(s.push(d),c!==64){const f=a<<4&240|c>>2;if(s.push(f),u!==64){const m=c<<6&192|u;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class rc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const jo=function(t){const e=Qo(t);return vi.encodeByteArray(e,!0)},vn=function(t){return jo(t).replace(/\./g,"")},Hs=function(t){try{return vi.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function oc(t){return Ko(void 0,t)}function Ko(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!ac(n)||(t[n]=Ko(t[n],e[n]));return t}function ac(t){return t!=="__proto__"}/**
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
 */function lc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const cc=()=>lc().__FIREBASE_DEFAULTS__,uc=()=>{if(typeof process>"u"||typeof gr>"u")return;const t=gr.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},dc=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Hs(t[1]);return e&&JSON.parse(e)},Jo=()=>{try{return sc()||cc()||uc()||dc()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},hc=t=>Jo()?.emulatorHosts?.[t],fc=t=>{const e=hc(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Xo=()=>Jo()?.config;/**
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
 */class dt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function Ei(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function pc(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function mc(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[vn(JSON.stringify(n)),vn(JSON.stringify(o)),""].join(".")}const bt={};function gc(){const t={prod:[],emulator:[]};for(const e of Object.keys(bt))bt[e]?t.emulator.push(e):t.prod.push(e);return t}function _c(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let _r=!1;function yc(t,e){if(typeof window>"u"||typeof document>"u"||!Ei(window.location.host)||bt[t]===e||bt[t]||_r)return;bt[t]=e;function n(d){return`__firebase__banner__${d}`}const s="__firebase__banner",r=gc().prod.length>0;function o(){const d=document.getElementById(s);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,f){d.setAttribute("width","24"),d.setAttribute("id",f),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{_r=!0,o()},d}function h(d,f){d.setAttribute("id",f),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function u(){const d=_c(s),f=n("text"),m=document.getElementById(f)||document.createElement("span"),_=n("learnmore"),S=document.getElementById(_)||document.createElement("a"),R=n("preprendIcon"),U=document.getElementById(R)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const O=d.element;a(O),h(S,_);const oe=c();l(U,R),O.append(U,m,S,oe),document.body.appendChild(O)}r?(m.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,m.innerText="Preview backend running in this workspace."),m.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
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
 */function Cc(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zo(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Cc())}function vc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ec(){return zo.NODE_ADMIN===!0}function Ac(){try{return typeof indexedDB=="object"}catch{return!1}}function Sc(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}/**
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
 */const bc="FirebaseError";class zt extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=bc,Object.setPrototypeOf(this,zt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$o.prototype.create)}}class $o{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?wc(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new zt(i,a,s)}}function wc(t,e){return t.replace(Ic,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Ic=/\{\$([^}]+)}/g;/**
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
 */function Dt(t){return JSON.parse(t)}function P(t){return JSON.stringify(t)}/**
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
 */const ea=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=Dt(Hs(r[0])||""),n=Dt(Hs(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},Tc=function(t){const e=ea(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Rc=function(t){const e=ea(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function ne(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function We(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function yr(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function En(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function An(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(Cr(r)&&Cr(o)){if(!An(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function Cr(t){return t!==null&&typeof t=="object"}/**
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
 */function Nc(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class kc{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let u=0;u<16;u++)s[u]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let u=16;u<80;u++){const d=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),h=1518500249):(c=r^o^a,h=1859775393):u<60?(c=r&o|a&(r|o),h=2400959708):(c=r^o^a,h=3395469782);const d=(i<<5|i>>>27)+c+l+h+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Wn(t,e){return`${t} failed: ${e} argument `}/**
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
 */const Dc=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,p(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Un=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function Ye(t){return t&&t._delegate?t._delegate:t}class Pt{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ke="[DEFAULT]";/**
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
 */class Pc{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new dt;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Lc(e))try{this.getOrInitializeService({instanceIdentifier:ke})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=ke){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ke){return this.instances.has(e)}getOptions(e=ke){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Mc(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=ke){return this.component?this.component.multipleInstances?e:ke:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Mc(t){return t===ke?void 0:t}function Lc(t){return t.instantiationMode==="EAGER"}/**
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
 */class xc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Pc(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var I;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(I||(I={}));const Oc={debug:I.DEBUG,verbose:I.VERBOSE,info:I.INFO,warn:I.WARN,error:I.ERROR,silent:I.SILENT},Bc=I.INFO,Fc={[I.DEBUG]:"log",[I.VERBOSE]:"log",[I.INFO]:"info",[I.WARN]:"warn",[I.ERROR]:"error"},Hc=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=Fc[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ta{constructor(e){this.name=e,this._logLevel=Bc,this._logHandler=Hc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in I))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Oc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,I.DEBUG,...e),this._logHandler(this,I.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,I.VERBOSE,...e),this._logHandler(this,I.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,I.INFO,...e),this._logHandler(this,I.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,I.WARN,...e),this._logHandler(this,I.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,I.ERROR,...e),this._logHandler(this,I.ERROR,...e)}}const Wc=(t,e)=>e.some(n=>t instanceof n);let vr,Er;function Uc(){return vr||(vr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function qc(){return Er||(Er=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const na=new WeakMap,Ws=new WeakMap,sa=new WeakMap,ps=new WeakMap,Ai=new WeakMap;function Vc(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Ce(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&na.set(n,t)}).catch(()=>{}),Ai.set(e,t),e}function Gc(t){if(Ws.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Ws.set(t,e)}let Us={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ws.get(t);if(e==="objectStoreNames")return t.objectStoreNames||sa.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ce(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Yc(t){Us=t(Us)}function zc(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(ms(this),e,...n);return sa.set(s,e.sort?e.sort():[e]),Ce(s)}:qc().includes(t)?function(...e){return t.apply(ms(this),e),Ce(na.get(this))}:function(...e){return Ce(t.apply(ms(this),e))}}function Qc(t){return typeof t=="function"?zc(t):(t instanceof IDBTransaction&&Gc(t),Wc(t,Uc())?new Proxy(t,Us):t)}function Ce(t){if(t instanceof IDBRequest)return Vc(t);if(ps.has(t))return ps.get(t);const e=Qc(t);return e!==t&&(ps.set(t,e),Ai.set(e,t)),e}const ms=t=>Ai.get(t);function jc(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),a=Ce(o);return s&&o.addEventListener("upgradeneeded",l=>{s(Ce(o.result),l.oldVersion,l.newVersion,Ce(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Kc=["get","getKey","getAll","getAllKeys","count"],Jc=["put","add","delete","clear"],gs=new Map;function Ar(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(gs.get(e))return gs.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=Jc.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Kc.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),i&&l.done]))[0]};return gs.set(e,r),r}Yc(t=>({...t,get:(e,n,s)=>Ar(e,n)||t.get(e,n,s),has:(e,n)=>!!Ar(e,n)||t.has(e,n)}));/**
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
 */class Xc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Zc(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Zc(t){return t.getComponent()?.type==="VERSION"}const qs="@firebase/app",Sr="0.14.4";/**
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
 */const de=new ta("@firebase/app"),$c="@firebase/app-compat",eu="@firebase/analytics-compat",tu="@firebase/analytics",nu="@firebase/app-check-compat",su="@firebase/app-check",iu="@firebase/auth",ru="@firebase/auth-compat",ou="@firebase/database",au="@firebase/data-connect",lu="@firebase/database-compat",cu="@firebase/functions",uu="@firebase/functions-compat",du="@firebase/installations",hu="@firebase/installations-compat",fu="@firebase/messaging",pu="@firebase/messaging-compat",mu="@firebase/performance",gu="@firebase/performance-compat",_u="@firebase/remote-config",yu="@firebase/remote-config-compat",Cu="@firebase/storage",vu="@firebase/storage-compat",Eu="@firebase/firestore",Au="@firebase/ai",Su="@firebase/firestore-compat",bu="firebase",wu="12.4.0";/**
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
 */const Vs="[DEFAULT]",Iu={[qs]:"fire-core",[$c]:"fire-core-compat",[tu]:"fire-analytics",[eu]:"fire-analytics-compat",[su]:"fire-app-check",[nu]:"fire-app-check-compat",[iu]:"fire-auth",[ru]:"fire-auth-compat",[ou]:"fire-rtdb",[au]:"fire-data-connect",[lu]:"fire-rtdb-compat",[cu]:"fire-fn",[uu]:"fire-fn-compat",[du]:"fire-iid",[hu]:"fire-iid-compat",[fu]:"fire-fcm",[pu]:"fire-fcm-compat",[mu]:"fire-perf",[gu]:"fire-perf-compat",[_u]:"fire-rc",[yu]:"fire-rc-compat",[Cu]:"fire-gcs",[vu]:"fire-gcs-compat",[Eu]:"fire-fst",[Su]:"fire-fst-compat",[Au]:"fire-vertex","fire-js":"fire-js",[bu]:"fire-js-all"};/**
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
 */const Sn=new Map,Tu=new Map,Gs=new Map;function br(t,e){try{t.container.addComponent(e)}catch(n){de.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function bn(t){const e=t.name;if(Gs.has(e))return de.debug(`There were multiple attempts to register component ${e}.`),!1;Gs.set(e,t);for(const n of Sn.values())br(n,t);for(const n of Tu.values())br(n,t);return!0}function Ru(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Nu(t){return t==null?!1:t.settings!==void 0}/**
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
 */const ku={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ve=new $o("app","Firebase",ku);/**
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
 */class Du{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ve.create("app-deleted",{appName:this._name})}}/**
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
 */const Pu=wu;function ia(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Vs,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw ve.create("bad-app-name",{appName:String(i)});if(n||(n=Xo()),!n)throw ve.create("no-options");const r=Sn.get(i);if(r){if(An(n,r.options)&&An(s,r.config))return r;throw ve.create("duplicate-app",{appName:i})}const o=new xc(i);for(const l of Gs.values())o.addComponent(l);const a=new Du(n,s,o);return Sn.set(i,a),a}function Mu(t=Vs){const e=Sn.get(t);if(!e&&t===Vs&&Xo())return ia();if(!e)throw ve.create("no-app",{appName:t});return e}function tt(t,e,n){let s=Iu[t]??t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),de.warn(o.join(" "));return}bn(new Pt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Lu="firebase-heartbeat-database",xu=1,Mt="firebase-heartbeat-store";let _s=null;function ra(){return _s||(_s=jc(Lu,xu,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Mt)}catch(n){console.warn(n)}}}}).catch(t=>{throw ve.create("idb-open",{originalErrorMessage:t.message})})),_s}async function Ou(t){try{const n=(await ra()).transaction(Mt),s=await n.objectStore(Mt).get(oa(t));return await n.done,s}catch(e){if(e instanceof zt)de.warn(e.message);else{const n=ve.create("idb-get",{originalErrorMessage:e?.message});de.warn(n.message)}}}async function wr(t,e){try{const s=(await ra()).transaction(Mt,"readwrite");await s.objectStore(Mt).put(e,oa(t)),await s.done}catch(n){if(n instanceof zt)de.warn(n.message);else{const s=ve.create("idb-set",{originalErrorMessage:n?.message});de.warn(s.message)}}}function oa(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Bu=1024,Fu=30;class Hu{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Uu(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ir();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>Fu){const i=qu(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){de.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ir(),{heartbeatsToSend:n,unsentEntries:s}=Wu(this._heartbeatsCache.heartbeats),i=vn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return de.warn(e),""}}}function Ir(){return new Date().toISOString().substring(0,10)}function Wu(t,e=Bu){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Tr(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Tr(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Uu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ac()?Sc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ou(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return wr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return wr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Tr(t){return vn(JSON.stringify({version:2,heartbeats:t})).length}function qu(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
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
 */function Vu(t){bn(new Pt("platform-logger",e=>new Xc(e),"PRIVATE")),bn(new Pt("heartbeat",e=>new Hu(e),"PRIVATE")),tt(qs,Sr,t),tt(qs,Sr,"esm2020"),tt("fire-js","")}Vu("");var Gu="firebase",Yu="12.4.0";/**
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
 */tt(Gu,Yu,"app");var Rr={};const Nr="@firebase/database",kr="1.1.0";/**
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
 */let aa="";function zu(t){aa=t}/**
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
 */class Qu{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),P(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Dt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class ju{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return ne(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const la=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Qu(e)}}catch{}return new ju},xe=la("localStorage"),Ku=la("sessionStorage");/**
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
 */const nt=new ta("@firebase/database"),ca=(function(){let t=1;return function(){return t++}})(),ua=function(t){const e=Dc(t),n=new kc;n.update(e);const s=n.digest();return vi.encodeByteArray(s)},Qt=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Qt.apply(null,s):typeof s=="object"?e+=P(s):e+=s,e+=" "}return e};let wt=null,Dr=!0;const Ju=function(t,e){p(!0,"Can't turn on custom loggers persistently."),nt.logLevel=I.VERBOSE,wt=nt.log.bind(nt)},H=function(...t){if(Dr===!0&&(Dr=!1,wt===null&&Ku.get("logging_enabled")===!0&&Ju()),wt){const e=Qt.apply(null,t);wt(e)}},jt=function(t){return function(...e){H(t,...e)}},Ys=function(...t){const e="FIREBASE INTERNAL ERROR: "+Qt(...t);nt.error(e)},he=function(...t){const e=`FIREBASE FATAL ERROR: ${Qt(...t)}`;throw nt.error(e),new Error(e)},V=function(...t){const e="FIREBASE WARNING: "+Qt(...t);nt.warn(e)},Xu=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&V("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Si=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Zu=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},it="[MIN_NAME]",Ue="[MAX_NAME]",ze=function(t,e){if(t===e)return 0;if(t===it||e===Ue)return-1;if(e===it||t===Ue)return 1;{const n=Pr(t),s=Pr(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},$u=function(t,e){return t===e?0:t<e?-1:1},gt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+P(e))},bi=function(t){if(typeof t!="object"||t===null)return P(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=P(e[s]),n+=":",n+=bi(t[e[s]]);return n+="}",n},da=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function W(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const ha=function(t){p(!Si(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,a,l;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const h=c.join("");let u="";for(l=0;l<64;l+=8){let d=parseInt(h.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),u=u+d}return u.toLowerCase()},ed=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},td=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function nd(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const sd=new RegExp("^-?(0*)\\d{1,10}$"),id=-2147483648,rd=2147483647,Pr=function(t){if(sd.test(t)){const e=Number(t);if(e>=id&&e<=rd)return e}return null},ht=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw V("Exception was thrown by user callback.",n),e},Math.floor(0))}},od=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},It=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class ad{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Nu(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){V(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class ld{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(H("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',V(e)}}class yn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}yn.OWNER="owner";/**
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
 */const wi="5",fa="v",pa="s",ma="r",ga="f",_a=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ya="ls",Ca="p",zs="ac",va="websocket",Ea="long_polling";/**
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
 */class Aa{constructor(e,n,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=xe.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&xe.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function cd(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Sa(t,e,n){p(typeof e=="string","typeof type must == string"),p(typeof n=="object","typeof params must == object");let s;if(e===va)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Ea)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);cd(t)&&(n.ns=t.namespace);const i=[];return W(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class ud{constructor(){this.counters_={}}incrementCounter(e,n=1){ne(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return oc(this.counters_)}}/**
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
 */const ys={},Cs={};function Ii(t){const e=t.toString();return ys[e]||(ys[e]=new ud),ys[e]}function dd(t,e){const n=t.toString();return Cs[n]||(Cs[n]=e()),Cs[n]}/**
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
 */class hd{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&ht(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Mr="start",fd="close",pd="pLPCommand",md="pRTLPCB",ba="id",wa="pw",Ia="ser",gd="cb",_d="seg",yd="ts",Cd="d",vd="dframe",Ta=1870,Ra=30,Ed=Ta-Ra,Ad=25e3,Sd=3e4;class Ze{constructor(e,n,s,i,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=jt(e),this.stats_=Ii(n),this.urlFn=l=>(this.appCheckToken&&(l[zs]=this.appCheckToken),Sa(n,Ea,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new hd(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Sd)),Zu(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ti((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Mr)this.id=a,this.password=l;else if(o===fd)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Mr]="t",s[Ia]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[gd]=this.scriptTagHolder.uniqueCallbackIdentifier),s[fa]=wi,this.transportSessionId&&(s[pa]=this.transportSessionId),this.lastSessionId&&(s[ya]=this.lastSessionId),this.applicationId&&(s[Ca]=this.applicationId),this.appCheckToken&&(s[zs]=this.appCheckToken),typeof location<"u"&&location.hostname&&_a.test(location.hostname)&&(s[ma]=ga);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ze.forceAllow_=!0}static forceDisallow(){Ze.forceDisallow_=!0}static isAvailable(){return Ze.forceAllow_?!0:!Ze.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!ed()&&!td()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=P(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=jo(n),i=da(s,Ed);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[vd]="t",s[ba]=e,s[wa]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=P(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Ti{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ca(),window[pd+this.uniqueCallbackIdentifier]=e,window[md+this.uniqueCallbackIdentifier]=n,this.myIFrame=Ti.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){H("frame writing exception"),a.stack&&H(a.stack),H(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||H("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[ba]=this.myID,e[wa]=this.myPW,e[Ia]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ra+s.length<=Ta;){const o=this.pendingSegs.shift();s=s+"&"+_d+i+"="+o.seg+"&"+yd+i+"="+o.ts+"&"+Cd+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(Ad)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{H("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const bd=16384,wd=45e3;let wn=null;typeof MozWebSocket<"u"?wn=MozWebSocket:typeof WebSocket<"u"&&(wn=WebSocket);class ${constructor(e,n,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=jt(this.connId),this.stats_=Ii(n),this.connURL=$.connectionURL_(n,o,a,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[fa]=wi,typeof location<"u"&&location.hostname&&_a.test(location.hostname)&&(o[ma]=ga),n&&(o[pa]=n),s&&(o[ya]=s),i&&(o[zs]=i),r&&(o[Ca]=r),Sa(e,va,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,xe.set("previous_websocket_failure",!0);try{let s;Ec(),this.mySock=new wn(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){$.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&wn!==null&&!$.forceDisallow_}static previouslyFailed(){return xe.isInMemoryStorage||xe.get("previous_websocket_failure")===!0}markConnectionHealthy(){xe.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Dt(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=P(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=da(n,bd);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(wd))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}$.responsesRequiredToBeHealthy=2;$.healthyTimeout=3e4;/**
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
 */class Lt{static get ALL_TRANSPORTS(){return[Ze,$]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=$&&$.isAvailable();let s=n&&!$.previouslyFailed();if(e.webSocketOnly&&(n||V("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[$];else{const i=this.transports_=[];for(const r of Lt.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Lt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Lt.globalTransportInitialized_=!1;/**
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
 */const Id=6e4,Td=5e3,Rd=10*1024,Nd=100*1024,vs="t",Lr="d",kd="s",xr="r",Dd="e",Or="o",Br="a",Fr="n",Hr="p",Pd="h";class Md{constructor(e,n,s,i,r,o,a,l,c,h){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=jt("c:"+this.id+":"),this.transportManager_=new Lt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=It(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Nd?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Rd?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(vs in e){const n=e[vs];n===Br?this.upgradeIfSecondaryHealthy_():n===xr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Or&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=gt("t",e),s=gt("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Hr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Br,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Fr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=gt("t",e),s=gt("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=gt(vs,e);if(Lr in e){const s=e[Lr];if(n===Pd){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Fr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===kd?this.onConnectionShutdown_(s):n===xr?this.onReset_(s):n===Dd?Ys("Server Error: "+s):n===Or?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ys("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),wi!==s&&V("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),It(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Id))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):It(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Td))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Hr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(xe.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class Na{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class ka{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class In extends ka{static getInstance(){return new In}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Zo()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Wr=32,Ur=768;class b{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function A(){return new b("")}function C(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function we(t){return t.pieces_.length-t.pieceNum_}function T(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new b(t.pieces_,e)}function Ri(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Ld(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function xt(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Da(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new b(e,0)}function k(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof b)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new b(n,0)}function E(t){return t.pieceNum_>=t.pieces_.length}function q(t,e){const n=C(t),s=C(e);if(n===null)return e;if(n===s)return q(T(t),T(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function xd(t,e){const n=xt(t,0),s=xt(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=ze(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function Ni(t,e){if(we(t)!==we(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function K(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(we(t)>we(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class Od{constructor(e,n){this.errorPrefix_=n,this.parts_=xt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Un(this.parts_[s]);Pa(this)}}function Bd(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Un(e),Pa(t)}function Fd(t){const e=t.parts_.pop();t.byteLength_-=Un(e),t.parts_.length>0&&(t.byteLength_-=1)}function Pa(t){if(t.byteLength_>Ur)throw new Error(t.errorPrefix_+"has a key path longer than "+Ur+" bytes ("+t.byteLength_+").");if(t.parts_.length>Wr)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Wr+") or object contains a cycle "+De(t))}function De(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class ki extends ka{static getInstance(){return new ki}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const _t=1e3,Hd=300*1e3,qr=30*1e3,Wd=1.3,Ud=3e4,qd="server_kill",Vr=3;class ce extends Na{constructor(e,n,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ce.nextPersistentConnectionId_++,this.log_=jt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=_t,this.maxReconnectDelay_=Hd,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ki.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&In.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(P(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new dt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ce.warnOnListenWarnings_(l,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&ne(e,"w")){const s=We(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();V(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Rc(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=qr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Tc(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+P(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Ys("Unrecognized action received from server: "+P(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=_t,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=_t,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ud&&(this.reconnectDelay_=_t),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Wd)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+ce.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,d]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?H("getToken() completed but was canceled"):(H("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=d&&d.token,a=new Md(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,f=>{V(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(qd)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&V(u),l())}}}interrupt(e){H("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){H("Resuming connection for reason: "+e),delete this.interruptReasons_[e],yr(this.interruptReasons_)&&(this.reconnectDelay_=_t,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>bi(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new b(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){H("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Vr&&(this.reconnectDelay_=qr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){H("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Vr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+aa.replace(/\./g,"-")]=1,Zo()?e["framework.cordova"]=1:vc()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=In.getInstance().currentlyOnline();return yr(this.interruptReasons_)&&e}}ce.nextPersistentConnectionId_=0;ce.nextConnectionId_=0;/**
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
 */class v{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new v(e,n)}}/**
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
 */class qn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new v(it,e),i=new v(it,n);return this.compare(s,i)!==0}minPost(){return v.MIN}}/**
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
 */let nn;class Ma extends qn{static get __EMPTY_NODE(){return nn}static set __EMPTY_NODE(e){nn=e}compare(e,n){return ze(e.name,n.name)}isDefinedOn(e){throw ut("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return v.MIN}maxPost(){return new v(Ue,nn)}makePost(e,n){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new v(e,nn)}toString(){return".key"}}const st=new Ma;/**
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
 */class sn{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class x{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??x.RED,this.left=i??Y.EMPTY_NODE,this.right=r??Y.EMPTY_NODE}copy(e,n,s,i,r){return new x(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Y.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Y.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,x.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,x.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}x.RED=!0;x.BLACK=!1;class Vd{copy(e,n,s,i,r){return this}insert(e,n,s){return new x(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Y{constructor(e,n=Y.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Y(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,x.BLACK,null,null))}remove(e){return new Y(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,x.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new sn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new sn(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new sn(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new sn(this.root_,null,this.comparator_,!0,e)}}Y.EMPTY_NODE=new Vd;/**
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
 */function Gd(t,e){return ze(t.name,e.name)}function Di(t,e){return ze(t,e)}/**
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
 */let Qs;function Yd(t){Qs=t}const La=function(t){return typeof t=="number"?"number:"+ha(t):"string:"+t},xa=function(t){if(t.isLeafNode()){const e=t.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ne(e,".sv"),"Priority must be a string or number.")}else p(t===Qs||t.isEmpty(),"priority of unexpected type.");p(t===Qs||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Gr;class L{static set __childrenNodeConstructor(e){Gr=e}static get __childrenNodeConstructor(){return Gr}constructor(e,n=L.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),xa(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new L(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return E(e)?this:C(e)===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:L.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=C(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(p(s!==".priority"||we(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,L.__childrenNodeConstructor.EMPTY_NODE.updateChild(T(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+La(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=ha(this.value_):e+=this.value_,this.lazyHash_=ua(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===L.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof L.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=L.VALUE_TYPE_ORDER.indexOf(n),r=L.VALUE_TYPE_ORDER.indexOf(s);return p(i>=0,"Unknown leaf type: "+n),p(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}L.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Oa,Ba;function zd(t){Oa=t}function Qd(t){Ba=t}class jd extends qn{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?ze(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return v.MIN}maxPost(){return new v(Ue,new L("[PRIORITY-POST]",Ba))}makePost(e,n){const s=Oa(e);return new v(n,new L("[PRIORITY-POST]",s))}toString(){return".priority"}}const N=new jd;/**
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
 */const Kd=Math.log(2);class Jd{constructor(e){const n=r=>parseInt(Math.log(r)/Kd,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Tn=function(t,e,n,s){t.sort(e);const i=function(l,c){const h=c-l;let u,d;if(h===0)return null;if(h===1)return u=t[l],d=n?n(u):u,new x(d,u.node,x.BLACK,null,null);{const f=parseInt(h/2,10)+l,m=i(l,f),_=i(f+1,c);return u=t[f],d=n?n(u):u,new x(d,u.node,x.BLACK,m,_)}},r=function(l){let c=null,h=null,u=t.length;const d=function(m,_){const S=u-m,R=u;u-=m;const U=i(S+1,R),O=t[S],oe=n?n(O):O;f(new x(oe,O.node,_,null,U))},f=function(m){c?(c.left=m,c=m):(h=m,c=m)};for(let m=0;m<l.count;++m){const _=l.nextBitIsOne(),S=Math.pow(2,l.count-(m+1));_?d(S,x.BLACK):(d(S,x.BLACK),d(S,x.RED))}return h},o=new Jd(t.length),a=r(o);return new Y(s||e,a)};/**
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
 */let Es;const Je={};class ae{static get Default(){return p(Je&&N,"ChildrenNode.ts has not been loaded"),Es=Es||new ae({".priority":Je},{".priority":N}),Es}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=We(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Y?n:null}hasIndex(e){return ne(this.indexSet_,e.toString())}addIndex(e,n){p(e!==st,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(v.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=Tn(s,e.getCompare()):a=Je;const l=e.toString(),c={...this.indexSet_};c[l]=e;const h={...this.indexes_};return h[l]=a,new ae(h,c)}addToIndexes(e,n){const s=En(this.indexes_,(i,r)=>{const o=We(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),i===Je)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(v.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Tn(a,o.getCompare())}else return Je;else{const a=n.get(e.name);let l=i;return a&&(l=l.remove(new v(e.name,a))),l.insert(e,e.node)}});return new ae(s,this.indexSet_)}removeFromIndexes(e,n){const s=En(this.indexes_,i=>{if(i===Je)return i;{const r=n.get(e.name);return r?i.remove(new v(e.name,r)):i}});return new ae(s,this.indexSet_)}}/**
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
 */let yt;class g{static get EMPTY_NODE(){return yt||(yt=new g(new Y(Di),null,ae.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&xa(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||yt}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?yt:n}}getChild(e){const n=C(e);return n===null?this:this.getImmediateChild(n).getChild(T(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(p(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new v(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?yt:this.priorityNode_;return new g(i,o,r)}}updateChild(e,n){const s=C(e);if(s===null)return n;{p(C(e)!==".priority"||we(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(T(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(N,(o,a)=>{n[o]=a.val(e),s++,r&&g.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+La(this.getPriority().val())+":"),this.forEachChild(N,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":ua(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new v(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new v(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new v(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,v.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,v.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Kt?-1:0}withIndex(e){if(e===st||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===st||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(N),i=n.getIterator(N);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===st?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Xd extends g{constructor(){super(new Y(Di),g.EMPTY_NODE,ae.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const Kt=new Xd;Object.defineProperties(v,{MIN:{value:new v(it,g.EMPTY_NODE)},MAX:{value:new v(Ue,Kt)}});Ma.__EMPTY_NODE=g.EMPTY_NODE;L.__childrenNodeConstructor=g;Yd(Kt);Qd(Kt);/**
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
 */const Zd=!0;function D(t,e=null){if(t===null)return g.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new L(n,D(e))}if(!(t instanceof Array)&&Zd){const n=[];let s=!1;if(W(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=D(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),n.push(new v(o,l)))}}),n.length===0)return g.EMPTY_NODE;const r=Tn(n,Gd,o=>o.name,Di);if(s){const o=Tn(n,N.getCompare());return new g(r,D(e),new ae({".priority":o},{".priority":N}))}else return new g(r,D(e),ae.Default)}else{let n=g.EMPTY_NODE;return W(t,(s,i)=>{if(ne(t,s)&&s.substring(0,1)!=="."){const r=D(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(D(e))}}zd(D);/**
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
 */class $d extends qn{constructor(e){super(),this.indexPath_=e,p(!E(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?ze(e.name,n.name):r}makePost(e,n){const s=D(e),i=g.EMPTY_NODE.updateChild(this.indexPath_,s);return new v(n,i)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,Kt);return new v(Ue,e)}toString(){return xt(this.indexPath_,0).join("/")}}/**
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
 */class eh extends qn{compare(e,n){const s=e.node.compareTo(n.node);return s===0?ze(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return v.MIN}maxPost(){return v.MAX}makePost(e,n){const s=D(e);return new v(n,s)}toString(){return".value"}}const th=new eh;/**
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
 */function Fa(t){return{type:"value",snapshotNode:t}}function rt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ot(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Bt(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function nh(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class Pi{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Ot(n,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(rt(n,s)):o.trackChildChange(Bt(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(N,(i,r)=>{n.hasChild(i)||s.trackChildChange(Ot(i,r))}),n.isLeafNode()||n.forEachChild(N,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Bt(i,r,o))}else s.trackChildChange(rt(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Ft{constructor(e){this.indexedFilter_=new Pi(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ft.getStartPost_(e),this.endPost_=Ft.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new v(n,s))||(s=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=g.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(g.EMPTY_NODE);const r=this;return n.forEachChild(N,(o,a)=>{r.matches(new v(o,a))||(i=i.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class sh{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Ft(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new v(n,s))||(s=g.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(d,f)=>u(f,d)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new v(n,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(n)){const u=a.getImmediateChild(n);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===n||a.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const f=d==null?1:o(d,l);if(h&&!s.isEmpty()&&f>=0)return r?.trackChildChange(Bt(n,s,u)),a.updateImmediateChild(n,s);{r?.trackChildChange(Ot(n,u));const _=a.updateImmediateChild(n,g.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r?.trackChildChange(rt(d.name,d.node)),_.updateImmediateChild(d.name,d.node)):_}}else return s.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Ot(c.name,c.node)),r.trackChildChange(rt(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(c.name,g.EMPTY_NODE)):e}}/**
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
 */class Mi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=N}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:it}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ue}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===N}copy(){const e=new Mi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function ih(t){return t.loadsAllData()?new Pi(t.getIndex()):t.hasLimit()?new sh(t):new Ft(t)}function Yr(t){const e={};if(t.isDefault())return e;let n;if(t.index_===N?n="$priority":t.index_===th?n="$value":t.index_===st?n="$key":(p(t.index_ instanceof $d,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=P(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=P(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+P(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=P(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+P(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function zr(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==N&&(e.i=t.index_.toString()),e}/**
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
 */class Rn extends Na{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=jt("p:rest:"),this.listens_={}}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Rn.getListenId_(e,s),a={};this.listens_[o]=a;const l=Yr(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),We(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,n){const s=Rn.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Yr(e._queryParams),s=e._path.toString(),i=new dt;return this.restRequest_(s+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Nc(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Dt(a.responseText)}catch{V("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&V("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class rh{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function Nn(){return{value:null,children:new Map}}function Ha(t,e,n){if(E(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=C(e);t.children.has(s)||t.children.set(s,Nn());const i=t.children.get(s);e=T(e),Ha(i,e,n)}}function js(t,e,n){t.value!==null?n(e,t.value):oh(t,(s,i)=>{const r=new b(e.toString()+"/"+s);js(i,r,n)})}function oh(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
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
 */class ah{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&W(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
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
 */const Qr=10*1e3,lh=30*1e3,ch=300*1e3;class uh{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new ah(e);const s=Qr+(lh-Qr)*Math.random();It(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;W(e,(i,r)=>{r>0&&ne(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),It(this.reportStats_.bind(this),Math.floor(Math.random()*2*ch))}}/**
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
 */var ee;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ee||(ee={}));function Li(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function xi(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Oi(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class kn{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=ee.ACK_USER_WRITE,this.source=Li()}operationForChild(e){if(E(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new b(e));return new kn(A(),n,this.revert)}}else return p(C(this.path)===e,"operationForChild called for unrelated child."),new kn(T(this.path),this.affectedTree,this.revert)}}/**
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
 */class Ht{constructor(e,n){this.source=e,this.path=n,this.type=ee.LISTEN_COMPLETE}operationForChild(e){return E(this.path)?new Ht(this.source,A()):new Ht(this.source,T(this.path))}}/**
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
 */class qe{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=ee.OVERWRITE}operationForChild(e){return E(this.path)?new qe(this.source,A(),this.snap.getImmediateChild(e)):new qe(this.source,T(this.path),this.snap)}}/**
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
 */class ot{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=ee.MERGE}operationForChild(e){if(E(this.path)){const n=this.children.subtree(new b(e));return n.isEmpty()?null:n.value?new qe(this.source,A(),n.value):new ot(this.source,A(),n)}else return p(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ot(this.source,T(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Ie{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(E(e))return this.isFullyInitialized()&&!this.filtered_;const n=C(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class dh{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function hh(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(nh(o.childName,o.snapshotNode))}),Ct(t,i,"child_removed",e,s,n),Ct(t,i,"child_added",e,s,n),Ct(t,i,"child_moved",r,s,n),Ct(t,i,"child_changed",e,s,n),Ct(t,i,"value",e,s,n),i}function Ct(t,e,n,s,i,r){const o=s.filter(a=>a.type===n);o.sort((a,l)=>ph(t,a,l)),o.forEach(a=>{const l=fh(t,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function fh(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function ph(t,e,n){if(e.childName==null||n.childName==null)throw ut("Should only compare child_ events.");const s=new v(e.childName,e.snapshotNode),i=new v(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
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
 */function Vn(t,e){return{eventCache:t,serverCache:e}}function Tt(t,e,n,s){return Vn(new Ie(e,n,s),t.serverCache)}function Wa(t,e,n,s){return Vn(t.eventCache,new Ie(e,n,s))}function Dn(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Ve(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let As;const mh=()=>(As||(As=new Y($u)),As);class w{static fromObject(e){let n=new w(null);return W(e,(s,i)=>{n=n.set(new b(s),i)}),n}constructor(e,n=mh()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:A(),value:this.value};if(E(e))return null;{const s=C(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(T(e),n);return r!=null?{path:k(new b(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(E(e))return this;{const n=C(e),s=this.children.get(n);return s!==null?s.subtree(T(e)):new w(null)}}set(e,n){if(E(e))return new w(n,this.children);{const s=C(e),r=(this.children.get(s)||new w(null)).set(T(e),n),o=this.children.insert(s,r);return new w(this.value,o)}}remove(e){if(E(e))return this.children.isEmpty()?new w(null):new w(null,this.children);{const n=C(e),s=this.children.get(n);if(s){const i=s.remove(T(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new w(null):new w(this.value,r)}else return this}}get(e){if(E(e))return this.value;{const n=C(e),s=this.children.get(n);return s?s.get(T(e)):null}}setTree(e,n){if(E(e))return n;{const s=C(e),r=(this.children.get(s)||new w(null)).setTree(T(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new w(this.value,o)}}fold(e){return this.fold_(A(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(k(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,A(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(E(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(T(e),k(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,A(),n)}foreachOnPath_(e,n,s){if(E(e))return this;{this.value&&s(n,this.value);const i=C(e),r=this.children.get(i);return r?r.foreachOnPath_(T(e),k(n,i),s):new w(null)}}foreach(e){this.foreach_(A(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(k(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
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
 */class te{constructor(e){this.writeTree_=e}static empty(){return new te(new w(null))}}function Rt(t,e,n){if(E(e))return new te(new w(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=q(i,e);return r=r.updateChild(o,n),new te(t.writeTree_.set(i,r))}else{const i=new w(n),r=t.writeTree_.setTree(e,i);return new te(r)}}}function Ks(t,e,n){let s=t;return W(n,(i,r)=>{s=Rt(s,k(e,i),r)}),s}function jr(t,e){if(E(e))return te.empty();{const n=t.writeTree_.setTree(e,new w(null));return new te(n)}}function Js(t,e){return Qe(t,e)!=null}function Qe(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(q(n.path,e)):null}function Kr(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(N,(s,i)=>{e.push(new v(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new v(s,i.value))}),e}function Ee(t,e){if(E(e))return t;{const n=Qe(t,e);return n!=null?new te(new w(n)):new te(t.writeTree_.subtree(e))}}function Xs(t){return t.writeTree_.isEmpty()}function at(t,e){return Ua(A(),t.writeTree_,e)}function Ua(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=Ua(k(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(k(t,".priority"),s)),n}}/**
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
 */function Gn(t,e){return Ya(e,t)}function gh(t,e,n,s,i){p(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=Rt(t.visibleWrites,e,n)),t.lastWriteId=s}function _h(t,e,n,s){p(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Ks(t.visibleWrites,e,n),t.lastWriteId=s}function yh(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function Ch(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);p(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&vh(a,s.path)?i=!1:K(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return Eh(t),!0;if(s.snap)t.visibleWrites=jr(t.visibleWrites,s.path);else{const a=s.children;W(a,l=>{t.visibleWrites=jr(t.visibleWrites,k(s.path,l))})}return!0}else return!1}function vh(t,e){if(t.snap)return K(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&K(k(t.path,n),e))return!0;return!1}function Eh(t){t.visibleWrites=qa(t.allWrites,Ah,A()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Ah(t){return t.visible}function qa(t,e,n){let s=te.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let a;if(r.snap)K(n,o)?(a=q(n,o),s=Rt(s,a,r.snap)):K(o,n)&&(a=q(o,n),s=Rt(s,A(),r.snap.getChild(a)));else if(r.children){if(K(n,o))a=q(n,o),s=Ks(s,a,r.children);else if(K(o,n))if(a=q(o,n),E(a))s=Ks(s,A(),r.children);else{const l=We(r.children,C(a));if(l){const c=l.getChild(T(a));s=Rt(s,A(),c)}}}else throw ut("WriteRecord should have .snap or .children")}}return s}function Va(t,e,n,s,i){if(!s&&!i){const r=Qe(t.visibleWrites,e);if(r!=null)return r;{const o=Ee(t.visibleWrites,e);if(Xs(o))return n;if(n==null&&!Js(o,A()))return null;{const a=n||g.EMPTY_NODE;return at(o,a)}}}else{const r=Ee(t.visibleWrites,e);if(!i&&Xs(r))return n;if(!i&&n==null&&!Js(r,A()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(K(c.path,e)||K(e,c.path))},a=qa(t.allWrites,o,e),l=n||g.EMPTY_NODE;return at(a,l)}}}function Sh(t,e,n){let s=g.EMPTY_NODE;const i=Qe(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(N,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=Ee(t.visibleWrites,e);return n.forEachChild(N,(o,a)=>{const l=at(Ee(r,new b(o)),a);s=s.updateImmediateChild(o,l)}),Kr(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=Ee(t.visibleWrites,e);return Kr(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function bh(t,e,n,s,i){p(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=k(e,n);if(Js(t.visibleWrites,r))return null;{const o=Ee(t.visibleWrites,r);return Xs(o)?i.getChild(n):at(o,i.getChild(n))}}function wh(t,e,n,s){const i=k(e,n),r=Qe(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=Ee(t.visibleWrites,i);return at(o,s.getNode().getImmediateChild(n))}else return null}function Ih(t,e){return Qe(t.visibleWrites,e)}function Th(t,e,n,s,i,r,o){let a;const l=Ee(t.visibleWrites,e),c=Qe(l,A());if(c!=null)a=c;else if(n!=null)a=at(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],u=o.getCompare(),d=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=d.getNext();for(;f&&h.length<i;)u(f,s)!==0&&h.push(f),f=d.getNext();return h}else return[]}function Rh(){return{visibleWrites:te.empty(),allWrites:[],lastWriteId:-1}}function Pn(t,e,n,s){return Va(t.writeTree,t.treePath,e,n,s)}function Bi(t,e){return Sh(t.writeTree,t.treePath,e)}function Jr(t,e,n,s){return bh(t.writeTree,t.treePath,e,n,s)}function Mn(t,e){return Ih(t.writeTree,k(t.treePath,e))}function Nh(t,e,n,s,i,r){return Th(t.writeTree,t.treePath,e,n,s,i,r)}function Fi(t,e,n){return wh(t.writeTree,t.treePath,e,n)}function Ga(t,e){return Ya(k(t.treePath,e),t.writeTree)}function Ya(t,e){return{treePath:t,writeTree:e}}/**
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
 */class kh{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;p(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),p(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,Bt(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,Ot(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,rt(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,Bt(s,e.snapshotNode,i.oldSnap));else throw ut("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Dh{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const za=new Dh;class Hi{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Ie(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Fi(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ve(this.viewCache_),r=Nh(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function Ph(t){return{filter:t}}function Mh(t,e){p(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Lh(t,e,n,s,i){const r=new kh;let o,a;if(n.type===ee.OVERWRITE){const c=n;c.source.fromUser?o=Zs(t,e,c.path,c.snap,s,i,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!E(c.path),o=Ln(t,e,c.path,c.snap,s,i,a,r))}else if(n.type===ee.MERGE){const c=n;c.source.fromUser?o=Oh(t,e,c.path,c.children,s,i,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=$s(t,e,c.path,c.children,s,i,a,r))}else if(n.type===ee.ACK_USER_WRITE){const c=n;c.revert?o=Hh(t,e,c.path,s,i,r):o=Bh(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===ee.LISTEN_COMPLETE)o=Fh(t,e,n.path,s,r);else throw ut("Unknown operation type: "+n.type);const l=r.getChanges();return xh(e,o,l),{viewCache:o,changes:l}}function xh(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Dn(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(Fa(Dn(e)))}}function Qa(t,e,n,s,i,r){const o=e.eventCache;if(Mn(s,n)!=null)return e;{let a,l;if(E(n))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ve(e),h=c instanceof g?c:g.EMPTY_NODE,u=Bi(s,h);a=t.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Pn(s,Ve(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=C(n);if(c===".priority"){p(we(n)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const u=Jr(s,n,h,l);u!=null?a=t.filter.updatePriority(h,u):a=o.getNode()}else{const h=T(n);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=Jr(s,n,o.getNode(),l);d!=null?u=o.getNode().getImmediateChild(c).updateChild(h,d):u=o.getNode().getImmediateChild(c)}else u=Fi(s,c,e.serverCache);u!=null?a=t.filter.updateChild(o.getNode(),c,u,h,i,r):a=o.getNode()}}return Tt(e,a,o.isFullyInitialized()||E(n),t.filter.filtersNodes())}}function Ln(t,e,n,s,i,r,o,a){const l=e.serverCache;let c;const h=o?t.filter:t.filter.getIndexedFilter();if(E(n))c=h.updateFullNode(l.getNode(),s,null);else if(h.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(n,s);c=h.updateFullNode(l.getNode(),f,null)}else{const f=C(n);if(!l.isCompleteForPath(n)&&we(n)>1)return e;const m=T(n),S=l.getNode().getImmediateChild(f).updateChild(m,s);f===".priority"?c=h.updatePriority(l.getNode(),S):c=h.updateChild(l.getNode(),f,S,m,za,null)}const u=Wa(e,c,l.isFullyInitialized()||E(n),h.filtersNodes()),d=new Hi(i,u,r);return Qa(t,u,n,i,d,a)}function Zs(t,e,n,s,i,r,o){const a=e.eventCache;let l,c;const h=new Hi(i,e,r);if(E(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),l=Tt(e,c,!0,t.filter.filtersNodes());else{const u=C(n);if(u===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),l=Tt(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=T(n),f=a.getNode().getImmediateChild(u);let m;if(E(d))m=s;else{const _=h.getCompleteChild(u);_!=null?Ri(d)===".priority"&&_.getChild(Da(d)).isEmpty()?m=_:m=_.updateChild(d,s):m=g.EMPTY_NODE}if(f.equals(m))l=e;else{const _=t.filter.updateChild(a.getNode(),u,m,d,h,o);l=Tt(e,_,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function Xr(t,e){return t.eventCache.isCompleteForChild(e)}function Oh(t,e,n,s,i,r,o){let a=e;return s.foreach((l,c)=>{const h=k(n,l);Xr(e,C(h))&&(a=Zs(t,a,h,c,i,r,o))}),s.foreach((l,c)=>{const h=k(n,l);Xr(e,C(h))||(a=Zs(t,a,h,c,i,r,o))}),a}function Zr(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function $s(t,e,n,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;E(n)?c=s:c=new w(null).setTree(n,s);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,d)=>{if(h.hasChild(u)){const f=e.serverCache.getNode().getImmediateChild(u),m=Zr(t,f,d);l=Ln(t,l,new b(u),m,i,r,o,a)}}),c.children.inorderTraversal((u,d)=>{const f=!e.serverCache.isCompleteForChild(u)&&d.value===null;if(!h.hasChild(u)&&!f){const m=e.serverCache.getNode().getImmediateChild(u),_=Zr(t,m,d);l=Ln(t,l,new b(u),_,i,r,o,a)}}),l}function Bh(t,e,n,s,i,r,o){if(Mn(i,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(E(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Ln(t,e,n,l.getNode().getChild(n),i,r,a,o);if(E(n)){let c=new w(null);return l.getNode().forEachChild(st,(h,u)=>{c=c.set(new b(h),u)}),$s(t,e,n,c,i,r,a,o)}else return e}else{let c=new w(null);return s.foreach((h,u)=>{const d=k(n,h);l.isCompleteForPath(d)&&(c=c.set(h,l.getNode().getChild(d)))}),$s(t,e,n,c,i,r,a,o)}}function Fh(t,e,n,s,i){const r=e.serverCache,o=Wa(e,r.getNode(),r.isFullyInitialized()||E(n),r.isFiltered());return Qa(t,o,n,s,za,i)}function Hh(t,e,n,s,i,r){let o;if(Mn(s,n)!=null)return e;{const a=new Hi(s,e,i),l=e.eventCache.getNode();let c;if(E(n)||C(n)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=Pn(s,Ve(e));else{const u=e.serverCache.getNode();p(u instanceof g,"serverChildren would be complete if leaf node"),h=Bi(s,u)}h=h,c=t.filter.updateFullNode(l,h,r)}else{const h=C(n);let u=Fi(s,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=l.getImmediateChild(h)),u!=null?c=t.filter.updateChild(l,h,u,T(n),a,r):e.eventCache.getNode().hasChild(h)?c=t.filter.updateChild(l,h,g.EMPTY_NODE,T(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Pn(s,Ve(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Mn(s,A())!=null,Tt(e,c,o,t.filter.filtersNodes())}}/**
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
 */class Wh{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Pi(s.getIndex()),r=ih(s);this.processor_=Ph(r);const o=n.serverCache,a=n.eventCache,l=i.updateFullNode(g.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),h=new Ie(l,o.isFullyInitialized(),i.filtersNodes()),u=new Ie(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Vn(u,h),this.eventGenerator_=new dh(this.query_)}get query(){return this.query_}}function Uh(t){return t.viewCache_.serverCache.getNode()}function qh(t){return Dn(t.viewCache_)}function Vh(t,e){const n=Ve(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!E(e)&&!n.getImmediateChild(C(e)).isEmpty())?n.getChild(e):null}function $r(t){return t.eventRegistrations_.length===0}function Gh(t,e){t.eventRegistrations_.push(e)}function eo(t,e,n){const s=[];if(n){p(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function to(t,e,n,s){e.type===ee.MERGE&&e.source.queryId!==null&&(p(Ve(t.viewCache_),"We should always have a full cache before handling merges"),p(Dn(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=Lh(t.processor_,i,e,n,s);return Mh(t.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,ja(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Yh(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(N,(r,o)=>{s.push(rt(r,o))}),n.isFullyInitialized()&&s.push(Fa(n.getNode())),ja(t,s,n.getNode(),e)}function ja(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return hh(t.eventGenerator_,e,n,i)}/**
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
 */let xn;class Ka{constructor(){this.views=new Map}}function zh(t){p(!xn,"__referenceConstructor has already been defined"),xn=t}function Qh(){return p(xn,"Reference.ts has not been loaded"),xn}function jh(t){return t.views.size===0}function Wi(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return p(r!=null,"SyncTree gave us an op for an invalid query."),to(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(to(o,e,n,s));return r}}function Ja(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=Pn(n,i?s:null),l=!1;a?l=!0:s instanceof g?(a=Bi(n,s),l=!1):(a=g.EMPTY_NODE,l=!1);const c=Vn(new Ie(a,l,!1),new Ie(s,i,!1));return new Wh(e,c)}return o}function Kh(t,e,n,s,i,r){const o=Ja(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Gh(o,n),Yh(o,n)}function Jh(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const a=Te(t);if(i==="default")for(const[l,c]of t.views.entries())o=o.concat(eo(c,n,s)),$r(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(i);l&&(o=o.concat(eo(l,n,s)),$r(l)&&(t.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Te(t)&&r.push(new(Qh())(e._repo,e._path)),{removed:r,events:o}}function Xa(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Ae(t,e){let n=null;for(const s of t.views.values())n=n||Vh(s,e);return n}function Za(t,e){if(e._queryParams.loadsAllData())return Yn(t);{const s=e._queryIdentifier;return t.views.get(s)}}function $a(t,e){return Za(t,e)!=null}function Te(t){return Yn(t)!=null}function Yn(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let On;function Xh(t){p(!On,"__referenceConstructor has already been defined"),On=t}function Zh(){return p(On,"Reference.ts has not been loaded"),On}let $h=1;class no{constructor(e){this.listenProvider_=e,this.syncPointTree_=new w(null),this.pendingWriteTree_=Rh(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ui(t,e,n,s,i){return gh(t.pendingWriteTree_,e,n,s,i),i?ft(t,new qe(Li(),e,n)):[]}function ef(t,e,n,s){_h(t.pendingWriteTree_,e,n,s);const i=w.fromObject(n);return ft(t,new ot(Li(),e,i))}function _e(t,e,n=!1){const s=yh(t.pendingWriteTree_,e);if(Ch(t.pendingWriteTree_,e)){let r=new w(null);return s.snap!=null?r=r.set(A(),!0):W(s.children,o=>{r=r.set(new b(o),!0)}),ft(t,new kn(s.path,r,n))}else return[]}function Jt(t,e,n){return ft(t,new qe(xi(),e,n))}function tf(t,e,n){const s=w.fromObject(n);return ft(t,new ot(xi(),e,s))}function nf(t,e){return ft(t,new Ht(xi(),e))}function sf(t,e,n){const s=qi(t,n);if(s){const i=Vi(s),r=i.path,o=i.queryId,a=q(r,e),l=new Ht(Oi(o),a);return Gi(t,r,l)}else return[]}function Bn(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||$a(o,e))){const l=Jh(o,e,n,s);jh(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const h=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,u=t.syncPointTree_.findOnPath(r,(d,f)=>Te(f));if(h&&!u){const d=t.syncPointTree_.subtree(r);if(!d.isEmpty()){const f=af(d);for(let m=0;m<f.length;++m){const _=f[m],S=_.query,R=sl(t,_);t.listenProvider_.startListening(Nt(S),Wt(t,S),R.hashFn,R.onComplete)}}}!u&&c.length>0&&!s&&(h?t.listenProvider_.stopListening(Nt(e),null):c.forEach(d=>{const f=t.queryToTagMap.get(Qn(d));t.listenProvider_.stopListening(Nt(d),f)}))}lf(t,c)}return a}function el(t,e,n,s){const i=qi(t,s);if(i!=null){const r=Vi(i),o=r.path,a=r.queryId,l=q(o,e),c=new qe(Oi(a),l,n);return Gi(t,o,c)}else return[]}function rf(t,e,n,s){const i=qi(t,s);if(i){const r=Vi(i),o=r.path,a=r.queryId,l=q(o,e),c=w.fromObject(n),h=new ot(Oi(a),l,c);return Gi(t,o,h)}else return[]}function ei(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(d,f)=>{const m=q(d,i);r=r||Ae(f,m),o=o||Te(f)});let a=t.syncPointTree_.get(i);a?(o=o||Te(a),r=r||Ae(a,A())):(a=new Ka,t.syncPointTree_=t.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=g.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((f,m)=>{const _=Ae(m,A());_&&(r=r.updateImmediateChild(f,_))}));const c=$a(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=Qn(e);p(!t.queryToTagMap.has(d),"View does not exist, but we have a tag");const f=cf();t.queryToTagMap.set(d,f),t.tagToQueryMap.set(f,d)}const h=Gn(t.pendingWriteTree_,i);let u=Kh(a,e,n,h,r,l);if(!c&&!o&&!s){const d=Za(a,e);u=u.concat(uf(t,e,d))}return u}function zn(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=q(o,e),c=Ae(a,l);if(c)return c});return Va(i,e,r,n,!0)}function of(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(c,h)=>{const u=q(c,n);s=s||Ae(h,u)});let i=t.syncPointTree_.get(n);i?s=s||Ae(i,A()):(i=new Ka,t.syncPointTree_=t.syncPointTree_.set(n,i));const r=s!=null,o=r?new Ie(s,!0,!1):null,a=Gn(t.pendingWriteTree_,e._path),l=Ja(i,e,a,r?o.getNode():g.EMPTY_NODE,r);return qh(l)}function ft(t,e){return tl(e,t.syncPointTree_,null,Gn(t.pendingWriteTree_,A()))}function tl(t,e,n,s){if(E(t.path))return nl(t,e,n,s);{const i=e.get(A());n==null&&i!=null&&(n=Ae(i,A()));let r=[];const o=C(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,h=Ga(s,o);r=r.concat(tl(a,l,c,h))}return i&&(r=r.concat(Wi(i,t,s,n))),r}}function nl(t,e,n,s){const i=e.get(A());n==null&&i!=null&&(n=Ae(i,A()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=Ga(s,o),h=t.operationForChild(o);h&&(r=r.concat(nl(h,a,l,c)))}),i&&(r=r.concat(Wi(i,t,s,n))),r}function sl(t,e){const n=e.query,s=Wt(t,n);return{hashFn:()=>(Uh(e)||g.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?sf(t,n._path,s):nf(t,n._path);{const r=nd(i,n);return Bn(t,n,null,r)}}}}function Wt(t,e){const n=Qn(e);return t.queryToTagMap.get(n)}function Qn(t){return t._path.toString()+"$"+t._queryIdentifier}function qi(t,e){return t.tagToQueryMap.get(e)}function Vi(t){const e=t.indexOf("$");return p(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new b(t.substr(0,e))}}function Gi(t,e,n){const s=t.syncPointTree_.get(e);p(s,"Missing sync point for query tag that we're tracking");const i=Gn(t.pendingWriteTree_,e);return Wi(s,n,i,null)}function af(t){return t.fold((e,n,s)=>{if(n&&Te(n))return[Yn(n)];{let i=[];return n&&(i=Xa(n)),W(s,(r,o)=>{i=i.concat(o)}),i}})}function Nt(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Zh())(t._repo,t._path):t}function lf(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=Qn(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function cf(){return $h++}function uf(t,e,n){const s=e._path,i=Wt(t,e),r=sl(t,n),o=t.listenProvider_.startListening(Nt(e),i,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(s);if(i)p(!Te(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,u)=>{if(!E(c)&&h&&Te(h))return[Yn(h).query];{let d=[];return h&&(d=d.concat(Xa(h).map(f=>f.query))),W(u,(f,m)=>{d=d.concat(m)}),d}});for(let c=0;c<l.length;++c){const h=l[c];t.listenProvider_.stopListening(Nt(h),Wt(t,h))}}return o}/**
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
 */class Yi{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Yi(n)}node(){return this.node_}}class zi{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=k(this.path_,e);return new zi(this.syncTree_,n)}node(){return zn(this.syncTree_,this.path_)}}const df=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},so=function(t,e,n){if(!t||typeof t!="object")return t;if(p(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return hf(t[".sv"],e,n);if(typeof t[".sv"]=="object")return ff(t[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},hf=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:p(!1,"Unexpected server value: "+t)}},ff=function(t,e,n){t.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&p(!1,"Unexpected increment value: "+s);const i=e.node();if(p(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},il=function(t,e,n,s){return ji(e,new zi(n,t),s)},Qi=function(t,e,n){return ji(t,new Yi(e),n)};function ji(t,e,n){const s=t.getPriority().val(),i=so(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=so(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new L(a,D(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new L(i))),o.forEachChild(N,(a,l)=>{const c=ji(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Ki{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function jn(t,e){let n=e instanceof b?e:new b(e),s=t,i=C(n);for(;i!==null;){const r=We(s.node.children,i)||{children:{},childCount:0};s=new Ki(i,s,r),n=T(n),i=C(n)}return s}function je(t){return t.node.value}function Ji(t,e){t.node.value=e,ti(t)}function rl(t){return t.node.childCount>0}function pf(t){return je(t)===void 0&&!rl(t)}function Kn(t,e){W(t.node.children,(n,s)=>{e(new Ki(n,t,s))})}function ol(t,e,n,s){n&&e(t),Kn(t,i=>{ol(i,e,!0)})}function mf(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Xt(t){return new b(t.parent===null?t.name:Xt(t.parent)+"/"+t.name)}function ti(t){t.parent!==null&&gf(t.parent,t.name,t)}function gf(t,e,n){const s=pf(n),i=ne(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,ti(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,ti(t))}/**
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
 */const _f=/[\[\].#$\/\u0000-\u001F\u007F]/,yf=/[\[\].#$\u0000-\u001F\u007F]/,Ss=10*1024*1024,Xi=function(t){return typeof t=="string"&&t.length!==0&&!_f.test(t)},al=function(t){return typeof t=="string"&&t.length!==0&&!yf.test(t)},Cf=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),al(t)},ll=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Si(t)||t&&typeof t=="object"&&ne(t,".sv")},vf=function(t,e,n,s){Zt(Wn(t,"value"),e,n)},Zt=function(t,e,n){const s=n instanceof b?new Od(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+De(s));if(typeof e=="function")throw new Error(t+"contains a function "+De(s)+" with contents = "+e.toString());if(Si(e))throw new Error(t+"contains "+e.toString()+" "+De(s));if(typeof e=="string"&&e.length>Ss/3&&Un(e)>Ss)throw new Error(t+"contains a string greater than "+Ss+" utf8 bytes "+De(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(W(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Xi(o)))throw new Error(t+" contains an invalid key ("+o+") "+De(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Bd(s,o),Zt(t,a,s),Fd(s)}),i&&r)throw new Error(t+' contains ".value" child '+De(s)+" in addition to actual children.")}},Ef=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=xt(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Xi(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(xd);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&K(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},Af=function(t,e,n,s){const i=Wn(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];W(e,(o,a)=>{const l=new b(o);if(Zt(i,a,k(n,l)),Ri(l)===".priority"&&!ll(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Ef(i,r)},cl=function(t,e,n,s){if(!al(n))throw new Error(Wn(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Sf=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),cl(t,e,n)},Zi=function(t,e){if(C(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},bf=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Xi(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Cf(n))throw new Error(Wn(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class wf{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Jn(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!Ni(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function ul(t,e,n){Jn(t,n),dl(t,s=>Ni(s,e))}function Q(t,e,n){Jn(t,n),dl(t,s=>K(s,e)||K(e,s))}function dl(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(If(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function If(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();wt&&H("event: "+n.toString()),ht(s)}}}/**
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
 */const Tf="repo_interrupt",Rf=25;class Nf{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new wf,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Nn(),this.transactionQueueTree_=new Ki,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function kf(t,e,n){if(t.stats_=Ii(t.repoInfo_),t.forceRestClient_||od())t.server_=new Rn(t.repoInfo_,(s,i,r,o)=>{io(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>ro(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{P(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new ce(t.repoInfo_,e,(s,i,r,o)=>{io(t,s,i,r,o)},s=>{ro(t,s)},s=>{Pf(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=dd(t.repoInfo_,()=>new uh(t.stats_,t.server_)),t.infoData_=new rh,t.infoSyncTree_=new no({startListening:(s,i,r,o)=>{let a=[];const l=t.infoData_.getNode(s._path);return l.isEmpty()||(a=Jt(t.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),$i(t,"connected",!1),t.serverSyncTree_=new no({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);Q(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function Df(t){const n=t.infoData_.getNode(new b(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function $t(t){return df({timestamp:Df(t)})}function io(t,e,n,s,i){t.dataUpdateCount++;const r=new b(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const l=En(n,c=>D(c));o=rf(t.serverSyncTree_,r,l,i)}else{const l=D(n);o=el(t.serverSyncTree_,r,l,i)}else if(s){const l=En(n,c=>D(c));o=tf(t.serverSyncTree_,r,l)}else{const l=D(n);o=Jt(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=lt(t,r)),Q(t.eventQueue_,a,o)}function ro(t,e){$i(t,"connected",e),e===!1&&Of(t)}function Pf(t,e){W(e,(n,s)=>{$i(t,n,s)})}function $i(t,e,n){const s=new b("/.info/"+e),i=D(n);t.infoData_.updateSnapshot(s,i);const r=Jt(t.infoSyncTree_,s,i);Q(t.eventQueue_,s,r)}function Xn(t){return t.nextWriteId_++}function Mf(t,e,n){const s=of(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(i=>{const r=D(i).withIndex(e._queryParams.getIndex());ei(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Jt(t.serverSyncTree_,e._path,r);else{const a=Wt(t.serverSyncTree_,e);o=el(t.serverSyncTree_,e._path,r,a)}return Q(t.eventQueue_,e._path,o),Bn(t.serverSyncTree_,e,n,null,!0),r},i=>(pt(t,"get for query "+P(e)+" failed: "+i),Promise.reject(new Error(i))))}function Lf(t,e,n,s,i){pt(t,"set",{path:e.toString(),value:n,priority:s});const r=$t(t),o=D(n,s),a=zn(t.serverSyncTree_,e),l=Qi(o,a,r),c=Xn(t),h=Ui(t.serverSyncTree_,e,l,c,!0);Jn(t.eventQueue_,h),t.server_.put(e.toString(),o.val(!0),(d,f)=>{const m=d==="ok";m||V("set at "+e+" failed: "+d);const _=_e(t.serverSyncTree_,c,!m);Q(t.eventQueue_,e,_),ni(t,i,d,f)});const u=tr(t,e);lt(t,u),Q(t.eventQueue_,u,[])}function xf(t,e,n,s){pt(t,"update",{path:e.toString(),value:n});let i=!0;const r=$t(t),o={};if(W(n,(a,l)=>{i=!1,o[a]=il(k(e,a),D(l),t.serverSyncTree_,r)}),i)H("update() called with empty data.  Don't do anything."),ni(t,s,"ok",void 0);else{const a=Xn(t),l=ef(t.serverSyncTree_,e,o,a);Jn(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,h)=>{const u=c==="ok";u||V("update at "+e+" failed: "+c);const d=_e(t.serverSyncTree_,a,!u),f=d.length>0?lt(t,e):e;Q(t.eventQueue_,f,d),ni(t,s,c,h)}),W(n,c=>{const h=tr(t,k(e,c));lt(t,h)}),Q(t.eventQueue_,e,[])}}function Of(t){pt(t,"onDisconnectEvents");const e=$t(t),n=Nn();js(t.onDisconnect_,A(),(i,r)=>{const o=il(i,r,t.serverSyncTree_,e);Ha(n,i,o)});let s=[];js(n,A(),(i,r)=>{s=s.concat(Jt(t.serverSyncTree_,i,r));const o=tr(t,i);lt(t,o)}),t.onDisconnect_=Nn(),Q(t.eventQueue_,A(),s)}function Bf(t,e,n){let s;C(e._path)===".info"?s=ei(t.infoSyncTree_,e,n):s=ei(t.serverSyncTree_,e,n),ul(t.eventQueue_,e._path,s)}function Ff(t,e,n){let s;C(e._path)===".info"?s=Bn(t.infoSyncTree_,e,n):s=Bn(t.serverSyncTree_,e,n),ul(t.eventQueue_,e._path,s)}function Hf(t){t.persistentConnection_&&t.persistentConnection_.interrupt(Tf)}function pt(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),H(n,...e)}function ni(t,e,n,s){e&&ht(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Wf(t,e,n,s,i,r){pt(t,"transaction on "+e);const o={path:e,update:n,onComplete:s,status:null,order:ca(),applyLocally:r,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=er(t,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Zt("transaction failed: Data returned ",l,o.path),o.status=0;const c=jn(t.transactionQueueTree_,e),h=je(c)||[];h.push(o),Ji(c,h);let u;typeof l=="object"&&l!==null&&ne(l,".priority")?(u=We(l,".priority"),p(ll(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(zn(t.serverSyncTree_,e)||g.EMPTY_NODE).getPriority().val();const d=$t(t),f=D(l,u),m=Qi(f,a,d);o.currentOutputSnapshotRaw=f,o.currentOutputSnapshotResolved=m,o.currentWriteId=Xn(t);const _=Ui(t.serverSyncTree_,e,m,o.currentWriteId,o.applyLocally);Q(t.eventQueue_,e,_),Zn(t,t.transactionQueueTree_)}}function er(t,e,n){return zn(t.serverSyncTree_,e,n)||g.EMPTY_NODE}function Zn(t,e=t.transactionQueueTree_){if(e||$n(t,e),je(e)){const n=fl(t,e);p(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&Uf(t,Xt(e),n)}else rl(e)&&Kn(e,n=>{Zn(t,n)})}function Uf(t,e,n){const s=n.map(c=>c.currentWriteId),i=er(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const h=n[c];p(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=q(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{pt(t,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let d=0;d<n.length;d++)n[d].status=2,h=h.concat(_e(t.serverSyncTree_,n[d].currentWriteId)),n[d].onComplete&&u.push(()=>n[d].onComplete(null,!0,n[d].currentOutputSnapshotResolved)),n[d].unwatcher();$n(t,jn(t.transactionQueueTree_,e)),Zn(t,t.transactionQueueTree_),Q(t.eventQueue_,e,h);for(let d=0;d<u.length;d++)ht(u[d])}else{if(c==="datastale")for(let u=0;u<n.length;u++)n[u].status===3?n[u].status=4:n[u].status=0;else{V("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<n.length;u++)n[u].status=4,n[u].abortReason=c}lt(t,e)}},o)}function lt(t,e){const n=hl(t,e),s=Xt(n),i=fl(t,n);return qf(t,i,s),s}function qf(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=q(n,l.path);let h=!1,u;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,u=l.abortReason,i=i.concat(_e(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Rf)h=!0,u="maxretry",i=i.concat(_e(t.serverSyncTree_,l.currentWriteId,!0));else{const d=er(t,l.path,o);l.currentInputSnapshot=d;const f=e[a].update(d.val());if(f!==void 0){Zt("transaction failed: Data returned ",f,l.path);let m=D(f);typeof f=="object"&&f!=null&&ne(f,".priority")||(m=m.updatePriority(d.getPriority()));const S=l.currentWriteId,R=$t(t),U=Qi(m,d,R);l.currentOutputSnapshotRaw=m,l.currentOutputSnapshotResolved=U,l.currentWriteId=Xn(t),o.splice(o.indexOf(S),1),i=i.concat(Ui(t.serverSyncTree_,l.path,U,l.currentWriteId,l.applyLocally)),i=i.concat(_e(t.serverSyncTree_,S,!0))}else h=!0,u="nodata",i=i.concat(_e(t.serverSyncTree_,l.currentWriteId,!0))}Q(t.eventQueue_,n,i),i=[],h&&(e[a].status=2,(function(d){setTimeout(d,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}$n(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)ht(s[a]);Zn(t,t.transactionQueueTree_)}function hl(t,e){let n,s=t.transactionQueueTree_;for(n=C(e);n!==null&&je(s)===void 0;)s=jn(s,n),e=T(e),n=C(e);return s}function fl(t,e){const n=[];return pl(t,e,n),n.sort((s,i)=>s.order-i.order),n}function pl(t,e,n){const s=je(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);Kn(e,i=>{pl(t,i,n)})}function $n(t,e){const n=je(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,Ji(e,n.length>0?n:void 0)}Kn(e,s=>{$n(t,s)})}function tr(t,e){const n=Xt(hl(t,e)),s=jn(t.transactionQueueTree_,e);return mf(s,i=>{bs(t,i)}),bs(t,s),ol(s,i=>{bs(t,i)}),n}function bs(t,e){const n=je(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(p(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(_e(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ji(e,void 0):n.length=r+1,Q(t.eventQueue_,Xt(e),i);for(let o=0;o<s.length;o++)ht(s[o])}}/**
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
 */function Vf(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function Gf(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):V(`Invalid query segment '${n}' in query '${t}'`)}return e}const oo=function(t,e){const n=Yf(t),s=n.namespace;n.domain==="firebase.com"&&he(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&he("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Xu();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Aa(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new b(n.pathString)}},Yf=function(t){let e="",n="",s="",i="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let h=t.indexOf("/");h===-1&&(h=t.length);let u=t.indexOf("?");u===-1&&(u=t.length),e=t.substring(0,Math.min(h,u)),h<u&&(i=Vf(t.substring(h,u)));const d=Gf(t.substring(Math.min(t.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const m=e.indexOf(".");s=e.substring(0,m).toLowerCase(),n=e.substring(m+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:n,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
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
 */class ml{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+P(this.snapshot.exportVal())}}class gl{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class _l{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class nr{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return E(this._path)?null:Ri(this._path)}get ref(){return new se(this._repo,this._path)}get _queryIdentifier(){const e=zr(this._queryParams),n=bi(e);return n==="{}"?"default":n}get _queryObject(){return zr(this._queryParams)}isEqual(e){if(e=Ye(e),!(e instanceof nr))return!1;const n=this._repo===e._repo,s=Ni(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Ld(this._path)}}class se extends nr{constructor(e,n){super(e,n,new Mi,!1)}get parent(){const e=Da(this._path);return e===null?null:new se(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ge{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new b(e),s=Ut(this.ref,e);return new Ge(this._node.getChild(n),s,N)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Ge(i,Ut(this.ref,s),N)))}hasChild(e){const n=new b(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ue(t,e){return t=Ye(t),t._checkNotDeleted("ref"),e!==void 0?Ut(t._root,e):t._root}function Ut(t,e){return t=Ye(t),C(t._path)===null?Sf("child","path",e):cl("child","path",e),new se(t._repo,k(t._path,e))}function yl(t){return Zi("remove",t._path),es(t,null)}function es(t,e){t=Ye(t),Zi("set",t._path),vf("set",e,t._path);const n=new dt;return Lf(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Ke(t,e){Af("update",e,t._path);const n=new dt;return xf(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function fe(t){t=Ye(t);const e=new _l(()=>{}),n=new ts(e);return Mf(t._repo,t,n).then(s=>new Ge(s,new se(t._repo,t._path),t._queryParams.getIndex()))}class ts{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new ml("value",this,new Ge(e.snapshotNode,new se(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new gl(this,e,n):null}matches(e){return e instanceof ts?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class sr{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new gl(this,e,n):null}createEvent(e,n){p(e.childName!=null,"Child events should have a childName.");const s=Ut(new se(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new ml(e.type,this,new Ge(e.snapshotNode,s,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof sr?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Cl(t,e,n,s,i){const r=new _l(n,void 0),o=e==="value"?new ts(r):new sr(e,r);return Bf(t._repo,t,o),()=>Ff(t._repo,t,o)}function ir(t,e,n,s){return Cl(t,"value",e)}function zf(t,e,n,s){return Cl(t,"child_added",e)}zh(se);Xh(se);/**
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
 */const Qf="FIREBASE_DATABASE_EMULATOR_HOST",si={};let jf=!1;function Kf(t,e,n,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=Ei(r);t.repoInfo_=new Aa(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function Jf(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||he("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),H("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=oo(r,i),a=o.repoInfo,l;typeof process<"u"&&Rr&&(l=Rr[Qf]),l?(r=`http://${l}?ns=${a.namespace}`,o=oo(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new ld(t.name,t.options,e);bf("Invalid Firebase Database URL",o),E(o.path)||he("Database URL must point to the root of a Firebase Database (not including a child path).");const h=Zf(a,t,c,new ad(t,n));return new $f(h,t)}function Xf(t,e){const n=si[e];(!n||n[t.key]!==t)&&he(`Database ${e}(${t.repoInfo_}) has already been deleted.`),Hf(t),delete n[t.key]}function Zf(t,e,n,s){let i=si[e.name];i||(i={},si[e.name]=i);let r=i[t.toURLString()];return r&&he("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Nf(t,jf,n,s),i[t.toURLString()]=r,r}class $f{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(kf(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new se(this._repo,A())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Xf(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&he("Cannot call "+e+" on a deleted database.")}}function vl(t=Mu(),e){const n=Ru(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=fc("database");s&&ep(n,...s)}return n}function ep(t,e,n,s={}){t=Ye(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&An(s,r.repoInfo_.emulatorOptions))return;he("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&he('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new yn(yn.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:mc(s.mockUserToken,t.app.options.projectId);o=new yn(a)}Ei(e)&&(pc(e),yc("Database",!0)),Kf(r,i,s,o)}/**
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
 */function tp(t){zu(Pu),bn(new Pt("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Jf(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),tt(Nr,kr,t),tt(Nr,kr,"esm2020")}/**
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
 */const np={".sv":"timestamp"};function sp(){return np}/**
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
 */class ip{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function rp(t,e,n){if(t=Ye(t),Zi("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const s=!0,i=new dt,r=(a,l,c)=>{let h=null;a?i.reject(a):(h=new Ge(c,new se(t._repo,t._path),N),i.resolve(new ip(l,h)))},o=ir(t,()=>{});return Wf(t._repo,t._path,e,r,o,s),i.promise}ce.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};ce.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};tp();const op={apiKey:"AIzaSyDe5xEX7kUStK3rxZJGm5qbBCnG9WLGQXg",authDomain:"terraalpha-fbc73.firebaseapp.com",databaseURL:"https://terraalpha-fbc73-default-rtdb.europe-west1.firebasedatabase.app",projectId:"terraalpha-fbc73",storageBucket:"terraalpha-fbc73.firebasestorage.app",messagingSenderId:"563122821683",appId:"1:563122821683:web:276cb02e848b762a2c2146"},ap=ia(op),Se=vl(ap);Array.from({length:8},(t,e)=>`p1-cell-${e+1}`),Array.from({length:8},(t,e)=>`p2-cell-${e+1}`);const X=t=>ue(Se,`rooms/${t}`),ii=(t,e)=>Ut(X(t),`currentStepsStrike/${e}`);function El(t){return{...t,itsTurn:!1,diceHistory:[],diceStreak:[]}}function Al({id:t,name:e},n,s){const i=s?[]:[El(n)];return es(X(t),{id:t,authorId:n.id,name:e,players:i,date:new Date().toISOString(),ships:{left:{},right:{}},suggestRestartSide:null,timeWhenSuggestRestart:null,restartConfirmedAt:null,restartBy:null})}function lp(t){const e=ue(Se,"rooms");ir(e,n=>{const s=n.val();t(s?Object.values(s):[])})}async function cp(){const t=ue(Se,"rooms"),e=await fe(t);return e.val()?Object.values(e.val()):[]}function ns(t,e){ir(X(t),n=>{e(n.val()||void 0)})}async function ri(t,e){const n=X(t),s=await fe(n);if(!s.exists())throw new Error(`Room ${t} does not exist.`);const r=s.val().actions||[];e.id=be(),r.push(e),await Ke(n,{actions:r})}async function qt(t,e){await Ke(X(t),e)}async function up(t,e,n){const s=X(t),i=await fe(s);if(!i.exists())throw new Error(`Room ${t} does not exist.`);const o=i.val().players||[],a=e==="left"?0:1;if(!o[a])throw new Error(`Player '${e}' does not exist in room ${t}.`);o[a]={...o[a],...n},await Ke(s,{players:o})}async function dp(t,e){const n=X(t),s=await fe(n);if(!s.exists())throw new Error("Room does not exist");const r=s.val().phrases||[];r.some(a=>a.id===e.id)||await Ke(n,{phrases:[...r,e]})}async function rr(t,e){const n=vl(),s=ue(n,`rooms/${e}`);try{await rp(s,i=>{if(i===null)throw new Error(`Room ${e} does not exist.`);if(i.players&&i.players.length>=2)throw new Error("The room is already full");const r=i.players||[];if(r.some(o=>o?.color===t.color))throw new Error("Your color is already taken");return r.push(El(t)),i.players=r,i})}catch(i){throw console.error("Error adding player to room: ",i),i}}async function Sl(t){const e=await fe(X(t));if(!e.exists())throw new Error(`Room ${t} does not exist.`);return e.val()}function ss(t){localStorage.setItem("currentRoomId",String(t))}function J(){return Number(localStorage.getItem("currentRoomId"))}function bl(t){localStorage.setItem("restartRoomId",String(t))}function wl(){return Number(localStorage.getItem("restartRoomId"))}function hp(){return Number(localStorage.removeItem("restartRoomId"))}function fp(t){localStorage.setItem("currentPlayerName",t)}function Oe(){return localStorage.getItem("currentPlayerName")||"Невідомий гравець"}function pp(t){localStorage.setItem("currentPlayerId",String(t))}function mp(){return Number(localStorage.getItem("currentPlayerId"))}function Re(){const t=localStorage.getItem("playerInfo");if(t){const e=JSON.parse(t);return e.avatar&&(e.avatar=Number(e.avatar)),e}return null}function is(t){try{const e=JSON.stringify(t);localStorage.setItem("playerInfo",e)}catch(e){console.error("Failed to save player info:",e)}}async function gp(){const t=ue(Se,"rooms"),e=await fe(t);if(!e.exists())return;const n=e.val(),s=Date.now(),i=3600*1e3,r=Object.entries(n).filter(([,o])=>o.date&&s-new Date(o.date).getTime()>i).map(([o])=>yl(ue(Se,`rooms/${o}`)));await Promise.all(r)}async function rn(t,e){const n=await fe(X(t));if(!n.exists())return;const i=n.val().isTurn;if(!i)return;const r=await fe(ii(t,i));if(!r.exists())return;const o=r.val();if(!Array.isArray(o))return;const a=o.filter((l,c)=>!e.includes(c));await es(ii(t,i),a)}async function _p(t){const e=await fe(X(t));if(!e.exists())return;const s=e.val().isTurn;s&&await es(ii(t,s),[])}async function yp(t,e){await Ke(X(t),{suggestRestartSide:e,timeWhenSuggestRestart:new Date().toISOString()})}async function oi(t){await Ke(X(t),{suggestRestartSide:null,timeWhenSuggestRestart:null})}const Cp="/Testing_game/assets/lucky-BWspT3q7.png",vp="/Testing_game/assets/looser-B8k8vyPt.png",Ep="/Testing_game/assets/angry-B2B9_9Ii.png",Ap="/Testing_game/assets/win-DSD2HYYl.png",Sp="/Testing_game/assets/laugh-DRXkMQrf.png",bp="/Testing_game/assets/avatar-1-k7iEtTdy.png",wp="/Testing_game/assets/avatar-2-neOZXC27.png",Ip="/Testing_game/assets/avatar-3-BHNbHzqL.png",Tp="/Testing_game/assets/avatar-4-BzIs1Mf1.png",Rp="/Testing_game/assets/avatar-5-Bie7X0vt.png",Np="/Testing_game/assets/avatar-6-CHk5S2XK.png",kp="/Testing_game/assets/avatar-7-BiCxFzL8.png",Dp="/Testing_game/assets/avatar-8-f7o7SH1i.png",Pp="/Testing_game/assets/avatar-9-BGb1iwdq.png",Mp={logo:"Some <span>Logo</span>",fastGameBtn:"Fast Game",selectRoomBtn:"Select Room",createRoomBtn:"Create Room",backToHomePageBtn:"Back to home page",playerNameInput:"Player's name",playerColorInput:"Player's color",playerAvatarInput:"Player's avatar",roomNameInput:"Room's name",noRooms:"No available rooms found",name:"Name",author:"Author",date:"Date",playersCount:"Players",throwPhrase:"Throw Phrase",helper:{welcome:`🤖 Welcome, Commander! I’m your navigator-bot, ready to guide the fleet through the stars! 🚀

🎲 Roll the dice to see how many steps you’ll take.
🛰️ Move your ships from start to finish.
💫 Whoever completes the fleet first rules the galaxy!

If something goes wrong — we’ll blame Sergey! 😉`,restartGame:"🛰️ Signal from {name}: game restart initiated 🔄. Prepare for system reboot ⚡...",acceptRestart:"✅ Data confirmed: {name} approved your game restart proposal 🔄. Reboot starting 🚀!",rejectRestart:"⚠️ Alarm! {name} rejected your game restart proposal ❌. System continues in current mode 🛸!",coinWinner:{current:"🤖 Beep-beep! You won the coin toss ☘️! It’s your turn now 🎲. Don’t delay!",other:"🛰️ Signal from {name}: won the coin toss ☘️. Their turn now!"},diceStreak:{current:"🎲 Bingo! You rolled a 6️⃣! Roll again 🤖",other:"🎲 Oh! Opponent rolled a 6️⃣! Their turn 🚀"},diceRes:{current:"🎲 You rolled {res}️⃣. Your turn ⚡",other:"🎲 Opponent rolled {res}️⃣. Their turn 🛸"},notYourTurn:"🚨ERROR! Unauthorized action! It’s not your turn, organic being!",timerWarning:"🚨Your seconds burn faster than a meteor in the atmosphere! MOVE!",otherPlayerTurnEnded:"⚡ Opponent ended their turn 🛸. Your turn to roll the dice 🎲! Don’t delay, earthling 🤖"},phrases:{1:"Oh, lucky, lucky!",2:"Eh, you loser!",3:"Now I’ll show you where the crayfish winter!",4:"One more step and victory!",5:"You won’t outrun me!"}},Lp={logo:"Якийсь <span>Логотип</span>",fastGameBtn:"Швидка Гра",selectRoomBtn:"Вибрати Кімнату",createRoomBtn:"Створити Кімнату",backToHomePageBtn:"Назад на головну сторінку",playerNameInput:"Імʼя гравця",playerColorInput:"Колір гравця",playerAvatarInput:"Аватарка гравця",roomNameInput:"Імʼя кімнати",noRooms:"Незнайдено вільних кімнат",name:"Назва",author:"Автор",date:"Дата",playersCount:"Ігроки",throwPhrase:"Кинути Фразу",helper:{welcome:`🤖 Вітаю, командире! Я — твій навігатор-бот, готовий вести флот серед зірок! 🚀

🎲 Кинь кубик, щоб дізнатись, скільки кроків зробиш.
🛰️ Рухай кораблі від старту до фінішу.
💫 Хто першим проведе весь флот — той володар галактики!

Якщо щось піде не так — звинуватимо Сергія! 😉`,restartGame:"🛰️ Сигнал від {name}: ініційовано перезапуск гри 🔄. Готуйтеся до перезавантаження системи ⚡...",acceptRestart:"✅ Дані підтверджено: {name} схвалив(ла) вашу пропозицію перезапустити гру 🔄. Перезавантаження починається 🚀!",rejectRestart:"⚠️ Аларм! {name} відхилив(ла) вашу пропозицію перезапустити гру ❌. Система продовжує роботу в поточному режимі 🛸!",coinWinner:{current:"🤖 Біп-біп! Ти виграв у монетку ☘️! Твій хід зараз 🎲. Не зволікай!",other:"🛰️ Сигнал від {name}: виграв у монетку ☘️. Черга за ним!"},diceStreak:{current:"🎲 Бінго! Тобі випало 6️⃣! Знову твоя черга кидати кубик 🤖",other:"🎲 Ой! Суперник отримав 6️⃣! Його черга кидати кубик 🚀"},diceRes:{current:"🎲 Тобі випало {res}️⃣. Твоя черга робити хід ⚡",other:"🎲 Супернику випало {res}️⃣. Його черга робити хід 🛸"},notYourTurn:"🚨ПОМИЛКА! Несанкціонована дія! Це не твій хід, органічна істото!",timerWarning:"🚨Твої секунди згорають швидше, ніж метеор у атмосфері! РУХАЙСЯ!",otherPlayerTurnEnded:"⚡ Суперник завершив свій хід 🛸. Твоя черга кидати кубик 🎲! Не зволікай, землянин 🤖"},phrases:{1:"О, повезло, повезло",2:"Ех ти, лузер",3:"Зараз я тобі покажу, де раки зимують",4:"Ще один крок і перемога",5:"Ти мене не доженеш"}},rs={en:Mp,ua:Lp};var He=(t=>(t.EN="en",t.UA="ua",t))(He||{});const xp="data:image/svg+xml,%3csvg%20width='56'%20height='39'%20viewBox='0%200%2056%2039'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_245_56)'%3e%3cpath%20d='M0%2038.4546H55.2V35.37V3.03001V0H0V3.03001V35.36V38.4546Z'%20fill='%23FEFEFE'/%3e%3cpath%20d='M23.74%2023.03V38.4H31.42V23.03H55.2V15.35H31.42V0H23.74V15.35H0V23.03H23.74Z'%20fill='%23C8102E'/%3e%3cpath%20d='M33.98%2012.43V0H55.207V1.91016L33.98%2012.43Z'%20fill='%23012169'/%3e%3cpath%20d='M33.98%2025.97V38.4H55.2009V36.4863L33.98%2025.97Z'%20fill='%23012169'/%3e%3cpath%20d='M21.18%2025.97V38.4H0.00665283L0.00665392%2036.4849L21.18%2025.97Z'%20fill='%23012169'/%3e%3cpath%20d='M21.18%2012.43V0H0.0117188V1.97266L21.18%2012.43Z'%20fill='%23012169'/%3e%3cpath%20d='M0%2012.8H7.65L0%208.96997V12.8Z'%20fill='%23012169'/%3e%3cpath%20d='M55.2%2012.8H47.51L55.2%208.95001V12.8Z'%20fill='%23012169'/%3e%3cpath%20d='M55.2%2025.6H47.51L55.2%2029.45V25.6Z'%20fill='%23012169'/%3e%3cpath%20d='M0%2025.6H7.65L0%2029.43V25.6Z'%20fill='%23012169'/%3e%3cpath%20d='M55.2%203.25L36.15%2012.8H40.41L55.2%205.4V3.25Z'%20fill='%23C8102E'/%3e%3cpath%20d='M19.01%2025.6H14.75L0%2032.98V35.13L19.05%2025.6H19.01Z'%20fill='%23C8102E'/%3e%3cpath%20d='M10.52%2012.81H14.78L0%205.40997V7.54997L10.52%2012.81Z'%20fill='%23C8102E'/%3e%3cpath%20d='M44.63%2025.59H40.37L55.2%2033.02V30.88L44.63%2025.59Z'%20fill='%23C8102E'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_245_56'%3e%3crect%20width='55.2'%20height='38.4'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",Op="data:image/svg+xml,%3csvg%20width='56'%20height='39'%20viewBox='0%200%2056%2039'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_245_72)'%3e%3crect%20width='55.2'%20height='19.2'%20fill='%230054B1'/%3e%3crect%20y='19.2'%20width='55.2'%20height='19.2'%20fill='%23F7D104'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_245_72'%3e%3crect%20width='55.2'%20height='38.4'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",Bp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAYdJREFUeJztm7suBGEYht8lhEStUBGNjnAJrkDiUNBK3INK7x5cgohNHKJxDUoRvRCdOOZRCI1Y+38zm38O71P/s/M9z/wzm51kpYIAM8Ah8AjcAHvAaNHPrQXAAnDPby6BidzzDZQe8s2PAEwCdz3kv7kAxnPPWzrAfh/yzY0AnCcEqHSEoeBxt4nrlyUdVzVCMsAc8JS4C6BJD0ZgDXgLRKjs7ZAMsAq8tn0nOIIjyBEkOYIkR5DkCJIcQZIjSHIESY4g6SdC5LeDIziCIziCIziCIzhCKyKsByOcAdFX/NWiQISd3LOXBrHboRs5V1W3zXDgmI/Sp8gBsAW8B26B7dyzF6aAfJe6PwSBDeLfAGO55y+E5S1vectb3vKWt7zlLW95y1u+zlje8pa3fJvkN4m9wDxpgvw88NLKKy9JwEFTrnz0Xfp04vpTSSudTuc5eL6BEQ1wlbC2svJhgCngoa7bvhSApX8iNOOB1wtg8Y8IzZf/BpgFjvj6+/w1sAuM5J6rXz4BVeWDWLYgD/oAAAAASUVORK5CYII=",Fp=document.getElementById("dialog-container");let Il;function Hp(t){const e=rs[en()].phrases,n=document.createElement("div");n.classList.add("dialog-phrase"),n.style.left=`${t.x}%`;const s=document.createElement("img");s.src=t.img,n.appendChild(s);const i=document.createElement("div");i.classList.add("dialog-phrase-wrapper"),n.appendChild(i);const r=document.createElement("span");r.innerText=t.userName||"",i.appendChild(r);const o=document.createElement("p");o.innerText=e[String(t.index)],i.appendChild(o),Fp.appendChild(n),setTimeout(()=>{n.remove()},zp)}function Wp(){const t=document.querySelector(".dialog"),e=t.querySelector(".dialog-list"),n=t.querySelector(".dialog-button");Tl();const s=document.createElement("style");if(s.textContent=`
      .dialog-button::after {
        background-image: url(${Bp});
      }
    `,document.head.appendChild(s),!e)throw new Error("Dialog is not found!");r();function i(){t.classList.add("dialog--active");const a=parseFloat(Il.height);e.style.height=`${a*Rl.length}px`}function r(){t.classList.remove("dialog--active"),e.style.height="0px"}function o(){if(t.classList.contains("dialog--active")){r();return}i()}n?.addEventListener("click",o)}function Tl(){const t=rs[en()].phrases,e=document.querySelector(".dialog"),n=e.querySelector(".dialog-list");n.innerHTML="";function s(){e.classList.remove("dialog--active"),n.style.height="0px"}Rl.forEach(i=>{const r=document.createElement("li");r.classList.add("dialog-list-item"),Il=window.getComputedStyle(r);const o=document.createElement("img");o.src=i.img;const a=document.createElement("p"),l=t[String(i.id)];a.textContent=l,r.appendChild(o),r.appendChild(a),n.appendChild(r),r.addEventListener("click",()=>{const c=J(),h=20,d=Math.floor(Math.random()*(80-h+1))+h,f={id:be(),userName:Oe(),index:i.id,img:i.img,x:d};s(),dp(c,f)})})}let ai=[];function Up(t=["#lng-btn"]){ai=t.map(e=>document.querySelector(e)).filter(e=>!!e),ai.forEach(e=>e.addEventListener("click",qp)),Vt()}function Vt(){const t=en();Vp(t),Gp(t)}function qp(){const e=en()===He.EN?He.UA:He.EN;Yp(e),Vt(),Tl()}function Vp(t){const n=`<img src="${t===He.EN?xp:Op}" alt="${t}" />`;ai.forEach(s=>s.innerHTML=n)}function Gp(t){const e=rs[t];[...document.querySelectorAll("[data-lng]")].forEach(s=>{const i=s.getAttribute("data-lng"),r=i&&i in e?e[i]:"unknown";s.innerHTML=`${r}`})}function en(){return localStorage.getItem("language")||He.EN}function Yp(t){localStorage.setItem("language",t)}const zp=15e3,Rl=[{id:1,img:Cp},{id:2,img:vp},{id:3,img:Ep},{id:4,img:Ap},{id:5,img:Sp}],ct=[{id:1,img:bp},{id:2,img:wp},{id:3,img:Ip},{id:4,img:Tp},{id:5,img:Rp},{id:6,img:Np},{id:7,img:kp},{id:8,img:Dp},{id:9,img:Pp}],li=["#FF2D55","#FF9500","#FFD60A","#7B542F","#34C759","#0A84FF","#AF52DE","#561530"],ci=15e3,on=5e3,Qp=5e3,ao=3e3,jp=8e3,Nl=5e3,lo=5e3,co=1e4;function re(t,e){const n=en()||He.EN,s=t.split(".");let i=rs[n];for(const r of s)if(i&&r in i)i=i[r];else return t;return typeof i=="string"&&e&&(i=i.replace(/\{(\w+)\}/g,(r,o)=>e[o]!==void 0?String(e[o]):`{${o}}`)),i}function os(){const t=Re();if(!t){const e={id:be(),name:`Player-${be()}`,color:kl(),avatar:Kp()};return fp(e.name),pp(e.id),is(e),e}return t}function kl(){const t=Math.floor(Math.random()*li.length);return li[t]}function Kp(){return Math.floor(Math.random()*ct.length)}const or=document.getElementById("ribbons-container");function Jp(){for(let t=0;t<4;t++){const e=document.createElement("span");e.classList.add("ribbon"),or.appendChild(e)}}function Xp(){or.classList.add("is-active")}function Zp(){or.classList.remove("is-active")}const $p=window.AudioContext??window.webkitAudioContext,Gt=new $p,as=Gt.createGain();as.gain.value=1;as.connect(Gt.destination);function em(){return Gt}function tm(){return as}function uo(t){as.gain.value=t?0:1}function nm(){const t=document.getElementById("mute-btn");if(!t)return;let e=!1;const n=localStorage.getItem("is-muted");n!==null&&(e=JSON.parse(n)),t.setAttribute("data-is-muted",String(e)),uo(e),t.addEventListener("click",()=>{Gt.state==="suspended"&&Gt.resume(),e=!e,t.setAttribute("data-is-muted",String(e)),localStorage.setItem("is-muted",String(e)),uo(e)})}function tn({src:t,loudness:e=1,infinite:n=!1}){const s=em(),i=tm();let r=null,o=null;const a=async h=>{const d=await(await fetch(h)).arrayBuffer();return s.decodeAudioData(d)};return{startSound:async()=>{const h=await a(t);r=s.createBufferSource(),o=s.createGain(),o.gain.value=e,r.buffer=h,r.connect(o),o.connect(i),n&&(r.loop=!0),r.start()},stopSound:()=>{r&&r.stop()}}}const sm="/Testing_game/assets/swipe-BX8BxDgz.mp3",im="/Testing_game/assets/decoration1-gEPLjrjI.png",Dl="/Testing_game/assets/decoration2-DuWQqdkr.png",rm="/Testing_game/assets/coin-DGaJsrbG.mp3",om=`
  <g id="face-regular">
    <path d="M169.557 160.541C169.557 172.531 159.838 166.564 147.848 166.564C135.859 166.564 126.139 172.531 126.139 160.541C126.139 148.55 135.859 138.832 147.848 138.832C159.838 138.832 169.557 148.55 169.557 160.541Z" fill="#7FD5DC"/>
    <path d="M231.899 160.541C231.899 172.531 241.618 166.564 253.608 166.564C265.597 166.564 275.317 172.531 275.317 160.541C275.317 148.55 265.597 138.832 253.608 138.832C241.618 138.832 231.899 148.55 231.899 160.541Z" fill="#7FD5DC"/>
    <path d="M214.367 187.526C214.367 191.2 212.877 194.524 210.47 196.931C208.063 199.338 204.739 200.828 201.065 200.828C193.718 200.828 187.763 194.873 187.763 187.526C187.763 187.003 187.975 186.526 188.319 186.184C188.664 185.839 189.139 185.625 189.662 185.625H212.466C213.514 185.625 214.367 186.478 214.367 187.526Z" fill="#7FD5DC"/>
  </g>
`,am=`
  <g id="face-angry">
    <path d="M182.287 198.585C182.287 198.158 182.441 197.745 182.72 197.421L186.896 192.584C194.459 183.822 208.04 183.822 215.603 192.584L219.779 197.421C220.058 197.745 220.212 198.158 220.212 198.585C220.212 199.989 218.663 200.841 217.477 200.09L206.152 192.911C203.159 191.014 199.34 191.014 196.347 192.911L185.022 200.09C183.836 200.841 182.287 199.989 182.287 198.585Z" fill="#FF3C3C"/>
    <path d="M127.041 135.957L144.642 143.135L168.605 151.3L168.267 156.629C167.578 167.496 158.563 175.957 147.675 175.957C136.279 175.957 127.041 166.719 127.041 155.323V135.957Z" fill="#FF3C3C"/>
    <path d="M275.317 135.957L257.716 143.135L233.753 151.3L234.091 156.629C234.78 167.496 243.795 175.957 254.683 175.957C266.079 175.957 275.317 166.719 275.317 155.323V135.957Z" fill="#FF3C3C"/>
  </g>
`,lm=`
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
`,cm=`
  <g id="face-warning">
    <rect x="171.064" y="188.89" width="60" height="10"/>
    <circle cx="147.041" cy="155.957" r="20"/>
    <circle cx="255.317" cy="155.957" r="20"/>
  </g>
`;var $e=(t=>(t.REGULAR="regular",t.ANGRY="angry",t.OFFER="offer",t.INFORM="inform",t))($e||{});const um={regular:om,angry:am,offer:lm,inform:cm},dm=t=>`
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
            ${um[t]}
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
`,hm="/Testing_game/assets/helper-B4AVoC-5.mp3",Pl=document.getElementById("helper-container"),ws=document.getElementById("helper-icon"),ho=document.getElementById("helper-text"),ui=document.getElementById("helper-btns"),Is=document.getElementById("helper-progress-bar"),Ml=document.getElementById("helper-accept-btn"),Ll=document.getElementById("helper-reject-btn");var z=(t=>(t.HELPER_HINT="helper_hint",t.HELPER_WARNING="helper_warning",t.HELPER_OFFER="helper_offer",t.HELPER_INFORM="helper_inform",t))(z||{});const fm={helper_hint:$e.REGULAR,helper_warning:$e.ANGRY,helper_offer:$e.OFFER,helper_inform:$e.INFORM},pm=3e3,mm=500,gm=20,_m=3e3,{startSound:ym,stopSound:Cm}=tn({src:hm,loudness:.2,infinite:!0}),di=[];let ar=!1,le=null;const fo=new Map;function vm(){const t=hi(),e=document.getElementById("helper-btn");t&&e.classList.add("is-off"),e.addEventListener("click",()=>{const n=hi();localStorage.setItem("helperIsDisabled",String(!n)),n?e.classList.remove("is-off"):e.classList.add("is-off")})}function pe(t){const e={duration:t.duration??pm,text:t.text,type:t.type,onAccept:t.onAccept,onReject:t.onReject,priority:t.priority??0,dedupeKey:t.dedupeKey,delayBeforeShow:t.delayBeforeShow??0};if(hi()&&e.type==="helper_hint")return;if(e.dedupeKey){const s=Date.now(),i=fo.get(e.dedupeKey)??0;if(s-i<_m)return;fo.set(e.dedupeKey,s)}(()=>{if(!ar){setTimeout(()=>lr(e),e.delayBeforeShow);return}if(e.priority>(le?.args.priority??0)){Em(e);return}di.push(e),di.sort((i,r)=>(r.priority??0)-(i.priority??0))})()}function Em(t){le?.timeoutId&&clearTimeout(le.timeoutId),Ol(le?.onAccept,le?.onReject),xl(),setTimeout(()=>lr(t),t.delayBeforeShow)}function lr(t){ar=!0,ym(),Am(fm[t.type]),Pl.classList.add("visible"),ho.innerText="",Is.style.animation="none",Is.offsetWidth,Is.style.animation=`helper-bar ${t.duration}ms linear`,t.type==="helper_offer"?ui.classList.add("visible"):ui.classList.remove("visible");let e=0;const n=t.text,s=setInterval(()=>{ho.innerText=n.slice(0,e+1),e++,e>=n.length&&clearInterval(s)},gm),i=()=>{Ts(),t.onAccept?.()},r=()=>{Ts(),t.onReject?.()};t.type==="helper_offer"&&(Ml.addEventListener("click",i),Ll.addEventListener("click",r)),le={timeoutId:setTimeout(()=>{Ts()},t.duration),onAccept:i,onReject:r,args:t}}function Ts(){Ol(le?.onAccept,le?.onReject),xl(),setTimeout(()=>{const t=di.shift();t&&lr(t)},mm)}function xl(){Cm(),Pl.classList.remove("visible"),ui.classList.remove("visible"),ar=!1,le=null}function Ol(t,e){t&&Ml.removeEventListener("click",t),e&&Ll.removeEventListener("click",e)}function Am(t){Object.values($e).forEach(e=>ws.classList.remove(e)),ws.classList.add(t),ws.innerHTML=dm(t)}function hi(){return localStorage.getItem("helperIsDisabled")==="true"}let kt=null,me=null;const Bl=500,cr=5e3+Bl;let Cn=!1,fi=null;function Fl(){return kt||(kt=document.querySelector(".coin-container")),me||(me=document.querySelector(".coin")),!!(kt&&me)}function Sm(){Fl()}const{startSound:bm,stopSound:wm}=tn({src:rm,infinite:!0});function Im(t){Fl()&&(Cn||t===fi||(Cn=!0,fi=t,bm(),kt.classList.add("is-active"),me.style.transition="none",me.style.transform="rotateX(0deg) rotateY(0deg) rotateZ(0deg)",me.offsetWidth,me.style.transition="transform 5s ease",setTimeout(()=>{const e=t==="left"?3600:3780;me.style.transform=`rotateY(${e}deg)`},Bl),setTimeout(()=>{kt.classList.remove("is-active"),Cn=!1,wm()},cr)))}function Tm(t,e,n){Cn||t===fi||setTimeout(()=>{const s=e==="left"?n.players[1].name:n.players[0].name;pe({duration:Qp,text:re(`helper.coinWinner.${e===t?"current":"other"}`,{name:s}),type:z.HELPER_INFORM,priority:1,dedupeKey:`coin:${t}`,delayBeforeShow:0})},cr)}function ur(){return Math.random()<.5?"left":"right"}const Rm="/Testing_game/assets/dice-Dc250ONA.mp3",Fn=document.querySelector(".dice-container");if(!Fn)throw new Error("Dice container is not found.");const pi=2e3,Nm=50,ls=pi+1e3;let Rs=!1;const{startSound:km,stopSound:Dm}=tn({src:Rm,loudness:.6,infinite:!0});function Pm(){return document.querySelector('[data-type="dice"]')}function Hl(t){const e=Pm();e&&(e.toggleAttribute("disabled",t),e.classList.toggle("is-hidden",t))}window.addEventListener("coin:start",()=>Hl(!0));window.addEventListener("coin:end",()=>Hl(!1));function Mm(t){if(Rs)return;km();const e=document.querySelector(".dice");Fn?.classList.add("dice-container--roling"),e.style.animation=`rolling ${pi}ms linear`,Rs=!0,setTimeout(()=>{switch(t){case 1:e.style.transform="rotateX(0deg) rotateY(0deg)";break;case 6:e.style.transform="rotateX(180deg) rotateY(0deg)";break;case 2:e.style.transform="rotateX(-90deg) rotateY(0deg)";break;case 5:e.style.transform="rotateX(90deg) rotateY(0deg)";break;case 3:e.style.transform="rotateX(0deg) rotateY(90deg)";break;case 4:e.style.transform="rotateX(0deg) rotateY(-90deg)";break}e.style.animation="none"},pi+Nm),setTimeout(()=>{Fn?.classList.remove("dice-container--roling"),Rs=!1,e.style.transform="none",Dm()},ls)}function Lm(){const t=`
		<div class="dice">
			<div class="face front"></div>
			<div class="face back"></div>
			<div class="face top"></div>
			<div class="face bottom"></div>
			<div class="face right"></div>
			<div class="face left"></div>
		</div>
  `,e=document.createElement("div");e.innerHTML=t,Fn.appendChild(e.firstElementChild)}function xm(t,e,n){setTimeout(()=>{const s=e===t?.isTurn?"current":"other";t.lastDiceResult===6?pe({duration:ao,text:re(`helper.diceStreak.${s}`),type:z.HELPER_HINT,priority:2,dedupeKey:`dice:streak:${s}`,delayBeforeShow:0}):pe({duration:ao,text:re(`helper.diceRes.${s}`,{res:n}),type:z.HELPER_HINT,priority:2,dedupeKey:`dice:${n}:${s}`,delayBeforeShow:0})},ls)}var ye=(t=>(t.RESET="reset",t.INFORM="inform",t.HINT="hint",t.WARNING="warning",t))(ye||{});function mi(t){return new Date(Date.now()+t).toISOString()}let ge,Ns;function gi(t){t.classList.remove("is-hidden"),t.setAttribute("aria-hidden","false")}function Me(t){t.classList.add("is-hidden"),t.setAttribute("aria-hidden","true")}function Xe(t){const e=t.querySelector(".gm-restart"),n=t.querySelector(".gm-yes"),s=t.querySelector(".gm-no"),i=t.querySelector(".gm-exit"),r=t.querySelector(".gm-timer");e?.classList.remove("is-hidden"),n?.classList.add("is-hidden"),s?.classList.add("is-hidden"),i?.classList.remove("is-hidden"),r?.classList.add("is-hidden")}function Wl(t,e,n,s=!1){const i=t.querySelector(".gm-timer"),r=t.querySelector(".gm-yes"),o=t.querySelector(".gm-no"),a=t.querySelector(".gm-exit"),l=t.querySelector(".gm-restart");if(s?(a?.classList.add("is-hidden"),l?.classList.add("is-hidden"),r?.classList.remove("is-hidden"),o?.classList.remove("is-hidden")):(l?.classList.add("is-hidden"),a?.classList.add("is-hidden"),r?.classList.add("is-hidden"),o?.classList.add("is-hidden")),!i)return;i.classList.remove("is-hidden"),clearInterval(Ns);const c=()=>{const h=Date.now()-e,u=Math.max(0,Math.ceil((n-h)/1e3));i.textContent=String(u),u<=0&&(clearInterval(Ns),Me(t),Xe(t),oi(J()))};c(),Ns=window.setInterval(c,500)}function Om(t){if(ge=document.getElementById("reset-btn"),!ge)return;const e=t||document.body.getAttribute("data-my-side")||"left",s=ge.closest(".player-navigation")?.querySelector(".game-menu");if(!s)return;const i=s.querySelector(".gm-close"),r=s.querySelector(".gm-exit"),o=s.querySelector(".gm-restart"),a=s.querySelector(".gm-yes"),l=s.querySelector(".gm-no");ge.addEventListener("click",()=>{ge?.classList.contains("is-off")||(s.classList.contains("is-hidden")?(gi(s),Xe(s)):Me(s))}),i?.addEventListener("click",()=>{Me(s),Xe(s)}),r?.addEventListener("click",()=>{Me(s),Xe(s),window.location.reload()}),o?.addEventListener("click",async()=>{gi(s),Wl(s,Date.now(),1e4,!1),await yp(J(),e)}),a?.addEventListener("click",async()=>{Me(s),Xe(s),await oi(J()),_i.onAccept()}),l?.addEventListener("click",async()=>{Me(s),Xe(s),await oi(J()),_i.onReject()})}const _i={onAccept:()=>{const t={type:ye.INFORM,endsAt:mi(on),authorName:Oe(),duration:on,text:re("helper.acceptRestart",{name:Oe()})};ri(J(),t),Hm()},onReject:()=>{const t={type:ye.INFORM,endsAt:mi(on),authorName:Oe(),duration:on,text:re("helper.rejectRestart",{name:Oe()})};ri(J(),t)}};function Bm(t){if(!t)return;const e=new Date(t).getTime(),n=Date.now();if(n-e>=ci)ge?.classList.remove("is-off");else{ge?.classList.add("is-off"),Fm();const s=ci-(n-e);setTimeout(()=>ge?.classList.remove("is-off"),s)}}function Fm(){const t=document.getElementById("reset-cooldown");t.style.animation="none",t.offsetWidth,t.style.animation=`cooldown-progress ${ci}ms linear forwards`}async function Hm(){try{const t=await rg();qt(J(),{restartRoomId:t.id})}catch(t){alert(`Failed creating restart room: ${t}`)}}function Wm(){wl()&&Um()}async function Um(){try{const t=Re(),e=wl(),n=await Sl(e);if(!e||!n)throw new Error("Restart room not found or invalid room ID.");await rr(t,e),ss(e),hp(),Fe(()=>ds(n))}catch(t){alert(`Failed logging into restart room: ${t}`)}}const qm=document.querySelector("#player1"),Vm=document.querySelector("#player2"),po=`
  <div class="btn-group">
    <button id="lng-btn" class="btn btn--purple"></button>
    <button id="helper-btn" class="btn btn--purple"></button>
    <button id="reset-btn" class="btn btn--purple">
      <img src="./src/assets/icons/reset.png" alt="reset" />
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
`,mo=`
  <div class="dialog">
    <div class="btn dialog-button" data-lng="throwPhrase"></div>
    <ul class="dialog-list"></ul>
  </div>
`;function dr(t){const e=qm?.querySelector(".player-navigation"),n=Vm?.querySelector(".player-navigation");switch(t){default:case"left":e.innerHTML=po,n.innerHTML=mo;break;case"right":e.innerHTML=mo,n.innerHTML=po;break}Up(["#lng-btn","#header-lng-btn"]),vm(),Om(t),Wp(),nm()}const Gm=document.querySelector("#player1"),go=document.querySelector("#player2");function Ym(t,e){document.body.style.setProperty("--player1-color",t.color),Ul(Gm,t),dr(e)}function zm(t,e){document.body.style.setProperty("--player2-color",t.color),go.classList.add("is-visible"),Ul(go,t),dr(e)}function _o(t,e){const n=t.players.find(i=>i.id===e);n&&document.documentElement.style.setProperty("--current-player-color",n.color);const s=t.players.find(i=>i.id!==e);s&&document.documentElement.style.setProperty("--not-current-player-color",s.color)}function Ul(t,e){const n=t.querySelector(".player-info"),s=t.querySelector(".player-name");if(s&&(s.innerText=e.name),n){const i=document.createElement("img");i.classList.add("player-avatar"),i.src=ct.find(r=>r.id===e.avatar)?.img||ct[0].img,n.appendChild(i)}}const hr=document.getElementById("timer");let ks=[];const Qm=38;if(!hr)throw new Error("Timer is not found");function jm(){const t=document.createElement("div");t.classList.add("timer-text");const e=document.createElement("div");e.classList.add("timer-text-list");const n=document.createElement("div");n.classList.add("timer-text-list");for(let r=9;r>=0;r--){const o=document.createElement("span");o.innerText=String(r),e.appendChild(o.cloneNode(!0)),n.appendChild(o)}const s=document.createElement("div");s.appendChild(e);const i=document.createElement("div");i.appendChild(n),t.appendChild(s),t.appendChild(i),hr.appendChild(t),ql(60)}function ql(t){ks.length||(ks=[...document.querySelectorAll(".timer-text-list")]),ks.forEach((e,n)=>{let s;t<10&&n===0?s=0:t<10&&n===1?s=t:s=Number(String(t).at(n)),e.style.top=`-${(9-s)*Qm}px`})}function Km(t,e,n,s){if(hr.classList.contains("timer--isActive"))return()=>!1;const i=new Date(t),r=new Date(i.getTime()+e*1e3),o=Math.max(0,s?.thresholdSeconds??20);let a=!1;const l=setInterval(()=>{const c=Math.ceil((r.getTime()-Date.now())/1e3);n&&c===co/1e3&&pe({duration:co,text:re("helper.timerWarning"),type:z.HELPER_WARNING}),!a&&c<=o&&(a=!0,s?.onThreshold?.()),s?.onTick?.(Math.max(0,c)),ql(Math.max(0,c)),c<=0&&(clearInterval(l),s?.onExpire?.())},1e3);return()=>{clearInterval(l)}}let an=null;const Jm=60;function Xm(t,e,n,s){t!==e&&(an&&(an(),an=null),an=Km(e,Jm,n,s))}function Zm(t,e){const n=new Date(t);return new Date(n.getTime()+e).toISOString()}class $m{streak=[];selectedIndices=[];total=null;prevStreakKey="";setStreak(e){const n=e.join(","),s=n!==this.prevStreakKey;return s&&(this.streak=e.slice(),this.prevStreakKey=n,this.clearSelection()),s}selectIndex(e){if(e<0||e>=this.streak.length)return{total:this.total??0,indices:this.selectedIndices.slice()};if(!this.selectedIndices.includes(e))this.selectedIndices.push(e),this.total=(this.total??0)+this.streak[e];else{this.selectedIndices=this.selectedIndices.filter(s=>s!==e);const n=this.selectedIndices.reduce((s,i)=>s+this.streak[i],0);this.total=this.selectedIndices.length?n:null}return{total:this.total??0,indices:this.selectedIndices.slice()}}clearSelection(){this.selectedIndices=[],this.total=null}clear(){this.streak=[],this.prevStreakKey="",this.clearSelection()}getSelectedIndices(){return this.selectedIndices.slice()}getTotal(){return this.total}}class e1{el;value;index;constructor(e,n,s){const i=document.createElement("button");i.type="button",i.className="steps-btn",i.textContent=String(e),i.dataset.value=String(e),i.dataset.index=String(n),i.addEventListener("click",()=>{typeof s=="function"?s(e,n):console.warn("[StepsButton] Missing onClick callback",{value:e,index:n})}),this.el=i,this.value=e,this.index=n}setEnabled(e){this.el.disabled=!e}setHidden(e){this.el.style.display=e?"none":""}setDimmed(e){this.el.style.opacity=e?"0.6":""}destroy(){this.el.remove()}consume(){this.setHidden(!0)}}class t1{map=new Map;on(e,n){this.map.has(e)||this.map.set(e,new Set),this.map.get(e).add(n)}off(e,n){this.map.get(e)?.delete(n)}emit(e,n){this.map.get(e)?.forEach(s=>s(n))}}class n1{emitter=new t1;state=new $m;host=null;wrap=null;comboBtn=null;buttons=[];enabled=!1;pending=!1;stepsForMove=null;mountBefore(e){const n=document.createElement("div");n.id="steps-container",e.parentElement?.insertBefore(n,e),this.host=n;const s=document.createElement("div");s.className="steps-wrap",n.appendChild(s),this.wrap=s;const i=document.createElement("button");i.type="button",i.className="steps-btn",i.style.display="none",i.addEventListener("click",()=>{!this.enabled||this.pending||(this.state.clearSelection(),this.paint(),this.emitter.emit("step:clear",void 0))}),s.appendChild(i),this.comboBtn=i}render(e,n){if(!this.host||!this.wrap||!this.comboBtn)return;const s=this.state.setStreak(e);this.enabled=n,s&&(this.buttons.forEach(i=>i.destroy()),this.buttons=e.map((i,r)=>{const o=new e1(i,r,()=>{if(!this.enabled||this.pending)return;const a=this.state.getSelectedIndices().length,{total:l,indices:c}=this.state.selectIndex(r);this.paint(),a===0&&c.length===1?this.emitter.emit("step:select",{index:r,value:i,total:l}):this.emitter.emit("step:combine",{indices:c,lastIndex:r,total:l})});return this.wrap.appendChild(o.el),o})),this.paint()}clear(){this.host&&(this.state.clear(),this.paint())}getChosenStepsTotal(){return this.state.getTotal()}getSelectedCount(){return this.state.getSelectedIndices().length}getSelectedIndices(){return this.state.getSelectedIndices()}getStepsForMove(){return this.stepsForMove}consumeCurrent(){this.state.clearSelection(),this.paint(),this.emitter.emit("step:clear",void 0)}setPending(e){this.pending=e,this.paint()}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}paint(){if(!this.wrap||!this.comboBtn)return;const e=new Set(this.state.getSelectedIndices()),n=this.state.getTotal();if(this.stepsForMove=n,this.buttons.forEach((s,i)=>{s.setEnabled(this.enabled&&!this.pending);const r=e.has(i);s.setHidden(r),s.setDimmed(n!==null&&!r)}),n!==null&&e.size>0){this.comboBtn.style.display="",this.comboBtn.disabled=!this.enabled||this.pending,this.comboBtn.textContent=String(n),this.comboBtn.classList.remove("steps-btn--left","steps-btn--right");const s=Z1();this.comboBtn.classList.add(s==="left"?"steps-btn--left":"steps-btn--right")}else this.comboBtn.style.display="none"}}const et=new n1,s1={6:["6-1","6-2"],12:["12-1","12-2"],18:["18-1","18-2"],24:["final-2","final-1"]};function Z(t){const e=String(t);return e==="25"?document.querySelector('[data-qa="final-2"]')||document.getElementById("final-2"):e==="26"?document.querySelector('[data-qa="final-1"]')||document.getElementById("final-1"):e==="27"||e==="final-0"?document.querySelector('[data-qa="final-0"]')||document.getElementById("final-0"):document.querySelector(`.board [data-qa="field-${e}"]`)||document.querySelector(`.board [data-qa="cell-${e}"]`)||document.querySelector(`.board [data-qa="${e}"]`)||document.querySelector(`.board .cell[data-index="${e}"]`)||document.getElementById(`field-${e}`)||document.getElementById(`cell-${e}`)}function i1(t){const n=(t.getAttribute("data-qa")||"").match(/(?:field|cell)-(\d+)(?:-(\d))?|final-(\d)/);if(!n)return null;if(n[3]!==void 0){if(n[3]==="2")return{base:25,sub:n[3]};if(n[3]==="1")return{base:26,sub:n[3]};if(n[3]==="0")return{base:27,sub:n[3]}}return{base:Number(n[1]),sub:n[2]||null}}function r1(t){const e=t.closest('.board [data-qa^="field-"], .board [data-qa^="cell-"], .board [data-qa^="final-"], .board .cell[data-index]');return e?i1(e):null}function fr(t){const e=t.getAttribute("data-side")||t.dataset.side||"";if(e==="left"||e==="right")return e;const s=(t.getAttribute("data-qa")||"").match(/^(p[12])-/)?.[1];return s==="p1"?"left":s==="p2"?"right":t.classList.contains("left")?"left":t.classList.contains("right")?"right":null}function Vl(t){if(!t)return!1;if(t.matches('[data-role="mother"],[data-ship="mother"],[data-mother="1"],.mother-ship'))return!0;const e=t.getAttribute("data-qa")||"";return!!/-cell-8$/.test(e)}function Gl(t){if(!t)return null;const e=t.querySelector('.ship, [data-role="ship"], button.ship, .cell-btn, [data-ship]')||null;return e?{el:e,side:fr(e),isMother:Vl(e)}:null}function Yl(t){return!!Gl(t)}function zl(){document.querySelectorAll(".board .is-predicted").forEach(t=>t.classList.remove("is-predicted")),document.querySelectorAll(".board .ta-bump").forEach(t=>t.closest(".cell-btn")?.classList.remove("ta-bump"))}function yo(t){return t&&(t.closest(".cell-btn, [data-ship], .ship, button.ship")||t.querySelector(".cell-btn, [data-ship], .ship, button.ship"))||null}function Co(t,e){e?(t.classList.add("is-disabled"),t.setAttribute("aria-disabled","true"),t.setAttribute("data-prediction-locked","1")):(t.classList.remove("is-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("data-prediction-locked"))}function ln(t){if(String(t)==="27"||String(t)==="final-0")return Z("final-0");const e=s1[String(t)];if(e){for(const s of e){const i=Z(s);if(i&&!Yl(i))return i}return null}const n=Z(t);return n||null}function o1(t,e){if(!Number.isFinite(e)||e<=0)return null;if(!t){const r=e;return r>=27?Z("final-0"):ln(r)}const{base:n,sub:s}=t;if(n==null)return null;if(n===6||n===12||n===18){if(s==="1"){if(e<=1)return null;const r=n+(e-1);return r>=27?Z("final-0"):ln(r)}if(s==="2"){if(e<=2)return null;const r=n+(e-3);return r>=27?Z("final-0"):ln(r)}}if(n===24){const r=["final-2","final-1"];for(const o of r){const a=Z(o);if(a&&!Yl(a))return a}return null}if(n===23&&e>=4||n===25&&e>=2||n===26&&e>=1)return Z("final-0");const i=n+e;return i>=27?Z("final-0"):ln(i)}function a1(t,e){if(zl(),!Number.isFinite(e)||e<=0)return!1;const n=e,s=r1(t),i=o1(s,n);if(!i)return!1;const r=Gl(i),o=fr(t),a=Vl(t);return r?!r.side||!o||r.side!==o?!1:a&&!r.isMother||!a&&r.isMother?(r.el.closest(".cell-btn")?.classList.add("ta-bump"),!0):!1:(i.classList.add("is-predicted"),!0)}function l1(t){const e=t;return typeof e.composedPath=="function"?e.composedPath():null}function vo(t){return t instanceof Element?t:null}function Eo(t){const e=".cell, .cell-btn, [data-ship], .ship, button.ship",n=l1(t);if(n&&n.length){for(const r of n){const o=vo(r);if(o){const a=o.closest(e);if(a)return a;const l=o.parentElement?.closest(e)??null;if(l)return l}}return null}const s=vo(t.target);if(!s)return null;const i=s.closest(e);return i||(s.parentElement?.closest(e)??null)}function c1(){document.addEventListener("pointerenter",t=>{const e=Eo(t),n=yo(e);if(!n)return;const s=fr(n),i=document.body.getAttribute("data-turn-side");if(i&&s&&i!==s)return;const r=et.getStepsForMove(),o=a1(n,r);Co(n,!o)},!0),document.addEventListener("pointerleave",t=>{const e=Eo(t),n=yo(e);n&&(Co(n,!1),zl())},!0)}function yi(t,e){t.style.pointerEvents="none",t.style.willChange="transform, opacity",t.style.transformOrigin="center center",setTimeout(()=>{t.style.transform="scale(1.2)";const n=t.animate([{transform:"scale(1.2) rotate(0deg)",opacity:1,transformOrigin:"center center"},{transform:"scale(0.1) rotate(1440deg)",opacity:0,transformOrigin:"center center"}],{duration:2e3,easing:"cubic-bezier(.2,.7,.3,1)",fill:"forwards"});n.onfinish=()=>{t.remove(),document.dispatchEvent(new CustomEvent("ship:finalized",{detail:{shipQa:e??null}}))}},1e3)}const ie=25,Le=26,Hn=27,Ql=new Set([6,12,18]),u1=160,d1=100;function h1(){const t=document.querySelector(".board");let e=t.querySelector(".ta-fly-layer");return e||(e=document.createElement("div"),e.className="ta-fly-layer",e.style.position="absolute",e.style.left="0",e.style.top="0",e.style.right="0",e.style.bottom="0",e.style.pointerEvents="none",e.style.zIndex="10",t.style.position||="relative",t.appendChild(e)),e}function Ds(t){const n=document.querySelector(".board").getBoundingClientRect(),s=t.getBoundingClientRect();return{x:s.left-n.left+s.width/2,y:s.top-n.top+s.height/2}}function f1(t){return t===ie?document.querySelector('.board [data-qa="final-2"]'):t===Le?document.querySelector('.board [data-qa="final-1"]'):t>=Hn?document.querySelector('.board [data-qa="final-0"]'):document.querySelector(`.board [data-qa="field-${t}"]`)}function p1(t,e){const n=t==null?1:t+1,s=e,i=[],r=[],o=l=>{const c=f1(l);c&&(i.push(c),r.push(l))},a=Math.min(s,ie-1);for(let l=n;l<=a;l++)o(l);return s===ie?(n<=ie&&o(ie),{nodes:i,indices:r}):s===Le?(n<=ie&&o(ie),n<=Le&&o(Le),{nodes:i,indices:r}):(s>=Hn&&(n<=ie&&o(ie),n<=Le&&o(Le),o(Hn)),{nodes:i,indices:r})}function m1(t){t.classList.add("ta-special-pulse"),setTimeout(()=>t.classList.remove("ta-special-pulse"),300)}function g1(t){const e=t.cloneNode(!0);return e.classList.add("ta-flyer"),e.style.position="absolute",e.style.transform="translate(-50%, -50%)",e.style.transitionProperty="transform",e.style.transitionTimingFunction="linear",e.style.pointerEvents="none",e.style.zIndex="10",e}function Ao(t,e,n){e.style.left=`${n.x}px`,e.style.top=`${n.y}px`,e.isConnected||t.appendChild(e)}function _1(t,e){return new Promise(n=>{let s=!1;const i=()=>{s||(s=!0,t.removeEventListener("transitionend",i),n())};t.addEventListener("transitionend",i,{once:!0}),setTimeout(i,e+30)})}function y1(t,e){return Ql.has(e)?t+d1:t}function C1(t){if(typeof t=="number")return t;if(t==="final-2")return ie;if(t==="final-1")return Le;if(t==="final-0")return Hn;const e=t.match(/(?:field|cell)-(\d+)/);return e?Number(e[1]):NaN}async function Ci(t){const{shipEl:e,fromIndex:n,to:s,stepMs:i=u1,hideOriginal:r=!0}=t,o=C1(s);if(!Number.isFinite(o))return;const a=h1(),{nodes:l,indices:c}=p1(n,o);if(!l.length)return;const h=g1(e);let u;if(n==null)u=Ds(l[0]);else{const f=e.closest('.cell,[data-qa^="field-"],[data-qa^="cell-"],[data-qa^="final-"]');u=Ds(f||l[0])}Ao(a,h,u);const d=e.style.visibility;r&&(e.style.visibility="hidden");for(let f=0;f<l.length;f++){const m=l[f],_=c[f],S=y1(i,_);h.style.transitionDuration=`${S}ms`,Ql.has(_)&&m1(m);const R=Ds(m);Ao(a,h,R),await _1(h,S)}h.remove(),r&&(e.style.visibility=d||"")}function So(t,e){return new Promise(n=>{let s=!1;const i=()=>{s||(s=!0,t.removeEventListener("animationend",i),n())};t.addEventListener("animationend",i,{once:!0}),setTimeout(i,e+50)})}function bo(t){if(!t)return null;const e=t.getAttribute("data-qa")||t.id||t.getAttribute("data-index")||"";if(/^final-0$/.test(e))return 27;if(/^final-1$/.test(e))return 26;if(/^final-2$/.test(e))return 25;const n=e.match(/\b(?:field|cell)-(\d+)\b/)||e.match(/\b(\d+)\b/);return n?Number(n[1]):null}function v1(t){return t>=27?26:t===26?25:t===25?24:Math.max(1,t-1)}async function jl({cellEl:t,outBtn:e,motherBtn:n,spinMs:s=500,popMs:i=200,stepMs:r=160}){const o=n.closest('.cell,[data-qa^="field-"],[data-qa^="cell-"],[data-qa^="final-"]'),a=bo(o),l=bo(t)??27,c=v1(l);(a==null||c>a)&&await Ci({shipEl:n,fromIndex:a,to:c,stepMs:r,hideOriginal:!1}),e.classList.remove("ta-bump"),e.classList.add("swap-out"),await So(e,s),e.remove(),t.appendChild(n),n.classList.add("swap-in"),await So(n,i),n.classList.remove("swap-in")}const Yt={boardCellAny:'.board [data-qa^="field-"], .board [data-qa^="cell-"], .board [data-qa^="final-"], .board .cell[data-index]',shipAny:'.ship, [data-role="ship"], button.ship, .cell-btn, [data-ship]',predicted:'.board [data-qa^="field-"].is-predicted, .board [data-qa^="cell-"].is-predicted, .board [data-qa^="final-"].is-predicted, .board .cell.is-predicted',bump:".board .cell-btn.ta-bump, .board .ta-bump"},wo={"final-2":25,"final-1":26,"final-0":27},cn={stepMs:160,replaceSpinMs:500,replacePopMs:180};function Kl(t){if(!t)return null;if(t in wo)return wo[t];const e=t.match(/(?:^|\s)(?:field|cell)-(\d+)/)?.[1]||t.match(/\d+/)?.[0];return e?Number(e):null}function Io(t){if(!t)return null;const e=t.getAttribute("data-qa")||t.getAttribute("data-index")||"",n=Kl(e);if(n!=null)return n;const s=t.getAttribute("data-index");return s&&/^\d+$/.test(s)?Number(s):null}function E1(t){return t>=27?26:t===26?25:t===25?24:Math.max(1,t-1)}function pr(t){const e=t.getAttribute("data-side")||t.dataset?.side||"";if(e==="left"||e==="right")return e;const s=(t.getAttribute("data-qa")||"").match(/^(p[12])-/)?.[1];return s==="p1"?"left":s==="p2"?"right":t.classList.contains("left")?"left":t.classList.contains("right")?"right":null}function Pe(t){const e=pr(t);e&&t.setAttribute("data-side",e)}function Jl(t){if(!t)return!1;if(t.matches('[data-role="mother"],[data-ship="mother"],[data-mother="1"],.mother-ship'))return!0;const e=t.getAttribute("data-qa")||"";return/-cell-8$/.test(e)}function A1(t){if(!t)return null;const e=t.querySelector(Yt.shipAny);return e?(Pe(e),{el:e,side:pr(e),isMother:Jl(e)}):null}function S1(){return document.querySelector(Yt.predicted)}function b1(){const t=document.querySelector(Yt.bump);return t?t.closest(Yt.boardCellAny):null}function Ps(){document.querySelectorAll(".board .is-predicted").forEach(t=>t.classList.remove("is-predicted")),document.querySelectorAll(".board .ta-bump").forEach(t=>t.closest(".cell-btn")?.classList.remove("ta-bump"))}function To(t,e,n){t instanceof HTMLButtonElement&&(t.disabled=e),t.classList.toggle("is-disabled",e),e&&n?t.setAttribute("data-disabled-reason",n):t.removeAttribute("data-disabled-reason"),t.setAttribute("aria-disabled",String(e))}function Ms(t,e){To(t,!0,e),setTimeout(()=>To(t,!1),400)}function Ls(t){document.dispatchEvent(new CustomEvent("shipmove:done",{detail:t}))}let Ro=0,No=!1;function w1(){No||(No=!0,document.addEventListener("click",async t=>{const e=Date.now();if(e-Ro<120)return;Ro=e;const n=t.target?.closest(".cell-btn, [data-ship], .ship, button.ship");if(!n)return;Pe(n);const s=et,i=s.getStepsForMove?.()??null,r=s.getSelectedIndices?.()??[];if(!Number.isFinite(i)||i<=0||r.length===0)return;const o=S1(),a=b1(),l=o||a;if(!l){Ms(n,"no-prediction");return}const c=n.closest(Yt.boardCellAny),h=Io(c),u=pr(n),d=Jl(n),f=A1(l);if(f){if(!u||!f.side||f.side!==u){Ms(n,"blocked");return}if(d&&!f.isMother){try{await rn(J(),r),s.consumeCurrent?.()}catch{return}Ps();const R=f.el.closest(".cell-btn")||f.el;Pe(R),Pe(n);const U=n.getAttribute("data-qa")||null,O=l.getAttribute("data-qa")||l.getAttribute("data-index")||"";Ls({shipQa:U,fromIndex:h,toIndex:O,usedStep:i,finalizedQa:R.getAttribute("data-qa")||null,finalizedToIndex:"final-0",moveKind:"replaceOwn"}),await jl({cellEl:l,outBtn:R,motherBtn:n,spinMs:cn.replaceSpinMs,popMs:cn.replacePopMs}),l.getAttribute("data-qa")==="final-0"&&yi(n,U);return}if(!d&&f.isMother){const R=l.getAttribute("data-qa")||l.getAttribute("data-index")||"",U=Kl(R)??NaN,O=E1(U);if(h==null||O>h){try{await rn(J(),r),s.consumeCurrent?.()}catch{return}await Ci({shipEl:n,fromIndex:h,to:O,stepMs:cn.stepMs,hideOriginal:!1})}else try{await rn(J(),r),s.consumeCurrent?.()}catch{return}const oe=n.getAttribute("data-qa")||null;Ls({shipQa:oe,fromIndex:h,toIndex:R,usedStep:i,finalizedQa:oe,finalizedToIndex:"final-0",moveKind:"overMother"}),await(async function(j,G){Pe(G);const mt=j.querySelector(".cell-btn");mt?.classList.remove("ta-bump"),G.classList.add("is-overlay","over-spin"),Pe(mt||G),j.appendChild(G),await new Promise(hs=>{let mr=!1;const fs=()=>{mr||(mr=!0,G.removeEventListener("animationend",fs),hs())};G.addEventListener("animationend",fs,{once:!0}),setTimeout(fs,350)}),G.remove()})(l,n),Ps();return}Ms(n,"blocked");return}try{await rn(J(),r),s.consumeCurrent?.()}catch{return}Ps(),Pe(n);const m=Io(l)??NaN;await Ci({shipEl:n,fromIndex:h,to:m,stepMs:cn.stepMs}),l.appendChild(n);const _=n.getAttribute("data-qa")||null,S=l.getAttribute("data-qa")||l.getAttribute("data-index")||"";Ls({shipQa:_,fromIndex:h,toIndex:S,usedStep:i,moveKind:S==="final-0"?"finalize":"move"}),l.getAttribute("data-qa")==="final-0"&&yi(n,_)},!0))}function I1(t){return t.moveKind?t.moveKind:t.finalizedQa&&t.finalizedToIndex==="final-0"?t.finalizedQa===t.shipQa?"overMother":"replaceOwn":t.toIndex==="0"||/final-0/.test(t.toIndex)?"finalize":"move"}function Xl(t){document.addEventListener("shipmove:done",n=>{(async()=>{const i=n.detail,r=Math.random().toString(36).slice(2)+Date.now().toString(36),o=I1(i),a=i.shipQa?.startsWith("p1-")?"left":"right",l=i.fromIndex===null?null:i.fromIndex===27?"final-0":`field-${i.fromIndex}`,c=i.toIndex==="0"?"final-0":/^\d+$/.test(i.toIndex)?`field-${i.toIndex}`:i.toIndex,h=c==="field-25"?"final-2":c==="field-26"?"final-1":c,u=i.shipQa||"",d=`rooms/${t}/ships/${a}/${u}`,m={[`rooms/${t}/events/${r}`]:{id:r,type:o,side:a,shipId:u,from:l,to:h,usedStep:i.usedStep,ts:sp(),ttl:12e4,applied:!0}};if(o==="overMother")m[d]="final-0";else if(o==="replaceOwn"){if(m[d]=h,i.finalizedQa){const _=i.finalizedQa.startsWith("p1-")?"left":"right";m[`rooms/${t}/ships/${_}/${i.finalizedQa}`]="final-0"}}else m[d]=h;await Ke(ue(Se),m)})()},!1);const e=ue(Se,`rooms/${t}/events`);zf(e,async n=>{const s=n.val();if(s)try{if(s.type==="replaceOwn"){const i=xs(s.to),r=i?.querySelector('.cell-btn:not([data-qa$="cell-8"])'),o=un(s.shipId);i&&r&&o&&await jl({cellEl:i,outBtn:r,motherBtn:o,spinMs:500,popMs:180})}else if(s.type==="overMother"){const i=xs(s.to),r=un(s.shipId);i&&r&&await T1(i,r)}else if(s.type==="finalize"){const i=un(s.shipId);yi(i,s.shipId)}else if(s.type==="move"){const i=xs(s.to),r=un(s.shipId);i&&r&&i.appendChild(r)}}finally{setTimeout(()=>{yl(ue(Se,`rooms/${t}/events/${s.id}`)).catch(()=>{})},s.ttl??12e4)}})}function xs(t){if(/^final-(0|1|2)$/.test(t))return document.querySelector(`.board [data-qa="${t}"]`)||document.getElementById(t);const e=t.replace(/^field-/,"");return e==="25"?document.querySelector('.board [data-qa="final-2"]')||document.getElementById("final-2"):e==="26"?document.querySelector('.board [data-qa="final-1"]')||document.getElementById("final-1"):document.querySelector(`.board [data-qa="field-${e}"]`)||document.querySelector(`.board [data-qa="cell-${e}"]`)||document.querySelector(`.board [data-qa="${e}"]`)||document.querySelector(`.board .cell[data-index="${e}"]`)||document.getElementById(`field-${e}`)||document.getElementById(`cell-${e}`)}function un(t){return document.querySelector(`.cell-btn[data-qa="${t}"], [data-qa="${t}"].cell-btn`)}async function T1(t,e){t.querySelector(".cell-btn")?.classList.remove("ta-bump"),e.classList.add("is-overlay","over-spin"),t.appendChild(e),await R1(e,600),e.remove()}function R1(t,e){return new Promise(n=>{let s=!1;const i=()=>{s||(s=!0,t.removeEventListener("animationend",i),n())};t.addEventListener("animationend",i,{once:!0}),setTimeout(i,e+50)})}const N1={left:Array.from({length:8},(t,e)=>`p1-cell-${e+1}`),right:Array.from({length:8},(t,e)=>`p2-cell-${e+1}`)},dn=(t,e)=>qt(t,e).then(()=>{}).catch(()=>{});function k1(t){const e=t.filter(s=>Number.isFinite(s)&&s>0),n=new Set;e.forEach(s=>n.add(s));for(let s=0;s<e.length;s++)for(let i=s+1;i<e.length;i++)n.add(e[s]+e[i]);return e.length>1&&n.add(e.reduce((s,i)=>s+i,0)),Array.from(n).sort((s,i)=>s-i)}function ko(t,e){const n=t.ships?.[e]||{},s={};for(const i of N1[e])s[i]=n[i]??"hand";return s}function Be(t){return t.endsWith("-cell-8")}function D1(t){const e=String(t);if(e==="hand")return{base:null,sub:null};if(e==="final-2")return{base:25,sub:null};if(e==="final-1")return{base:26,sub:null};if(e==="final-0"||e==="final")return{base:27,sub:null};const n=e.match(/^field-(\d+)(?:-(\d))?$/);return n?{base:Number(n[1]),sub:n[2]??null}:{base:null,sub:null}}function P1(t){return t>=27?"final-0":t===26?"final-1":t===25?"final-2":`field-${t}`}function hn(t){return t>=27?"final-0":t===24?null:P1(t)}function Do(t){const e=new Map;for(const[n,s]of Object.entries(t)){const i=String(s);if(i==="hand")continue;const r=e.get(i)||[];r.push(n),e.set(i,r)}return e}function M1(t,e){return t==="final-0"?!1:(e.get(t)?.length||0)>0}function Zl(t,e,n){if(t==="final-0")return!0;const s=n.get(t)||[];if(s.length===0)return!0;if(s.length>=2)return!1;const i=s[0];return Be(e)&&!Be(i)||!Be(e)&&Be(i)}function L1(t,e){if(!Number.isFinite(e)||e<=0)return null;const{base:n,sub:s}=D1(t);if(n===null){const r=e;return r>=27?"final-0":r===24?null:hn(r)}if(n===24)return null;if(n===6||n===12||n===18){if(s==="1"){if(e<=1)return null;const r=n+(e-1);return r>=27?"final-0":r===24?null:hn(r)}if(s==="2"){if(e<=2)return null;const r=n+(e-3);return r>=27?"final-0":r===24?null:hn(r)}}if(n===23&&e>=4||n===25&&e>=2||n===26&&e>=1)return"final-0";const i=n+e;return i===24?null:i>=27?"final-0":hn(i)}function x1(t){return/^field-(6|12|18)$/.test(t)}function O1(t,e,n,s){const i=[`${t}-1`,`${t}-2`];for(const r of i)if(!((s.get(r)?.length||0)>0)&&Zl(r,e,n))return r;return null}function $l(t,e,n,s,i,r){if(e==="hand"&&!r&&Be(t))return!1;const o=Do(s),a=Do(i);for(const l of n){let c=L1(e,l);if(c){if(c==="final-0")return!0;if(x1(c)){const h=O1(c,t,o,a);if(!h)continue;c=h}if(!M1(c,a)&&Zl(c,t,o))return!0}}return!1}function B1(t,e,n){const i=!Object.entries(t).some(([r,o])=>!Be(r)&&String(o)==="hand");return Object.entries(t).some(([r,o])=>$l(r,o,n,t,e,i))}function F1(t,e){const n=e==="left"?"right":"left",s=ko(t,e),i=ko(t,n),r=t.isTurn,o=e==="left"?0:1,a=t.players?.[o]?.diceStreak??[],l=k1(a),c=B1(s,i,l);return{side:e,turnSide:r,isPlayersTurn:r===e,stepsStrike:a,availableSteps:l,shipsMine:s,shipsOpp:i,canMove:c}}function H1(t){const e=Object.entries(t.shipsMine).sort(([s],[i])=>s.localeCompare(i)),n=Object.entries(t.shipsOpp).sort(([s],[i])=>s.localeCompare(i));return JSON.stringify({turnSide:t.turnSide,stepsStrike:t.stepsStrike,availableSteps:t.availableSteps,shipsMine:e,shipsOpp:n,canMove:t.canMove})}function W1(t,e,n){const i=!Object.entries(t).some(([o,a])=>!Be(o)&&String(a)==="hand"),r={};for(const[o,a]of Object.entries(t)){const l=$l(o,a,n,t,e,i);r[o]=l?"canMove":"blocked"}return r}function U1(t){let e=null,n,s=null;const i=ns(t,async r=>{if(!r)return;const o=r.isTurn;if(!o)return;const a=F1(r,o);H1(a),n!==a.turnSide&&n!==void 0&&(await dn(t,{"shipsState/left":null,"shipsState/right":null,"currentStepsStrike/left":[],"currentStepsStrike/right":[],"canPlayerMoveShips/left":null,"canPlayerMoveShips/right":null}),e=null),n=a.turnSide;const l=JSON.stringify(a.stepsStrike);if((!s||s.side!==o||s.json!==l)&&(await dn(t,{[`currentStepsStrike/${o}`]:a.stepsStrike}),s={side:o,json:l}),r.lastDiceResult!==6&&a.stepsStrike.length>0){const u=W1(a.shipsMine,a.shipsOpp,a.availableSteps),d={};for(const[m,_]of Object.entries(u))(!e||e[m]!==_)&&(d[`shipsState/${o}/${m}`]=_);Object.keys(d).length&&(await dn(t,d),e=u);const f=Object.values(u).some(m=>m==="canMove");await dn(t,{[`canPlayerMoveShips/${o}`]:f})}});return typeof i=="function"?i:()=>{}}function q1(t){let e,n=!1;const s=ns(t,i=>{if(!i)return;const r=i.isTurn;if(!r){e=void 0,n=!1;return}e&&e!==r&&(n=!1),e=r;const o=i.canPlayerMoveShips?.[r];if(o==null){n=!1;return}if(o===!1&&!n){const a=r==="left"?"Гравець Left заблокований":"Гравець Right заблокований";_p(t),pe({duration:Nl,text:`${a} — SIMPLE`,type:z.HELPER_WARNING,delayBeforeShow:i.isDiceRolling?ls+300:300,priority:0,dedupeKey:`blocked:${r}`}),n=!0}});return()=>{s?.()}}function Po(t,e){const n=t.ships?.[e];if(!n)return!1;const s=e==="left"?"p1":"p2",i=new RegExp(`^${s}-cell-\\d+$`),r=Object.entries(n).filter(([o,a])=>i.test(o)&&a!=null).map(([,o])=>String(o).trim());return r.length!==8?!1:r.every(o=>o==="final-0")}function V1(t){let e=null;const n=ns(t,s=>{if(!s){e=null;return}const i=s,r=Po(i,"left"),o=Po(i,"right");let a=null;r?a="left":o&&(a="right"),a&&e!==a&&(pe({duration:4e3,text:re("helper.win",{side:a}),type:z.HELPER_INFORM,priority:10,dedupeKey:`win:${a}`,delayBeforeShow:0}),e=a),a||(e=null)});return()=>{n?.()}}const G1="/Testing_game/assets/background-music-z-IQj7jW.mp3",Mo=[];function Y1(t){switch(t){case ye.RESET:return z.HELPER_OFFER;case ye.INFORM:return z.HELPER_INFORM;case ye.WARNING:return z.HELPER_WARNING;case ye.HINT:default:return z.HELPER_HINT}}function z1(t){for(const e of t)Mo.includes(e.id)||e.authorName!==Oe()&&(Mo.push(e.id),pe({duration:e.duration,text:e.text,type:Y1(e.type),..._i}))}function Q1(t){const e=Math.max(0,t.thresholdSec??20);let n=!1,s=Number.POSITIVE_INFINITY,i=!1;const r=()=>typeof t.getRemainingSec=="function"?t.getRemainingSec():s,o=()=>{if(i||n||!t.getIsMyTurn())return;const u=r();if(!Number.isFinite(u)||u>e||!t.getIsStrikeEmpty())return;const d=t.mainBtn,f=d.classList.contains("disabled"),m=d.getAttribute("data-type")==="end-turn";f||!m||(console.log("WE CAN END TURN"),n=!0,d.click())};return{onTick:u=>{s=Math.max(0,u),o()},notifyStrikeChanged:()=>{o()},reset:()=>{n=!1,s=Number.POSITIVE_INFINITY},destroy:()=>{i=!0}}}const j1=15e3,M=document.getElementById("main-btn");let B,Lo=!1,xo=!1;const Oo=[];let vt=!1,Et,F,fn=null,pn=null,mn=null,gn=null,At=null,Ne=null,Os=!1;const{startSound:K1}=tn({src:G1,loudness:.4,infinite:!0}),J1=()=>window.dispatchEvent(new Event("coin:start")),X1=()=>window.dispatchEvent(new Event("coin:end")),St=(t,e)=>qt(t,e).catch(()=>{}),Bo=(t,e,n)=>up(t,e,n).catch(()=>{});function Z1(){return F??"left"}function $1(t){const e=t.id;pe({duration:jp,text:re("helper.welcome"),type:z.HELPER_HINT,priority:-2,dedupeKey:"welcome",delayBeforeShow:0}),fn?.(),fn=null,pn?.(),pn=null,mn?.(),mn=null,gn?.(),gn=null,At&&(M.removeEventListener("click",At),At=null),Sm(),et.mountBefore(M),c1(),w1(),K1();const n=Xl(String(e));typeof n=="function"&&(fn=n,window.addEventListener("beforeunload",()=>{fn?.()},{once:!0})),pn=U1(e),mn=q1(e),gn=V1(e),window.addEventListener("beforeunload",()=>{pn?.(),mn?.(),gn?.(),Ne?.destroy(),Ne=null},{once:!0}),Ne||(Ne=Q1({mainBtn:M,thresholdSec:20,getIsMyTurn:()=>!B||!F?!1:B.isTurn===F,getIsStrikeEmpty:()=>{const s=B?.isTurn;if(!B||!s)return!1;const i=B.currentStepsStrike?.[s];return i?Array.isArray(i)?i.length===0:Object.keys(i).length===0:!0}})),ns(e,async s=>{if(!s)return;const i=B,r=s;B=s,i?.isTurn!==s.isTurn&&Ne?.reset(),i?.timerState!==s.timerState&&(Os=!1),z1(s.actions||[]),Bm(r.lastResetOffer),s.restartRoomId&&(bl(s.restartRoomId),window.location.reload()),Xm(i?.timerState,s.timerState,F===s.isTurn,{onTick:y=>Ne?.onTick(y),thresholdSeconds:45,onThreshold:()=>{Os||!F||F!==s.isTurn||!M||M.classList.contains("disabled")||s.isDiceRolling||M.getAttribute("data-type")!=="dice"||(Os=!0,M.click())}}),Et||(Et=mp(),_o(s,Et));const o=s.players.findIndex(y=>y.id===Et),a=o>=0,l=a?o===0?"left":"right":null,c=s.players.length===2,u=(i?.players?.length??0)<2&&c,d=o===0;if(a){F=l;const y=F,j=y==="left"?"right":"left";document.body.dataset.mySide=y,document.body.setAttribute("data-my-side",y),document.body.setAttribute("data-opponent-side",j)}if(s.suggestRestartSide&&s.timeWhenSuggestRestart&&F){const y=new Date(s.timeWhenSuggestRestart).getTime(),j=s.suggestRestartSide===F,G=document.querySelector(`[data-my-side="${F}"] .game-menu`);if(G){const mt=G.querySelector(".gm-timer"),hs=!!mt&&!mt.classList.contains("is-hidden");gi(G),hs||Wl(G,y,1e4,!j)}}else document.querySelectorAll(".game-menu").forEach(j=>Me(j));document.body.classList.remove("side-left","side-right"),F&&document.body.classList.add(`side-${F}`),s.players.length>=1&&!Lo&&(Ym(s.players[0],F),Lo=!0),s.players.length>=2&&!xo&&(zm(s.players[1],F),_o(s,Et),xo=!0);const f=r.coin,m=i?.coin,_=i?.coinShown,S=r.coinShown;let R=s.isTurn;if(u&&d&&!r.coinInitialized){const y=f?.result??ur();R=y,document.body.setAttribute("data-turn-side",y),a&&y===l?(M.classList.remove("disabled"),document.body.classList.remove("not-my-turn"),document.body.setAttribute("data-turn-active","1")):(M.classList.add("disabled"),document.body.classList.add("not-my-turn"),document.body.setAttribute("data-turn-active","0")),await St(e,{isTurn:y,coin:{result:y,shown:!0,at:new Date().toISOString()},coinShown:!0,timerState:new Date().toISOString(),coinInitialized:!0})}if((!u||u&&r.coinInitialized)&&document.body.setAttribute("data-turn-side",R||""),c&&((!m||!m?.shown)&&f?.shown&&f?.result||!_&&S&&s.isTurn)){const y=f?.result??R;J1(),Tm(y,F||"left",s),Im(y),setTimeout(()=>X1(),cr)}s.phrases&&s.phrases.length!==(i?.phrases?.length??0)&&s.phrases.forEach(y=>{Oo.includes(y.id)||(Hp(y),Oo.push(y.id))}),s.isDiceRolling?document.body.classList.add("steps-hidden"):document.body.classList.remove("steps-hidden"),!vt&&s?.lastDiceResult&&s?.isDiceRolling?(vt=!0,Mm(s.lastDiceResult),xm(s,F||"left",s.lastDiceResult)):vt&&!s?.isDiceRolling&&(vt=!1);const O=R?R==="left"?0:1:-1;if(a&&c&&O!==-1&&o===O?(M.classList.remove("disabled"),document.body.classList.remove("not-my-turn"),document.body.setAttribute("data-turn-active","1")):(M.classList.add("disabled"),document.body.classList.add("not-my-turn"),document.body.setAttribute("data-turn-active","0")),a){const y=s.currentStepsStrike?.[l||"left"],j=Array.isArray(y)?y:y?Object.values(y):[],G=c&&O!==-1&&o===O&&!s.isDiceRolling&&!!y&&(Array.isArray(y)?y.length>0:Object.keys(y).length>0);et.render(j,G)}else et.clear();const oe=s.isTurn;if(oe){const y=s.currentStepsStrike?.[oe];(y?Array.isArray(y)?y.length===0:Object.keys(y).length===0:!0)&&Ne?.notifyStrikeChanged()}}),St(e,{gameStarted:!0,isDiceRolling:!1,lastDiceResult:-1}),At=()=>{if(vt||M.classList.contains("disabled")||B?.players.length!==2){pe({duration:Nl,text:re("helper.notYourTurn"),type:z.HELPER_WARNING,priority:-1,dedupeKey:"not-your-turn",delayBeforeShow:0});return}const s=M.getAttribute("data-type"),i=B.isTurn?B.isTurn==="left"?0:1:-1;if(s==="dice"){const r=Math.floor(Math.random()*6)+1;document.body.classList.add("steps-hidden"),St(e,{isDiceRolling:!0,lastDiceResult:r}),i!==-1&&Bo(e,B.isTurn,{diceHistory:[...B.players[i].diceHistory??[],r],diceStreak:[...B.players[i].diceStreak??[],r===6?5:r]}),setTimeout(()=>{St(e,{isDiceRolling:!1}),r!==6?(M.innerText="Закінчити хід",M.setAttribute("data-type","end-turn")):B?.timerState&&qt(e,{timerState:Zm(B?.timerState,j1)})},ls)}else if(s==="end-turn"){Bo(e,B.isTurn,{diceStreak:[]}),qt(e,{currentStepsStrike:{left:[],right:[]}}),et.clear();const r=B?.isTurn==="left"?"right":"left";St(e,{isTurn:r,timerState:new Date().toISOString()}),M.innerText="",M.setAttribute("data-type","dice"),ri(e,{type:ye.HINT,endsAt:mi(lo),duration:lo,text:re("helper.otherPlayerTurnEnded"),authorName:Oe()})}},M.addEventListener("click",At)}const eg=1e3,ec=document.querySelector("#room-field"),tc=document.querySelector("#create-room-btn"),cs=document.querySelector("#home"),us=document.querySelector("#form-section"),nc=document.querySelector("#table"),tg=document.querySelector("#game");function ng(){ec.classList.add("is-hidden"),tc.classList.add("is-hidden"),cs.classList.add("is-hidden"),us.classList.remove("is-hidden"),nc.classList.remove("is-hidden"),document.body.style.backgroundImage=`url(${Dl})`}function sg(){nc.classList.add("is-hidden"),cs.classList.add("is-hidden"),us.classList.remove("is-hidden"),ec.classList.remove("is-hidden"),tc.classList.remove("is-hidden"),document.body.style.backgroundImage=`url(${Dl})`}function ds(t){cs.classList.add("is-hidden"),us.classList.add("is-hidden"),tg.classList.remove("is-hidden"),$1(t)}function Fo(){cs.classList.remove("is-hidden"),us.classList.add("is-hidden"),document.body.style.backgroundImage=`url(${im})`}const{startSound:ig}=tn({src:sm,infinite:!1,loudness:.9});function Fe(t){Xp(),ig(),setTimeout(()=>{t(),Zp()},eg)}async function Ho(){const t=document.getElementById("room-name"),e=os(),n=ur(),s={id:be(),name:t.value||`Room-${be()}`,players:[],gameStarted:!1,isDiceRolling:!1,lastDiceResult:-1,timerState:new Date().toISOString(),isTurn:n,coinShown:!0,coin:{result:n,shown:!0,at:new Date().toISOString()}};return ss(s.id),await Al(s,e),Xl(String(s.id)),Fe(()=>ds(s)),s}async function rg(){const t=document.getElementById("room-name"),e=os(),n=ur(),s={id:be(),name:t.value||`Room-${be()}`,players:[],gameStarted:!1,isDiceRolling:!1,lastDiceResult:-1,timerState:new Date().toISOString(),isTurn:n,coinShown:!0,coin:{result:n,shown:!0,at:new Date().toISOString()}};return bl(s.id),await Al(s,e,!0),s}const og=document.querySelector("#back-to-home"),ag=document.querySelector("#form");function lg(){const t=document.querySelector("#navigation-create-room-btn"),e=document.querySelector("#navigation-select-room-btn"),n=document.querySelector("#navigation-fast-game-btn");t.addEventListener("click",()=>{Fe(sg)}),e.addEventListener("click",()=>{Fe(ng)}),ag.addEventListener("submit",s=>{s.preventDefault(),Ho()}),og.addEventListener("click",()=>{Fe(Fo)}),n.addEventListener("click",async()=>{if(!n.disabled){n.disabled=!0;try{const s=os(),r=(await cp()).filter(o=>(Array.isArray(o.players)?o.players:[]).length<2);if(r.length){const o=r.reduce((a,l)=>!l.date||!Array.isArray(l.players)?a:new Date(l.date)<new Date(a.date)?l:a);if(o.players&&o.players[0])for(;o.players[0].color===s.color;)s.color=kl();await rr(s,o.id),ss(o.id),Fe(()=>ds(o))}else Ho()}catch(s){alert("Failed fast game: "+s)}}}),Fo()}function cg(t){const e=new Date,n=new Date(t),s=Math.floor((e.getTime()-n.getTime())/1e3),i=Math.floor(s/60),r=Math.floor(i/60),o=Math.floor(r/24);return s<60?`${s} секунд${s===1?"":"s"} тому`:i<60?`${i} хвилин${i===1?"":"s"} тому`:r<24?`${r} годин${r===1?"":"s"} тому`:`${o} днів${o===1?"":"s"} тому`}const _n=document.getElementById("table");function ug(){lp(dg)}function dg(t){_n.innerHTML="";let e="";if(!t.length){_n.innerHTML=`
      <h2 class="rooms-not-found" data-lng="noRooms"></h2>
    `,Vt();return}t.forEach(s=>{const i=Array.isArray(s.players)?s.players:[],r=i.find(a=>a.id===s.authorId),o=ct.find(a=>a.id===r?.avatar)||ct[0];e+=`
    <tr class="select-room-button" style="--author-color: ${r?.color||"#ccc"}" data-room-id="${s.id}">
      <td><img src="${o.img}" alt="${r?.name||"Unknown"}'s avatar"></td>
      <td>${s.name||"Unknown"}</td>
      <td>${r?.name||"Unknown"}</td>
      <td>${cg(String(s.date))}</td>
      <td>${i.length}/2</td>
    </tr>
  `}),_n.innerHTML=`
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
  `,_n.querySelectorAll(".select-room-button").forEach(s=>{s.addEventListener("click",async()=>{const i=Number(s.getAttribute("data-room-id"));if(ss(i),i){const r=os();try{await rr(r,i);const o=await Sl(i);o?Fe(()=>ds(o)):alert("Room not found.")}catch(o){alert(`Error during joining room: ${o}`);return}}})}),Vt()}const hg=document.getElementById("avatar-menu");let Bs;function fg(){pg()}function pg(){const t=Re();ct.forEach(e=>{const n=document.createElement("div");n.classList.add("avatar-item"),n.setAttribute("data-id",String(e.id));const s=document.createElement("img");s.src=e.img,t&&t.avatar&&t.avatar==e.id&&n.classList.add("is-selected"),n.appendChild(s),n.addEventListener("click",()=>{mg(n)}),hg.append(n)})}function mg(t){Bs||(Bs=[...document.querySelectorAll(".avatar-item")]),Bs.forEach(n=>{n.classList.remove("is-selected")});const e=Re();is({...e,avatar:t.getAttribute("data-id")}),t.classList.add("is-selected")}const gg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM6SURBVHgB7ZlLaxNRFMfPnUda06LVtj4QLIhFtBVRbGsRVMRlCoJfoO3CduHXcaEuIqLgyo2ubdz0aRCEbkyioqBoU6tgJs5MZq7nTjJJKHk4d+6dbuYHWSSZJP9z/uecO/cGICYmJmYvIRA9Gj4qh05eSavavllK3UJx/+8zkM06+DqtPf6bqAPwxB8Zn1l2TGOaug6KpiTRN2h9M94NQD5fwfedIF+oQHR44g+Pp1B8aZrSiovpU4EQxSr97BlKjL6FgOIZUQVQF++yzFPHRfObfptSFZTjwEEUAVTFj7UVb2s9/Ypl7CwAB7ID8MQfHZ9Zca3W4tVEn+6Y5Ts7n5af1a4PhMwAag2bWq6YpcvtxLu2uVgsvHqIL+jsegiIrClUFT+WWnUsY6qteLO8UCwsPYCqeBs4kOGAPypXOor3Mh9OvP9jImmI71Q2Fcx8Lrx4hgriqDdsR/GmsVjMZ4SIZ4gKoJr5s6xsumReoHiGiB5oZN7uMm3eLwkVzwg7hRqZt7tkXoJ4RpgSamS+U9nYWPO5jBTxDF4HaplPYeaNbuLvgyTxDB4HvBWTrbBOu9sDHcVb4hu2FTzrgD10+uZTxyq3EA+OqvXq6Mrd7YJ88QyuKaTqvbeqmxGy6/NEpUAfb+cz9/DJPpAs3tMCHPQPjJynQM4BuMyBpj4iDlG0C8kDI1+NnY9rUHXYBYnwNLFXFjg613F0TrRrYGqX5rdyr9MguYxCTaHhsZl1anUKwpjbymUe+deDBHhXYiZG29p8MYk78jeEqPg9tKlUiI5rg030ZHp49Nqcfz1IQMhKvJdOhL0XanIimW3rhIZOnLo6DxKcELUj853YQCcuRemEqB2Z78SE2rUnbgjtCdF74qBOhB6xovfEAZzwphMTH8oJqacSUTgh83A3ksaWebAVoJyuzwJnY0dxvO4fcq3h/mGytRP9uvV3+/avD6vPISBRHO56mf2++XJKTSQ3Wjph/nESvYNp4CCq43U/iEkMYn1XEHhnDgp13c/AQZR/cNSd8G4AFQyCsj80KPQkD5ZP9P24CBz7kygDYNQbGyv/iaISFQMpHNO/DGSzWeaI1M1PTExMjHj+AcfQWAyPO7ekAAAAAElFTkSuQmCC",_g="data:image/png;base64,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",yg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABLCAYAAADakmGTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANDSURBVHgB7dpNTxNBGAfw/2xb0QpFLYhwIiH4RqImeNRYD+hVE4lHuHjzwEHjlegn4GY8aeKNb2A0Vq/GhJh4UGokmmgiSFWwiO3u4zOFxUKXtrx1n4bnd6DtdLps/jszO7O7gFJKKaWUUkoppZRSSimllFJKKaWUUkoppdRGmaDC/v7+2Fd0xez7+M+Cm2uNRta+Bn23lfr+/y793InOfEvLe0qn0wUIURZYsid1k0uv8VftAHm2DleKE5DjdwYexfk1ByKX6zkgNMPQL8CJBNSf5/odXG+ey/avbIM8t6R+C29jeU/Mb95u3K8PMnPkIENebGT2w5PPEGBVYIdOXuzDX3rBhUmIYTwC3ZvNpO4Cox5C5pR+INeJFI+sKOQ4BmclhGWtCiz77tkbDuwxhCHCAgYHIxDAWVswk0nf4I76CILwqFfA+LgLAZygwu+T6WFZoZmE2BbmkxQaD/oLEMKp9KWU0HhcbYIQTrUKEkLjadofCFE1MCvs0LiF7RM96AcJNTQPc+IH/SBNBre4e3xEnfHyKNZwLcwqUCHBC8G6L5sM8Tys0VpY27GBLpei94tzovprhRA1BWbDIjf/kN8OIAwGbsN0ydDDgvC1ZCkJYVni15KWlLCWCF9LygrLXpelbxCiLDBpYVncJQ+K7JISw1piFsV1SblhFZGoFiY8LDuvIDEtrOPUpcOiw0JxLRkV08LchcUhCA7LMp6ktSQZYbfVyhVbmBAbuloRFr6AuLchL++ExsN8Q15ADI3dy93cwvgi5Ev+86rmHxDX3q0tzDPmTnPBXD6yp/1crfcIyD7VI0SU12lTRKgLMridTfSOZV8/yC8XDSd7UzaRoUq/M4baJXXJCdSBDWs2cXQM/8MqquVuFB9QOWvJ6cn0BO/wFHbQemH5qoVmjCNrWsF3ZXbsfmO1sHyVQ+Opq6RBfyaTHqUd6Jq1huVbLzQC5SDEylnSi+Iqv/zANtloWL6g0BwyOYz31enUVNmqZ1wPHE91R1w850PajS3YbFilkj0Xxnjsus5b++I2Ra9k3z79BAHKnqJeDm202ql+PdsRlq/txPnOmY7INCQ/du4rBpfHCM/TTnNfOGOLUMV2hiXVP0oBlmWGUGFSAAAAAElFTkSuQmCC";function Cg(){const t=[...document.querySelectorAll(".cell--arrow")],e=[...document.querySelectorAll(".cell--double-arrow")],n=document.querySelector(".cell--start");if(t.forEach(s=>{const i=document.createElement("img");i.src=gg,i.alt="Arrow",s.appendChild(i)}),e.forEach(s=>{const i=document.createElement("img");i.src=_g,i.alt="Double arrow",s.appendChild(i)}),n){const s=document.createElement("img");s.src=yg,s.alt="Start arrow",n.appendChild(s)}}const vg="/Testing_game/assets/astronaut-BZusMVgG.png",Eg="/Testing_game/assets/planet1-DCkJW2Zp.png",Ag="/Testing_game/assets/comet-Ba75elL3.png",Sg="/Testing_game/assets/rocket-BO2zcYnT.png",bg="data:image/png;base64,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",wg="/Testing_game/assets/dice-CbYfOLls.png",Ig="data:image/png;base64,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",Tg="data:image/png;base64,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",Rg="data:image/png;base64,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",Ng="data:image/png;base64,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",Wo=document.querySelector(".astronaut"),Uo=document.querySelector(".planet-1"),qo=document.querySelector(".comet"),Vo=document.querySelector(".rocket"),Go=document.querySelector(".star");function kg(){Wo&&(Wo.style.backgroundImage=`url(${vg})`),Uo&&(Uo.style.backgroundImage=`url(${Eg})`),qo&&(qo.style.backgroundImage=`url(${Ag})`),Vo&&(Vo.style.backgroundImage=`url(${Sg})`),Go&&(Go.style.backgroundImage=`url(${bg})`);const t=document.createElement("style");t.textContent=`
    #main-btn[data-type="dice"]::after {
      background-image: url(${wg});
    }

    #mute-btn[data-is-muted="true"]::after {
      background-image: url(${Ig});
    }

    #mute-btn[data-is-muted="false"]::after {
      background-image: url(${Tg});
    }

    #helper-btn::after {
      background-image: url(${Rg});
    }

    #helper-btn.is-off::after {
      background-image: url(${Ng});
    }
  `,document.head.appendChild(t)}const Dg=document.querySelector("#color-palette");let Fs;function Pg(){const t=Re();li.forEach(e=>{const n=document.createElement("span");n.classList.add("color-item"),n.setAttribute("data-color",`${e}`),n.style.backgroundColor=`${e}`,Dg.append(n),t&&t.color&&t.color===e&&n.classList.add("is-selected"),n.addEventListener("click",Mg)})}function Mg(t){Fs||(Fs=[...document.querySelectorAll(".color-item")]),Fs.forEach(s=>{s.classList.remove("is-selected")});const e=t.target;e.classList.add("is-selected");const n=Re();is({...n,color:e.getAttribute("data-color")})}const Lg="/Testing_game/assets/ship-BVXSRTHs.svg",xg="/Testing_game/assets/ship-main-DwOV0C6-.svg",Og=[...document.querySelectorAll(".cell-btn")];async function Bg(){const[t,e]=await Promise.all([fetch(Lg).then(n=>n.text()),fetch(xg).then(n=>n.text())]);Og.forEach(n=>{n.classList.contains("cell-btn-main")?n.innerHTML=e:n.innerHTML=t})}const Yo=document.getElementById("player-name");function Fg(){const t=Re();if(t){const e=t.name?.trim()??"";e&&(Yo.value=e)}Yo.addEventListener("input",e=>{const n=e.target,s=Re();is({...s,name:n.value?.trim()??""})})}window.addEventListener("load",()=>{Wm(),Vt(),dr(),lg(),fg(),ug(),Jp(),jm(),Lm(),Pg(),Fg(),Cg(),Bg(),kg(),gp()});
