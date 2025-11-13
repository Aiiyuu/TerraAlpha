import {
  addActionToRoom,
  getCurrentPlayerId,
  getCurrentPlayerName,
  listeToRoomById,
  setRestartRoomId,
  updatePlayer,
  updateRoom,
} from "../server/server";
import type { Phrase } from "../types/phrase";
import type { Room, RoomEntry } from "../types/room";
import {
  declareCoinResult,
  flipCoin,
  getRandomSide,
  initCoin,
  COIN_ANIMATION_DURATION,
} from "./coin";
import { showPhrase } from "./dialog";
import { HIDE_DICE_DELAY, syncDiceHelper, throwDice } from "./dice";
import {
  setupLeftPlayer,
  setupPlayerColors,
  setupRightPlayer,
} from "./playersInfo";
import { detectTimerChanges, extendTimer } from "./timer";
import Steps from "../components/stepsButtons";
import { setupPrediction } from "../components/prediction";
import { setupShipMove } from "./shipMove";
import { initShipSync } from "../components/ShipSync";
import { initMainPrediction } from "./MainPrediction";
import { initPlayerBlockedInfo } from "./playersPenalty";
import { initPlayerWin } from "../components/playerWin";
import bgMusicSrc from "../assets/sounds/background-music.mp3";
import { createSound } from "./sound";
import { syncActions } from "./actions";
import { syncResetBtn, showMenu, hideMenu, startTimer } from "./reset";
import { HelperTypes, triggerHelper } from "./helper";
import {
  helper,
  HELPER_END_TURN_DURATION,
  HELPER_WELCOME_DURATION,
} from "../config";
import { ActionTypes } from "../types/action";
import { getEndDate } from "../utility/getEndDate";
import { initAutoEndTurnProbe } from "../utility/autoEndTurn";

type Side = "left" | "right";
type FirebasePatch = Record<string, unknown>;

type RoomWithCoin = Room & {
  coin?: { result?: Side; shown?: boolean; at?: string };
  coinShown?: boolean;
  coinInitialized?: boolean;
  lastResetOffer?: unknown;
};

const EXTRA_TIME_WHEN_ROLLED_SIX = 15000;

const mainBtn = document.getElementById("main-btn") as HTMLButtonElement;

let previousRoomState: Room | undefined;
let leftPlayerIsConnected = false;
let rightPlayerisConnected = false;
const shownPhrases: Phrase["id"][] = [];
let diceIsRolling = false;
let currentPlayerId: number | undefined;
let currentPlayerSide: Side | undefined;
let stopShipSync: (() => void) | null = null;
let stopMainPrediction: (() => void) | null = null;
let stopPlayerBlockedInfo: (() => void) | null = null;
let stopPlayerWin: (() => void) | null = null;
let mainBtnHandler: ((this: HTMLButtonElement, ev: MouseEvent) => void) | null =
  null;
let autoProbe: ReturnType<typeof initAutoEndTurnProbe> | null = null;
let autoDiceDuplicated = false;
let stopWatchLeft: (() => void) | null = null;
let stopWatchRight: (() => void) | null = null;
let gameIsFinished = false;

const { startSound: startBgMusic } = createSound({
  src: bgMusicSrc,
  loudness: 0.4,
  infinite: true,
});

const coinStart = () => window.dispatchEvent(new Event("coin:start"));
const coinEnd = () => window.dispatchEvent(new Event("coin:end"));

const safeUpdate = (id: Room["id"], patch: FirebasePatch) =>
  updateRoom(id, patch).catch(() => undefined);

const safeUpdatePlayer = (
  id: Room["id"],
  side: Side,
  patch: Record<string, unknown>
) => updatePlayer(id, side, patch).catch(() => undefined);

function updateMotherLockByDOM(side: Side) {
  const prefix = side === "left" ? "p1" : "p2";
  const hand = document.querySelector<HTMLElement>(`[data-qa="${prefix}-hand"]`);
  if (!hand) return;

  const motherBtn = hand.querySelector<HTMLButtonElement>(
    '.cell-btn[data-ship="mother"]'
  );

  const hasMother = !!motherBtn;

  hand.style.border = hasMother ? "2px solid #444" : "none";

  if (!motherBtn) {
    return;
  }

  const hasSimple = Array.from(
    hand.querySelectorAll<HTMLButtonElement>(".cell-btn")
  ).some((btn) => btn !== motherBtn && btn.innerHTML.trim().length > 0);

  motherBtn.disabled = hasSimple;
  motherBtn.setAttribute("aria-disabled", hasSimple ? "true" : "false");
  motherBtn.setAttribute("data-locked", hasSimple ? "1" : "0");
}

