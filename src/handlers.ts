import { Graphics } from "./graphics";
import { Input } from "./input";
import { mainLoop } from "./loop";
import type { Music } from "./music";
import { width } from "./main";
import { GameState, type State } from "./state";

const threshold = 1500;

export const handleTitleScreen = (
  state: State,
  graphics: Graphics,
  music: Music,
  input: Input,
) => {
  graphics.printText(width / 2, 200, "Press space bar to start", "white");
  if (input.spaceBar) {
    state.setGameState(GameState.Ready);
    music.runAutoplayPolicy();
  }
};

export const handleReadyState = (
  graphics: Graphics,
  state: State,
  music: Music,
) => {
  mainLoop(graphics, state, 0, false);
  graphics.printText(width / 2, 200, "Get ready!", "white");
  const now = performance.now();
  if (now - state.getLastGameStateChange() > threshold) {
    state.setGameState(GameState.MainLoop);
    music.playTrack();
  }
};

export const handleWonState = (graphics: Graphics, state: State) => {
  mainLoop(graphics, state, 0, false);
  graphics.printText(width / 2, 200, "You won!", "white");
  const now = performance.now();
  if (now - state.getLastGameStateChange() > threshold) {
    state.setGameState(GameState.Reset);
  }
};

export const handleDeadState = (graphics: Graphics, state: State) => {
  mainLoop(graphics, state, 0, false);
  graphics.printText(width / 2, 200, "You died!", "white");
  const now = performance.now();
  if (now - state.getLastGameStateChange() > threshold) {
    state.setGameState(GameState.Reset);
  }
};

export const handleResetState = (state: State, music: Music) => {
  state.resetGame();
  music.pauseTrack();
  music.resetTrack();
  music.reloadTrack();
  state.setGameState(GameState.TitleScreen);
};

export const handleMainLoop = (
  graphics: Graphics,
  state: State,
  elapsedTime: number,
) => {
  mainLoop(graphics, state, elapsedTime);
};
