let dots = [];
let currentIndex = 0;
const intro = document.getElementById("intro");
let lastPos = { x: 0, y: 0 };
let currentPos = { x: 0, y: 0 };
let dotSize = 8;

let osc, playing, freq, amp;

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  connect(px, py) {
    stroke(255, 255, 255);
    drawingContext.setLineDash([2, 5]);
    line(this.x, this.y, px, py);
  }

  plot() {
    strokeWeight(1);
    drawingContext.setLineDash([0, 0]);
    ellipse(this.x, this.y, dotSize);
  }

  within(px, py) {
    let d = dist(px, py, this.x, this.y);
    let isWithin = d < dotSize;
    return isWithin;
  }
}

let monoSynth;
let started = false;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  if (started) {
    canvas.mousePressed(playOscillator);
  }
  osc = new p5.Oscillator("sine");
  currentPos.x = mouseX;
  currentPos.y = mouseY;
  dots.push(new Dot(308, 332));
  intro.innerHTML = `<p class="introText">Aquí recogemos momentos</p>`;
  catscraddle.src = `./assets/media/intro/1.jpeg`;
  currentIndex++;

  setTimeout(() => {
    dots.push(new Dot(426, 415));
    intro.innerHTML = `<p class="introText">que tuvieron lugar</p>`;
    catscraddle.src = `./assets/media/intro/2.jpeg`;
    currentIndex++;
  }, 3000);

  setTimeout(() => {
    dots.push(new Dot(622, 371));
    intro.innerHTML = `<p class="introText">en un tiempo aparte.</p>`;
    catscraddle.src = `./assets/media/intro/3.jpeg`;

    currentIndex++;
  }, 6000);

  setTimeout(() => {
    dots.push(new Dot(715, 428));
    intro.innerHTML = `<p class="introText">De forma aleatoria e infinita</p>`;
    catscraddle.src = `./assets/media/intro/4.jpeg`;

    currentIndex++;
  }, 9000);

  setTimeout(() => {
    dots.push(new Dot(830, 376));
    intro.innerHTML = `<p class="introText">dibujamos colectivamente</p>`;
    catscraddle.src = `./assets/media/intro/5.jpeg`;

    currentIndex++;
  }, 12000);

  setTimeout(() => {
    dots.push(new Dot(851, 400));
    intro.innerHTML = `<p class="introText">una posible línea del tiempo</p>`;
    catscraddle.src = `./assets/media/intro/6.jpeg`;

    currentIndex++;
  }, 15000);

  setTimeout(() => {
    dots.push(new Dot(865, 474));
    intro.innerHTML = `<p class="introText">que se ha vuelto constelación.</p>`;
    catscraddle.src = `./assets/media/intro/7.jpeg`;
    currentIndex++;
  }, 18000);

  setTimeout(() => {
    dots.push(new Dot(715, 428));
    intro.innerHTML = `<p class="introText">para pensar y rehacer</p>`;
    catscraddle.src = `./assets/media/intro/8.jpeg`;
    currentIndex++;
  }, 21000);

  setTimeout(() => {
    dots.push(new Dot(mouseX, mouseY));
    intro.innerHTML = `<p class="introText"> Apuntes para un tiempo aparte.</p>`;
    catscraddle.src = `./assets/media/intro/1.jpeg`;
    currentPos.x = mouseX;
    currentPos.y = mouseY;
    lastPos.x = mouseX;
    lastPos.y = mouseY;
    currentIndex++;
    started = true;
  }, 24000);
}

function draw() {
  background(0, 0, 0);
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  if (playing) {
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].plot();
    if (i > 0) {
      dots[i].connect(dots[i - 1].x, dots[i - 1].y);
    }
  }
  if (currentIndex == 0) {
    fill(255, 255, 255);
    stroke(255, 255, 255);
    textSize(24);
  } else {
    stroke(255, 255, 255);
    strokeWeight(1);
    drawingContext.setLineDash([2, 5]);
    line(lastPos.x, lastPos.y, currentPos.x, currentPos.y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
  if (started) {
    currentPos.x = mouseX;
    currentPos.y = mouseY;
  }
}

function playOscillator() {
  currentPos.x = mouseX;
  currentPos.y = mouseY;
  osc.start();
  playing = true;
}

function mouseReleased() {
  if (started) {
    osc.amp(0, 0.5);
    currentPos.x = mouseX;
    currentPos.y = mouseY;
    console.log({mouseX, mouseY})
    dots.push(new Dot(mouseX, mouseY));
    currentIndex++;
    lastPos.x = mouseX;
    lastPos.y = mouseY;
    playing = false;
  }
}

const restart = () => {
  dots = [];
};
