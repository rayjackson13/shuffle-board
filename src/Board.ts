import * as P5 from "p5";
import { Tile } from "./Tile";
import { Vector } from "./typed";

export class Board {
  tiles: Tile[];
  size: Vector;
  cols: number;
  rows: number;
  image: P5.Image;

  constructor(image: P5.Image, size: Vector, cols: number, rows: number) {
    this.image = image;
    this.size = size;
    this.cols = cols;
    this.rows = rows;

    this.getTiles();
  }

  private getTiles = () => {
    const tileArray = [];

    // size of a tile
    const size: Vector = { 
      x: this.size.x / this.cols,
      y: this.size.y / this.rows,
    };

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const image = this.image.get(i * size.x, j * size.y, size.x, size.y);
        const position = {
          x: i * size.x,
          y: j * size.y
        };
        const tile = new Tile(image, position, size);
        tileArray.push(tile);
      }
    }

    this.tiles = tileArray;
  };

  draw = (p5: P5) => {
    this.tiles.forEach((tile, index) => {
      const position = {
        x: (index % this.cols) * tile.size.x,
        y: p5.floor(index / this.rows) * tile.size.y,
      }
      tile.position = position;
      tile.draw(p5);
    });
  };

  shuffle = () => {
    this.tiles = this.tiles.sort(() => Math.random() - 0.5);
  };
}