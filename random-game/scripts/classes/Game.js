import { Snake } from './Snake.js';
import { Food } from './Food.js';
import { randomFromRange } from '../utils/randomFromRange.js';
export class Game {
  constructor(canvas, playPauseButton, mainLoop, params) {
    this.isPaused = true;
    this.isOver = false;

    this.stopMain = 0;
    this.initialtFrame = 0;
    this.mainLoop = mainLoop;

    this.score = 0;
    this.HTMLScore = document.getElementById('score');
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.playPauseButton = playPauseButton;

    this.segmentSize = params?.segmentSize ?? 16;
    this.cellSize = params?.cellSize ?? 20;
    this.gridSize = {
      width: Math.floor(this.canvas.width / this.cellSize),
      height: Math.floor(this.canvas.height / this.cellSize),
    };

    this.snake = new Snake(
      { x: 10, y: 10 },
      { segmentSize: this.segmentSize, cellSize: this.cellSize }
    );
    this.food = new Food(this._getRandomPosition());

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
  //returns true if snake head collides with bounding box, else returns false
  _detectBoundingBoxCollision() {
    const snakeX = this.snake.position.x;
    const snakeY = this.snake.position.y;

    const outUp = 0 >= snakeY && this.snake.direction === 'up';
    const outRight = snakeX >= this.gridSize.width - 1 && this.snake.direction === 'right';
    const outDown = snakeY >= this.gridSize.height - 1 && this.snake.direction === 'down';
    const outLeft = 0 >= snakeX && this.snake.direction === 'left';

    return outUp || outRight || outDown || outLeft;
  }
  //detects snake's collision with its tail
  _detectSelfCollision() {
    return this.snake.tail.some((elem, i, arr) =>
      arr.length - 1 !== i ? this._checkSamePositions(elem, this.snake.position) : false
    );
  }
  _detectFoodCollision() {
    return this._checkSamePositions(this.snake.position, this.food.position);
  }
  _checkSamePositions(pos1, pos2) {
    return pos1?.x === pos2?.x && pos1?.y === pos2?.y;
  }
  _isInsideSnake(pos) {
    return this.snake.tail.some((elem) => this._checkSamePositions(elem, pos));
  }

  _getRandomPosition() {
    let pos = {
      x: randomFromRange(0, this.gridSize.width - 1),
      y: randomFromRange(0, this.gridSize.height - 1),
    };

    while (this._isInsideSnake(pos)) {
      pos = {
        x: randomFromRange(0, this.gridSize.width - 1),
        y: randomFromRange(0, this.gridSize.height - 1),
      };
    }
    return pos;
  }
  update(tFrame) {
    if (this.isPaused || this.isOver) return;
    const updateRate = 20;
    const frameLength = 16.6666667;
    // console.log('update', tFrame - this.initialtFrame, secondsDigit);
    if (!(Math.floor(tFrame - this.initialtFrame) > frameLength * updateRate)) return;
    if (this._detectBoundingBoxCollision() || this._detectSelfCollision()) {
      this.over();
      return;
    }
    if (this._detectFoodCollision()) {
      this.HTMLScore.textContent = ++this.score;
      this.snake.grow();
      this.food.position = this._getRandomPosition();
    }
    this.snake.move();
    this.initialtFrame = tFrame;
  }
  render() {
    const primaryColor =
      getComputedStyle(this.canvas).getPropertyValue('--color-primary') ?? '#1c3522';
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.strokeStyle = primaryColor;
    this.context.fillStyle = primaryColor;

    this.snake.render(this.context);
    this.food.render(this.context);
  }
}
