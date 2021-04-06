class Obstacles {
  constructor() {
    this.safeY;
    this.imagesRef = {
      avoids: [
        { src: './img/truck4rl.png', rllr: 'rl', name: 'truck4rl' },
        { src: './img/truck5rl.png', rllr: 'rl', name: 'truck5rl' },
        { src: './img/car2rl.png', rllr: 'rl', name: 'car2rl' },
        { src: './img/car3rl.png', rllr: 'rl', name: 'car3rl' },
        { src: './img/car5rl.png', rllr: 'rl', name: 'car5rl' },
        { src: './img/car6rl.png', rllr: 'rl', name: 'car6rl' },
        { src: './img/car8rl.png', rllr: 'rl', name: 'car8rl' },
        { src: './img/car9rl.png', rllr: 'rl', name: 'car9rl' },

        { src: './img/truck4lr.png', rllr: 'lr', name: 'truck4lr' },
        { src: './img/truck5lr.png', rllr: 'lr', name: 'truck5lr' },
        { src: './img/car2lr.png', rllr: 'lr', name: 'car2lr' },
        { src: './img/car3lr.png', rllr: 'lr', name: 'car3lr' },
        { src: './img/car5lr.png', rllr: 'lr', name: 'car5lr' },
        { src: './img/car6lr.png', rllr: 'lr', name: 'car6lr' },
        { src: './img/car8lr.png', rllr: 'lr', name: 'car8lr' },
        { src: './img/car9lr.png', rllr: 'lr', name: 'car9lr' },
      ],
    };
    this.avoidslrrl = {
      rl: [],
      lr: [],
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
    this.appearanceFrequency = 20;
  }
  // p5 equiv funcs
  preload() {
    this.imagesRef.avoids.forEach((img, i) => {
      this.imagesRef.avoids[i].img = loadImage(img.src);
      this.imagesRef.avoids[i].checkin = i;
    });
  }
  setup() {
    this.imagesRef.avoids.forEach((img) => {
      this.avoidslrrl[img.rllr].push(img);
    });
  }
  draw() {
    if (frameCount % this.appearanceFrequency === 0) {
      // making sure it alternates from left and right
      if (frameCount % (this.appearanceFrequency * 2) === 0) {
        this.avoids.push(this.randomPicker('avoids', 'lr'));
      } else {
        this.avoids.push(this.randomPicker('avoids', 'rl'));
      }
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
    if (which == 'avoids' && rllr) {
      //console.log('randomPicker option1');
      //console.log('randomPicker', this.avoidslrrl[rllr]);

      let randomIndex = Math.floor(
        Math.random() * this.avoidslrrl[rllr].length
      );
      let randomObstable = this.avoidslrrl[rllr][randomIndex];
      let randomIniYIndex = Math.floor(Math.random() * this.iniYs[rllr].length);
      randomObstable.iniY = this.iniYs[rllr][randomIniYIndex];
      randomObstable.offsetSpeed = this.offsetSpeed[rllr][randomIniYIndex];

      return new Obstacle(randomObstable);
    }

    //// **** basic if all else fails
    //console.log('randomPicker option2');
    let randomIndex = Math.floor(Math.random() * this.imagesRef[which].length);
    let randomObstable = this.imagesRef[which][randomIndex];
    let rlORlr = randomObstable.rllr;
    let randomIniYIndex = Math.floor(Math.random() * this.iniYs[rlORlr].length);
    randomObstable.iniY = this.iniYs[rlORlr][randomIniYIndex];
    randomObstable.offsetSpeed = this.offsetSpeed[rlORlr][randomIniYIndex];
    // console.log('randomPicker', randomObstable);
    return new Obstacle(randomObstable);
  }
  riverPosition(arr) {
    // only called during setup so initial values can be correctly evaluated
    return 0;
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
    this.avoids.push(this.randomPicker('avoids', 'lr'));
    return arr[1];
  }
  setSavePosition(num) {
    this.safeY = num;
  }
  reachedGoal(frog) {
    return frog.y < this.safeY;
  }
  avoidedCollision(frog) {
    for (let obstacle of this.avoids) {
      if (!obstacle.avoidedCollision(frog)) return false;
    }
    return true;
  }
}
