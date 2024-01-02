let dots = [];
let currentIndex = 0;
const ephemeral = document.getElementById("ephemeral");
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
  let canvas = createCanvas(windowWidth - 24, windowHeight - 24);
  canvas.mousePressed(playOscillator);
  osc = new p5.Oscillator("sine");

  dots.push(new Dot(408, 420));
  currentIndex++;

  setTimeout(() => {
    dots.push(new Dot(651, 448));
    ephemeral.innerHTML = `<p class="ephemeralText">Esta constelación recupera momentos</p>`;
    currentIndex++;
  }, 1000);

  setTimeout(() => {
    dots.push(new Dot(710, 712));
    ephemeral.innerHTML = `<p class="ephemeralText">que ocurrieron u ocurrirán</p>`;
    currentIndex++;
  }, 2000);

  setTimeout(() => {
    dots.push(new Dot(mouseX, mouseY));
    ephemeral.innerHTML = `<p class="ephemeralText">en un tiempo aparte</p>`;

    currentPos.x = mouseX;
    currentPos.y = mouseY;
    lastPos.x = mouseX;
    lastPos.y = mouseY;
    currentIndex++;
    started = true;
  }, 3000);
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
