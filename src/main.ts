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
import { Baddy } from "./agents/baddy";
import { loadAnimations, type AnimationsType } from "./animation";
import { loadGrid } from "./grid";

const width = 960;
const height = 640;

const main = async () => {
  const graphics = new Graphics(width, height, "canvas");
  const input = new Input();
  const sound = new Sound();
  await sound.loaded();
  const animations: AnimationsType = await loadAnimations();
  const grid = await loadGrid("world", graphics, width, animations);
  const player = new Player(
    400,
    200,
    64,
    64,
    "player",
    graphics,
    input,
    sound,
    grid,
    animations,
  );
  const baddy1 = new Baddy(80, 200, 64, 64, graphics, animations, "baddy1");
  const baddy2 = new Baddy(1060, 200, 64, 64, graphics, animations, "baddy2");
  const agents = [player, baddy1, baddy2];

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
        handleReadyState(graphics, agents, grid);
        break;
      case GameState.MainLoop:
        handleMainLoop(agents, grid, elapsedTime);
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
