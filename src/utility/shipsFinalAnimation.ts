export function animateShipFinalize(shipEl: HTMLElement, shipQa?: string | null) {
  shipEl.style.pointerEvents = 'none';
  shipEl.style.willChange = 'transform, opacity';
  shipEl.style.transformOrigin = 'center center';

  setTimeout(() => {
    shipEl.style.transform = 'scale(1.2)';

    const anim = shipEl.animate(
      [
        { transform: 'scale(1.2) rotate(0deg)', opacity: 1, transformOrigin: 'center center' },
        { transform: 'scale(0.1) rotate(1440deg)', opacity: 0, transformOrigin: 'center center' },
      ],
      { duration: 2000, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }
    );

    anim.onfinish = () => {
      shipEl.remove();
      document.dispatchEvent(new CustomEvent('ship:finalized', { detail: { shipQa: shipQa ?? null } }));
    };
  }, 1000);
}
