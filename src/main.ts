import { throwDice, setupDice, HIDE_DICE_DELAY } from "./components/dice";
import { createPlayer, showPlayerContent, addMessage } from "./components/player.ts";
import { createSteps, hideAllSteps, showStepsSequence } from './components/steps.ts';
import { setupDialog } from "./components/dialog.ts";

import type { Player } from "./types/player.ts";

/* Wait until the initial HTML document is fully loaded and parsed,
so we can safely select DOM elements and attach event listeners. */
window.addEventListener('load', () => {
  const redDiceBtn = document.querySelector<HTMLButtonElement>('.player1.button.dice-button');
  const blueDiceBtn = document.querySelector<HTMLButtonElement>('.player2.button.dice-button');

  const redMoveBtn = document.querySelector<HTMLButtonElement>('.player1.move-button');
  const blueMoveBtn = document.querySelector<HTMLButtonElement>('.player2.move-button');

  setupDialog();
  setupDice();
  createSteps();
  hideAllSteps();

  const [updatePlayer1, getPlayer1] = createPlayer('player1', 'player1');
  const [updatePlayer2, getPlayer2] = createPlayer('player2', 'player2');

  let player1: Player = getPlayer1();
  let player2: Player = getPlayer2();

  let diceIsRolling = false;

  const getActivePlayer = (): Player => (player1.itsTurn ? player1 : player2);
  const getInactivePlayer = (): Player => (player1.itsTurn ? player2 : player1);
  const getColorById = (playerId: string): 'red' | 'blue' =>
    playerId === 'player1' ? 'red' : 'blue';
  const getDiceBtnById = (playerId: string) => (playerId === 'player1' ? redDiceBtn : blueDiceBtn);
  const getMoveBtnById = (playerId: string) => (playerId === 'player1' ? redMoveBtn : blueMoveBtn);

  const setVisible = (el: HTMLElement | null, visible: boolean) => {
    if (!el) return;
    el.classList.toggle('is-hidden', !visible);
    el.toggleAttribute('disabled', !visible);
  };

  const showStartOfTurnUI = (playerId: 'player1' | 'player2') => {
    setVisible(getDiceBtnById(playerId), true);
    setVisible(getMoveBtnById(playerId), false);
    const otherId = playerId === 'player1' ? 'player2' : 'player1';
    setVisible(getDiceBtnById(otherId), false);
    setVisible(getMoveBtnById(otherId), false);
  };

  player1 = updatePlayer1({ itsTurn: true });
  showPlayerContent(player1.id);
  showStartOfTurnUI('player1');
  addMessage(player1.id, 'Your turn, throw the dice!');

  function onDiceClick(e: Event) {
    if (diceIsRolling) return;

    const active = getActivePlayer();
    const clickedBtn = e.currentTarget as HTMLButtonElement;
    const expectedDiceBtn = getDiceBtnById(active.id);
    if (clickedBtn !== expectedDiceBtn) {
      return;
    }

    const rollerColor: 'red' | 'blue' = getColorById(active.id);
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const steps = randomNumber === 6 ? 5 : randomNumber;

    diceIsRolling = true;

    setVisible(expectedDiceBtn, false);

    hideAllSteps();
    throwDice(randomNumber);

    const nextDiceHistory = [...active.diceHistory, steps];
    const nextDiceStreak = [...active.diceStreak, steps];

    if (active.id === 'player1') {
      player1 = updatePlayer1({ diceHistory: nextDiceHistory, diceStreak: nextDiceStreak });
    } else {
      player2 = updatePlayer2({ diceHistory: nextDiceHistory, diceStreak: nextDiceStreak });
    }

    setTimeout(() => {
      const activeNow = getActivePlayer(); 
      const needAnotherThrow = randomNumber === 6;

      showStepsSequence(rollerColor, activeNow.diceStreak);

      showPlayerContent(activeNow.id);

      setVisible(getDiceBtnById(activeNow.id), needAnotherThrow);
      setVisible(getMoveBtnById(activeNow.id), !needAnotherThrow);

      setVisible(getDiceBtnById(getInactivePlayer().id), false);
      setVisible(getMoveBtnById(getInactivePlayer().id), false);

      const sum = activeNow.diceStreak.slice().reverse().join(' + ');
      if (needAnotherThrow) {
        addMessage(activeNow.id, `You rolled a ${randomNumber}! Current steps: ${sum}. Bonus throw!`);
      } else {
        addMessage(activeNow.id, `You rolled a ${randomNumber}! Current steps: ${sum}.`);
        addMessage(activeNow.id, `Press "Походити" to end your turn.`);
      }

      diceIsRolling = false;
    }, HIDE_DICE_DELAY);
  }

  function onMoveClick(byPlayerId: 'player1' | 'player2') {
    const active = getActivePlayer();
    if (active.id !== byPlayerId) return; 


    if (active.id === 'player1') {
      player1 = updatePlayer1({ diceStreak: [] });
    } else {
      player2 = updatePlayer2({ diceStreak: [] });
    }
    hideAllSteps();

    if (player1.itsTurn) {
      player1 = updatePlayer1({ itsTurn: false });
      player2 = updatePlayer2({ itsTurn: true });
    } else {
      player1 = updatePlayer1({ itsTurn: true });
      player2 = updatePlayer2({ itsTurn: false });
    }

    const next = getActivePlayer();
    showPlayerContent(next.id);

    if (next.id === 'player1') {
      showStartOfTurnUI('player1');
    } else {
      showStartOfTurnUI('player2');
    }

    addMessage(next.id, 'Your turn, throw the dice!');
  }

  redDiceBtn?.addEventListener('click', onDiceClick);
  blueDiceBtn?.addEventListener('click', onDiceClick);

  redMoveBtn?.addEventListener('click', () => onMoveClick('player1'));
  blueMoveBtn?.addEventListener('click', () => onMoveClick('player2'));
});
