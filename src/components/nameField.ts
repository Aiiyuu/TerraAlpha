import { getCurrentPlayerInfo, setCurrentPlayerInfo } from "../server/server";

const playerNameInput = document.getElementById(
  "player-name"
) as HTMLInputElement;

export function setupPlayerNameField() {
  const currentPlayerInfo = getCurrentPlayerInfo();

  if (currentPlayerInfo) {
    const name = currentPlayerInfo.name?.trim() ?? "";

    if (name) {
      playerNameInput.value = name;
    }
  }

  playerNameInput.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    const currentPlayer = getCurrentPlayerInfo();

    setCurrentPlayerInfo({
      ...currentPlayer,
      name: target.value?.trim() ?? "",
    });
  });
}

export function getPlayerName(): string | null {
  return playerNameInput.value;
}
