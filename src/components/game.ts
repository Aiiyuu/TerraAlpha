import { listeToRoomById, updateRoom } from "../server/server";
import type { Phrase } from "../types/phrase";
import type { Room, RoomEntry } from "../types/room";
import { showPhrase } from "./dialog";
import { setupLeftPlayer, setupRightPlayer } from "./playersInfo";

let previousRoomState: Room | undefined;
let leftPlayerIsConnected = false;
let rightPlayerisConnected = false;
const shownPhrases: Phrase["id"][] = [];

export function startGame(room: RoomEntry) {
  const roomId: Room["id"] = room.id;

  /**
   * ПІДЧАС РОЗРОБКИ ІГРИ Я РЕКОМЕНДУЮ МАТИ
   * ВІДКРИТИМ ДВА ВІКНА В БРАУЗЕРІ З ІГРОЮ АБИ
   * ПЕРЕВІРЯТИ ЧИ ПРАЦЮЄ СИНХРОНІЗАЦІЯ
   */

  listeToRoomById(roomId, (roomState) => {
    /*
      Параметер roomState = оновлений обєкт з ігрою

      Це синхронізація

      Ця функція буде виконуватися щоразу,
      коли змінюється якась властивість у базі даних

      Наприклад, я можу додати до room властивість isdicerolling,
      і якщо хтось кидає кубик, тоді isdicerolling = true,
      і тут можна зробити перевірку

      if (roomState.isdicerolling) {
        Показуємо анімацію кубика
      }

      Також тут треба буде синхронізувати таймер, повідомлення, і ходи корабликів
    */

    console.log(roomState);

    /* Show left player colors and avatars */
    if (roomState!.players.length >= 1 && !leftPlayerIsConnected) {
      setupLeftPlayer(roomState.players[0]);
      leftPlayerIsConnected = true;
    }

    /* Show right player colors and avatars */
    if (roomState!.players.length >= 2 && !rightPlayerisConnected) {
      setupRightPlayer(roomState.players[1]);
      rightPlayerisConnected = true;
    }

    /* Show new phrase if it was added */
    if (roomState?.phrases?.length !== previousRoomState?.phrases?.length) {
      if (roomState && roomState.phrases) {
        roomState.phrases.forEach((phrase) => {
          if (!shownPhrases.includes(phrase.id)) {
            showPhrase(phrase);
            shownPhrases.push(phrase.id);
          }
        });
      }
    }

    previousRoomState = roomState;
  });

  // НИЩЕ КОД ЯК ОБНОВЛЮВАТИ КІМНАТУ

  /**
   * Якщо додаєш нові проперті то переконайся що вони є в Room типі
   *
   * Пізніше додамо інші властивості:
   * isTurn = player.id - щоб знайти чий хід
   * gameIsFinished = false - щоб знати чи видаляти кімнату з сервера
   * winnerId = player.id - тут логічно
   *
   */
  const roomChanges: Partial<Room> = {
    gameStarted: true,
    isDiceRolling: false,
  };

  /**
   * Ця функція оновлює статус кімнати.
   * Якщо якоїсь властивості немає в об'єкті кімнати, вона створюється.
   *
   * Функція приймає два параметри: roomId
   * та об'єкт зі змінами, які потрібно внести на сервер для кімнати.
   */
  updateRoom(roomId, roomChanges);
}
