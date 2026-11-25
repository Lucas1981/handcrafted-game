import { Graphics } from "./graphics";

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
  getType: () => AgentType;
  getIsActive: () => boolean;
  setIsActive: (isActive: boolean) => void;
}

export enum AgentType {
  Player = "player",
  Baddy = "baddy",
  Coin = "coin",
}

export abstract class Agent implements IAgent {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  graphics: Graphics;
  type: AgentType;
  isActive: boolean;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    graphics: Graphics,
    type: AgentType,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.graphics = graphics;
    this.type = type;
    this.isActive = true;
  }

  getType() {
    return this.type;
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

  getIsActive() {
    return this.isActive;
  }
  setIsActive(isActive: boolean) {
    this.isActive = isActive;
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
