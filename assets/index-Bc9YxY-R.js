(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const o=document.getElementById("dice-overlay"),n=document.getElementById("dice-popup"),a=document.getElementById("roll1"),u=document.getElementById("roll2");function d(){n.innerHTML=`
    <div class="tenor-gif-embed"
         data-postid="21294280"
         data-share-method="host"
         data-aspect-ratio="1"
         data-width="100%">
      <a href="https://tenor.com/view/dice-gif-21294280">Dice Sticker</a>
      from <a href="https://tenor.com/search/dice-stickers">Dice Stickers</a>
    </div>
  `,o.style.display="flex",requestAnimationFrame(()=>o.classList.add("show"));const r=document.createElement("script");r.src="https://tenor.com/embed.js",r.async=!0,document.body.appendChild(r),setTimeout(()=>{o.classList.remove("show"),setTimeout(()=>{o.style.display="none",n.innerHTML=""},100)},2e3)}a?.addEventListener("click",d);u?.addEventListener("click",d);
