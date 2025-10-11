import { throwDice, setupDice, HIDE_DICE_DELAY } from './components/dice';
import { createPlayer, showPlayerContent, addMessage } from './components/player.ts';
import type { Player } from './types/player.ts';

import { createSteps, hideAllSteps, showStepsForValues } from './components/steps.ts';

/* Wait until the initial HTML document is fully loaded and parsed,
so we can safely select DOM elements and attach event listeners. */
window.addEventListener('load', () => {
  const diceBtns: HTMLButtonElement[] = [
    ...document.querySelectorAll<HTMLButtonElement>('.dice-button'),
  ];

  setupDice();
  createSteps();
  hideAllSteps();

  const [updatePlayer1, getPlayer1] = createPlayer('player1', 'player1');
  const [updatePlayer2, getPlayer2] = createPlayer('player2', 'player2');

  let player1: Player = getPlayer1();
  let player2: Player = getPlayer2();

  player1 = updatePlayer1({ itsTurn: true });
  showPlayerContent(player1.id); 
  addMessage(player1.id, 'Your turn, throw the dice!');

  const getColorById = (playerId: string): 'red' | 'blue' =>
    playerId === 'player1' ? 'red' : 'blue';

  const getPlayerByColor = (color: 'red' | 'blue'): Player =>
    color === 'red' ? player1 : player2;

  const uniqueSteps = (arr: number[]) =>
    Array.from(
      new Set(arr.filter((n) => Number.isFinite(n) && n >= 1 && n <= 6)),
    );

  function manageDice() {
    const roller = player1.itsTurn ? player1 : player2;
    const rollerColor: 'red' | 'blue' = getColorById(roller.id);

    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const steps = randomNumber === 6 ? 5 : randomNumber;

    showPlayerContent('none');
    hideAllSteps();
    throwDice(randomNumber);

    const nextDiceHistory = [...roller.diceHistory, steps];
    const nextDiceStreak = [...roller.diceStreak, steps];

    if (roller.id === 'player1') {
      player1 = updatePlayer1({
        diceHistory: nextDiceHistory,
        diceStreak: nextDiceStreak,
      });
    } else {
      player2 = updatePlayer2({
        diceHistory: nextDiceHistory,
        diceStreak: nextDiceStreak,
      });
    }

    setTimeout(() => {

      const rollerNow = getPlayerByColor(rollerColor);

      const allowed = uniqueSteps(rollerNow.diceStreak);
      showStepsForValues(rollerColor, allowed);

      const sum = rollerNow.diceStreak.slice().reverse().join(' + ');

      if (randomNumber === 6) {

        showPlayerContent(rollerNow.id);
        addMessage(
          rollerNow.id,
          `You rolled a ${randomNumber}! You got ${sum} steps, and you got a bonus throw!`,
        );
        return;
      }

      addMessage(
        rollerNow.id,
        `You rolled a ${randomNumber}! Now you have ${sum} steps`,
      );

      if (player1.itsTurn) {
        player1 = updatePlayer1({ itsTurn: false });
        player2 = updatePlayer2({ itsTurn: true });
      } else {
        player1 = updatePlayer1({ itsTurn: true });
        player2 = updatePlayer2({ itsTurn: false });
      }

      const activePlayer = player1.itsTurn ? player1 : player2;
      showPlayerContent(activePlayer.id);
      addMessage(activePlayer.id, 'Your turn, throw the dice!');
    }, HIDE_DICE_DELAY);
  }

  diceBtns.forEach((btn) => btn.addEventListener('click', manageDice));
});
