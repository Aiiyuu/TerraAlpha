// dice.js

const overlay = document.getElementById('dice-overlay');
const popup = document.getElementById('dice-popup');
const roll1 = document.getElementById('roll1');
const roll2 = document.getElementById('roll2');

function showDice() {
  popup.innerHTML = `
    <div class="tenor-gif-embed"
         data-postid="21294280"
         data-share-method="host"
         data-aspect-ratio="1"
         data-width="100%">
      <a href="https://tenor.com/view/dice-gif-21294280">Dice Sticker</a>
      from <a href="https://tenor.com/search/dice-stickers">Dice Stickers</a>
    </div>
  `;

  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('show'));

  const script = document.createElement('script');
  script.src = 'https://tenor.com/embed.js';
  script.async = true;
  document.body.appendChild(script);

  setTimeout(() => {
    overlay.classList.remove('show');
    setTimeout(() => {
      overlay.style.display = 'none';
      popup.innerHTML = '';
    }, 100);
  }, 2000);
}

roll1?.addEventListener('click', showDice);
roll2?.addEventListener('click', showDice);
