import type { Graphics } from "./graphics";
import type { Input } from "./input";

let x = 100;
let y = 100;
const speed = 150;
const unitSize = 32;

export const mainLoop = (
  graphics: Graphics,
  input: Input,
  elapsedTime: number,
) => {
  const width = graphics.getWidth();
  const height = graphics.getHeight();
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
};
