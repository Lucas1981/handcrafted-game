import { AgentType, type IAgent } from "./agent";
import type { LinkedList } from "./data-structures/linked-list";
import type { Grid } from "./grid";

// It could be preferrable to turn the loop into a class, so that it can retain some state
export const mainLoop = (
  agents: LinkedList<IAgent>,
  grid: Grid,
  elapsedTime: number,
  update = true,
) => {
  if (update) {
    updateAgents(agents, elapsedTime);
  }

  drawAgents(agents, grid);
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

const drawAgents = (agents: LinkedList<IAgent>, grid: Grid) => {
  const player = getPlayer(agents)!;
  const cameraX = determineCameraX(player, grid);

  grid.draw(cameraX);

  const unitSize = grid.getUnitSize();
  const halfScreen = Math.floor(
    ((grid.getTilesPerScreenRow() + 1) * grid.getUnitSize()) / 2,
  );

  for (let agent = agents.first(); agent !== null; agent = agent.next) {
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
