import {
  getCurrentPlayerId,
  listeToRoomById,
  updatePlayer,
  updateRoom,
} from "../server/server";
import type { Phrase } from "../types/phrase";
import type { Room, RoomEntry } from "../types/room";
import { flipCoin, getRandomSide } from "./coin";
import { showPhrase } from "./dialog";
import { HIDE_DICE_DELAY, throwDice } from "./dice";
import { setupLeftPlayer, setupRightPlayer } from "./playersInfo";
import { detectTimerChanges } from "./timer";
import Steps from "../components/stepsButtons";

const mainBtn = document.getElementById("main-btn") as HTMLButtonElement;

let previousRoomState: Room | undefined;
let leftPlayerIsConnected = false;
let rightPlayerisConnected = false;
const shownPhrases: Phrase["id"][] = [];
let diceIsRolling = false;
let currentPlayerId: number | undefined;
let currentPlayerSide: "left" | "right" | undefined;

export function getCurrentTurnSide(): "left" | "right" {
  return currentPlayerSide ?? "left";
}

export function startGame(room: RoomEntry) {
  const roomId: Room["id"] = room.id;

  Steps.mountBefore(mainBtn);

  listeToRoomById(roomId, (roomState) => {
    if (!roomState) return;

    detectTimerChanges(previousRoomState?.timerState, roomState.timerState!);

    if (!currentPlayerSide) {
      currentPlayerId = getCurrentPlayerId();
      currentPlayerSide =
        roomState?.players[0].id === currentPlayerId ? "left" : "right";
    }

    if (roomState!.players.length >= 1 && !leftPlayerIsConnected) {
      setupLeftPlayer(roomState!.players[0]);
      leftPlayerIsConnected = true;
    }

    if (roomState!.players.length >= 2 && !rightPlayerisConnected) {
      setupRightPlayer(roomState!.players[1]);
      rightPlayerisConnected = true;

      const side: "left" | "right" = getRandomSide();
      flipCoin(side);

      updateRoom(roomId, {
        timerState: new Date().toISOString(),
        isTurn: side,
      });
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

    if (
      !diceIsRolling &&
      roomState?.lastDiceResult &&
      roomState?.isDiceRolling
    ) {
      diceIsRolling = true;
      throwDice(roomState.lastDiceResult);
    } else if (diceIsRolling && !roomState?.isDiceRolling) {
      diceIsRolling = false;
    }

    if (
      currentPlayerSide === roomState?.isTurn &&
      roomState.players.length === 2
    ) {
      mainBtn.classList.remove("disabled");
    } else {
      mainBtn.classList.add("disabled");
    }

    if (typeof currentPlayerSide !== "undefined") {
      const myIndex = currentPlayerSide === "left" ? 0 : 1;
      const myStreak = roomState.players[myIndex]?.diceStreak ?? [];
      const canUseSteps =
        roomState.players.length === 2 &&
        roomState.isTurn === currentPlayerSide &&
        !roomState.isDiceRolling;

      Steps.render(myStreak, canUseSteps);
    } else {
      Steps.clear();
    }

    previousRoomState = roomState;
  });

  const roomChanges: Partial<Room> = {
    gameStarted: true,
    isDiceRolling: false,
    lastDiceResult: -1,
  };

  updateRoom(roomId, roomChanges);

  mainBtn.addEventListener("click", () => {
    if (
      diceIsRolling ||
      mainBtn.classList.contains("disabled") ||
      previousRoomState?.players.length !== 2
    ) {
      return;
    }

    const btnType = mainBtn.getAttribute("data-type");

    if (btnType === "dice") {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      const playerIndex = previousRoomState!.isTurn === "left" ? 0 : 1;

      updateRoom(roomId, {
        isDiceRolling: true,
        lastDiceResult: randomNum,
      });

      updatePlayer(roomId, previousRoomState!.isTurn!, {
        diceHistory: [
          ...(previousRoomState!.players[playerIndex].diceHistory ?? []),
          randomNum,
        ],
        diceStreak: [
          ...(previousRoomState!.players[playerIndex].diceStreak ?? []),
          randomNum === 6 ? 5 : randomNum,
        ],
      });

      setTimeout(() => {
        updateRoom(roomId, {
          isDiceRolling: false,
        });

        if (randomNum !== 6) {
          mainBtn.innerText = "Закінчити хід";
          mainBtn.setAttribute("data-type", "end-turn");
        }
      }, HIDE_DICE_DELAY);
    } else if (btnType === "end-turn") {
      updatePlayer(roomId, previousRoomState!.isTurn!, { diceStreak: [] });
      Steps.clear();

      updateRoom(roomId, {
        isTurn: previousRoomState?.isTurn === "left" ? "right" : "left",
        timerState: new Date().toISOString(),
      });

      mainBtn.innerText = "Кинути кубик";
      mainBtn.setAttribute("data-type", "dice");
    }
  });
}
