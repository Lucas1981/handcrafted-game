import type { Graphics } from "./graphics";

export class Frame {
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(x: number, y: number, graphics: Graphics) {
    graphics.ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
      x,
      y,
      this.width,
      this.height,
    );
  }
}
