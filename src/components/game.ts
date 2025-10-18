import {
  getCurrentPlayerId,
  listeToRoomById,
  updateRoom,
} from "../server/server";
import type { Phrase } from "../types/phrase";
import type { Room, RoomEntry } from "../types/room";
import { showPhrase } from "./dialog";
import { HIDE_DICE_DELAY, throwDice } from "./dice";
import { setupLeftPlayer, setupRightPlayer } from "./playersInfo";

const mainBtn = document.getElementById("main-btn") as HTMLButtonElement;

let previousRoomState: Room | undefined;
let leftPlayerIsConnected = false;
let rightPlayerisConnected = false;
const shownPhrases: Phrase["id"][] = [];
let currentPlayerId;
let currentPlayerSide: "left" | "right" | undefined;

export function startGame(room: RoomEntry) {
  const roomId: Room["id"] = room.id;
  listeToRoomById(roomId, (roomState) => {
    /* Define current player's side */
    if (!currentPlayerSide) {
      currentPlayerId = getCurrentPlayerId();

      currentPlayerSide =
        roomState?.players[0].id === currentPlayerId ? "left" : "right";
    }

    /* Show left player colors and avatars */
    if (roomState!.players.length >= 1 && !leftPlayerIsConnected) {
      setupLeftPlayer(roomState.players[0]);
      leftPlayerIsConnected = true;
    }

    /* Show right player colors and avatars */
    if (roomState!.players.length >= 2 && !rightPlayerisConnected) {
      setupRightPlayer(roomState.players[1]);
      rightPlayerisConnected = true;
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
    if (roomState?.lastDiceResult && roomState?.isDiceRolling) {
      throwDice(roomState.lastDiceResult);
    }

    /* Hide dice main button when not needed */
    if (currentPlayerSide === roomState?.isTurn) {
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
    isTurn: "left",
  };

  updateRoom(roomId, roomChanges);

  mainBtn.addEventListener("click", () => {
    const btnType = mainBtn.getAttribute("data-type");

    if (btnType === "dice") {
      console.log("Кинув кубик");
      const randomNum = Math.floor(Math.random() * 6) + 1;

      updateRoom(roomId, {
        isDiceRolling: true,
        lastDiceResult: randomNum,
      });

      setTimeout(() => {
        updateRoom(roomId, {
          isDiceRolling: false,
        });

        mainBtn.innerText = "Закінчити хід";
        mainBtn.setAttribute("data-type", "end-turn");
      }, HIDE_DICE_DELAY);
    } else if (btnType === "end-turn") {
      console.log("Закінчив хід");
      updateRoom(roomId, {
        isTurn: previousRoomState?.isTurn === "left" ? "right" : "left",
      });

      mainBtn.innerText = "Кинути кубик";
      mainBtn.setAttribute("data-type", "dice");
    }
  });
}
