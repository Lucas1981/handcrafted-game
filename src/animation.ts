import { Frame } from "./frame";
import type { Graphics } from "./graphics";

export const animationsConfig = {
  "player-standing-left": [5],
  "player-standing-right": [0],
  "player-standing-up": [11],
  "player-standing-down": [6],
  "player-walking-left": [3, 5, 4, 5],
  "player-walking-right": [2, 0, 1, 0],
  "player-walking-up": [10, 11, 9, 11],
  "player-walking-down": [7, 6, 8, 6],
  "crate-tile": [12],
  "brick-tile": [13],
  "grey-tile": [14],
  "green-dot": [17],
  "red-dot": [18],
  "yellow-dot": [19],
};

const framesPerSecond = 8;
const unitSize = 64;

export type AnimationsType = Record<string, Animation>;

export class Animation {
  frames: Frame[];
  indices: number[];
  numberOfFrames: number;

  constructor(frames: Frame[], indices: number[]) {
    this.frames = frames;
    this.indices = indices;
    this.numberOfFrames = this.indices.length;
  }

  draw(x: number, y: number, graphics: Graphics, elapsedTime: number = 0) {
    // If we only have one frame in our animation, return it
    const index =
      elapsedTime === 0 || this.indices.length === 1
        ? 0
        : this.determineFrameIndex(elapsedTime);
    const frame = this.getFrame(index);

    // Don't allow float as x or y, so crush them to the floor here to get nice integers.
    frame.draw(Math.floor(x), Math.floor(y), graphics);
  }

  determineFrameIndex(elapsedTime: number) {
    // NOTE: The elapsed time will be the time difference between now and when the actor last changed state
    const frameNumber = Math.floor(elapsedTime * (framesPerSecond / 1000));

    // For now, we always assume a lineair loop
    return frameNumber % this.numberOfFrames;
  }

  getFrame(index: number) {
    return this.frames[this.indices[index]];
  }
}

export const loadAnimations = async (): Promise<AnimationsType> => {
  const image = new Image();
  const frames: Frame[] = [];
  const animations: AnimationsType = {};

  image.src = "./assets/images/spritesheet.png";
  return new Promise<AnimationsType>((resolve) => {
    image.onload = () => {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 8; x++) {
          const offsetX = x * unitSize;
          const offsetY = y * unitSize;
          frames.push(new Frame(image, offsetX, offsetY, unitSize, unitSize));
        }
      }

      for (const [key, value] of Object.entries(animationsConfig)) {
        const animation = new Animation(frames, value);
        animations[key] = animation;
      }

      resolve(animations);
    };
  });
};
