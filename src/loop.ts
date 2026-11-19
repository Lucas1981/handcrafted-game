import { type IAgent } from "./agent";

export const mainLoop = (
  agents: IAgent[],
  elapsedTime: number,
  update = true,
) => {
  // It could be preferrable to turn the loop into a class, so that it can retain some state
  if (update) {
    for (const agent of agents) {
      agent.update(elapsedTime);
    }
  }

  for (const agent of agents) {
    agent.draw();
  }
};
