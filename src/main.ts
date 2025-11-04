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

window.addEventListener("load", () => {
  translatePage();
  setUpPlayerBtns();
  setUpNavigation();
  setUpdAvatars();
  setUpRoomsTable();
  setupRibbons();
  setupTimer();
  setupDice();
  setupColorPalette();
  loadCellIcons();
  setupShipImages();
  loadImages();
  clearOutdatedRooms();
});
