import type { Room, RoomEntry } from "../types/room.ts";
import type { Player, PlayerEntry } from "../types/player.ts";
import { database } from "../firebase.ts";
import { ref, set, get, remove, update, onValue } from "firebase/database";
import type { Phrase } from "../types/phrase.ts";

/* [ADDED] Імпортуємо типи для кораблів */
import type {
  RoomShips,
  PlayerShipsLeft,
  PlayerShipsRight,
  Side,
  ShipPos,
} from "../types/room.ts"; // [ADDED]

/* [ADDED] Дефолтний стан кораблів — усі в hand */
const DEFAULT_LEFT: PlayerShipsLeft = {
  // [ADDED]
  leftShip1: "hand",
  leftShip2: "hand",
  leftShip3: "hand",
  leftShip4: "hand",
  leftShip5: "hand",
  leftShip6: "hand",
  leftShip7: "hand",
  leftMainShip: "hand",
};

const DEFAULT_RIGHT: PlayerShipsRight = {
  // [ADDED]
  rightShip1: "hand",
  rightShip2: "hand",
  rightShip3: "hand",
  rightShip4: "hand",
  rightShip5: "hand",
  rightShip6: "hand",
  rightShip7: "hand",
  rightMainShip: "hand",
};

/* [CHANGED] при створенні кімнати ми одразу записуємо ships */
export function writeRoomData({ id, name }: RoomEntry, author: PlayerEntry) {
  return set(ref(database, `rooms/${id}`), {
    id: id,
    authorId: author.id,
    name: name,
    players: [author],
    date: new Date().toISOString(),
    ships: { left: DEFAULT_LEFT, right: DEFAULT_RIGHT } as RoomShips, // [ADDED]
  });
}

/**
 * Listens to the 'rooms' node in real-time and invokes the
 * @param callback Function to call whenever the rooms data changes
 */
export function listenToRooms(callback: (rooms: Room[]) => void) {
  const roomsRef = ref(database, "rooms");

  onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      callback([]);
      return;
    }

    const roomsArray: Room[] = Object.values(data);
    callback(roomsArray);
  });
}

export async function getAllRooms(): Promise<Room[]> {
  const roomRef = ref(database, "rooms");
  const snapshot = await get(roomRef);

  return snapshot.val() ? Object.values(snapshot.val()) : [];
}

/**
 * Listens to the 'room' in real-time and invokes the
 * @param callback Function to call whenever the rooms data changes
 */
export function listeToRoomById(
  roomId: Room["id"],
  callback: (room: Room | undefined) => void
) {
  const roomRef = ref(database, "rooms/" + roomId);

  onValue(roomRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      callback(data);
      return;
    }

    callback(data);
  });
}

/**
 * Updates the specified fields in a room. If a field doesn't exist, it will be added.
 *
 * @param roomId - The ID of the room to update
 * @param updates - An object containing the fields to update or add
 */
export async function updateRoom(
  roomId: Room["id"],
  updates: Partial<Room>
): Promise<void> {
  const roomRef = ref(database, "rooms/" + roomId);

  try {
    await update(roomRef, updates);
  } catch (error) {
    alert("Error updating room: ${error}");
    throw error;
  }
}

/**
 * Updates the player state
 */
export async function updatePlayer(
  roomId: Room["id"],
  playerSide: "left" | "right",
  updates: Partial<Player>
): Promise<void> {
  const roomRef = ref(database, "rooms/" + roomId);

  const snapshot = await get(roomRef);
  if (!snapshot.exists()) {
    alert(`Room with ID ${roomId} does not exist.`);
  }

  const roomData = snapshot.val();
  const players: Player[] = roomData.players || [];
  const playerIndex = playerSide === "left" ? 0 : 1;

  if (!players[playerIndex]) {
    alert(`Player at side '${playerSide}' does not exist in room ${roomId}.`);
  }

  const updatedPlayer = {
    ...players[playerIndex],
    ...updates,
  };

  players[playerIndex] = updatedPlayer;

  await update(roomRef, { players });
}

/**
 * Updates the phrase array in a room. If a field doesn't exist, it will be added.
 */
export async function addPhraseToRoom(
  roomId: Room["id"],
  newPhrase: Phrase
): Promise<void> {
  const roomRef = ref(database, "rooms/" + roomId);

  try {
    const snapshot = await get(roomRef);

    if (!snapshot.exists()) {
      throw new Error("Room does not exist");
    }

    const roomData = snapshot.val();
    const phrases: Phrase[] = roomData.phrases || [];

    const phraseExists = phrases.includes(newPhrase);

    if (!phraseExists) {
      const updatedPhrases = [...phrases, newPhrase];
      await update(roomRef, { phrases: updatedPhrases });
    }
  } catch (error) {
    alert(`Error adding phrase to room: ${error}`);
    throw error;
  }
}

export async function addNewPlayerToRoom(
  newUserObject: PlayerEntry,
  roomId: Room["id"]
): Promise<void> {
  const roomRef = ref(database, `rooms/${roomId}`);

  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    throw new Error(`Room with ID ${roomId} does not exist.`);
  }

  const roomData = snapshot.val();
  const players = roomData.players || [];

  if (players[0]?.color === newUserObject.color) {
    throw new Error("Your color is already taken");
  }

  if (players.length >= 2) {
    throw new Error("The room is already full");
  }

  players.push(newUserObject);
  await update(roomRef, { players });
}

export async function getRoomById(
  roomId: Room["id"]
): Promise<Room | undefined> {
  const roomRef = ref(database, `rooms/${roomId}`);

  const snapshot = await get(roomRef);
  if (!snapshot.exists()) {
    alert(`Room with ID ${roomId} does not exist.`);
    throw new Error(`Room with ID ${roomId} does not exist.`);
  }

  return snapshot.val();
}

/**
 * LocalStorage helpers
 */
export function setCurrentRoomId(id: Room["id"]) {
  localStorage.setItem("currentRoomId", String(id));
}

export async function clearOutdatedRooms(): Promise<void> {
  const roomsRef = ref(database, "rooms");
  const snapshot = await get(roomsRef);

  if (!snapshot.exists()) {
    return;
  }

  const rooms: Record<string, Room> = snapshot.val();
  const now = Date.now();
  const timeToDelete = 60 * 60 * 1000;

  const deletions = Object.entries(rooms)
    .filter(([, room]) => {
      if (!room.date) return false;
      
      const roomDate = new Date(room.date).getTime();
      return now - roomDate > timeToDelete;
    })
    .map(async ([roomId]) => {
      console.log(`Deleting outdated room: ${roomId}`);
      await remove(ref(database, `rooms/${roomId}`));
    });

  await Promise.all(deletions);

  console.log(`✅ Deleted ${deletions.length} outdated rooms.`);
}

export function getCurrentRoomId(): Room["id"] {
  return Number(localStorage.getItem("currentRoomId"));
}

export function setCurrentPlayerName(userName: Player["name"]) {
  localStorage.setItem("currentPlayerName", userName);
}

export function getCurrentPlayerName(): Player["name"] {
  const userName: string | null = localStorage.getItem("currentPlayerName");
  return userName ? userName : "Невідомий гравець";
}

export function setCurrentPlayerId(id: Player["id"]) {
  localStorage.setItem("currentPlayerId", String(id));
}

export function getCurrentPlayerId() {
  return Number(localStorage.getItem("currentPlayerId"));
}
