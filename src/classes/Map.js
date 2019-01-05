import GameObject from './GameObject';
import Renderable from './Renderable';
import Box from './Box';

export default class Map extends GameObject {
  constructor(mapJson, mapImg) {
    super();

    const SCALE = 3;

    this.renderable = new Renderable(mapImg, SCALE, 0, 240, 16, 0); // 240 -> 1000

    this.colliders = [];

    this.data = mapJson;

    this.data.layers.forEach((layer) => {
      if (layer.type === 'objectgroup') {
        layer.objects.forEach((obj) => {
          this.colliders.push(
            new Box(obj.x * SCALE, obj.y * SCALE, obj.width * SCALE, obj.height * SCALE),
          );
        });
      } else if (layer.properties) {
        layer.properties.forEach((prop) => {
          if (prop.type === 'int') {
            if (prop.name === 'depth') {
              layer.depth = prop.value;
            }
          }
        });
      }
    });
  }

  translate(x, y) {
    super.translate(x, y);
  }

  getColliders() {
    return this.colliders;
  }

  drawBackground(ctx) {
    this.data.layers.forEach((layer) => {
      if (layer.type === 'tilelayer') {
        // Will hapens to each layer

        if (layer.depth < 0) {
          let x = 0;
          let y = 0;

          layer.data.forEach((value, index) => {
            this.renderable.frame = value - 1;

            x = index % layer.width;
            y = Math.floor(index / layer.width);

            ctx.save();

            ctx.translate(
              this.position.x + x * this.renderable.subWidth * this.renderable.scale,
              this.position.y + y * this.renderable.subHeight * this.renderable.scale
            );

            this.renderable.draw(ctx);

            ctx.restore();
          });
        }
      }
    });

    super.draw(ctx);
  }

  drawRow(ctx, row) {
    this.data.layers.forEach((layer) => {
      if (layer.type === 'tilelayer') {
        // Will hapens to each layer

        if (layer.depth >= 0 || layer.depth === undefined) {
          let x = 0;
          let y = 0;

          layer.data.forEach((value, index) => {
            if (Math.floor(index / layer.width) === row) {
              this.renderable.frame = value - 1;

              x = index % layer.width;

              ctx.save();

              ctx.translate(
                this.position.x + x * this.renderable.subWidth * this.renderable.scale,
                this.position.y + row * this.renderable.subHeight * this.renderable.scale
              );

              this.renderable.draw(ctx);

              ctx.restore();
            }
          });
        }
      }
    });
  }
}
