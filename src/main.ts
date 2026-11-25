import "./style/style.css";
import { Graphics } from "./graphics";
import { Input } from "./input";
import {
  handleTitleScreen,
  handleMainLoop,
  handleReadyState,
  handleResetState,
  handleWonState,
  handleDeadState,
} from "./handlers";
import { Sound } from "./sound";
import { loadAnimations, type AnimationsType } from "./animation";
import { Music } from "./music";
import { State, GameState } from "./state";

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
  const state = await State.create(graphics, input, sound, width, animations);

  let now = performance.now();
  const loop = () => {
    const next = performance.now();
    const elapsedTime = next - now;
    now = next;

    graphics.clearScreen();

    const gameState = state.getGameState();

    switch (gameState) {
      case GameState.TitleScreen:
        handleTitleScreen(state, graphics, music, input);
        break;
      case GameState.Reset:
        handleResetState(state, music);
        break;
      case GameState.Ready:
        handleReadyState(graphics, state, music);
        break;
      case GameState.MainLoop:
        handleMainLoop(graphics, state, elapsedTime);
        break;
      case GameState.Won:
        handleWonState(graphics, state);
        break;
      case GameState.Dead:
        handleDeadState(graphics, state);
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
