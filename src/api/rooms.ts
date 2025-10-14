import type { Room } from "../types/room.ts";
import { getRoomsFromServer, removeRoom } from "../server/server.ts";

const MAX_PLAYERS_PER_ROOM = 2;
const roomsFromServer: Room[] = getRoomsFromServer();
const availableRooms: Room[] = [];

roomsFromServer.forEach(room => {
  if (room.players.length >= MAX_PLAYERS_PER_ROOM) {
    removeRoom(room.id);
  } else {
    availableRooms.push(room);
  }
});

export const rooms: Room[] = availableRooms;