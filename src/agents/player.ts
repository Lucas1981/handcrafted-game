import { Agent } from "../agent";
import type { Graphics } from "../graphics";
import type { Input } from "../input";
import { Sounds, type Sound } from "../sound";

const speed = 150;
const playBumpThreshold = 150;

export class Player extends Agent {
  input: Input;
  sound: Sound;
  screenWidth: number;
  screenHeight: number;
  lastPlayedBump: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    graphics: Graphics,
    input: Input,
    sound: Sound,
  ) {
    super(x, y, width, height, graphics);
    this.screenWidth = graphics.getWidth();
    this.screenHeight = graphics.getHeight();
    this.input = input;
    this.sound = sound;
    this.lastPlayedBump = performance.now();
  }

  update(elapsedTime: number) {
    const delta = speed * (elapsedTime / 1000);

    if (this.input.getKeyStatus("ArrowLeft")) {
      this.x -= delta;
      if (this.x < 0) {
        this.x = 0;
        this.handlePlayBump();
      }
    }

    if (this.input.getKeyStatus("ArrowRight")) {
      this.x += delta;
      const maxWidth = this.screenWidth - this.width;
      if (this.x > maxWidth) {
        this.x = maxWidth;
        this.handlePlayBump();
      }
    }

    if (this.input.getKeyStatus("ArrowUp")) {
      this.y -= delta;
      if (this.y < 0) {
        this.y = 0;
        this.handlePlayBump();
      }
    }

    if (this.input.getKeyStatus("ArrowDown")) {
      this.y += delta;
      const maxHeight = this.screenHeight - this.height;
      if (this.y > maxHeight) {
        this.y = maxHeight;
        this.handlePlayBump();
      }
    }
  }

  private handlePlayBump() {
    const now = performance.now();
    if (now - this.lastPlayedBump > playBumpThreshold) {
      this.sound.enqueue(Sounds.bump);
      this.lastPlayedBump = now;
    }
  }

  draw() {
    this.graphics.drawRect(this.x, this.y, this.width, this.height, "green");
  }
}
