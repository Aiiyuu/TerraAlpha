import { ref, set, onValue, onDisconnect, remove } from "firebase/database";
import { database } from "../firebase";

export function addPlayerOnline(playerName: string) {
  const name = playerName.trim() || "Player";
  const id = `${name}_${Date.now()}`;
  const playerRef = ref(database, `playersOnline/${id}`);

  set(playerRef, {
    name,
    joinedAt: Date.now(),
  });

  onDisconnect(playerRef).remove();
  return id;
}

export function listenOnlineCount(callback: (count: number) => void) {
  const playersRef = ref(database, "playersOnline");

  onValue(playersRef, snapshot => {
    const data = snapshot.val() || {};
    callback(Object.keys(data).length);
  });
}

export function removePlayerOnline(id: string) {
  const playerRef = ref(database, `playersOnline/${id}`);
  remove(playerRef);
}
