const ribbonsContainer = document.getElementById('ribbons-container') as HTMLElement;

/**
 * This function is responsible for creating and pushing ribbon elements into the ribbons container.
 */
export function setupRibbons() {
  for (let i = 0; i < 4; i++) {
    const span: HTMLSpanElement = document.createElement("span");
    span.classList.add('ribbon');
    ribbonsContainer.appendChild(span);
  }
}

/**
 * Toggles the ribbon animation.
 */
export function toggleRibbons() {
  ribbonsContainer.classList.toggle('is-active');
}

/**
 * Fires the ribbon animation.
 */
export function fireRibbons() {
  ribbonsContainer.classList.add('is-active');
}

/**
 * Hides the ribbon animation.
 */
export function hideRibbons() {
  ribbonsContainer.classList.remove('is-active');
}