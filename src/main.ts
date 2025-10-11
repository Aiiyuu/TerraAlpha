// === src/main.ts ===
import { throwDice, setupDice, HIDE_DICE_DELAY } from './components/dice';
import { createPlayer, showPlayerContent, addMessage } from './components/player.ts';
import { formatTime } from './utility/getFormattedDate.ts';
import type { Player } from './types/player.ts';

import { createSteps, hideAllSteps, showStepsFor } from './components/steps.ts';

const PING = 1000;
let diceIsRolling = false;

/* Wait until the initial HTML document is fully loaded and parsed,
so we can safely select DOM elements and attach event listeners. */
window.addEventListener('load', () => {
  const diceBtns: Element[] = [...document.querySelectorAll('.dice-button')];

  // Create Dice object when the page is loaded
  setupDice();

  createSteps();
  hideAllSteps();

  const [updatePlayer1, getPlayer1] = createPlayer('player1', 'player1');
  const [updatePlayer2, getPlayer2] = createPlayer('player2', 'player2');

  let player1: Player = getPlayer1();
  let player2: Player = getPlayer2();

  // Start the game and make the first user its turn
  player1 = updatePlayer1({ itsTurn: true });
  showPlayerContent(player1.id); // make move buttons visible

  diceBtns.forEach((btn: Element) =>
    btn.addEventListener('click', () => {
      if (diceIsRolling) {
        return;
      }

      const rollerColor: 'red' | 'blue' = player1.itsTurn ? 'red' : 'blue';

      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const date = formatTime(new Date());

      diceIsRolling = true;

      hideAllSteps();
      throwDice(randomNumber);

      if (player1.itsTurn) {
        player1 = updatePlayer1({
          diceHistory: [...player1.diceHistory, randomNumber],
        });
      } else if (player2.itsTurn) {
        player2 = updatePlayer2({
          diceHistory: [...player2.diceHistory, randomNumber],
        });
      }

      setTimeout(() => {

        showStepsFor(rollerColor, randomNumber);

        if (player1.itsTurn) {
          player1 = updatePlayer1({ itsTurn: false });
          player2 = updatePlayer2({ itsTurn: true });

          addMessage(player1.id, `${date}: You rolled a ${randomNumber}`);
        } else if (player2.itsTurn) {
          player1 = updatePlayer1({ itsTurn: true });
          player2 = updatePlayer2({ itsTurn: false });

          addMessage(player2.id, `${date}: You rolled a ${randomNumber}`);
        }

        diceIsRolling = false;
      }, HIDE_DICE_DELAY);
    }),
  );

  // This is used for dynamic elements on the screen
  setInterval(() => {
    const activePlayer = player1.itsTurn ? player1 : player2;
    showPlayerContent(activePlayer.id);
  }, PING);
});
