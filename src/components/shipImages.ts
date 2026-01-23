import shipSVG from '../assets/ships/ship.svg';
import shipMainSVG from '../assets/ships/ship-main.svg';

const cellBtns = [...document.querySelectorAll('.cell-btn')] as HTMLElement[];

/**
 * Inserts ship images into the user's inventory.
 */
export async function setupShipImages() {
  const [regularShip, mainShip] = await Promise.all([
    fetch(shipSVG).then(res => res.text()),
    fetch(shipMainSVG).then(res => res.text())
  ]);

  cellBtns.forEach(cellBtn => {
    if (cellBtn.classList.contains('cell-btn-main')) {
      cellBtn.innerHTML = mainShip;
    } else {
      cellBtn.innerHTML = regularShip;
    }
  });
}