import type { Room, RoomEntry } from "../types/room.ts";
import type { Player, PlayerEntry } from "../types/player.ts";
import { database } from "../firebase.ts";
import { ref, set, get, remove, update, onValue, child } from "firebase/database";
import type { Phrase } from "../types/phrase.ts";
import type { Side, ShipPos } from "../types/room.ts";
import type { Action } from "../types/action.ts";
import { getRandomId } from "../utility/getRandomId.ts";

const SHIP_IDS: Record<Side, string[]> = {
  left: Array.from({ length: 8 }, (_, i) => `p1-cell-${i + 1}`),
  right: Array.from({ length: 8 }, (_, i) => `p2-cell-${i + 1}`),
};

const roomRef = (roomId: Room["id"]) => ref(database, `rooms/${roomId}`);
const shipsSideRef = (roomId: Room["id"], side: Side) => child(roomRef(roomId), `ships/${side}`);
const shipRef = (roomId: Room["id"], side: Side, shipId: string) =>
  child(roomRef(roomId), `ships/${side}/${shipId}`);

const currentStepsStrikeRef = (roomId: Room["id"]) => child(roomRef(roomId), "currentStepsStrike");
const currentStepsStrikeSideRef = (roomId: Room["id"], side: Side) =>
  child(roomRef(roomId), `currentStepsStrike/${side}`);

function toPlayer(entry: PlayerEntry): Player {
  return {
    ...entry,
    itsTurn: false,
    diceHistory: [],
    diceStreak: [],
  };
}

