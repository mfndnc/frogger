class Obstacles {
  constructor() {
    this.imagesRef = {
      avoids: [
        { src: './img/car-left.png', rllr: 'rl', name: 'car1l' },
        { src: './img/car-right.png', rllr: 'lr', name: 'car1r' },
        { src: './img/car2-left.png', rllr: 'rl', name: 'car2l' },
        { src: './img/car2-right.png', rllr: 'lr', name: 'car2r' },
      ],
    };
    this.offsetSpeed = {
      rl: [3, 2, 1.6, 1.2],
      lr: [1.5, 1, 2, 1.5],
    };
    this.iniYs = {
      rl: [],
      lr: [],
    };
    this.avoids = [];
    this.rides = [];
    this.appearanceFrequency = 15;
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

    this.avoids = this.avoids.filter(function (obstacle) {
      return obstacle.withinRange();
    });
  }
  // game
  randomPicker(which, rllr) {
    let randomIndex = Math.floor(Math.random() * this.imagesRef[which].length);
    let randomObstable = this.imagesRef[which][randomIndex];
    let rlORlr = rllr ? rllr : randomObstable.rllr;
    let randomIniYIndex = Math.floor(Math.random() * this.iniYs[rlORlr].length);
    randomObstable.iniY = this.iniYs[rlORlr][randomIniYIndex];
    randomObstable.offsetSpeed = this.offsetSpeed[rlORlr][randomIniYIndex];

    return new Obstacle(randomObstable);
  }
  riverPosition(arr) {
    // only called during setup so initial values can be correctly evaluated
  }
  roadPosition(arr) {
    // only called during setup so initial values can be correctly evaluated
    let offset = 9;

    this.iniYs.rl[0] = arr[1] + offset;
    this.iniYs.rl[1] = arr[1] + arr[3] / 2 + offset;
    let delta = (this.iniYs.rl[1] - this.iniYs.rl[0]) / 2;
    this.iniYs.rl[2] = this.iniYs.rl[0] + delta;
    this.iniYs.rl[3] = this.iniYs.rl[1] + delta;

    this.iniYs.lr[0] = arr[1] + arr[3] + offset;
    this.iniYs.lr[1] = arr[1] + arr[3] * 1.5 + offset;
    delta = (this.iniYs.lr[1] - this.iniYs.lr[0]) / 2;
    this.iniYs.lr[2] = this.iniYs.lr[0] + delta;
    this.iniYs.lr[3] = this.iniYs.lr[1] + delta;

    // remove after. just here for testing
    //this.avoids.push(this.randomPicker('avoids', 'lr'));
  }
  avoidedCollision(frog) {
    for (let obstacle of this.avoids) {
      if (!obstacle.avoidedCollision(frog)) return false;
    }
    return true;
  }
}
