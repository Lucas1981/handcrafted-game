import { Graphics } from "./graphics";
import { Input } from "./input";

const graphics = new Graphics(800, 600, "canvas");
const input = new Input();

let x = 100;
let y = 100;
let now = performance.now();
const speed = 150;
const unitSize = 32;
const width = graphics.getWidth();
const height = graphics.getHeight();

const main = () => {
  const next = performance.now();
  const elapsedTime = next - now;
  now = next;

  graphics.clearScreen();
  const delta = speed * (elapsedTime / 1000);

  if (input.getKeyStatus("ArrowLeft")) {
    x -= delta;
    if (x < 0) x = 0;
  }

  if (input.getKeyStatus("ArrowRight")) {
    x += delta;
    if (x > width - unitSize) x = width - unitSize;
  }

  if (input.getKeyStatus("ArrowUp")) {
    y -= delta;
    if (y < 0) y = 0;
  }

  if (input.getKeyStatus("ArrowDown")) {
    y += delta;
    if (y > height - unitSize) y = height - unitSize;
  }

  graphics.drawRect(x, y, unitSize, unitSize, "red");

  requestAnimationFrame(main);
};

main();