export function writeRoomData({ id, name }: RoomEntry, author: PlayerEntry) {
  return set(roomRef(id), {
    id,
    authorId: author.id,
    name,
    players: [toPlayer(author)],
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
  callback: (room: Room | undefined) => void,
) {
  onValue(roomRef(roomId), (snapshot) => {
    callback(snapshot.val() || undefined);
  });
}

export async function addActionToRoom(roomId: Room["id"], action: Partial<Action>): Promise<void> {
  const r = roomRef(roomId);
  const snap = await get(r);
  if (!snap.exists()) throw new Error(`Room ${roomId} does not exist.`);

  const roomData = snap.val() as Room;
  const actions: Action[] = roomData.actions || [];
  action.id = getRandomId();
  actions.push(action as Action);

  await update(r, { actions });
}

export async function updateRoom(roomId: Room["id"], updates: Partial<Room>): Promise<void> {
  await update(roomRef(roomId), updates);
}

export async function updatePlayer(
  roomId: Room["id"],
  playerSide: Side,
  updates: Partial<Player>,
): Promise<void> {
  const rRef = roomRef(roomId);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error(`Room ${roomId} does not exist.`);

  const roomData = snap.val() as Room;
  const players: Player[] = roomData.players || [];
  const idx = playerSide === "left" ? 0 : 1;

  if (!players[idx]) throw new Error(`Player '${playerSide}' does not exist in room ${roomId}.`);

  players[idx] = { ...players[idx], ...updates };
  await update(rRef, { players });
}

export async function addPhraseToRoom(roomId: Room["id"], newPhrase: Phrase): Promise<void> {
  const rRef = roomRef(roomId);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Room does not exist");

  const roomData = snap.val() as Room;
  const phrases: Phrase[] = roomData.phrases || [];

  const exists = phrases.some(p => p.id === newPhrase.id);
  if (!exists) {
    await update(rRef, { phrases: [...phrases, newPhrase] });
  }
}

export async function addNewPlayerToRoom(newUser: PlayerEntry, roomId: Room["id"]): Promise<void> {
  const rRef = roomRef(roomId);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error(`Room ${roomId} does not exist.`);

  const roomData = snap.val() as Room;
  const players = roomData.players || [];

  if (players[0]?.color === newUser.color) throw new Error("Your color is already taken");
  if (players.length >= 2) throw new Error("The room is already full");

  players.push(toPlayer(newUser));
  await update(rRef, { players });
}

export async function getRoomById(roomId: Room["id"]): Promise<Room | undefined> {
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

export function setCurrentPlayerName(userName: Player["name"]) {
  localStorage.setItem("currentPlayerName", userName);
}
export function getCurrentPlayerName(): Player["name"] {
  return localStorage.getItem("currentPlayerName") || "Невідомий гравець";
}

export function setCurrentPlayerId(id: Player["id"]) {
  localStorage.setItem("currentPlayerId", String(id));
}
export function getCurrentPlayerId() {
  return Number(localStorage.getItem("currentPlayerId"));
}

export async function clearOutdatedRooms(): Promise<void> {
  const roomsRef = ref(database, "rooms");
  const snapshot = await get(roomsRef);
  if (!snapshot.exists()) return;

  const rooms: Record<string, Room> = snapshot.val();
  const now = Date.now();
  const ttl = 60 * 60 * 1000;

  const deletions = Object.entries(rooms)
    .filter(([, room]) => room.date && now - new Date(room.date).getTime() > ttl)
    .map(([roomId]) => remove(ref(database, `rooms/${roomId}`)));

  await Promise.all(deletions);
}

export async function clearOutdatedActions(roomId: Room['id']): Promise<void> {
  const r = roomRef(roomId);
  const snap = await get(r);
  if (!snap.exists()) throw new Error(`Room ${roomId} does not exist.`);

  const roomData = snap.val() as Room;
  const actions: Action[] = roomData.actions || [];

  const now = new Date();
  const validActions = actions.filter(action => {
    const endsAtDate = new Date(action.endsAt);
    return endsAtDate > now;
  });

  if (validActions.length !== actions.length) {
    await update(r, { actions: validActions });
  }
}

export async function ensureShipsForSide(roomId: Room["id"], side: Side): Promise<void> {
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
  pos: ShipPos,
): Promise<void> {
  await set(shipRef(roomId, side, shipId), pos);
}

export async function patchShips(
  roomId: Room["id"],
  side: Side,
  patch: Record<string, ShipPos>,
): Promise<void> {
  await update(shipsSideRef(roomId, side), patch);
}

export async function getStepsStrike(roomId: Room["id"], side?: Side) {
  const snap = await get(currentStepsStrikeRef(roomId));
  if (!snap.exists()) return undefined;
  const data = snap.val();
  return side ? data?.[side] : data;
}

export async function consumeSteps(roomId: Room["id"], usedIndices: number[]): Promise<void> {
  const roomSnap = await get(roomRef(roomId));
  if (!roomSnap.exists()) return;

  const room = roomSnap.val() as Room;
  const side = room.isTurn as Side | undefined;
  if (!side) return;

  const strikeSnap = await get(currentStepsStrikeSideRef(roomId, side));
  if (!strikeSnap.exists()) return;

  const arr = strikeSnap.val();
  if (!Array.isArray(arr)) return;

  const remaining = arr.filter((_: unknown, i: number) => !usedIndices.includes(i));
  await set(currentStepsStrikeSideRef(roomId, side), remaining);
}

export async function clearCurrentStepsStrikeForTurn(roomId: Room["id"]): Promise<void> {
  const rSnap = await get(roomRef(roomId));
  if (!rSnap.exists()) return;

  const room = rSnap.val() as Room;
  const side = room.isTurn as Side | undefined;
  if (!side) return;

  await set(currentStepsStrikeSideRef(roomId, side), []);
}

export async function setSuggestRestart(roomId: Room["id"], side: Side): Promise<void> {
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

export async function confirmRestart(roomId: Room["id"], by: Side): Promise<void> {
  await update(roomRef(roomId), {
    restartConfirmedAt: new Date().toISOString(),
    restartBy: by,
  });
}

export async function clearRestartConfirmation(roomId: Room["id"]): Promise<void> {
  await update(roomRef(roomId), {
    restartConfirmedAt: null,
    restartBy: null,
  });
}
