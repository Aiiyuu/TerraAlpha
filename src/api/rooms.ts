import type { Room } from "../types/room.ts";
import { getRoomsFromServer } from "../server/server.ts";

export const rooms: Room[] = [...getRoomsFromServer()];