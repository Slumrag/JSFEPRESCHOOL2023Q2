import { Snake } from './Snake.js';
export class Game {
  constructor(canvas, playPauseButton, mainLoop, ...params) {
    this.isPaused = true;
    this.isOver = false;

    this.stopMain = 0;
    this.initialtFrame = 0;
    this.mainLoop = mainLoop;

    this.score = 0;

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.playPauseButton = playPauseButton;
    this.boundingBox = { x: this.canvas.width, y: this.canvas.height };

    this.snake = new Snake({ x: 10, y: 10 });

    document.addEventListener('keyup', (event) => {
      switch (event.code) {
        //up
        case 'ArrowUp':
        case 'KeyW':
          // console.log('up');
          this.snake.changeDirection('up');
          break;
        //right
        case 'ArrowRight':
        case 'KeyD':
          // console.log('right');
          this.snake.changeDirection('right');
          break;
        // down
        case 'ArrowDown':
        case 'KeyS':
          // console.log('down');
          this.snake.changeDirection('down');
          break;
        //left
        case 'ArrowLeft':
        case 'KeyA':
          // console.log('left');
          this.snake.changeDirection('left');
          break;
      }
    });
    document.addEventListener('keyup', (event) => {
      if (event.code !== 'Space') return;
      this.playPause();
    });
    this.playPauseButton.addEventListener('click', () => {
      this.playPause();
    });
  }
  playPause(e) {
    this.isPaused = !this.isPaused;
    this.playPauseButton.textContent = this.isPaused ? 'play' : 'pause';
  }
  start() {
    this.score = 0;
    //  delete this.snake;
    this.snake = new Snake({ x: 5, y: 5 }, { direction: 'up' });
    this.isOver = false;
    this.isPaused = false;
    requestAnimationFrame(this.mainLoop);
  }
  over() {
    console.log('game over');
    this.isOver = true;

    cancelAnimationFrame(this.stopMain);
  }
  _isOutOfBounds() {
    const snakeX = this.snake.position.x * this.snake.cellSize;
    const snakeY = this.snake.position.y * this.snake.cellSize;

    const outUp = 0 >= snakeY && this.snake.direction === 'up';
    const outRight =
      snakeX >= this.boundingBox.x - this.snake.cellSize && this.snake.direction === 'right';
    const outDown =
      snakeY >= this.boundingBox.y - this.snake.cellSize && this.snake.direction === 'down';
    const outLeft = 0 >= snakeX && this.snake.direction === 'left';

    return outUp || outRight || outDown || outLeft;
  }

  update(tFrame) {
    if (this.isPaused || this.isOver) return;
    const updateRate = 20;
    const frameLength = 16.6666667;
    // console.log('update', tFrame - this.initialtFrame, secondsDigit);
    if (!(Math.floor(tFrame - this.initialtFrame) > frameLength * updateRate)) return;
    if (this._isOutOfBounds()) {
      this.over();
    } else {
      this.snake.move();
      this.initialtFrame = tFrame;
    }
  }
  render() {
    const primaryColor =
      getComputedStyle(this.canvas).getPropertyValue('--color-primary') ?? '#1c3522';
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.strokeStyle = primaryColor;
    this.context.fillStyle = primaryColor;
    this.snake.render(this.context);
  }
}
