export class Snake {
  constructor(position = { x: 0, y: 0 }, args) {
    this.directions = ['up', 'right', 'down', 'left'];
    this.position = position;
    this.tail = [
      { x: position.x - 2, y: position.y },
      { x: position.x - 1, y: position.y },
      { ...position },
    ];
    this.length = this.tail.length;
    this.direction = args?.direction ?? 'right';
    this.speed = args?.speed ?? 1;
    this.segmentSize = args?.segmentSize ?? 16;
    this.cellSize = args?.cellSize ?? 20;
  }
  move() {
    // console.log(this.tail);
    this.tail.shift();
    switch (this.direction) {
      case 'up':
        this.position.y -= this.speed;
        break;
      case 'right':
        this.position.x += this.speed;
        break;
      case 'down':
        this.position.y += this.speed;
        break;
      case 'left':
        this.position.x -= this.speed;
        break;
    }
    this.tail.push({ ...this.position });
    return this.position;
  }
  changeDirection(newDirection) {
    if (!this.directions.includes(newDirection)) return;
    if (newDirection === this.direction) return;
    const currentDirIndex = this.directions.indexOf(this.direction);
    // check if current direction is opposite to new direction
    if (
      newDirection !== this.directions.at((currentDirIndex + 1) % this.directions.length) &&
      newDirection !== this.directions.at(currentDirIndex - 1)
    )
      return;

    // console.log('dir changed from', this.direction, 'to', newDirection);
    this.direction = newDirection;
  }
  grow() {
    this.tail.unshift({ x: 0, y: 0 });
  }
  render(context) {
    const offset = Math.floor((this.cellSize - this.segmentSize) / 2);
    this.tail.forEach((segment, i) => {
      const posX = segment.x * this.cellSize + offset;
      const posY = segment.y * this.cellSize + offset;

      if (i === this.tail.length - 1) {
        renderSnakeHead(context, posX, posY, this.segmentSize, this.segmentSize);
      } else {
        renderSnakeSegment(context, posX, posY, this.segmentSize, this.segmentSize);
      }
    });
  }
}

function renderSnakeSegment(context, x, y, width, height) {
  const offset = Math.round((width / 4) * 0.6);

  context.fillRect(x, y, width, height);
  context.clearRect(x + offset, y + offset, width - 2 * offset, height - 2 * offset);
  context.fillRect(x + 2 * offset, y + 2 * offset, width - 4 * offset, height - 4 * offset);
}

function renderSnakeHead(context, x, y, width, height) {
  const offset = Math.round((width / 4) * 1.2);

  context.fillRect(x, y, width, height);
  context.clearRect(x + offset, y + offset, width - 2 * offset, height - 2 * offset);
}
