class Obstacles {
  constructor() {
    this.imagesRef = {
      avoids: [
        { src: './img/car-left.png', rllr: 'rl' },
        { src: './img/car-right.png', rllr: 'lr' },
      ],
    };
    this.iniY = {
      rl: [],
      lr: [],
    };
    this.avoids = [];
    this.rides = [];
    this.appearanceFrequency = 40;
  }
  // p5 equiv funcs
  preload() {
    this.imagesRef.avoids.forEach((img, i) => {
      this.imagesRef.avoids[i].img = loadImage(img.src);
      this.imagesRef.avoids[i].checkin = i;
    });
  }
  setup() {}
  draw() {
    if (frameCount % this.appearanceFrequency === 0) {
      this.avoids.push(this.randomPicker('avoids'));
    }

    this.avoids.forEach(function (obstacle) {
      obstacle.draw();
    });
  }
  // game
  randomPicker(which) {
    let randomIndex = Math.floor(Math.random() * this.imagesRef[which].length);
    let randomObstable = this.imagesRef[which][randomIndex];
    let rlORlr = randomObstable.rllr;
    let randomIniYIndex = Math.floor(Math.random() * this.iniY[rlORlr].length);
    let randomIniY = this.iniY[rlORlr][randomIniYIndex];
    randomObstable.iniY = randomIniY;
    let newObstacle = new Obstacle(randomObstable);
    return new Obstacle(newObstacle);
  }
  riverPosition(arr) {
    // only called during setup so initial values can be correctly evaluated
  }
  roadPosition(arr) {
    // only called during setup so initial values can be correctly evaluated
    let offset = 9;

    this.iniY.rl[0] = arr[1] + offset;
    this.iniY.rl[1] = arr[1] + arr[3] / 2 + offset;
    let delta = (this.iniY.rl[1] - this.iniY.rl[0]) / 2;
    this.iniY.rl[2] = this.iniY.rl[0] + delta;
    this.iniY.rl[3] = this.iniY.rl[1] + delta;

    this.iniY.lr[0] = arr[1] + arr[3] + offset;
    this.iniY.lr[1] = arr[1] + arr[3] * 1.5 + offset;
    delta = (this.iniY.lr[1] - this.iniY.lr[0]) / 2;
    this.iniY.lr[2] = this.iniY.lr[0] + delta;
    this.iniY.lr[3] = this.iniY.lr[1] + delta;
  }
  frogPosition(arr) {
    // called at every draw
  }
}