function watchHand(side: Side) {
  const prefix = side === "left" ? "p1" : "p2";
  const hand = document.querySelector<HTMLElement>(`[data-qa="${prefix}-hand"]`);
  if (!hand) return () => {};
  const observer = new MutationObserver(() => updateMotherLockByDOM(side));
  observer.observe(hand, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["data-ship", "data-has-ship", "data-occupied", "class"],
  });
  updateMotherLockByDOM(side);
  return () => observer.disconnect();
}

function updateEndTurnDisabled(roomState: Room, mySide: Side | null) {
  if (!mySide) return;
  const raw = roomState.currentStepsStrike?.[mySide];
  const hasSteps = Array.isArray(raw)
    ? raw.length > 0
    : raw
    ? Object.keys(raw).length > 0
    : false;
  if (mainBtn.getAttribute("data-type") === "end-turn") {
    mainBtn.disabled = hasSteps;
    mainBtn.classList.toggle("disabled", hasSteps);
  }
}

function setStepsDisabledAttr(disabled: boolean) {
  const box = document.getElementById("steps-container");
  if (!box) return;
  box.setAttribute("aria-disabled", String(disabled));
  box
    .querySelectorAll<HTMLButtonElement>(".steps-btn")
    .forEach((b) => (b.disabled = disabled));
}

function renderStepsStrike(roomState: Room) {
  const leftContainer = document.querySelector<HTMLElement>(
    '[data-qa="p1-steps-strike"]'
  );
  const rightContainer = document.querySelector<HTMLElement>(
    '[data-qa="p2-steps-strike"]'
  );

  if (leftContainer) {
    leftContainer.innerHTML = "";
  }

  if (rightContainer) {
    rightContainer.innerHTML = "";
  }

  if (roomState.isDiceRolling) {
    return;
  }

  const mySideAttr = document.body.getAttribute("data-my-side") as
    | Side
    | null;
  const showLeft = !mySideAttr || mySideAttr !== "left";
  const showRight = !mySideAttr || mySideAttr !== "right";

  const leftRaw = roomState.currentStepsStrike?.left;
  const rightRaw = roomState.currentStepsStrike?.right;

  const leftSteps: number[] = Array.isArray(leftRaw)
    ? (leftRaw as number[])
    : leftRaw
    ? (Object.values(leftRaw as Record<string, number>) as number[])
    : [];

  const rightSteps: number[] = Array.isArray(rightRaw)
    ? (rightRaw as number[])
    : rightRaw
    ? (Object.values(rightRaw as Record<string, number>) as number[])
    : [];

  if (leftContainer && showLeft) {
    leftSteps.forEach((step, index) => {
      const el = document.createElement("div");
      el.className = "steps-strike__item steps-strike__item--left";
      el.textContent = String(step);
      el.dataset.index = String(index);
      leftContainer.appendChild(el);
    });
  }

  if (rightContainer && showRight) {
    rightSteps.forEach((step, index) => {
      const el = document.createElement("div");
      el.className = "steps-strike__item steps-strike__item--right";
      el.textContent = String(step);
      el.dataset.index = String(index);
      rightContainer.appendChild(el);
    });
  }
}

export function getCurrentTurnSide(): Side {
  return currentPlayerSide ?? "left";
}

