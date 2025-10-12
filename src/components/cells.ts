import arrowIcon from '../assets/icons/cell-arrow.png';
import doubleArrowIcon from '../assets/icons/cell-double-arrow.png';
import startArrowIcon from '../assets/icons/start-arrow.png';

const arrowElements = [...document.querySelectorAll('.cell--arrow')] as HTMLElement[];
const doubleArrowElements = [...document.querySelectorAll('.cell--double-arrow')] as HTMLElement[];
const startCell = document.querySelector('.cell--start') as HTMLElement;

/**
 * This function is responsible for dynamically loading cell icons
 * and inserting them into DOM elements.
 */
export function loadCellIcons() {
  arrowElements.forEach(el => {
    const img: HTMLImageElement = document.createElement('img');
    img.src = arrowIcon;
    el.appendChild(img);
  });

  doubleArrowElements.forEach(el => {
    const img: HTMLImageElement = document.createElement('img');
    img.src = doubleArrowIcon;
    el.appendChild(img);
  });

  const img: HTMLImageElement = document.createElement('img');
  img.src = startArrowIcon;
  startCell.appendChild(img);
}