import {
  addActionToRoom,
  clearOutdatedActions,
  getCurrentPlayerId,
  getCurrentPlayerName,
  listeToRoomById,
  updatePlayer,
  updateRoom,
} from "../server/server";
import type { Phrase } from "../types/phrase";
import type { Room, RoomEntry } from "../types/room";
import { declareCoinResult, flipCoin, getRandomSide, initCoin } from "./coin";
import { showPhrase } from "./dialog";
import { HIDE_DICE_DELAY, syncDiceHelper, throwDice } from "./dice";
import {
  setupLeftPlayer,
  setupPlayerColors,
  setupRightPlayer,
} from "./playersInfo";
import { detectTimerChanges } from "./timer";
import Steps from "../components/stepsButtons";
import { setupPrediction } from "../components/prediction";
import { setupShipMove } from "../components/shipMove";
import { initShipSync } from "../components/ShipSync";
import { initMainPrediction } from "../components/MainPrediction";
import { initPlayerBlockedInfo } from "../components/playerBlockedInfo";
import { initPlayerWin } from "../components/playerWin";
import bgMusicSrc from "../assets/sounds/background-music.mp3";
import { createSound } from "./sound";
import { syncActions } from "./actions";
import { syncResetBtn } from "./reset";
import { HelperTypes, triggerHelper } from "./helper";
import {
  helper,
  HELPER_END_TURN_DURATION,
  HELPER_NOT_YOUR_TURN_DURATION,
  HELPER_WELCOME_DURATION,
} from "../config";
import { ActionTypes } from "../types/action";
import { getEndDate } from "../utility/getEndDate";

const mainBtn = document.getElementById("main-btn") as HTMLButtonElement;

let previousRoomState: Room | undefined;
let leftPlayerIsConnected = false;
let rightPlayerisConnected = false;
const shownPhrases: Phrase["id"][] = [];
let diceIsRolling = false;
let currentPlayerId: number | undefined;
let currentPlayerSide: "left" | "right" | undefined;
let stopShipSync: (() => void) | null = null;
let stopMainPrediction: (() => void) | null = null;
let stopPlayerBlockedInfo: (() => void) | null = null;
let stopPlayerWin: (() => void) | null = null;
let mainBtnHandler: ((this: HTMLButtonElement, ev: MouseEvent) => void) | null =
  null;

const { startSound: startBgMusic } = createSound({
  src: bgMusicSrc,
  loudness: 0.4,
  infinite: true,
});

export function getCurrentTurnSide(): "left" | "right" {
  return currentPlayerSide ?? "left";
}

