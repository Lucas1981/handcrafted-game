import type { Graphics } from "./graphics";

type BoundingBox = {
  leftX: number;
  topY: number;
  rightX: number;
  bottomY: number;
};

export interface IAgent {
  update: (elapsedTime: number) => void;
  draw: (translateX?: number) => void;
  getX: () => number;
  getY: () => number;
  getWidth: () => number;
  getHeight: () => number;
  getBoundingBox: () => BoundingBox;
  getName: () => string;
}

export abstract class Agent implements IAgent {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  graphics: Graphics;
  name: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    graphics: Graphics,
    name: string,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.graphics = graphics;
    this.name = name;
  }

  getName() {
    return this.name;
  }

  update(_: number) {}

  draw(translateX: number = 0) {
    this.graphics.drawRect(
      this.x + translateX,
      this.y,
      this.width,
      this.height,
      "red",
    );
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }

  getBoundingBox() {
    return {
      leftX: this.x,
      topY: this.y,
      rightX: this.x + this.width,
      bottomY: this.y + this.height,
    };
  }
}
