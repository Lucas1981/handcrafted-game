import type { AnimationsType } from "./animation";
import type { Graphics } from "./graphics";

const tileMap = new Map<number, string>([
  [0, "grey-tile"],
  [1, "brick-tile"],
]);

export class Grid {
  unitSize: number;
  grid: number[][];
  graphics: Graphics;
  animations: AnimationsType;

  constructor(
    unitSize: number,
    grid: number[][],
    graphics: Graphics,
    animations: AnimationsType,
  ) {
    this.unitSize = unitSize;
    this.grid = grid;
    this.graphics = graphics;
    this.animations = animations;
  }

  draw() {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const tileKey = this.grid[y][x];
        const animationKey = tileMap.get(tileKey) || "grey-tile";
        this.animations[animationKey].draw(
          x * this.unitSize,
          y * this.unitSize,
          this.graphics,
        );
      }
    }
  }
}

export const loadGrid = async (
  fileName: string,
  graphics: Graphics,
  animations: AnimationsType,
) => {
  const unitSize = 64;
  const result = [];
  const response = await fetch(`./assets/maps/${fileName}.txt`);
  const content = await response.text();
  const rows = content.split("\n");

  for (const row of rows) {
    result.push(row.split("").map((val) => parseInt(val)));
  }

  return new Grid(unitSize, result, graphics, animations);
};
