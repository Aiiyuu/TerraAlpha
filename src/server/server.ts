import type { Room, RoomEntry } from "../types/room.ts";
import type { Player, PlayerEntry } from "../types/player.ts";

// Firebase
import { database } from "../firebase.ts";
import { ref, set, get, update, onValue } from "firebase/database";
import type { Phrase } from "../types/phrase.ts";

export function writeUserData({ id, avatar, name, color }: PlayerEntry) {
  set(ref(database, `users/${id}`), {
    id: id,
    avatar: avatar,
    name: name,
    itsTurn: false,
    diceHistory: [],
    diceStreak: [],
    color: color,
  });
}

export function writeRoomData({ id, name }: RoomEntry, author: PlayerEntry) {
  return set(ref(database, `rooms/${id}`), {
    id: id,
    authorId: author.id,
    name: name,
    players: [author],
    date: new Date().toISOString(),
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

    // Convert the object of rooms into an array
    const roomsArray: Room[] = Object.values(data);
    callback(roomsArray);
  });
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

  try {
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
  } catch (error) {
    alert(`Failed to update player: ${error}`);
    throw error;
  }
}

/**
 * Updates the phrase array in a room. If a field doesn't exist, it will be added.
 *
 * @param roomId - The ID of the room to update
 * @param newPhrase - An object containing the fields of new phrase
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

  try {
    // Read current room data
    const snapshot = await get(roomRef);
    if (!snapshot.exists()) {
      alert(`Room with ID ${roomId} does not exist.`);
      throw new Error(`Room with ID ${roomId} does not exist.`);
    }

    const roomData = snapshot.val();

    // Get current players array, or empty if none
    const players = roomData.players || [];

    // Append new user object
    players.push(newUserObject);

    // Update players array in the database
    await update(roomRef, { players });
  } catch (error) {
    alert(`Failed to add player to room: ${error}`);
    return;
  }
}

export async function getRoomById(
  roomId: Room["id"]
): Promise<Room | undefined> {
  const roomRef = ref(database, `rooms/${roomId}`);

  try {
    const snapshot = await get(roomRef);
    if (!snapshot.exists()) {
      alert(`Room with ID ${roomId} does not exist.`);
      throw new Error(`Room with ID ${roomId} does not exist.`);
    }

    return snapshot.val();
  } catch (error) {
    alert(`Failed to load the room: ${error}`);
  }
}

/**
 * Saves room id in the localstorage, used for dialogs and phrases
 * @param id
 */
export function setCurrentRoomId(id: Room["id"]) {
  localStorage.setItem("currentRoomId", String(id));
}

/**
 * Returns room id in the localstorage, used for dialogs and phrases
 * @param id
 */
export function getCurrentRoomId(): Room["id"] {
  return Number(localStorage.getItem("currentRoomId"));
}

/**
 * Saves the player's in the localstorage, used for dialogs and phrases
 * @param userName
 */
export function setCurrentPlayerName(userName: Player["name"]) {
  localStorage.setItem("currentPlayerName", userName);
}

/**
 * Returns current user's name in the localstorage, used for dialogs and phrases
 */
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
