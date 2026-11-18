export class Canvas {
  width: number;
  height: number;
  id: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(width = 800, height = 600, id = "canvas") {
    this.width = width;
    this.height = height;
    this.id = id;
    this.canvas = document.getElementById(
      "canvas",
    ) as unknown as HTMLCanvasElement;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d")!;
  }

  getContext() {
    return this.ctx;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  printText(x: number, y: number, text: string) {
    this.ctx.fillText(text, x, y);
  }
}
