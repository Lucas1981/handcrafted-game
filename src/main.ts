import { Graphics } from "./graphics";
import { Input } from "./input";
import {
  GameState,
  getGameState,
  handleTitleScreen,
  handleMainLoop,
} from "./handlers";

const graphics = new Graphics(800, 600, "canvas");
const input = new Input();

let now = performance.now();

const main = () => {
  const next = performance.now();
  const elapsedTime = next - now;
  now = next;

  graphics.clearScreen();

  const gameState = getGameState();

  switch (gameState) {
    case GameState.TitleScreen:
      handleTitleScreen(graphics, input);
      break;
    case GameState.MainLoop:
      handleMainLoop(graphics, input, elapsedTime);
      break;
    default:
      throw new Error("Illegal game state");
  }

  requestAnimationFrame(main);
};

main();
