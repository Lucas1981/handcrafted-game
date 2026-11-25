import { AgentType, type IAgent } from "./agent";
import type { Grid } from "./grid";
import { loadAgents } from "./agents/loader";
import { loadGrid } from "./grid";
import type { Graphics } from "./graphics";
import type { Input } from "./input";
import type { AnimationsType } from "./animation";
import type { Sound } from "./sound";
import type { LinkedList } from "./data-structures/linked-list";

export enum GameState {
  TitleScreen = 1,
  Ready = 2,
  MainLoop = 3,
  Pause = 4,
  Dead = 5,
  Won = 6,
  GameOver = 7,
  GameFinished = 8,
  Reset = 9,
}

export class State {
  gameState: GameState;
  coins: number = 0;
  graphics: Graphics;
  input: Input;
  sound: Sound;
  animations: AnimationsType;
  width: number;
  lastGameStateChange: number;
  loadPromise: Promise<void> = Promise.resolve();

  world: {
    agents?: LinkedList<IAgent>;
    grid?: Grid;
  } = {};

  constructor(
    graphics: Graphics,
    input: Input,
    sound: Sound,
    width: number,
    animations: AnimationsType,
  ) {
    this.graphics = graphics;
    this.input = input;
    this.sound = sound;
    this.animations = animations;
    this.width = width;
    this.gameState = GameState.TitleScreen;
    this.lastGameStateChange = performance.now();
    this.resetGame();
  }

  static async create(
    graphics: Graphics,
    input: Input,
    sound: Sound,
    width: number,
    animations: AnimationsType,
  ) {
    const state = new State(graphics, input, sound, width, animations);
    await state.loadPromise;
    return state;
  }

  resetGame() {
    this.loadPromise = new Promise(async (resolve) => {
      const grid = await loadGrid(
        "grid",
        this.graphics,
        this.width,
        this.animations,
      );
      const agents = await loadAgents(
        "agents",
        this.graphics,
        this.input,
        this.sound,
        grid,
        this.animations,
      );
      this.world = {
        grid,
        agents,
      };

      resolve();
    });

    return this.loadPromise;
  }

  getCoinsLeft() {
    const agents = this.world.agents!;
    let count = 0;
    for (let agent = agents.first(); agent !== null; agent = agent.next) {
      if (
        agent.element.getType() === AgentType.Coin &&
        agent.element.getIsActive()
      ) {
        count++;
      }
    }

    return count;
  }

  getGrid() {
    return this.world.grid;
  }

  getAgents() {
    return this.world.agents;
  }

  getPromise() {
    return this.loadPromise;
  }

  getGameState() {
    return this.gameState;
  }

  setGameState(gameState: GameState) {
    this.gameState = gameState;
    this.lastGameStateChange = performance.now();
  }

  getLastGameStateChange() {
    return this.lastGameStateChange;
  }
}
