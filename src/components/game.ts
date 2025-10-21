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

const mainBtn = document.getElementById("main-btn") as HTMLButtonElement;

let previousRoomState: Room | undefined;
let leftPlayerIsConnected = false;
let rightPlayerisConnected = false;
const shownPhrases: Phrase["id"][] = [];
let diceIsRolling = false;
let currentPlayerId;
let currentPlayerSide: "left" | "right" | undefined;

export function startGame(room: RoomEntry) {
  const roomId: Room["id"] = room.id;

  listeToRoomById(roomId, (roomState) => {
    if (!roomState) return;

    detectTimerChanges(previousRoomState?.timerState, roomState.timerState!);

    /* Define current player's side */
    if (!currentPlayerSide) {
      currentPlayerId = getCurrentPlayerId();

      currentPlayerSide =
        roomState?.players[0].id === currentPlayerId ? "left" : "right";
    }

    /* Show left player colors and avatars */
    if (roomState!.players.length >= 1 && !leftPlayerIsConnected) {
      setupLeftPlayer(roomState!.players[0]);
      leftPlayerIsConnected = true;
    }

    /* Show right player colors and avatars */
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

    /* Show new phrase if it was added */
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

    /* Show dice rolling animation when it's rolling */
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

    /* Hide dice main button when not needed */
    if (
      currentPlayerSide === roomState?.isTurn &&
      roomState.players.length === 2
    ) {
      mainBtn.classList.remove("disabled");
    } else {
      mainBtn.classList.add("disabled");
    }

    previousRoomState = roomState;
  });

  const roomChanges: Partial<Room> = {
    gameStarted: true,
    isDiceRolling: false,
    lastDiceResult: -1,
  };

  updateRoom(roomId, roomChanges);

  /* Manage dice rolling logic */
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
      const playerIndex = previousRoomState.isTurn === "left" ? 0 : 1;

      updateRoom(roomId, {
        isDiceRolling: true,
        lastDiceResult: randomNum,
      });

      // Update player's dice history and streak
      updatePlayer(roomId, previousRoomState.isTurn!, {
        diceHistory: [
          ...(previousRoomState.players[playerIndex].diceHistory ?? []),
          randomNum,
        ],
        diceStreak: [
          ...(previousRoomState.players[playerIndex].diceStreak ?? []),
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
      updateRoom(roomId, {
        isTurn: previousRoomState?.isTurn === "left" ? "right" : "left",
        timerState: new Date().toISOString(),
      });

      mainBtn.innerText = "Кинути кубик";
      mainBtn.setAttribute("data-type", "dice");
    }
  });
}
