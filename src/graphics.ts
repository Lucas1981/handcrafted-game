export class Graphics {
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

  printText(x: number, y: number, text: string, color = "white") {
    this.ctx.font = "30px monospace";
    this.ctx.fillStyle = color;
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, x, y);
  }

  clearScreen(color = "black") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawRect(x: number, y: number, width: number, height: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }
}
