import type { IAgent } from "./agent";
import { Graphics } from "./graphics";
import { Input } from "./input";
import { mainLoop } from "./loop";

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

export const handleTitleScreen = (graphics: Graphics, input: Input) => {
  graphics.printText(400, 200, "Press space bar to start", "white");
  if (input.spaceBar) {
    changeGameState(GameState.Ready);
  }
};

export const handleReadyState = (graphics: Graphics, agents: IAgent[]) => {
  graphics.printText(400, 200, "Get ready!", "white");
  mainLoop(agents, 0, false);
  const now = performance.now();
  if (now - changedState > threshold) {
    changeGameState(GameState.MainLoop);
  }
};

export const handleMainLoop = (agents: IAgent[], elapsedTime: number) => {
  mainLoop(agents, elapsedTime);
};
