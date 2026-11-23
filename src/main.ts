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
import { loadAgents } from "./agents/loader";
import { loadAnimations, type AnimationsType } from "./animation";
import { loadGrid } from "./grid";
import { Music } from "./music";

export const width = 960;
export const height = 640;

const main = async () => {
  const graphics = new Graphics(width, height, "canvas");
  const input = new Input();
  const sound = new Sound();
  await sound.loaded();
  const animations: AnimationsType = await loadAnimations();
  const music = new Music();
  await music.loadTrack("track");
  const grid = await loadGrid("grid", graphics, width, animations);
  const agents = await loadAgents(
    "agents",
    graphics,
    input,
    sound,
    grid,
    animations,
  );

  let now = performance.now();
  const loop = () => {
    const next = performance.now();
    const elapsedTime = next - now;
    now = next;

    graphics.clearScreen();

    const gameState = getGameState();

    switch (gameState) {
      case GameState.TitleScreen:
        handleTitleScreen(graphics, music, input);
        break;
      case GameState.Ready:
        handleReadyState(graphics, agents, music, grid);
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
