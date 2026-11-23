import { Agent, AgentType } from "../agent";
import type { AnimationsType } from "../animation";
import { Graphics } from "../graphics";

const width = 64;
const height = 64;

export class Baddy extends Agent {
  animations: AnimationsType;

  constructor(
    x: number,
    y: number,
    graphics: Graphics,
    animations: AnimationsType,
  ) {
    super(x, y, width, height, graphics, AgentType.Baddy);
    this.animations = animations;
  }

  draw(translateX: number = 0) {
    this.animations["red-dot"].draw(this.x + translateX, this.y, this.graphics);
  }
}
