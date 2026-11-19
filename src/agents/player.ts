import { Agent } from "../agent";
import type { Graphics } from "../graphics";
import type { Input } from "../input";
import { Sounds, type Sound } from "../sound";
import { type AnimationsType } from "../animation";
import type { Grid } from "../grid";
import {
  isAgentCollidingWithGridLeft,
  isAgentCollidingWithGridRight,
  isAgentCollidingWithGridTop,
  isAgentCollidingWithGridBottom,
} from "../collision";

const speed = 250;
const playBumpThreshold = 150;

const states = {
  standing: "standing",
  walking: "walking",
};

const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

export class Player extends Agent {
  input: Input;
  sound: Sound;
  grid: Grid;
  animations: AnimationsType;
  screenWidth: number;
  screenHeight: number;
  lastPlayedBump: number;
  state: string = states.standing;
  direction: string = directions.down;
  prevAnimationKey: string = "";
  animationChanged: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    graphics: Graphics,
    input: Input,
    sound: Sound,
    grid: Grid,
    animations: AnimationsType,
  ) {
    super(x, y, width, height, graphics);
    this.screenWidth = graphics.getWidth();
    this.screenHeight = graphics.getHeight();
    this.input = input;
    this.sound = sound;
    this.animations = animations;
    this.lastPlayedBump = performance.now();
    this.animationChanged = performance.now();
    this.grid = grid;
  }

  update(elapsedTime: number) {
    const delta = speed * (elapsedTime / 1000);

    this.state = states.standing;
    this.handleMoveLeft(delta);
    this.handleMoveRight(delta);
    this.handleMoveUp(delta);
    this.handleMoveDown(delta);
    this.updateAnimation();
  }

  private handleMoveLeft(delta: number) {
    if (this.input.getKeyStatus("ArrowLeft")) {
      this.state = states.walking;
      this.direction = directions.left;
      this.x -= delta;
      if (this.x < 0) {
        this.x = 0;
        this.handlePlayBump();
      }

      if (isAgentCollidingWithGridLeft(this, this.grid)) {
        // Restore x to get as close to the tile as we can
        const gridUnit = this.grid.getUnitSize();
        this.x = (Math.floor(this.x / gridUnit) + 1) * gridUnit;
      }
    }
  }

  private handleMoveRight(delta: number) {
    if (this.input.getKeyStatus("ArrowRight")) {
      this.state = states.walking;
      this.direction = directions.right;
      this.x += delta;
      const maxWidth = this.screenWidth - this.width;
      if (this.x > maxWidth) {
        this.x = maxWidth;
        this.handlePlayBump();
      }

      if (isAgentCollidingWithGridRight(this, this.grid)) {
        // Restore x to get as close to the tile as we can
        const gridUnit = this.grid.getUnitSize();
        this.x = Math.floor(this.x / gridUnit) * gridUnit;
      }
    }
  }

  private handleMoveUp(delta: number) {
    if (this.input.getKeyStatus("ArrowUp")) {
      this.state = states.walking;
      this.direction = directions.up;
      this.y -= delta;
      if (this.y < 0) {
        this.y = 0;
        this.handlePlayBump();
      }

      if (isAgentCollidingWithGridTop(this, this.grid)) {
        // Restore y to get as close to the tile as we can
        const gridUnit = this.grid.getUnitSize();
        this.y = (Math.floor(this.y / gridUnit) + 1) * gridUnit;
      }
    }
  }

  private handleMoveDown(delta: number) {
    if (this.input.getKeyStatus("ArrowDown")) {
      this.state = states.walking;
      this.direction = directions.down;
      this.y += delta;
      const maxHeight = this.screenHeight - this.height;
      if (this.y > maxHeight) {
        this.y = maxHeight;
        this.handlePlayBump();
      }

      if (isAgentCollidingWithGridBottom(this, this.grid)) {
        // Restore y to get as close to the tile as we can
        const gridUnit = this.grid.getUnitSize();
        this.y = Math.floor(this.y / gridUnit) * gridUnit;
      }
    }
  }

  draw() {
    const animationKey = `player-${this.state}-${this.direction}`;
    console.log("animationKey", animationKey);
    const now = performance.now();
    const elapsedTime = now - this.animationChanged;
    this.animations[animationKey].draw(
      this.x,
      this.y,
      this.graphics,
      elapsedTime,
    );
  }

  private updateAnimation() {
    if (this.prevAnimationKey !== `player-${this.state}-${this.direction}`) {
      this.animationChanged = performance.now();
      this.prevAnimationKey = `player-${this.state}-${this.direction}`;
    }
  }

  private handlePlayBump() {
    const now = performance.now();
    if (now - this.lastPlayedBump > playBumpThreshold) {
      this.sound.enqueue(Sounds.bump);
      this.lastPlayedBump = now;
    }
  }
}
