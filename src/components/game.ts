import {
  getCurrentPlayerId,
  listeToRoomById,
  updatePlayer,
  updateRoom,
} from '../server/server';
import type { Phrase } from '../types/phrase';
import type { Room, RoomEntry } from '../types/room';
import { flipCoin, getRandomSide, initCoin } from './coin';
import { showPhrase } from './dialog';
import { HIDE_DICE_DELAY, throwDice } from './dice';
import { setupLeftPlayer, setupRightPlayer } from './playersInfo';
import { detectTimerChanges } from './timer';
import Steps from '../components/stepsButtons';
import { setupPrediction } from '../components/prediction';
import { setupShipMove } from '../components/shipMove';

const mainBtn = document.getElementById('main-btn') as HTMLButtonElement;

let previousRoomState: Room | undefined;
let leftPlayerIsConnected = false;
let rightPlayerisConnected = false;
const shownPhrases: Phrase['id'][] = [];
let diceIsRolling = false;
let currentPlayerId: number | undefined;
let currentPlayerSide: 'left' | 'right' | undefined;

export function getCurrentTurnSide(): 'left' | 'right' {
  return currentPlayerSide ?? 'left';
}

export function startGame(room: RoomEntry) {
  const roomId: Room['id'] = room.id;

  initCoin();
  Steps.mountBefore(mainBtn);

  if (!(window as any).__predInit) {
    (window as any).__predInit = true;
    setupPrediction();
    setupShipMove();
  }

  listeToRoomById(roomId, async (roomState) => {
    if (!roomState) return;

    detectTimerChanges(previousRoomState?.timerState, roomState.timerState!);

    if (!currentPlayerId) {
      currentPlayerId = getCurrentPlayerId();
    }

    const myIndex = roomState.players.findIndex(p => p.id === currentPlayerId);
    const haveTwoPlayers = roomState.players.length === 2;
    const turnIndex = roomState.isTurn === 'left' ? 0 : 1;

    if (myIndex !== -1) {
      currentPlayerSide = myIndex === 0 ? 'left' : 'right';
    }

    if (roomState.players.length >= 1 && !leftPlayerIsConnected) {
      setupLeftPlayer(roomState.players[0]);
      leftPlayerIsConnected = true;
    }

    if (roomState.players.length >= 2 && !rightPlayerisConnected) {
      setupRightPlayer(roomState.players[1]);
      rightPlayerisConnected = true;
    }

    if (haveTwoPlayers && !roomState.isTurn && myIndex === 0 && !(roomState as any).coinShown) {
      const side: 'left' | 'right' = getRandomSide();
      await updateRoom(roomId, {
        timerState: new Date().toISOString(),
        isTurn: side,
        coinShown: true,
      } as any);
    }

    const prevCoinShown = (previousRoomState as any)?.coinShown;
    const nowCoinShown = (roomState as any)?.coinShown;
    if (!prevCoinShown && nowCoinShown && roomState.isTurn) {
      flipCoin(roomState.isTurn);
    }

    if (roomState?.phrases?.length !== previousRoomState?.phrases?.length) {
      if (roomState && roomState.phrases) {
        roomState.phrases.forEach((phrase) => {
          if (!shownPhrases.includes(phrase.id)) {
            showPhrase(phrase);
            shownPhrases.push(phrase.id);
          }
        });
      }
    }

    if (roomState.isDiceRolling) {
      document.body.classList.add('steps-hidden');
    } else {
      document.body.classList.remove('steps-hidden');
    }

    if (!diceIsRolling && roomState?.lastDiceResult && roomState?.isDiceRolling) {
      diceIsRolling = true;
      throwDice(roomState.lastDiceResult);
    } else if (diceIsRolling && !roomState?.isDiceRolling) {
      diceIsRolling = false;
    }

    if (myIndex !== -1 && haveTwoPlayers && myIndex === turnIndex) {
      mainBtn.classList.remove('disabled');
    } else {
      mainBtn.classList.add('disabled');
    }

    if (myIndex !== -1) {
      const myStreak = roomState.players[myIndex]?.diceStreak ?? [];
      const canUseSteps = haveTwoPlayers && myIndex === turnIndex && !roomState.isDiceRolling;
      Steps.render(myStreak, canUseSteps);
    } else {
      Steps.clear();
    }

    previousRoomState = roomState;
  });

  updateRoom(roomId, {
    gameStarted: true,
    isDiceRolling: false,
    lastDiceResult: -1,
  });

  mainBtn.addEventListener('click', () => {
    if (
      diceIsRolling ||
      mainBtn.classList.contains('disabled') ||
      previousRoomState?.players.length !== 2
    ) {
      return;
    }

    const btnType = mainBtn.getAttribute('data-type');
    const turnIndex = previousRoomState!.isTurn === 'left' ? 0 : 1;

    if (btnType === 'dice') {
      const randomNum = Math.floor(Math.random() * 6) + 1;

      document.body.classList.add('steps-hidden');

      updateRoom(roomId, {
        isDiceRolling: true,
        lastDiceResult: randomNum,
      });

      updatePlayer(roomId, previousRoomState!.isTurn!, {
        diceHistory: [
          ...(previousRoomState!.players[turnIndex].diceHistory ?? []),
          randomNum,
        ],
        diceStreak: [
          ...(previousRoomState!.players[turnIndex].diceStreak ?? []),
          randomNum === 6 ? 5 : randomNum,
        ],
      });

      setTimeout(() => {
        updateRoom(roomId, { isDiceRolling: false });

        if (randomNum !== 6) {
          mainBtn.innerText = 'Закінчити хід';
          mainBtn.setAttribute('data-type', 'end-turn');
        }
      }, HIDE_DICE_DELAY);
    } else if (btnType === 'end-turn') {
      updatePlayer(roomId, previousRoomState!.isTurn!, { diceStreak: [] });
      Steps.clear();

      updateRoom(roomId, {
        isTurn: previousRoomState?.isTurn === 'left' ? 'right' : 'left',
        timerState: new Date().toISOString(),
      });

      mainBtn.innerText = 'Кинути кубик';
      mainBtn.setAttribute('data-type', 'dice');
    }
  });
}
