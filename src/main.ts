import { setUpNavigation } from "./components/navigation.ts";
import { setupAdaptiveMenuBtn } from "./components/navbar.ts";
import { setUpRoomsTable } from "./components/rooms.ts";
import { setUpdAvatars } from "./components/avatars.ts";
import { setupRibbons } from "./components/ribbons.ts";
import { setupDice } from "./components/dice";
import { setupDialog } from "./components/dialog.ts";
import { setupTimer } from "./components/timer.ts";
import { loadCellIcons } from "./components/cells.ts";

import { loadImages } from "./components/loadImages.ts";
import { setupColorPalette } from "./components/colorPalette.ts";
import { setupShipImages } from "./components/shipImages.ts";
import { clearOutdatedRooms } from "./server/server.ts";
import { setupMuteBtn } from "./components/audioManager.ts";
import { setUpHelperBtn } from "./components/helper.ts";
import { setupResetBtn } from "./components/reset.ts";

window.addEventListener("load", () => {
  setUpNavigation();
  setupDialog();
  setUpdAvatars();
  setUpRoomsTable();
  setupRibbons();
  setupTimer();
  setupDice();
  setupMuteBtn();
  setUpHelperBtn();
  setupResetBtn();
  setupColorPalette();
  loadCellIcons();
  setupAdaptiveMenuBtn();
  setupShipImages();
  loadImages();
  clearOutdatedRooms();
});
