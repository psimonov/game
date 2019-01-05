import GameObject from './GameObject';
import Renderable from './Renderable';

import { Vector2 } from './utils/Math';

import playerImg from '../images/player.png';

export default class Player extends GameObject {
  constructor(engine, x, y) {
    super();

    this.engine = engine;

    this.position = new Vector2(x, y);

    this.facing = 0;

    this.renderables = [
      new Renderable(playerImg, 1, 18, 0, 64, 10),
      new Renderable(playerImg, 1, 1,  7, 64, 10),
      new Renderable(playerImg, 1, 27, 7, 64, 10),
      new Renderable(playerImg, 1, 19, 7, 64, 10),
      new Renderable(playerImg, 1, 9,  7, 64, 10),
    ];
  }

  translate(x, y) {
    if (this.engine.getCollision(
      this.position.x + x + this.renderables[0].subWidth / 2,
      this.position.y + y + this.renderables[0].subHeight - 10,
    ) !== false) {
      x = 0;
      y = 0;
    }

    super.translate(x, y);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    this.renderables[this.facing].draw(ctx);

    ctx.restore();

    super.draw(ctx);
  }
}
