import type { Room, RoomEntry } from "../types/room.ts";
import type { Player, PlayerEntry } from "../types/player.ts";
import { database } from "../firebase.ts";
import {
  ref,
  set,
  get,
  remove,
  update,
  onValue,
  child,
  getDatabase,
  runTransaction,
  push,
  query,
  orderByChild,
  limitToLast,
  serverTimestamp,
} from "firebase/database";
import type { Phrase } from "../types/phrase.ts";
import type { Side, ShipPos } from "../types/room.ts";
import type { Action } from "../types/action.ts";
import { getRandomId } from "../utility/getRandomId.ts";

export type GlobalChatMessage = {
  id?: string;
  ts: number | null;
  name: string;
  text: string;
  color: string;
};

const GLOBAL_CHAT_LIMIT = 20;

const SHIP_IDS: Record<Side, string[]> = {
  left: Array.from({ length: 8 }, (_, i) => `p1-cell-${i + 1}`),
  right: Array.from({ length: 8 }, (_, i) => `p2-cell-${i + 1}`),
};

const roomRef = (roomId: Room["id"]) => ref(database, `rooms/${roomId}`);
const shipsSideRef = (roomId: Room["id"], side: Side) =>
  child(roomRef(roomId), `ships/${side}`);
const shipRef = (roomId: Room["id"], side: Side, shipId: string) =>
  child(roomRef(roomId), `ships/${side}/${shipId}`);

const currentStepsStrikeRef = (roomId: Room["id"]) =>
  child(roomRef(roomId), "currentStepsStrike");
const currentStepsStrikeSideRef = (roomId: Room["id"], side: Side) =>
  child(roomRef(roomId), `currentStepsStrike/${side}`);

const globalChatRef = ref(database, "globalChat");
const globalChatMessagesRef = child(globalChatRef, "messages");

function toPlayer(entry: PlayerEntry): Player {
  return {
    ...entry,
    itsTurn: false,
    diceHistory: [],
    diceStreak: [],
  };
}

export function writeRoomData(
  { id, name }: RoomEntry,
  author: PlayerEntry,
  isRestart?: boolean
) {
  const players = isRestart ? [] : [toPlayer(author)];

  return set(roomRef(id), {
    id,
    authorId: author.id,
    name,
    players,
    date: new Date().toISOString(),
    ships: { left: {}, right: {} },
    suggestRestartSide: null,
    timeWhenSuggestRestart: null,
    restartConfirmedAt: null,
    restartBy: null,
  });
}

export function listenToRooms(callback: (rooms: Room[]) => void) {
  const roomsRef = ref(database, "rooms");
  onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data ? Object.values(data) : []);
  });
}

export async function getAllRooms(): Promise<Room[]> {
  const roomsRef = ref(database, "rooms");
  const snap = await get(roomsRef);
  return snap.val() ? Object.values(snap.val()) : [];
}

export function listeToRoomById(
  roomId: Room["id"],
  callback: (room: Room | undefined) => void
) {
  onValue(roomRef(roomId), (snapshot) => {
    callback(snapshot.val() || undefined);
  });
}

export async function addActionToRoom(
  roomId: Room["id"],
  action: Partial<Action>
): Promise<void> {
  const r = roomRef(roomId);
  const snap = await get(r);
  if (!snap.exists()) throw new Error(`Room ${roomId} does not exist.`);

  const roomData = snap.val() as Room;
  const actions: Action[] = roomData.actions || [];
  action.id = getRandomId();
  actions.push(action as Action);

  await update(r, { actions });
}

export async function updateRoom(
  roomId: Room["id"],
  updates: Partial<Room>
): Promise<void> {
  await update(roomRef(roomId), updates);
}

export async function updatePlayer(
  roomId: Room["id"],
  playerSide: Side,
  updates: Partial<Player>
): Promise<void> {
  const rRef = roomRef(roomId);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error(`Room ${roomId} does not exist.`);

  const roomData = snap.val() as Room;
  const players: Player[] = roomData.players || [];
  const idx = playerSide === "left" ? 0 : 1;

  if (!players[idx])
    throw new Error(`Player '${playerSide}' does not exist in room ${roomId}.`);

  players[idx] = { ...players[idx], ...updates };
  await update(rRef, { players });
}

export async function addPhraseToRoom(
  roomId: Room["id"],
  newPhrase: Phrase
): Promise<void> {
  const rRef = roomRef(roomId);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Room does not exist");

  const roomData = snap.val() as Room;
  const phrases: Phrase[] = roomData.phrases || [];

  const exists = phrases.some((p) => p.id === newPhrase.id);
  if (!exists) {
    await update(rRef, { phrases: [...phrases, newPhrase] });
  }
}

