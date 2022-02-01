import * as P5 from "p5";
import { Tile } from "./Tile";
import { Vector } from "./typed";

export class Board {
  private _tiles: Tile[];
  private _size: Vector;
  private _columns: number;
  private _rows: number;
  private _image: P5.Image;
  private _tileSize: Vector;
  private _blankPosition: Vector; // position of a blank tile in the grid

  constructor(image: P5.Image, size: Vector, cols: number, rows: number) {
    this._image = image;
    this._size = size;
    this._columns = cols;
    this._rows = rows;
    this._tileSize = {
      x: size.x / cols,
      y: size.y / rows,
    };

    this.loadTiles();
  }

  get tileSize() {
    return this._tileSize;
  }

  private loadTiles = () => {
    const tileArray = [];
    const size = this._tileSize;

    for (let i = 0; i < this._columns; i++) {
      for (let j = 0; j < this._rows; j++) {
        const image = this._image.get(i * size.x, j * size.y, size.x, size.y);
        const position = {
          x: i * size.x,
          y: j * size.y
        };
        const tile = new Tile(image, position, size);
        tileArray.push(tile);
      }
    }

    this._tiles = tileArray;
  };

  updateBlankPosition = () => {
    const index = this._tiles.findIndex(val => !!val.isEmpty);
    this._blankPosition = {
      x: index % this._columns,
      y: Math.floor(index / this._rows),
    }
  }

  draw = (p5: P5) => {
    p5.background(90);
    this._tiles.forEach((tile, index) => {
      if (!!tile.isEmpty) {
        this.updateBlankPosition();
        return;
      }

      tile.position = {
        x: Math.floor(index / this._rows) * this._tileSize.y,
        y: (index % this._columns) * this._tileSize.x,
      };
      tile.draw(p5);
    });
  };

  shuffle = () => {
    this._tiles = this._tiles.sort(() => Math.random() - 0.5);
    this._tiles.forEach((tile, index) => {
      if (index === this._tiles.length - 1) {
        tile.isEmpty = true;
      }
    });
  };

  getTile = (col: number, row: number) => {
    return this._tiles[col + row * this._rows];
  }

  move = (col: number, row: number, p5: P5) => {
    const tile = this.getTile(col, row);
    if (tile.isEmpty) {
      console.log('This tile cannot be moved as it is empty.');
      return;
    }

    const isNeighbour = this.isNeighboringBlank(col, row);
    if (!isNeighbour) {
      console.log('This tile cannot be moved as it is blocked by other tiles.');
      return;
    }

    const tileIndex = col + row * this._rows;
    const blankIndex = this._blankPosition.x + this._blankPosition.y * this._rows;
    this.swap(tileIndex, blankIndex);
    this.draw(p5);
  }

  swap = (index1: number, index2: number) => {
    [this._tiles[index1], this._tiles[index2]] = 
      [this._tiles[index2], this._tiles[index1]];
  }

  isNeighboringBlank = (col: number, row: number) => {
    if (col !== this._blankPosition.x && row !== this._blankPosition.y) return false;

    return Math.abs(col - this._blankPosition.x) === 1 
      || Math.abs(row - this._blankPosition.y) === 1;
  }
}