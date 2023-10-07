export class Food {
  constructor(position = { x: 0, y: 0 }, params) {
    this.position = position;
    this.size = params?.size ?? 6;
    this.cellSize = params?.cellSize ?? 20;
  }
  render(context) {
    const offset = Math.floor((this.cellSize - this.size) / 2);
    const posX = this.position.x * this.cellSize + offset;
    const posY = this.position.y * this.cellSize + offset;
    context.moveTo(posX, posY);
    context.fillRect(posX, posY, this.size, this.size);
    // context.arc(posX, posY, this.size, 0, Math.PI * 2);
    // context.fill();
  }
}
