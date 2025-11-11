import { setUpNavigation } from "./components/navigation.ts";
import { setUpRoomsTable } from "./components/rooms.ts";
import { setUpdAvatars } from "./components/avatars.ts";
import { setupRibbons } from "./components/ribbons.ts";
import { setupDice } from "./components/dice";
import { setupTimer } from "./components/timer.ts";
import { loadCellIcons } from "./components/cells.ts";
import { loadImages } from "./components/loadImages.ts";
import { setupColorPalette } from "./components/colorPalette.ts";
import { setupShipImages } from "./components/shipImages.ts";
import { clearOutdatedRooms } from "./server/server.ts";
import { translatePage } from "./components/language.ts";
import { setUpPlayerBtns } from "./components/playerButtons.ts";
import { setupPlayerNameField } from "./components/nameField.ts";
import { setupRestartRedirect } from "./components/reset.ts";
import { initGlobalChat } from "./components/globalChat.ts";
import { initEmojiPanel } from "./components/emojiPanel.ts";
import { listenOnlineCount, addPlayerOnline } from "./server/online.ts";

window.addEventListener("load", () => {
  setupRestartRedirect();
  translatePage();
  setUpPlayerBtns();
  setUpNavigation();
  setUpdAvatars();
  setUpRoomsTable();
  setupRibbons();
  setupTimer();
  setupDice();
  setupColorPalette();
  setupPlayerNameField();
  loadCellIcons();
  setupShipImages();
  loadImages();
  clearOutdatedRooms();
  initGlobalChat();

  const playerName = localStorage.getItem("playerName") || "Player";
  addPlayerOnline(playerName);
  listenOnlineCount(count => {
    const el = document.getElementById("online-count");
    if (el) el.textContent = `${count} гравців онлайн`;
  });

  initEmojiPanel({
    input: "#gchat-message",
    button: "#gchat-emoji",
  });
});
