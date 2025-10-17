import { listeToRoomById, updateRoom } from "../server/server";
import type { Room } from "../types/room";

export function startGame(room: Room) {
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
