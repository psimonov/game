import missingImg from '../images/missing.jpg';

export default class Renderable {
  constructor(image = missingImg, scale = 1, startFrame = 0, frameCount = 0, size = 16, speed = 1) {

    this.img = new Image();
    this.img.src = image;

    this.img.onload = () => {
      this.startFrame = startFrame;
      this.frameCount = frameCount;

      this.framesX = Math.floor(this.img.width / size);
      this.framesY = Math.floor(this.img.height / size);

      this.subWidth = size;
      this.subHeight = size;

      this.scale = scale;

      this.frame = startFrame;

      this.speed = speed;

      this.animTime = new Date().getTime();

      this.img.ready = true;
    };
  }

  draw(ctx) {
    if (this.img.ready) {
      const t = new Date().getTime();

      if (t > this.animTime) {
        this.frame++;
        this.animTime = t + 1000 / this.speed;
      }

      if (this.frame > this.startFrame + this.frameCount) {
        this.frame = this.startFrame;
      }

      const posX = (this.frame % this.framesX) * this.subWidth;
      const posY = Math.floor(this.frame / this.framesX) * this.subHeight;

      ctx.drawImage(this.img, posX, posY, this.subWidth, this.subHeight, 0, 0, this.subWidth * this.scale, this.subHeight * this.scale);
    }
  }
}
