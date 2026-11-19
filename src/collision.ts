import type { IAgent } from "./agent";
import type { Grid } from "./grid";

const nonSolidTile = 0;

export const isAgentCollidingWithOtherAgent = (
  thisAgent: IAgent,
  otherAgent: IAgent,
) => {
  const bb1 = thisAgent.getBoundingBox();
  const bb2 = otherAgent.getBoundingBox();

  if (bb1.leftX > bb2.rightX || bb2.leftX > bb1.rightX) {
    return false;
  }

  if (bb1.topY < bb2.bottomY || bb2.topY < bb1.bottomY) {
    return false;
  }

  return true;
};

export const isAgentCollidingWithGrid = (agent: IAgent, grid: Grid) => {
  const x = agent.getX();
  const y = agent.getY();
  const width = agent.getWidth();
  const height = agent.getHeight();
  const unitSize = grid.getUnitSize();

  return (
    isAgentCollidingWithGridTopLeft(x, y, unitSize, grid) ||
    isAgentCollidingWithGridTopRight(x, y, width, unitSize, grid) ||
    isAgentCollidingWithGridBottomLeft(x, y, height, unitSize, grid) ||
    isAgentCollidingWithGridBottomRight(x, y, width, height, unitSize, grid)
  );
};

export const isAgentCollidingWithGridLeft = (agent: IAgent, grid: Grid) => {
  const x = agent.getX();
  const y = agent.getY();
  const height = agent.getHeight();
  const unitSize = grid.getUnitSize();

  return (
    isAgentCollidingWithGridTopLeft(x, y, unitSize, grid) ||
    isAgentCollidingWithGridBottomLeft(x, y, height, unitSize, grid)
  );
};

export const isAgentCollidingWithGridRight = (agent: IAgent, grid: Grid) => {
  const x = agent.getX();
  const y = agent.getY();
  const width = agent.getWidth();
  const height = agent.getHeight();
  const unitSize = grid.getUnitSize();

  return (
    isAgentCollidingWithGridTopRight(x, y, width, unitSize, grid) ||
    isAgentCollidingWithGridBottomRight(x, y, width, height, unitSize, grid)
  );
};

export const isAgentCollidingWithGridTop = (agent: IAgent, grid: Grid) => {
  const x = agent.getX();
  const y = agent.getY();
  const width = agent.getWidth();
  const unitSize = grid.getUnitSize();

  return (
    isAgentCollidingWithGridTopLeft(x, y, unitSize, grid) ||
    isAgentCollidingWithGridTopRight(x, y, width, unitSize, grid)
  );
};

export const isAgentCollidingWithGridBottom = (agent: IAgent, grid: Grid) => {
  const x = agent.getX();
  const y = agent.getY();
  const width = agent.getWidth();
  const height = agent.getHeight();
  const unitSize = grid.getUnitSize();

  return (
    isAgentCollidingWithGridBottomLeft(x, y, height, unitSize, grid) ||
    isAgentCollidingWithGridBottomRight(x, y, width, height, unitSize, grid)
  );
};

const isAgentCollidingWithGridTopLeft = (
  x: number,
  y: number,
  unitSize: number,
  grid: Grid,
) => {
  const gridX = Math.floor(x / unitSize);
  const gridY = Math.floor(y / unitSize);
  const tile = grid.getTile(gridX, gridY);
  return tile !== nonSolidTile;
};

const isAgentCollidingWithGridTopRight = (
  x: number,
  y: number,
  width: number,
  unitSize: number,
  grid: Grid,
) => {
  // We have to compensate off-by-one for width since we start at 0
  const gridX = Math.floor((x + width - 1) / unitSize);
  const gridY = Math.floor(y / unitSize);
  const tile = grid.getTile(gridX, gridY);
  return tile !== nonSolidTile;
};

const isAgentCollidingWithGridBottomLeft = (
  x: number,
  y: number,
  height: number,
  unitSize: number,
  grid: Grid,
) => {
  const gridX = Math.floor(x / unitSize);
  // We have to compensate off-by-one for height since we start at 0
  const gridY = Math.floor((y + height - 1) / unitSize);
  const tile = grid.getTile(gridX, gridY);
  return tile !== nonSolidTile;
};

const isAgentCollidingWithGridBottomRight = (
  x: number,
  y: number,
  width: number,
  height: number,
  unitSize: number,
  grid: Grid,
) => {
  // We have to compensate off-by-one for width and height since we start at 0
  const gridX = Math.floor((x + width - 1) / unitSize);
  const gridY = Math.floor((y + height - 1) / unitSize);
  const tile = grid.getTile(gridX, gridY);
  return tile !== nonSolidTile;
};
