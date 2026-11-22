import type { IAgent } from "./agent";
import { Graphics } from "./graphics";
import type { Grid } from "./grid";
import { Input } from "./input";
import { mainLoop } from "./loop";
import type { Music } from "./music";
import { width } from "./main";

export enum GameState {
  TitleScreen = 1,
  Ready = 2,
  MainLoop = 3,
  Pause = 4,
  Dead = 5,
  Won = 6,
  GameOver = 7,
  GameFinished = 8,
}

let gameState: GameState = GameState.TitleScreen;
let changedState: number = performance.now();
const threshold = 1500;

export const getGameState = () => gameState;
export const changeGameState = (newGameState: GameState) => {
  changedState = performance.now();
  gameState = newGameState;
};

export const handleTitleScreen = (
  graphics: Graphics,
  music: Music,
  input: Input,
) => {
  graphics.printText(width / 2, 200, "Press space bar to start", "white");
  if (input.spaceBar) {
    changeGameState(GameState.Ready);
    music.runAutoplayPolicy();
  }
};

export const handleReadyState = (
  graphics: Graphics,
  agents: IAgent[],
  music: Music,
  grid: Grid,
) => {
  mainLoop(agents, grid, 0, false);
  graphics.printText(width / 2, 200, "Get ready!", "white");
  const now = performance.now();
  if (now - changedState > threshold) {
    changeGameState(GameState.MainLoop);
    music.playTrack();
  }
};

export const handleMainLoop = (
  agents: IAgent[],
  grid: Grid,
  elapsedTime: number,
) => {
  mainLoop(agents, grid, elapsedTime);
};
