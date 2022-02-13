import * as P5 from "p5";
import { Vector } from "./typed";

const STROKE = 1;

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

  get originalPosition() {
    return this._originalPosition;
  }

  set isEmpty(isEmpty: boolean) {
    this._isEmpty = isEmpty;
  }

  get isEmpty() {
    return this._isEmpty;
  }

  draw = (p5: P5) => {
    const canvasPosition = {
      x: this._position.x * this.size.x,
      y: this._position.y * this.size.y,
    }
    p5.noStroke();
    p5.fill(0);
    p5.rect(canvasPosition.x, canvasPosition.y, this._size.x, this._size.y);
    p5.image(
      this._image, 
      canvasPosition.x + STROKE, 
      canvasPosition.y + STROKE, 
      this._size.x - STROKE, 
      this._size.y - STROKE
      );
  };
}
