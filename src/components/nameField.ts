import { getCurrentPlayerInfo, setCurrentPlayerInfo } from "../server/server";

const playerNameInput = document.getElementById(
  "player-name"
) as HTMLInputElement;

const MAX_PLAYER_NAME_SIZE = 15;

export function setupPlayerNameField() {
  const currentPlayerInfo = getCurrentPlayerInfo();
  playerNameInput.maxLength = MAX_PLAYER_NAME_SIZE;

  if (currentPlayerInfo) {
    const name = currentPlayerInfo.name?.trim() ?? "";

    if (name) {
      playerNameInput.value = name;
    }
  }

  playerNameInput.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    const name = target.value?.trim() ?? "";
    const currentPlayer = getCurrentPlayerInfo();

    setCurrentPlayerInfo({
      ...currentPlayer,
      name,
    });
  });
}

export function getPlayerName(): string | null {
  return playerNameInput.value;
}
