import { setUpNavigation } from "./components/navigation.ts";
import { setupAdaptiveMenuBtn } from "./components/navbar.ts";
import { setUpRoomsTable } from "./components/rooms.ts";
import { setUpdAvatars } from "./components/avatars.ts";
import { setupRibbons } from "./components/ribbons.ts";
import { setupDice } from "./components/dice";
import { setupDialog } from "./components/dialog.ts";
import { setupTimer } from "./components/timer.ts";
import { loadCellIcons } from "./components/cells.ts";

import { setupShipFinish } from "./components/shipFinish.ts";
import { loadImages } from "./components/loadImages.ts";
import { setupColorPalette } from "./components/colorPalette.ts";

window.addEventListener("load", () => {
  setUpNavigation();
  setupDialog();
  setUpdAvatars();
  setUpRoomsTable();
  setupRibbons();
  setupTimer();
  setupDice();
  setupColorPalette()
  loadCellIcons();
  setupAdaptiveMenuBtn();
  setupShipFinish();
  loadImages();
});
