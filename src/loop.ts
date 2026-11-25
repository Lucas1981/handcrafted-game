import { AgentType, type IAgent } from "./agent";
import { isAgentCollidingWithOtherAgent } from "./collision";
import type { LinkedList } from "./data-structures/linked-list";
import type { Grid } from "./grid";
import { GameState, type State } from "./state";
import { width, height } from "./main";
import type { Graphics } from "./graphics";

// It could be preferrable to turn the loop into a class, so that it can retain some state
export const mainLoop = (
  graphics: Graphics,
  state: State,
  elapsedTime: number,
  update = true,
) => {
  const agents = state.getAgents()!;
  const grid = state.getGrid()!;
  const player = getPlayer(agents);

  if (update) {
    updateAgents(agents, elapsedTime);
    handleCollisions(player, agents, state);
  }

  drawAgents(player, agents, grid);
  drawUI(state, graphics);
};

const drawUI = (state: State, graphics: Graphics) => {
  const coinsLeft = state.getCoinsLeft();
  graphics.printText(width - 160, height - 20, `Coins left: ${coinsLeft}`);
};

const handleCollisions = (
  player: IAgent,
  agents: LinkedList<IAgent>,
  state: State,
) => {
  for (let agent = agents.first(); agent !== null; agent = agent.next) {
    if (agent.element.getType() === AgentType.Player) {
      continue;
    }

    if (isAgentCollidingWithOtherAgent(player, agent.element)) {
      const type = agent.element.getType();
      switch (type) {
        case AgentType.Baddy:
          state.setGameState(GameState.Dead);
          break;
        case AgentType.Coin:
          agent.element.setIsActive(false);
          break;
        default:
          throw new Error("Illegal agent type");
      }
    }

    if (state.getCoinsLeft() === 0) {
      state.setGameState(GameState.Won);
    }
  }
};

const determineCameraX = (player: IAgent, grid: Grid) => {
  const gridUnit = grid.getUnitSize();
  const rowSize = grid.getRowSize();
  const tilesPerScreenRowWithPadding = grid.getTilesPerScreenRow() + 1;
  const playerGridX = Math.floor(player.getX() / gridUnit);

  // Is the player closer to the end of the grid than by half the screen?
  if (playerGridX > rowSize - Math.round(tilesPerScreenRowWithPadding / 2)) {
    // Then return the maximum position closest to the right edge
    return (rowSize - tilesPerScreenRowWithPadding + 1) * gridUnit;
  }

  // Is the player at or further than half the screen?
  if (playerGridX >= Math.floor(tilesPerScreenRowWithPadding / 2)) {
    // Then return the player's x, corrected by half the screen
    return (
      player.getX() - Math.floor(tilesPerScreenRowWithPadding / 2) * gridUnit
    );
  }

  // By default, return 0
  return 0;
};

const updateAgents = (agents: LinkedList<IAgent>, elapsedTime: number) => {
  for (let agent = agents.first(); agent !== null; agent = agent.next) {
    agent.element.update(elapsedTime);
  }
};

const getPlayer = (agents: LinkedList<IAgent>) => {
  for (let agent = agents.first(); agent !== null; agent = agent.next) {
    if (agent.element.getType() === AgentType.Player) {
      return agent.element;
    }
  }

  throw new Error("Player agent not found");
};

const drawAgents = (player: IAgent, agents: LinkedList<IAgent>, grid: Grid) => {
  const cameraX = determineCameraX(player, grid);

  grid.draw(cameraX);

  const unitSize = grid.getUnitSize();
  const halfScreen = Math.floor(
    ((grid.getTilesPerScreenRow() + 1) * grid.getUnitSize()) / 2,
  );

  for (let agent = agents.first(); agent !== null; agent = agent.next) {
    if (!agent.element.getIsActive()) {
      continue;
    }

    // Cull agents that fall outside the viewing window
    const agentX = agent.element.getX();
    let cutoffX = player.getX();
    if (cutoffX < halfScreen) cutoffX = halfScreen;
    if (cutoffX > grid.getRowSize() * grid.getUnitSize() - halfScreen) {
      cutoffX = grid.getRowSize() * grid.getUnitSize() - halfScreen;
    }

    if (
      agentX + unitSize > cutoffX + halfScreen ||
      agentX + unitSize < cutoffX - halfScreen
    ) {
      continue;
    }

    agent.element.draw(-1 * cameraX);
  }
};
