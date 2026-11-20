import { type IAgent } from "./agent";
import type { Grid } from "./grid";

// It could be preferrable to turn the loop into a class, so that it can retain some state
export const mainLoop = (
  agents: IAgent[],
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

const updateAgents = (agents: IAgent[], elapsedTime: number) => {
  for (const agent of agents) {
    agent.update(elapsedTime);
  }
};

const drawAgents = (agents: IAgent[], grid: Grid) => {
  const player = agents[0];
  const cameraX = determineCameraX(player, grid);

  grid.draw(cameraX);

  const unitSize = grid.getUnitSize();
  const halfScreen = Math.floor(
    ((grid.getTilesPerScreenRow() + 1) * grid.getUnitSize()) / 2,
  );

  for (const agent of agents) {
    // Cull agents that fall outside the viewing window
    const agentX = agent.getX();
    const playerX = player.getX();
    if (
      agentX + unitSize > playerX + halfScreen ||
      agentX + unitSize < playerX - halfScreen
    ) {
      continue;
    }

    agent.draw(-1 * cameraX);
  }
};
