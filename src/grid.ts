import type { AnimationsType } from "./animation";
import type { Graphics } from "./graphics";

const tileMap = new Map<number, string>([
  [0, "grey-tile"],
  [1, "brick-tile"],
  [2, "crate-tile"],
]);

export class Grid {
  unitSize: number;
  grid: number[][];
  graphics: Graphics;
  animations: AnimationsType;
  tilesPerScreenRow: number;

  constructor(
    unitSize: number,
    grid: number[][],
    graphics: Graphics,
    screenWidth: number,
    animations: AnimationsType,
  ) {
    this.unitSize = unitSize;
    this.grid = grid;
    this.graphics = graphics;
    this.animations = animations;
    this.tilesPerScreenRow = Math.floor(screenWidth / unitSize);
  }

  getTile(x: number, y: number) {
    return this.grid[y][x];
  }

  getUnitSize() {
    return this.unitSize;
  }

  getRowSize() {
    return this.grid[0].length;
  }

  getTilesPerScreenRow() {
    return this.tilesPerScreenRow;
  }

  draw(offsetX: number) {
    const gridOffsetX = Math.floor(offsetX / this.unitSize);
    const granularX = offsetX % this.unitSize;

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.tilesPerScreenRow + 1; x++) {
        const tileKey = this.grid[y][x + gridOffsetX];
        const animationKey = tileMap.get(tileKey);
        if (animationKey === undefined) {
          continue;
        }
        this.animations[animationKey].draw(
          x * this.unitSize - granularX,
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
  screenWidth: number,
  animations: AnimationsType,
) => {
  const unitSize = 64;
  const result = [];
  const response = await fetch(`./assets/world/${fileName}.txt`);
  const content = await response.text();
  const rows = content.split("\n");

  for (const row of rows) {
    result.push(row.split("").map((val) => parseInt(val)));
  }

  return new Grid(unitSize, result, graphics, screenWidth, animations);
};