export function startGame(room: RoomEntry) {
  const roomId: Room["id"] = room.id;

  triggerHelper({
    duration: HELPER_WELCOME_DURATION,
    text: helper("helper.welcome"),
    type: HelperTypes.HELPER_HINT,
  });

  if (stopShipSync) {
    try {
      stopShipSync();
    } catch {}
    stopShipSync = null;
  }

  if (stopMainPrediction) {
    try {
      stopMainPrediction();
    } catch {}
    stopMainPrediction = null;
  }

  if (stopPlayerBlockedInfo) {
    try {
      stopPlayerBlockedInfo();
    } catch {}
    stopPlayerBlockedInfo = null;
  }

  if (stopPlayerWin) {
    try {
      stopPlayerWin();
    } catch {}
    stopPlayerWin = null;
  }

  if (mainBtnHandler) {
    mainBtn.removeEventListener("click", mainBtnHandler);
    mainBtnHandler = null;
  }

  initCoin();
  Steps.mountBefore(mainBtn);
  setupPrediction();
  setupShipMove();
  startBgMusic();

  const dispose = initShipSync(String(roomId));
  if (typeof dispose === "function") {
    stopShipSync = dispose;
    window.addEventListener(
      "beforeunload",
      () => {
        try {
          stopShipSync?.();
        } catch {}
      },
      { once: true }
    );
  }

  stopMainPrediction = initMainPrediction(roomId);
  stopPlayerBlockedInfo = initPlayerBlockedInfo(roomId);
  stopPlayerWin = initPlayerWin(roomId);

  window.addEventListener(
    "beforeunload",
    () => {
      try {
        stopMainPrediction?.();
      } catch {}
      try {
        stopPlayerBlockedInfo?.();
      } catch {}
      try {
        stopPlayerWin?.();
      } catch {}
    },
    { once: true }
  );

  listeToRoomById(roomId, async (roomState) => {
    if (!roomState) return;

    const prev = previousRoomState;
    previousRoomState = roomState;

    syncActions(roomState.actions || []);
    syncResetBtn(roomState.lastResetOffer);
    clearOutdatedActions(roomId);
    detectTimerChanges(
      prev?.timerState,
      roomState.timerState!,
      currentPlayerSide === roomState.isTurn
    );

    if (!currentPlayerId) {
      currentPlayerId = getCurrentPlayerId();
      setupPlayerColors(roomState, currentPlayerId);
    }

    const myIndex = roomState.players.findIndex(
      (p) => p.id === currentPlayerId
    );
    const haveTwoPlayers = roomState.players.length === 2;
    const prevPlayersCount = prev?.players?.length ?? 0;
    const becameTwo = prevPlayersCount < 2 && haveTwoPlayers;
    const isLeader = myIndex === 0;

    if (myIndex !== -1) {
      currentPlayerSide = myIndex === 0 ? "left" : "right";
      const mySide = currentPlayerSide;
      const oppSide = mySide === "left" ? "right" : "left";
      document.body.dataset.mySide = mySide;
      document.body.setAttribute("data-turn-side", mySide);
      document.body.setAttribute("data-opponent-side", oppSide);
      document.body.classList.remove("side-left", "side-right");
      document.body.classList.add(`side-${mySide}`);
    }

    if (roomState.players.length >= 1 && !leftPlayerIsConnected) {
      setupLeftPlayer(roomState.players[0], currentPlayerSide);
      leftPlayerIsConnected = true;
    }

    if (roomState.players.length >= 2 && !rightPlayerisConnected) {
      setupRightPlayer(roomState.players[1], currentPlayerSide);
      setupPlayerColors(roomState, currentPlayerId);
      rightPlayerisConnected = true;
    }

    const coinNode = (roomState as any).coin;
    const prevCoinNode = (prev as any)?.coin;
    const legacyPrevShown = (prev as any)?.coinShown;
    const legacyNowShown = (roomState as any)?.coinShown;

    if (becameTwo && isLeader && !(roomState as any).coinInitialized) {
      const side: "left" | "right" =
        (coinNode?.result as "left" | "right" | undefined) ?? getRandomSide();
      await updateRoom(roomId, {
        isTurn: side,
        coin: {
          result: side,
          shown: true,
          at: new Date().toISOString(),
        } as any,
        coinShown: true,
        timerState: new Date().toISOString(),
        coinInitialized: true as any,
      } as any);
    }

    const shouldFlipOnce =
      haveTwoPlayers &&
      (((!prevCoinNode || !prevCoinNode?.shown) &&
        coinNode?.shown &&
        coinNode?.result) ||
        (!legacyPrevShown && legacyNowShown && roomState.isTurn));

    if (shouldFlipOnce) {
      const side =
        (coinNode?.result as "left" | "right" | undefined) ?? roomState.isTurn!;
      declareCoinResult(side, currentPlayerSide || "left", roomState);
      flipCoin(side);
    }

    if (roomState && roomState.phrases) {
      if (roomState?.phrases?.length !== prev?.phrases?.length) {
        roomState.phrases.forEach((phrase) => {
          if (!shownPhrases.includes(phrase.id)) {
            showPhrase(phrase);
            shownPhrases.push(phrase.id);
          }
        });
      }
    }

    if (roomState.isDiceRolling) {
      document.body.classList.add("steps-hidden");
    } else {
      document.body.classList.remove("steps-hidden");
    }

    if (
      !diceIsRolling &&
      roomState?.lastDiceResult &&
      roomState?.isDiceRolling
    ) {
      diceIsRolling = true;
      throwDice(roomState.lastDiceResult);
      syncDiceHelper(
        roomState,
        currentPlayerSide || "left",
        roomState.lastDiceResult
      );
    } else if (diceIsRolling && !roomState?.isDiceRolling) {
      diceIsRolling = false;
    }

    const turnIndex = roomState.isTurn
      ? roomState.isTurn === "left"
        ? 0
        : 1
      : -1;

    if (
      myIndex !== -1 &&
      haveTwoPlayers &&
      turnIndex !== -1 &&
      myIndex === turnIndex
    ) {
      mainBtn.classList.remove("disabled");
      document.body.classList.remove("not-my-turn");
      document.body.setAttribute("data-turn-active", "1");
    } else {
      mainBtn.classList.add("disabled");
      document.body.classList.add("not-my-turn");
      document.body.setAttribute("data-turn-active", "0");
    }

    if (myIndex !== -1) {
      const myStreak = roomState.players[myIndex]?.diceStreak ?? [];
      const canUseSteps =
        haveTwoPlayers &&
        turnIndex !== -1 &&
        myIndex === turnIndex &&
        !roomState.isDiceRolling;
      Steps.render(myStreak, canUseSteps);
    } else {
      Steps.clear();
    }
  });

  updateRoom(roomId, {
    gameStarted: true,
    isDiceRolling: false,
    lastDiceResult: -1,
  });

  mainBtnHandler = () => {
    if (
      diceIsRolling ||
      mainBtn.classList.contains("disabled") ||
      previousRoomState?.players.length !== 2
    ) {
      triggerHelper({
        duration: HELPER_NOT_YOUR_TURN_DURATION,
        text: helper("helper.notYourTurn"),
        type: HelperTypes.HELPER_WARNING,
      });
      return;
    }

    const btnType = mainBtn.getAttribute("data-type");
    const turnIndex = previousRoomState!.isTurn
      ? previousRoomState!.isTurn === "left"
        ? 0
        : 1
      : -1;

    if (btnType === "dice") {
      const randomNum = Math.floor(Math.random() * 6) + 1;

      document.body.classList.add("steps-hidden");

      updateRoom(roomId, {
        isDiceRolling: true,
        lastDiceResult: randomNum,
      });

      if (turnIndex !== -1) {
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
      }

      setTimeout(() => {
        updateRoom(roomId, { isDiceRolling: false });

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

      mainBtn.innerText = "";
      mainBtn.setAttribute("data-type", "dice");

      addActionToRoom(roomId, {
        type: ActionTypes.HINT,
        endsAt: getEndDate(HELPER_END_TURN_DURATION),
        duration: HELPER_END_TURN_DURATION,
        text: helper("helper.otherPlayerTurnEnded"),
        authorName: getCurrentPlayerName(),
      });
    }
  };

  mainBtn.addEventListener("click", mainBtnHandler);
}
