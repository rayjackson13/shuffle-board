import * as P5 from "p5";
import { Vector } from "./typed";

export class Tile {
  private _image: P5.Image;
  private _originalPosition: Vector;
  private _size: Vector;
  private _position: Vector;

  constructor(image: P5.Image, position: Vector, size: Vector) {
    this._image = image;
    this._originalPosition = position;
    this._position = position;
    this._size = size;
  }

  get size () {
    return this._size;
  }

  set position (position: Vector) {
    this._position = position;
  }

  draw = (p5: P5) => {
    p5.strokeWeight(4);
    p5.stroke(0);
    p5.rect(this._position.x, this._position.y, this._size.x, this._size.y);
    p5.image(this._image, this._position.x, this._position.y);
  };
}
