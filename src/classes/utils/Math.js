export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  minus(otherVec) {
    return new Vector2(this.x - otherVec.x, this.y - otherVec.y)
  }

  add(otherVec) {
    return new Vector2(this.x + otherVec.x, this.y + otherVec.y)
  }
}