export function startGame(room: RoomEntry) {
  const roomId: Room["id"] = room.id;

  triggerHelper({
    duration: HELPER_WELCOME_DURATION,
    text: helper("helper.welcome"),
    type: HelperTypes.HELPER_HINT,
    priority: -2,
    dedupeKey: "welcome",
    delayBeforeShow: 0,
  });

  stopShipSync?.();
  stopShipSync = null;
  stopMainPrediction?.();
  stopMainPrediction = null;
  stopPlayerBlockedInfo?.();
  stopPlayerBlockedInfo = null;
  stopPlayerWin?.();
  stopPlayerWin = null;

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
        stopShipSync?.();
      },
      { once: true }
    );
  }

  stopWatchLeft?.();
  stopWatchRight?.();
  stopWatchLeft = watchHand("left");
  stopWatchRight = watchHand("right");

  stopMainPrediction = initMainPrediction(roomId);
  stopPlayerBlockedInfo = initPlayerBlockedInfo(roomId);

  window.addEventListener(
    "beforeunload",
    () => {
      stopMainPrediction?.();
      stopPlayerBlockedInfo?.();
      stopPlayerWin?.();
      autoProbe?.destroy();
      autoProbe = null;
      stopWatchLeft?.();
      stopWatchRight?.();
    },
    { once: true }
  );

  if (!autoProbe) {
    autoProbe = initAutoEndTurnProbe({
      mainBtn,
      thresholdSec: 50,
      getIsMyTurn: () => {
        if (!previousRoomState || !currentPlayerSide) return false;
        return previousRoomState.isTurn === currentPlayerSide;
      },
      getIsStrikeEmpty: () => {
        const side = previousRoomState?.isTurn as Side | undefined;
        if (!previousRoomState || !side) return false;
        const raw = previousRoomState.currentStepsStrike?.[side];
        if (!raw) return true;
        return Array.isArray(raw)
          ? raw.length === 0
          : Object.keys(raw).length === 0;
      },
    });
  }

  listeToRoomById(roomId, async (roomState) => {
    if (!roomState) return;

    const prev = previousRoomState as RoomWithCoin | undefined;
    const current = roomState as RoomWithCoin;
    previousRoomState = roomState;

    if (prev?.isTurn !== roomState.isTurn) {
      autoProbe?.reset();
    }

    if (prev?.timerState !== roomState.timerState) {
      autoDiceDuplicated = false;
    }

    syncActions(roomState.actions || []);
    syncResetBtn(current.lastResetOffer);

    if (roomState.restartRoomId) {
      setRestartRoomId(roomState.restartRoomId);
      window.location.reload();
    }

    detectTimerChanges(
      prev?.timerState,
      roomState.timerState!,
      currentPlayerSide === roomState.isTurn,
      {
        onTick: (sec) => autoProbe?.onTick(sec),
        thresholdSeconds: 45,
        onThreshold: () => {
          if (autoDiceDuplicated) return;
          if (!currentPlayerSide) return;
          if (currentPlayerSide !== roomState.isTurn) return;
          if (!mainBtn) return;
          if (mainBtn.classList.contains("disabled")) return;
          if (roomState.isDiceRolling) return;
          const btnType = mainBtn.getAttribute("data-type");
          if (btnType !== "dice") return;
          autoDiceDuplicated = true;
          mainBtn.click();
        },
      }
    );

    if (!currentPlayerId) {
      currentPlayerId = getCurrentPlayerId();
      setupPlayerColors(roomState, currentPlayerId);
    }

    const myIndex: number = roomState.players.findIndex(
      (p) => p.id === currentPlayerId
    );
    const hasIndex = myIndex >= 0;
    const mySideByIndex: Side | null = hasIndex
      ? myIndex === 0
        ? "left"
        : "right"
      : null;
    const haveTwoPlayers = roomState.players.length === 2;
    const prevPlayersCount = prev?.players?.length ?? 0;
    const becameTwo = prevPlayersCount < 2 && haveTwoPlayers;
    const isLeader = myIndex === 0;

    if (hasIndex) {
      currentPlayerSide = mySideByIndex as Side;
      const mySide = currentPlayerSide;
      const oppSide: Side = mySide === "left" ? "right" : "left";
      document.body.dataset.mySide = mySide;
      document.body.setAttribute("data-my-side", mySide);
      document.body.setAttribute("data-opponent-side", oppSide);
    }

    renderStepsStrike(roomState);

    if (!gameIsFinished) {
      stopPlayerWin = initPlayerWin(roomId, currentPlayerSide as Side);
      gameIsFinished = true;
    }

    if (
      roomState.suggestRestartSide &&
      roomState.timeWhenSuggestRestart &&
      currentPlayerSide
    ) {
      const startedAt = new Date(roomState.timeWhenSuggestRestart).getTime();
      const isInitiator = roomState.suggestRestartSide === currentPlayerSide;
      const myPanel = document.querySelector(
        `[data-my-side="${currentPlayerSide}"] .game-menu`
      ) as HTMLElement | null;
      if (myPanel) {
        const timerEl = myPanel.querySelector(
          ".gm-timer"
        ) as HTMLElement | null;
        const isRunning = !!timerEl && !timerEl.classList.contains("is-hidden");
        showMenu(myPanel);
        if (!isRunning) startTimer(myPanel, startedAt, 10000, !isInitiator);
      }
    } else {
      const panels = document.querySelectorAll(".game-menu");
      panels.forEach((p) => hideMenu(p as HTMLElement));
    }

    document.body.classList.remove("side-left", "side-right");
    if (currentPlayerSide) {
      document.body.classList.add(`side-${currentPlayerSide}`);
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

    const coinNode = current.coin;
    const prevCoinNode = prev?.coin;
    const legacyPrevShown = prev?.coinShown;
    const legacyNowShown = current.coinShown;

    let effectiveTurnSide = roomState.isTurn as Side | undefined;

    if (becameTwo && isLeader && !current.coinInitialized) {
      const decidedSide: Side = coinNode?.result ?? getRandomSide();
      effectiveTurnSide = decidedSide;
      document.body.setAttribute("data-turn-side", decidedSide);
      const optimisticIsMyTurn = hasIndex && decidedSide === mySideByIndex;
      if (optimisticIsMyTurn) {
        mainBtn.classList.remove("disabled");
        document.body.classList.remove("not-my-turn");
        document.body.setAttribute("data-turn-active", "1");
      } else {
        mainBtn.classList.add("disabled");
        document.body.classList.add("not-my-turn");
        document.body.setAttribute("data-turn-active", "0");
      }
      await safeUpdate(roomId, {
        isTurn: decidedSide,
        coin: {
          result: decidedSide,
          shown: true,
          at: new Date().toISOString(),
        },
        coinShown: true,
        timerState: new Date().toISOString(),
        coinInitialized: true,
      });
    }

    if (!becameTwo || (becameTwo && current.coinInitialized)) {
      document.body.setAttribute("data-turn-side", effectiveTurnSide || "");
    }

    const shouldFlipOnce =
      haveTwoPlayers &&
      (((!prevCoinNode || !prevCoinNode?.shown) &&
        coinNode?.shown &&
        coinNode?.result) ||
        (!legacyPrevShown && legacyNowShown && roomState.isTurn));

    if (shouldFlipOnce) {
      const side: Side = coinNode?.result ?? (effectiveTurnSide as Side);
      coinStart();
      declareCoinResult(side, currentPlayerSide || "left", roomState);
      flipCoin(side);
      setTimeout(() => {
        coinEnd();
      }, COIN_ANIMATION_DURATION);
    }

    if (roomState.phrases) {
      if (roomState.phrases.length !== (prev?.phrases?.length ?? 0)) {
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

    const turnIndex = effectiveTurnSide
      ? effectiveTurnSide === "left"
        ? 0
        : 1
      : -1;

    if (
      hasIndex &&
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

    updateMotherLockByDOM("left");
    updateMotherLockByDOM("right");

    if (hasIndex) {
      const raw = roomState.currentStepsStrike?.[mySideByIndex || "left"];
      const strike = Array.isArray(raw) ? raw : raw ? Object.values(raw) : [];
      const canUseSteps =
        haveTwoPlayers &&
        turnIndex !== -1 &&
        myIndex === turnIndex &&
        !roomState.isDiceRolling &&
        roomState.lastDiceResult !== 6 &&
        !!raw &&
        (Array.isArray(raw) ? raw.length > 0 : Object.keys(raw).length > 0);
      Steps.render(strike, canUseSteps);
      const shouldDisablePanel =
        roomState.lastDiceResult === 6 &&
        haveTwoPlayers &&
        turnIndex !== -1 &&
        myIndex === turnIndex;
      setStepsDisabledAttr(shouldDisablePanel);
    } else {
      Steps.clear();
      setStepsDisabledAttr(false);
    }

    updateEndTurnDisabled(roomState, mySideByIndex);

    const strikeSide = roomState.isTurn as Side | undefined;
    if (strikeSide) {
      const rawStrike = roomState.currentStepsStrike?.[strikeSide];
      const isEmpty = !rawStrike
        ? true
        : Array.isArray(rawStrike)
        ? rawStrike.length === 0
        : Object.keys(rawStrike).length === 0;
      if (isEmpty) autoProbe?.notifyStrikeChanged();
    }
  });

  void safeUpdate(roomId, {
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
      void safeUpdate(roomId, {
        isDiceRolling: true,
        lastDiceResult: randomNum,
      });
      if (turnIndex !== -1) {
        void safeUpdatePlayer(roomId, previousRoomState!.isTurn as Side, {
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
        void safeUpdate(roomId, { isDiceRolling: false });
        if (randomNum !== 6) {
          mainBtn.innerText = "Закінчити хід";
          mainBtn.setAttribute("data-type", "end-turn");
          if (previousRoomState && currentPlayerSide) {
            updateEndTurnDisabled(previousRoomState, currentPlayerSide);
          }
          setStepsDisabledAttr(false);
        } else {
          if (previousRoomState?.timerState) {
            updateRoom(roomId, {
              timerState: extendTimer(
                previousRoomState?.timerState,
                EXTRA_TIME_WHEN_ROLLED_SIX
              ),
            });
          }
          setStepsDisabledAttr(true);
        }
      }, HIDE_DICE_DELAY);
    } else if (btnType === "end-turn") {
      void safeUpdatePlayer(roomId, previousRoomState!.isTurn as Side, {
        diceStreak: [],
      });
      void updateRoom(roomId, { currentStepsStrike: { left: [], right: [] } });
      Steps.clear();
      setStepsDisabledAttr(false);
      const nextTurn: Side =
        previousRoomState?.isTurn === "left" ? "right" : "left";
      void safeUpdate(roomId, {
        isTurn: nextTurn,
        timerState: new Date().toISOString(),
      });
      mainBtn.innerText = "";
      mainBtn.setAttribute("data-type", "dice");
      mainBtn.disabled = false;
      mainBtn.classList.remove("disabled");
      void addActionToRoom(roomId, {
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
