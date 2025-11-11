let canvas: HTMLCanvasElement;
let width: number, height: number;
let ctx: CanvasRenderingContext2D | null = null;
const fireworks: Firework[] = [];
const particles: Particle[] = [];

const FIREWORK_PARTICLE_COUNT = 300; // Increase for more particles
const FIREWORK_PARTICLE_SPEED = 4; //  Increase for larger spread
const FIREWORK_PARTICLE_SIZE = 4; // Size of each spark
const FIREWORK_LAUNCH_SPEED = 12; // Speed of the rockets

export function setupFireworks() {
  canvas = document.getElementById("fireworks") as HTMLCanvasElement;

  setSize(canvas);

  ctx = canvas.getContext("2d")!;

  fireworks.push(new Firework(Math.random() * (width - 200) + 100));

  window.addEventListener("resize", windowResized);
  document.addEventListener("click", onClick);
}

function loop() {
  if (!ctx) return;

  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  for (let i = 0; i < fireworks.length; i++) {
    const done = fireworks[i].update();
    fireworks[i].draw();
    if (done) fireworks.splice(i, 1);
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].lifetime > 80) particles.splice(i, 1);
  }

  if (Math.random() < 1 / 60)
    fireworks.push(new Firework(Math.random() * (width - 200) + 100));
}

setInterval(loop, 1000 / 60);

class Particle {
  x: number;
  y: number;
  col: string;
  vel: { x: number; y: number };
  lifetime: number;

  constructor(x: number, y: number, col: string) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.vel = randomVec(FIREWORK_PARTICLE_SPEED);
    this.lifetime = 0;
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.vel.y += 0.02;
    this.vel.x *= 0.99;
    this.vel.y *= 0.99;
    this.lifetime++;
  }

  draw() {
    if (!ctx) return;

    ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0);
    ctx.fillStyle = this.col;
    ctx.fillRect(
      this.x,
      this.y,
      FIREWORK_PARTICLE_SIZE,
      FIREWORK_PARTICLE_SIZE
    );
  }
}

class Firework {
  x: number;
  y: number;
  isBlown: boolean;
  col: string;

  constructor(x: number) {
    this.x = x;
    this.y = height;
    this.isBlown = false;
    this.col = randomCol();
  }

  update() {
    this.y -= FIREWORK_LAUNCH_SPEED;
    if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
      this.isBlown = true;
      for (let i = 0; i < FIREWORK_PARTICLE_COUNT; i++) {
        particles.push(new Particle(this.x, this.y, this.col));
      }
    }
    return this.isBlown;
  }

  draw() {
    if (!ctx) return;

    ctx.globalAlpha = 1;
    ctx.fillStyle = this.col;
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}

function randomCol(): string {
  const letter = "0123456789ABCDEF";
  const nums: number[] = [];

  for (let i = 0; i < 3; i++) nums[i] = Math.floor(Math.random() * 256);

  let brightest = Math.max(...nums);
  brightest /= 255;
  for (let i = 0; i < 3; i++) nums[i] /= brightest;

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += letter[Math.floor(nums[i] / 16)];
    color += letter[Math.floor(nums[i] % 16)];
  }
  return color;
}

function randomVec(max: number): { x: number; y: number } {
  const dir = Math.random() * Math.PI * 2;
  const spd = Math.random() * max;
  return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
}

function setSize(canv: HTMLCanvasElement) {
  canv.style.width = `${innerWidth}px`;
  canv.style.height = `${innerHeight}px`;
  width = innerWidth;
  height = innerHeight;

  canv.width = innerWidth * window.devicePixelRatio;
  canv.height = innerHeight * window.devicePixelRatio;
  canv
    .getContext("2d")!
    .scale(window.devicePixelRatio, window.devicePixelRatio);
}

function onClick(e: MouseEvent) {
  fireworks.push(new Firework(e.clientX));
}

function windowResized() {
  if (!ctx) return;

  setSize(canvas);
}
