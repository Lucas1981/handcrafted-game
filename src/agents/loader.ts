import { Grid } from "../grid";
import { Input } from "../input";
import { Sound } from "../sound";
import type { AnimationsType } from "../animation";
import { Player } from "../agents/player";
import { Baddy } from "../agents/baddy";
import { Coin } from "../agents/coin";
import { Graphics } from "../graphics";
import { AgentType, type IAgent } from "../agent";
import { LinkedList } from "../data-structures/linked-list";

export const loadAgents = async (
  fileName: string,
  graphics: Graphics,
  input: Input,
  sound: Sound,
  grid: Grid,
  animations: AnimationsType,
) => {
  const request = await fetch(`./assets/world/${fileName}.json`);
  const payload = await request.json();
  const agents = new LinkedList<IAgent>();

  for (const agent of payload) {
    let newAgent: IAgent;
    switch (agent.type) {
      case AgentType.Player:
        newAgent = new Player(
          agent.x,
          agent.y,
          graphics,
          input,
          sound,
          grid,
          animations,
        );
        break;
      case AgentType.Baddy:
        newAgent = new Baddy(agent.x, agent.y, graphics, animations);
        break;
      case AgentType.Coin:
        newAgent = new Coin(agent.x, agent.y, graphics, animations);
        break;
      default:
        throw new Error("Illegal agent type");
    }

    agents.push(newAgent);
  }

  return agents;
};
