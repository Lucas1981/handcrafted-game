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

export const getGameState = () => gameState;
export const setGameState = (newGameState: GameState) =>
  (gameState = newGameState);

export const handleTitleScreen = (graphics: Graphics, input: Input) => {
  graphics.printText(400, 200, "Press space bar to start", "white");
  if (input.spaceBar) {
    setGameState(GameState.MainLoop);
  }
};

export const handleMainLoop = (
  graphics: Graphics,
  input: Input,
  elapsedTime: number,
) => {
  mainLoop(graphics, input, elapsedTime);
};
