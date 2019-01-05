import GameObject from './GameObject';
import Input from './Input';
import Box from './Box';
import Map from './Map';

import { Vector2 } from './utils/Math';

export default class Engine {
  constructor() {
    document.body.style.margin = '0px';
    document.body.style.overflow = 'hidden';

    this.canvas = document.createElement('canvas');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.phyDebug = false;

    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');

    this.ctx.imageSmoothingEnabled = false;

    this.lastTime = new Date().getTime();

    this.objs = [];

    this.colliders = [];

    this.update = null;

    this.input = new Input();

    this.camera = {
      position: new Vector2(0, 0)
    };

    window.requestAnimationFrame(this.loop.bind(this));
  }

  getLocalPosition(gameobject) {
    if (gameobject instanceof GameObject) {
      return gameobject.position.minus(this.camera.position);
    }
  }

  addObject(obj) {
    if (obj instanceof GameObject) {
      if (obj instanceof Map) {
        this.map = obj;
      } else {
        this.objs.push(obj);
      }
    } else {
      console.error('Invalid object added. Not GameObject');
    }
  }

  addColliders(colliders) {
    colliders.forEach((collider) => {
      if (collider instanceof Box) {
        this.colliders.push(collider);
      } else {
        console.error('Collider is not a Box');
      }
    });
  }

  getCollision(x, y) {
    let val = false;

    this.colliders.forEach((collider) => {
      let result = collider.isInside(x, y);

      if (result === true) {
        val = collider;
      }
    });

    return val;
  }


  loop() {
    let time = new Date().getTime();

    let dt = (time - this.lastTime) / 1000;

    // Do updates here

    if (this.update) {
      this.update(dt);
    }

    this.objs.forEach((obj) => {
      obj.update(this, dt);
    });

    this.ctx.fillStyle = '#303030';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Do drawing here

    this.ctx.save();

    this.ctx.translate(this.camera.position.x, this.camera.position.y);

    if (this.map) {
      this.map.drawBackground(this.ctx);

      for (let i = 0; i < 20; i++) {
        this.map.drawRow(this.ctx, i);

        this.objs.forEach((obj) => {
          if (obj.position.y + 5 > i * this.map.renderable.scale * this.map.renderable.subHeight) {
            obj.draw(this.ctx);
          }
        });
      }
    }

    if (this.phyDebug) {
      this.colliders.forEach((collider) => {
        collider.draw(this.ctx);
      });
    }

    this.lastTime = time;

    window.requestAnimationFrame(this.loop.bind(this));
  }
}
