import * as P5 from 'p5';

import { Board } from './Board';
import './styles.css';

const IMG_URL = 'https://images.unsplash.com/photo-1643691781299-8490f12b2f11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800&q=80';

const sketch = (p5: P5) => {
  const size = {
    x: 800,
    y: 800
  };
  let img: P5.Image;
  let board: Board;

  p5.preload = () => {
    img = p5.loadImage(IMG_URL);
  };

  p5.setup = () => {
    p5.noLoop();
    p5.createCanvas(size.x, size.y);
    board = new Board(img, size, 3, 3)
    board.shuffle();
    board.draw(p5);
  };

  p5.mousePressed = (e: MouseEvent) => {
    // Ignoring presses outside the canvas.
    if (e.x > size.x || e.y > size.y) return;

    const row = p5.floor(e.x / board.tileSize.x);
    const col = p5.floor(e.y / board.tileSize.y);
    board.move(col, row, p5);
  };
};

new P5(sketch);