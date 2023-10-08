import { Snake } from './Snake.js';
import { Food } from './Food.js';
import { Scoreboard } from './Scoreboard.js';
import { randomFromRange } from '../utils/randomFromRange.js';
export class Game {
  constructor(canvas, startButton, playPauseButton, restartButton, mainLoop, params) {
    this.isPaused = true;
    this.isOver = false;

    this.stopMain = 0;
    this.previousTimeStamp = 0;
    this.mainLoop = mainLoop;
    this.updateRatePerS = 5;

    this.score = 0;
    this.scoreValue = 10;
    this.HTMLScore = document.getElementById('score');
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.playPauseButton = playPauseButton;
    this.restartButton = restartButton;
    this.startButton = startButton;
    this.gameOverModal = document.getElementById('game-over');
    this.startModal = document.getElementById('game-start');

    this.pauseOverlay = document.querySelector('.game__pause');
    this.pauseOverlay.style.display = 'none';
    this.HTMLScoreList = document.getElementById('score-list');

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
    this.scoreboard = new Scoreboard();
    Scoreboard.displayList(this.HTMLScoreList, this.scoreboard.list);
    // snake movement
    document.addEventListener('keyup', (event) => {
      if (this.isPaused || this.isOver) return;
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
    // paly pause and restart button
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space' && !this.isOver) {
        this.playPause();
      }
      if (event.code === 'Enter' && this.isOver) {
        this.start();
      }
    });
    this.playPauseButton.addEventListener('click', () => this.playPause());
    this.restartButton.addEventListener('click', () => this.start());
    this.startButton.addEventListener('click', () => this.start());
    this.startModal.showModal();
  }
  playPause(e) {
    this.isPaused = !this.isPaused;

    this.pauseOverlay.style.display = this.isPaused ? 'flex' : 'none';
    this.playPauseButton.textContent = this.isPaused ? 'play' : 'pause';
  }
  start() {
    this.score = 0;
    this.HTMLScore.textContent = this.score;

    this.snake = new Snake(
      { x: 10, y: 10 },
      { segmentSize: this.segmentSize, cellSize: this.cellSize }
    );

    this.food.position = this._getRandomPosition();

    this.gameOverModal.close();
    this.startModal.close();

    Scoreboard.displayList(this.HTMLScoreList, this.scoreboard.list);

    this.isOver = false;
    this.isPaused = false;
    requestAnimationFrame(this.mainLoop);
  }
  over() {
    // console.log('game over');
    const timestamp = new Date().toJSON();

    if (this.score > 0) {
      this.scoreboard.add({ score: this.score, timestamp });
      this.scoreboard.save();
    }
    this.isOver = true;
    this.gameOverModal.showModal();

    cancelAnimationFrame(this.stopMain);
  }

  update(currentTimeStamp) {
    if (this.isPaused || this.isOver) return;
    const elapsedMS = currentTimeStamp - this.previousTimeStamp;

    const frameLengthMS = (1 / this.updateRatePerS) * 1000;
    if (elapsedMS < frameLengthMS) return;
    if (this._detectBoundingBoxCollision() || this._detectSelfCollision()) {
      this.over();
      return;
    }
    if (this._detectFoodCollision()) {
      this.score += this.scoreValue;
      this.HTMLScore.textContent = this.score;
      this.snake.grow();
      this.food.position = this._getRandomPosition();
    }
    // console.log(elapsedMS);
    this.snake.move();
    this.previousTimeStamp = currentTimeStamp;
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
}
