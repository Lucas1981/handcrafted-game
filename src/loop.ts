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
    for (const agent of agents) {
      agent.update(elapsedTime);
    }
  }

  grid.draw();

  for (const agent of agents) {
    agent.draw();
  }
};
