import type { Room } from "../types/room.ts";

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