export async function addNewPlayerToRoom(
  newUser: PlayerEntry,
  roomId: Room["id"]
): Promise<void> {
  const db = getDatabase();
  const rRef = ref(db, `rooms/${roomId}`);
  const desiredSide = getCurrentPlayerSide();

  try {
    await runTransaction(rRef, (roomData) => {
      if (roomData === null) {
        throw new Error(`Room ${roomId} does not exist.`);
      }
      const players = roomData.players || [null, null];
      if (
        players.some((p: PlayerEntry | null) => p && p.color === newUser.color)
      ) {
        throw new Error("Your color is already taken");
      }

      let sideToUse = desiredSide;

      const leftIndex = 0;
      const rightIndex = 1;
      const isLeftFree = !players[leftIndex];
      const isRightFree = !players[rightIndex];

      if (desiredSide === "left") {
        if (!isLeftFree && isRightFree) {
          sideToUse = "right";
        }
      } else if (desiredSide === "right") {
        if (!isRightFree && isLeftFree) {
          sideToUse = "left";
        }
      }

      if (!isLeftFree && !isRightFree) {
        throw new Error("The room is already full");
      }
      if (sideToUse === "left") {
        players[leftIndex] = toPlayer(newUser);
      } else {
        players[rightIndex] = toPlayer(newUser);
      }

      roomData.players = players;

      setCurrentPlayerSide(sideToUse as Side);

      return roomData;
    });
  } catch (error) {
    console.error("Error adding player to room: ", error);
    throw error;
  }
}

export async function getRoomById(
  roomId: Room["id"]
): Promise<Room | undefined> {
  const snap = await get(roomRef(roomId));
  if (!snap.exists()) throw new Error(`Room ${roomId} does not exist.`);
  return snap.val() as Room;
}

export function setCurrentRoomId(id: Room["id"]) {
  localStorage.setItem("currentRoomId", String(id));
}
export function getCurrentRoomId(): Room["id"] {
  return Number(localStorage.getItem("currentRoomId"));
}

export function setRestartRoomId(id: Room["id"]) {
  localStorage.setItem("restartRoomId", String(id));
}
export function getRestartRoomId(): Room["id"] {
  return Number(localStorage.getItem("restartRoomId"));
}
export function deleteRestartRoomId(): Room["id"] {
  return Number(localStorage.removeItem("restartRoomId"));
}

export function setCurrentPlayerName(userName: Player["name"]) {
  localStorage.setItem("currentPlayerName", userName);
}
export function getCurrentPlayerName(): Player["name"] {
  return localStorage.getItem("currentPlayerName") || "Невідомий гравець";
}

export function setCurrentPlayerSide(side: Side) {
  localStorage.setItem("side", side);
}
export function getCurrentPlayerSide() {
  return localStorage.getItem("side") || "left";
}

export function setCurrentPlayerId(id: Player["id"]) {
  localStorage.setItem("currentPlayerId", String(id));
}
export function getCurrentPlayerId() {
  return Number(localStorage.getItem("currentPlayerId"));
}

export function getCurrentPlayerInfo() {
  const playerInfo = localStorage.getItem("playerInfo");

  if (playerInfo) {
    const parsedInfo = JSON.parse(playerInfo);
    if (parsedInfo.avatar) {
      parsedInfo.avatar = Number(parsedInfo.avatar);
    }
    return parsedInfo;
  }
  return null;
}

export function setCurrentPlayerInfo(playerInfo: PlayerEntry) {
  try {
    const json = JSON.stringify(playerInfo);
    localStorage.setItem("playerInfo", json);
  } catch (error) {
    console.error("Failed to save player info:", error);
  }
}

export async function clearOutdatedRooms(): Promise<void> {
  const roomsRef = ref(database, "rooms");
  const snapshot = await get(roomsRef);
  if (!snapshot.exists()) return;

  const rooms: Record<string, Room> = snapshot.val();
  const now = Date.now();
  const ttl = 60 * 60 * 1000;

  const deletions = Object.entries(rooms)
    .filter(([, room]) => {
      const isOld = room.date && now - new Date(room.date).getTime() > ttl;
      const isFinished = room.gameIsFinished === true;
      return isOld || isFinished;
    })
    .map(([roomId]) => remove(ref(database, `rooms/${roomId}`)));

  await Promise.all(deletions);
}

export async function clearOutdatedActions(roomId: Room["id"]): Promise<void> {
  const r = roomRef(roomId);
  const snap = await get(r);
  if (!snap.exists()) throw new Error(`Room ${roomId} does not exist.`);

  const roomData = snap.val() as Room;
  const actions: Action[] = roomData.actions || [];

  const now = new Date();
  const validActions = actions.filter((action) => {
    const endsAtDate = new Date(action.endsAt);
    return endsAtDate > now;
  });

  if (validActions.length !== actions.length) {
    await update(r, { actions: validActions });
  }
}

