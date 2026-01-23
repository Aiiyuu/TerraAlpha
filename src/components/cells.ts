import arrowIcon from '../assets/icons/cell-arrow.png';
import doubleArrowIcon from '../assets/icons/cell-double-arrow.png';
import startArrowIcon from '../assets/icons/start-arrow.png';

export function loadCellIcons() {
  const arrowElements = [...document.querySelectorAll('.cell--arrow')] as HTMLElement[];
  const doubleArrowElements = [...document.querySelectorAll('.cell--double-arrow')] as HTMLElement[];
  const startCell = document.querySelector('.cell--start') as HTMLElement | null;

  arrowElements.forEach(el => {
    const img = document.createElement('img');
    img.src = arrowIcon;
    img.alt = 'Arrow';
    el.appendChild(img);
  });

  doubleArrowElements.forEach(el => {
    const img = document.createElement('img');
    img.src = doubleArrowIcon;
    img.alt = 'Double arrow';
    el.appendChild(img);
  });

  if (startCell) {
    const img = document.createElement('img');
    img.src = startArrowIcon;
    img.alt = 'Start arrow';
    startCell.appendChild(img);
  }
}
