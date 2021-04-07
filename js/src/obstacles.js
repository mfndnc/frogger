class Obstacles {
  constructor() {
    this.safeY;
    this.imagesRef = {
      allcars: [
        { src: './img/truck4rl.png', rllr: 'rl', randBoost: 1 },
        { src: './img/truck5rl.png', rllr: 'rl', randBoost: 1 },
        { src: './img/car2rl.png', rllr: 'rl', randBoost: 1 },
        { src: './img/car3rl.png', rllr: 'rl', randBoost: 1 },
        { src: './img/car5rl.png', rllr: 'rl', randBoost: 1 },
        { src: './img/car6rl.png', rllr: 'rl', randBoost: 1 },
        { src: './img/car8rl.png', rllr: 'rl', randBoost: 1 },
        { src: './img/car9rl.png', rllr: 'rl', randBoost: 1 },

        { src: './img/truck4lr.png', rllr: 'lr', randBoost: 1 },
        { src: './img/truck5lr.png', rllr: 'lr', randBoost: 1 },
        { src: './img/car2lr.png', rllr: 'lr', randBoost: 1 },
        { src: './img/car3lr.png', rllr: 'lr', randBoost: 1 },
        { src: './img/car5lr.png', rllr: 'lr', randBoost: 1 },
        { src: './img/car6lr.png', rllr: 'lr', randBoost: 1 },
        { src: './img/car8lr.png', rllr: 'lr', randBoost: 1 },
        { src: './img/car9lr.png', rllr: 'lr', randBoost: 1 },
      ],
      rl: [],
      lr: [],
    };
    this.roadRef = {
      rl: [
        { speed: 3, laneY: 0, randBoost: 1 },
        { speed: 2, laneY: 0, randBoost: 1 },
        { speed: 1.6, laneY: 0, randBoost: 1 },
        { speed: 1.2, laneY: 0, randBoost: 1 },
      ],
      lr: [
        { speed: 1.5, laneY: 0, randBoost: 1 },
        { speed: 1, laneY: 0, randBoost: 1 },
        { speed: 2, laneY: 0, randBoost: 1 },
        { speed: 1.5, laneY: 0, randBoost: 1 },
      ],
    };

    this.traffic = [];
    this.frameTrigger = 20;
  }
  // p5 equiv funcs
  preload() {
    this.imagesRef.allcars.forEach((img, i) => {
      this.imagesRef.allcars[i].img = loadImage(img.src);
      this.imagesRef.allcars[i].checkin = i;
      this.imagesRef[img.rllr].push(img);
    });
  }
  setup() {}
  draw() {
    if (frameCount % this.frameTrigger === 0) {
      // making sure it alternates from left and right
      if (frameCount % (this.frameTrigger * 2) === 0) {
        this.traffic.push(this.randomCarPicker('lr'));
      } else {
        this.traffic.push(this.randomCarPicker('rl'));
      }
    }

    this.traffic.forEach(function (obstacle) {
      obstacle.draw();
    });

    this.traffic = this.traffic.filter(function (obstacle) {
      return obstacle.withinRange();
    });
  }
  // game
  randomCarPicker(rllr) {
    if (rllr) {
      let randomIndex = Math.floor(Math.random() * this.imagesRef[rllr].length);
      let randomObstable = this.imagesRef[rllr][randomIndex];
      let randomIniYIndex = Math.floor(
        Math.random() * this.roadRef[rllr].length
      );
      randomObstable.iniY = this.roadRef[rllr][randomIniYIndex].laneY;
      randomObstable.offsetSpeed = this.roadRef[rllr][randomIniYIndex].speed;

      return new Obstacle(randomObstable);
    }
    return null;
  }
  roadPosition(arr) {
    // only called during setup so initial values can be correctly evaluated
    let offset = 9;
    let delta;

    this.roadRef.rl[0].laneY = arr[1] + offset;
    this.roadRef.rl[1].laneY = arr[1] + arr[3] / 2 + offset;
    delta = (this.roadRef.rl[1].laneY - this.roadRef.rl[0].laneY) / 2;
    this.roadRef.rl[2].laneY = this.roadRef.rl[0].laneY + delta;
    this.roadRef.rl[3].laneY = this.roadRef.rl[1].laneY + delta;

    this.roadRef.lr[0].laneY = arr[1] + arr[3] + offset;
    this.roadRef.lr[1].laneY = arr[1] + arr[3] * 1.5 + offset;
    delta = (this.roadRef.lr[1].laneY - this.roadRef.lr[0].laneY) / 2;
    this.roadRef.lr[2].laneY = this.roadRef.lr[0].laneY + delta;
    this.roadRef.lr[3].laneY = this.roadRef.lr[1].laneY + delta;

    return arr[1];
  }
  setSavePosition(num) {
    this.safeY = num;
  }
  reachedGoal(frog) {
    return frog.y < this.safeY;
  }
  avoidedCollision(frog) {
    for (let obstacle of this.traffic) {
      if (!obstacle.avoidedCollision(frog)) return false;
    }
    return true;
  }
}