export async function ensureShipsForSide(
  roomId: Room["id"],
  side: Side
): Promise<void> {
  const sideRef = shipsSideRef(roomId, side);
  const snap = await get(sideRef);
  const current = (snap.exists() ? snap.val() : {}) as Record<string, ShipPos>;

  const toWrite: Record<string, ShipPos> = {};
  for (const id of SHIP_IDS[side]) {
    if (!(id in current)) toWrite[id] = "hand";
  }
  if (Object.keys(toWrite).length) {
    await update(sideRef, toWrite);
  }
}

export async function setShipPosition(
  roomId: Room["id"],
  side: Side,
  shipId: string,
  pos: ShipPos
): Promise<void> {
  await set(shipRef(roomId, side, shipId), pos);
}

export async function patchShips(
  roomId: Room["id"],
  side: Side,
  patch: Record<string, ShipPos>
): Promise<void> {
  await update(shipsSideRef(roomId, side), patch);
}

export async function getStepsStrike(roomId: Room["id"], side?: Side) {
  const snap = await get(currentStepsStrikeRef(roomId));
  if (!snap.exists()) return undefined;
  const data = snap.val();
  return side ? data?.[side] : data;
}

export async function consumeSteps(
  roomId: Room["id"],
  usedIndices: number[]
): Promise<void> {
  const roomSnap = await get(roomRef(roomId));
  if (!roomSnap.exists()) return;

  const room = roomSnap.val() as Room;
  const side = room.isTurn as Side | undefined;
  if (!side) return;

  const strikeSnap = await get(currentStepsStrikeSideRef(roomId, side));
  if (!strikeSnap.exists()) return;

  const arr = strikeSnap.val();
  if (!Array.isArray(arr)) return;

  const remaining = arr.filter(
    (_: unknown, i: number) => !usedIndices.includes(i)
  );
  await set(currentStepsStrikeSideRef(roomId, side), remaining);
}

export async function clearCurrentStepsStrikeForTurn(
  roomId: Room["id"]
): Promise<void> {
  const rSnap = await get(roomRef(roomId));
  if (!rSnap.exists()) return;

  const room = rSnap.val() as Room;
  const side = room.isTurn as Side | undefined;
  if (!side) return;

  await set(currentStepsStrikeSideRef(roomId, side), []);
}

export async function setSuggestRestart(
  roomId: Room["id"],
  side: Side
): Promise<void> {
  await update(roomRef(roomId), {
    suggestRestartSide: side,
    timeWhenSuggestRestart: new Date().toISOString(),
  });
}

export async function clearSuggestRestart(roomId: Room["id"]): Promise<void> {
  await update(roomRef(roomId), {
    suggestRestartSide: null,
    timeWhenSuggestRestart: null,
  });
}

export async function confirmRestart(
  roomId: Room["id"],
  by: Side
): Promise<void> {
  await update(roomRef(roomId), {
    restartConfirmedAt: new Date().toISOString(),
    restartBy: by,
  });
}

export async function clearRestartConfirmation(
  roomId: Room["id"]
): Promise<void> {
  await update(roomRef(roomId), {
    restartConfirmedAt: null,
    restartBy: null,
  });
}

export async function sendGlobalMessage(
  name: string,
  text: string,
  color: string = "#ffffff"
): Promise<string> {
  const cleanName = name.trim().slice(0, 14);
  const cleanText = text.trim().slice(0, 200);
  if (!cleanName || cleanName.length < 3) throw new Error("Invalid name");
  if (!cleanText) throw new Error("Empty message");

  const newRef = await push(globalChatMessagesRef, {
    ts: serverTimestamp(),
    name: cleanName,
    text: cleanText,
    color: color,
  });

  await pruneGlobalChat(GLOBAL_CHAT_LIMIT);
  return newRef.key as string;
}

export async function pruneGlobalChat(
  limit = GLOBAL_CHAT_LIMIT
): Promise<void> {
  const snap = await get(globalChatMessagesRef);
  if (!snap.exists()) return;

  const entries = Object.entries(
    snap.val() as Record<string, GlobalChatMessage>
  );
  entries.sort((a, b) => (a[1].ts ?? 0) - (b[1].ts ?? 0));
  const extra = entries.length - limit;
  if (extra <= 0) return;

  const toRemove = entries
    .slice(0, extra)
    .map(([key]) => remove(child(globalChatMessagesRef, key)));
  await Promise.all(toRemove);
}

export function listenGlobalChat(
  callback: (messages: GlobalChatMessage[]) => void
): () => void {
  const q = query(
    globalChatMessagesRef,
    orderByChild("ts"),
    limitToLast(GLOBAL_CHAT_LIMIT)
  );
  const unsub = onValue(q, (snap) => {
    if (!snap.exists()) {
      callback([]);
      return;
    }
    const list: GlobalChatMessage[] = [];
    snap.forEach((childSnap) => {
      const v = childSnap.val() as Omit<GlobalChatMessage, "id">;
      list.push({ id: childSnap.key || undefined, ...v });
    });
    list.sort((a, b) => (a.ts ?? 0) - (b.ts ?? 0));
    callback(list);
  });
  return () => unsub();
}


