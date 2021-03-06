import * as P5 from 'p5';

import { Board } from './Board';
import './styles.css';

// OG: https://images.unsplash.com/photo-1643691781299-8490f12b2f11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800&q=80
const IMG_URL = 'https://source.unsplash.com/random/800x800/?business,flower,happy,travel,nature&q=80&fit=crop';

const sketch = (p5: P5) => {
  const size = {
    x: 800,
    y: 800
  };
  let img: P5.Image;
  let board: Board;
  let finishOpacity = 0;
  let finishTimeout = 100;
  let isLoading = false;

  const loadImage = (onLoaded?: () => void) => {
    isLoading = true;
    img = p5.loadImage(IMG_URL, () => {
      isLoading = false;
      if (onLoaded) onLoaded();
    });
  };

  const setupBoard = () => {
    p5.background(0);
    board = new Board(img, size, 3, 3)
    board.shuffle(p5);
    board.draw(p5);
  };

  const handleBoardSuccess = () => {
    if (!board.isSolved) return;

    if (finishTimeout > 0) {
      if (isLoading) return;
      p5.tint(255, 255, 255, finishOpacity)
      p5.image(img, 0, 0, size.x, size.y);
      if (finishOpacity < 255) finishOpacity += 2;

      finishTimeout--;
      return;
    }

    // Reset tint.
    p5.tint(255);

    // Reset success parameters.
    finishTimeout = 100;
    finishOpacity = 0;

    // Generate new board.
    loadImage(() => setupBoard());
  };

  const handleBoardPress = (e: MouseEvent) => {
    const row = p5.floor(e.x / board.tileSize.x);
    const col = p5.floor(e.y / board.tileSize.y);
    board.move(col, row, p5);
  }

  p5.preload = () => {
    loadImage();
  };

  p5.setup = () => {
    p5.frameRate(60);
    p5.createCanvas(size.x, size.y);
    setupBoard();
  };

  p5.draw = () => {
    handleBoardSuccess();
  }

  p5.mousePressed = (e: MouseEvent) => {
    // Ignoring presses outside the canvas.
    if (e.x > size.x || e.y > size.y) return;

    handleBoardPress(e);
  };
};

new P5(sketch);