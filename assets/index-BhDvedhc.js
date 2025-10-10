(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const s=document.querySelector(".dice-container");if(!s)throw new Error("Dice container is not found.");const i=4e3,d=50,l=i+2e3;function f(){const t=document.querySelector(".dice"),o=Math.floor(Math.random()*6)+1;s?.classList.add("dice-container--roling"),t.style.animation=`rolling ${i}ms ease`,setTimeout(()=>{switch(o){case 1:t.style.transform="rotateX(0deg) rotateY(0deg)";break;case 6:t.style.transform="rotateX(180deg) rotateY(0deg)";break;case 2:t.style.transform="rotateX(-90deg) rotateY(0deg)";break;case 5:t.style.transform="rotateX(90deg) rotateY(0deg)";break;case 3:t.style.transform="rotateX(0deg) rotateY(90deg)";break;case 4:t.style.transform="rotateX(0deg) rotateY(-90deg)";break}t.style.animation="none"},i+d),setTimeout(()=>{s?.classList.remove("dice-container--roling")},l)}function u(){const t=`
		<div class="dice">
			<div class="face front"></div>
			<div class="face back"></div>
			<div class="face top"></div>
			<div class="face bottom"></div>
			<div class="face right"></div>
			<div class="face left"></div>
		</div>
  `,o=document.createElement("div");o.innerHTML=t,s.appendChild(o.firstElementChild)}window.addEventListener("load",()=>{const t=[...document.querySelectorAll(".dice-button")];u(),t.forEach(o=>o.addEventListener("click",f))});
