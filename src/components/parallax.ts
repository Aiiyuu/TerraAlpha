import astronautImg from "../assets/images/decorations/astronaut.png";
import planetImg from "../assets/images/decorations/planet1.png";
import cometImg from "../assets/images/decorations/comet.png";

const astronaut: HTMLElement | null = document.querySelector(".astronaut");
const planet1: HTMLElement | null = document.querySelector(".planet-1");
const comet: HTMLElement | null = document.querySelector(".comet");

/**
 * Shows paralax animation
 */
export function setupParallax() {
  loadImages();

  if (astronaut) {
    document.addEventListener("mousemove", (event: MouseEvent) => {
      const mouseX: number = event.clientX;
      const mouseY: number = event.clientY;

      // Get the astronaut's position
      const astronautRect = astronaut.getBoundingClientRect();
      const astronautCenterX: number =
        astronautRect.left + astronautRect.width / 2;
      const astronautCenterY: number =
        astronautRect.top + astronautRect.height / 2;

      // Calculate the offset based on mouse position
      const deltaX: number = mouseX - astronautCenterX;
      const deltaY: number = mouseY - astronautCenterY;

      // Set the maximum offset values (so the astronaut doesn't go off-screen)
      const maxOffset = 20; // Max pixels you want to offset

      // Normalize the offsets to fit within the range
      const offsetX = (deltaX / astronautRect.width) * maxOffset;
      const offsetY = (deltaY / astronautRect.height) * maxOffset;

      // Apply the translation to give the parallax effect

      applyParalax(astronaut, offsetX, offsetY, 2);
      applyParalax(planet1, offsetX, offsetY, 0.2);
      applyParalax(comet, offsetX, offsetY, 0.8);
    });
  }
}

function loadImages() {
  if (astronaut) {
    astronaut.style.backgroundImage = `url(${astronautImg})`;
  }

  if (planet1) {
    planet1.style.backgroundImage = `url(${planetImg})`;
  }

  if (comet) {
    comet.style.backgroundImage = `url(${cometImg})`;
  }
}

function applyParalax(
  obj: HTMLElement | null,
  x: number,
  y: number,
  offsetScale: number
) {
  if (obj) {
    console.log(`translate(${x * offsetScale}, ${y * offsetScale})`);

    obj.style.transform = `translate(${x * offsetScale}px, ${y * offsetScale}px)`;
  }
}
