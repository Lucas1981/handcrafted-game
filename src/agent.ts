import type { Graphics } from "./graphics";

export interface IAgent {
  update: (elapsedTime: number) => void;
  draw: () => void;
}

export abstract class Agent implements IAgent {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  graphics: Graphics;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    graphics: Graphics,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.graphics = graphics;
  }

  update(_: number) {}

  draw() {
    this.graphics.drawRect(this.x, this.y, this.width, this.height, "red");
  }
}
