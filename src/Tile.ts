import * as P5 from "p5";
import { Vector } from "./typed";

export class Tile {
  private _image: P5.Image;
  private _originalPosition: Vector;
  private _size: Vector;

  constructor(image: P5.Image, position: Vector, size: Vector) {
    this._image = image;
    this._originalPosition = position;
    this._size = size;
  }

  get size () {
    return this._size;
  }

  draw = (p5: P5, x: number, y: number) => {
    p5.strokeWeight(4);
    p5.stroke(0);
    p5.rect(x, y, this._size.x, this._size.y);
    p5.image(this._image, x, y);
  };
}
