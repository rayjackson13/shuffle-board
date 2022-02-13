import * as P5 from "p5";
import { Vector } from "./typed";

export class Tile {
  private _image: P5.Image;
  private _originalPosition: Vector;
  private _size: Vector;
  private _position: Vector;
  private _isEmpty: boolean;

  constructor(image: P5.Image, position: Vector, size: Vector) {
    this._image = image;
    this._originalPosition = position;
    this._position = position;
    this._size = size;
    this._isEmpty = false;
  }

  get size() {
    return this._size;
  }

  get position() {
    return this._position;
  }

  set position(position: Vector) {
    this._position = position;
  }

  set isEmpty(isEmpty: boolean) {
    this._isEmpty = isEmpty;
  }

  get isEmpty() {
    return this._isEmpty;
  }

  draw = (p5: P5) => {
    p5.strokeWeight(4);
    p5.stroke(0);
    const canvasPosition = {
      x: this._position.x * this.size.x,
      y: this._position.y * this.size.y,
    }
    p5.rect(canvasPosition.x, canvasPosition.y, this._size.x, this._size.y);
    p5.image(this._image, canvasPosition.x, canvasPosition.y);
  };
}
