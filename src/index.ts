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

  p5.preload = () => {
    img = p5.loadImage(IMG_URL);
  }

  p5.setup = () => {
    const board = new Board(img, size, 2, 2)
    p5.createCanvas(size.x, size.y);
    p5.background(50);
    board.shuffle();
    board.draw(p5);
  }
}

new P5(sketch);