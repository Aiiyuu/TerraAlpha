import type { Room } from "../types/room.ts";
import { deepUpdate } from "../utility/getDeepCopy.ts";

/**
 * Rewrites rooms inside storage
 * @param rooms
 */
function saveRoomsToServer(rooms: Room[]) {
  localStorage.setItem("rooms", JSON.stringify(rooms));
}

/**
 * Fetches rooms from server and adds a new one
 * @param room
 */
export function addRoomToServer(room: Room) {
  const rooms: Room[] = getRoomsFromServer();
  rooms.unshift(room);

  localStorage.setItem('rooms', JSON.stringify(rooms));
}

/**
 * Returns an array of rooms from server
 */
export function getRoomsFromServer(): Room[] {
  return JSON.parse(localStorage.getItem('rooms') || '[]');
}

/**
 * Updates a room object in the list of rooms using a deep update strategy, based on the room ID.
 *
 * @param {Room} updatedRoom - The room object containing the updated values.
 * @returns {Room[]} The updated list of rooms.
 */
export function updateRoom(updatedRoom: Room): Room[] {
  const rooms: Room[] = getRoomsFromServer();

  const updatedRooms = rooms.map(room => {
    if (room.id === updatedRoom.id) {
      return deepUpdate(room, updatedRoom);
    }
    return room;
  });

  saveRoomsToServer(updatedRooms as Room[]);

  return updatedRooms as Room[];
}

/**
 * Remove room associated with the roomId from the server
 * @param roomId
 */
export function removeRoom(roomId: number) {
  saveRoomsToServer(
    getRoomsFromServer().filter((room) => room.id !== roomId)
  );
}