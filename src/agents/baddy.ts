import { Agent } from "../agent";
import type { AnimationsType } from "../animation";
import { Graphics } from "../graphics";

export class Baddy extends Agent {
  animations: AnimationsType;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    graphics: Graphics,
    animations: AnimationsType,
    name: string,
  ) {
    super(x, y, width, height, graphics, name);
    this.animations = animations;
  }

  draw(translateX: number = 0) {
    this.animations["red-dot"].draw(this.x + translateX, this.y, this.graphics);
  }
}
