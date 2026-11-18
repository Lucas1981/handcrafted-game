import { Graphics } from "./graphics";
import { Input } from "./input";
import { mainLoop } from "./loop";

const graphics = new Graphics(800, 600, "canvas");
const input = new Input();

let now = performance.now();

const main = () => {
  const next = performance.now();
  const elapsedTime = next - now;
  now = next;

  graphics.clearScreen();

  mainLoop(graphics, input, elapsedTime);

  requestAnimationFrame(main);
};

main();
