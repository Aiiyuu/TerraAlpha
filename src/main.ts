import {throwDice, setupDice, HIDE_DICE_DELAY} from "./components/dice";
import {createPlayer, showPlayerContent, addMessage} from "./components/player.ts";
import { createSteps } from './components/steps.ts';

import type {Player} from "./types/player.ts";

/* Wait until the initial HTML document is fully loaded and parsed,
so we can safely select DOM elements and attach event listeners. */
window.addEventListener("load", () => {
  const diceBtns: Element[] = [...document.querySelectorAll(".dice-button")];

  // Create Dice object when the page is loaded
  setupDice();
  createSteps();

  const [updatePlayer1, getPlayer1] = createPlayer('player1', 'player1');
  const [updatePlayer2, getPlayer2] = createPlayer('player2', 'player2');

  let player1: Player = getPlayer1();
  let player2: Player = getPlayer2();

  // Start the game and make the first user its turn
  player1 = updatePlayer1({itsTurn: true});
  showPlayerContent(player1.id) // make move buttons visible
  addMessage(player1.id, 'Your turn, throw the dice!');

  function manageDice() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const steps = randomNumber === 6 ? 5 : randomNumber;
    let activePlayer = player1.itsTurn ? player1 : player2;

    showPlayerContent('none'); // hide player's button
    throwDice(randomNumber);

    const newState: Partial<Player> = {
      diceHistory: [...activePlayer.diceHistory, steps],
      diceStreak: [...activePlayer.diceStreak, steps],
    };

    if (player1.itsTurn) {
      player1 = updatePlayer1(newState);
    } else if (player2.itsTurn) {
      player2 = updatePlayer2(newState);
    }

    setTimeout(() => {
      activePlayer = player1.itsTurn ? player1 : player2;
      const sum = activePlayer.diceStreak.reverse().join(' + ');

      if (randomNumber === 6) {
        showPlayerContent(activePlayer.id);
        addMessage(activePlayer.id, `You rolled a ${randomNumber}! You got ${sum} steps, and you got a bonus throw!`);

        return;
      }

      addMessage(activePlayer.id, `You rolled a ${randomNumber}! Now you have ${sum} steps`);

      if (player1.itsTurn) {
        player1 = updatePlayer1({itsTurn: false});
        player2 = updatePlayer2({itsTurn: true});

      } else {
        player1 = updatePlayer1({itsTurn: true});
        player2 = updatePlayer2({itsTurn: false});
      }

      activePlayer = player1.itsTurn ? player1 : player2;
      showPlayerContent(activePlayer.id);

      addMessage(activePlayer.id, 'Your turn, throw the dice!');
    }, HIDE_DICE_DELAY);
  }

  diceBtns.forEach((btn: Element) => btn.addEventListener("click", manageDice));
});

