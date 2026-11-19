import { Graphics } from "./graphics";
import { Input } from "./input";
import {
  GameState,
  getGameState,
  handleTitleScreen,
  handleMainLoop,
  handleReadyState,
} from "./handlers";
import { Sound } from "./sound";
import { Player } from "./agents/player";

const main = async () => {
  const graphics = new Graphics(800, 600, "canvas");
  const input = new Input();
  const sound = new Sound();
  const player = new Player(100, 100, 32, 32, graphics, input, sound);
  const agents = [player];

  await sound.loaded();

  let now = performance.now();
  const loop = () => {
    const next = performance.now();
    const elapsedTime = next - now;
    now = next;

    graphics.clearScreen();

    const gameState = getGameState();

    switch (gameState) {
      case GameState.TitleScreen:
        handleTitleScreen(graphics, input);
        break;
      case GameState.Ready:
        handleReadyState(graphics, agents);
        break;
      case GameState.MainLoop:
        handleMainLoop(agents, elapsedTime);
        break;
      default:
        throw new Error("Illegal game state");
    }

    sound.playSounds();
    requestAnimationFrame(loop);
  };

  loop();
};

main();
