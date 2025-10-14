import { clearPlanned, createSteps, hideAllSteps, setStepsEnabled, showStepsSequence } from "./steps.ts";
import { addMessage, createPlayer, showPlayerContent } from "./player.ts";
import type { Player } from "../types/player.ts";
import { setupForecast } from "./forecast.ts";
import { setActivePlayer } from "./moveShips.ts";
import { HIDE_DICE_DELAY, throwDice } from "./dice.ts";
import { setupPlayerInfo } from "./playersInfo.ts";
import { createTimer } from "./timer.ts";
import { createSound } from "./sound.ts";
import bgMusic from '../assets/sounds/background-music.mp3';
import diceSound from '../assets/sounds/dice.mp3';

export function startGame(playerObj1: Player, playerObj2: Player) {
  setupPlayerInfo(playerObj1, playerObj2);

  const { startSound: startBgMusic } = createSound({
    src: bgMusic,
    infinite: true,
  });

  const { startSound: startDiceSound, stopSound: stopDiceSound } = createSound({
    src: diceSound,
    infinite: true,
  });

  startBgMusic();

  const redDiceBtn = document.querySelector('.player1.button.dice-button') as HTMLButtonElement;
  const blueDiceBtn = document.querySelector('.player2.button.dice-button') as HTMLButtonElement;

  const redMoveBtn = document.querySelector('.player1.move-button') as HTMLButtonElement;
  const blueMoveBtn = document.querySelector('.player2.move-button') as HTMLButtonElement;

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

  const setShownDisabled = (el: HTMLElement | null, disabled: boolean) => {
    if (!el) return;
    el.classList.remove('is-hidden');
    el.toggleAttribute('disabled', disabled);
  };

  const showStartOfTurnUI = (playerId: 'player1' | 'player2') => {
    setVisible(getDiceBtnById(playerId), true);
    setVisible(getMoveBtnById(playerId), false);
    const otherId = playerId === 'player1' ? 'player2' : 'player1';
    setVisible(getDiceBtnById(otherId), false);
    setVisible(getMoveBtnById(otherId), false);
  };

  setupForecast(() => (player1.itsTurn ? 'red' : 'blue'));

  player1 = updatePlayer1({ itsTurn: true });
  showPlayerContent(player1.id);
  showStartOfTurnUI('player1');
  addMessage(player1.id, 'Your turn, throw the dice!');
  setActivePlayer('red');

  let stopTimer = createTimer(60, () => console.log('Час вийшов'));

  function onDiceClick(e: Event) {
    startDiceSound();
    stopTimer();

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

      setStepsEnabled(rollerColor, !needAnotherThrow);

      setVisible(getDiceBtnById(activeNow.id), needAnotherThrow);

      if (needAnotherThrow) {
        setVisible(getMoveBtnById(activeNow.id), false);
      } else {
        setShownDisabled(getMoveBtnById(activeNow.id), true);
      }

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
      stopDiceSound();
      stopTimer = createTimer(60, () => console.log('час вийшов'));
    }, HIDE_DICE_DELAY);
  }

  function onMoveClick(byPlayerId: 'player1' | 'player2') {
    const active = getActivePlayer();
    if (active.id !== byPlayerId) return;

    const activeColor: 'red' | 'blue' = getColorById(active.id);
    clearPlanned(activeColor);

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
      setActivePlayer('red');
    } else {
      showStartOfTurnUI('player2');
      setActivePlayer('blue');
    }

    addMessage(next.id, 'Your turn, throw the dice!');
  }

  redDiceBtn?.addEventListener('click', onDiceClick);
  blueDiceBtn?.addEventListener('click', onDiceClick);

  redMoveBtn?.addEventListener('click', () => onMoveClick('player1'));
  blueMoveBtn?.addEventListener('click', () => onMoveClick('player2'));
}