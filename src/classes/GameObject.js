import Renderable from './Renderable';
import Box from './Box';

import { Vector2 } from './utils/Math';

export default class GameObject {
  constructor() {
    this.position = new Vector2(0, 0);
    this.lastPosition = this.position.copy();
    this.children = [];
  }

  translate(x, y) {
    this.position.x += x;
    this.position.y += y;
  }

  addChild(child) {
    this.children.push(child);
  }

  update(engine, dt) {
    this.children.forEach((child) => {
      child.update(engine, dt);
    })
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    this.children.forEach((child) => {
      if (child instanceof GameObject) {
        child.draw(ctx);
      }

      if (child instanceof Renderable) {
        child.draw(ctx);
      }

      if (child instanceof Box) {
        child.draw(ctx);
      }
    });

    ctx.restore();

    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;
  }
}
