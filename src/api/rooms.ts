import type { Room } from "../types/room.ts";
import { getRoomsFromServer } from "../server/server.ts";

export const rooms: Room[] = [
  {
    id: 1,
    authorId: 1,
    name: 'Room-1',
    players: [
      {
        id: 1,
        avatar: 6,
        name: 'Poroshenko',
        itsTurn: false,
        diceHistory: [],
        diceStreak: [],
        color: '#6A0DAD',
      }
    ],
    date: new Date(),
  },
  {
    id: 2,
    authorId: 14,
    name: 'Кімната',
    players: [
      {
        id: 14,
        avatar: 4,
        name: 'Володя Зеленський',
        itsTurn: false,
        diceHistory: [],
        diceStreak: [],
        color: '#BF092F',
      }
    ],
    date: new Date(),
  },
]

rooms.unshift(...getRoomsFromServer());