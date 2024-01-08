const intro = document.getElementById("intro");
const header = document.getElementById("header");
const apuntesWrapper = document.getElementById("apuntesWrapper");
const arrow = document.getElementById("arrow");

let dots = [];
let currentIndex = 0;
let lastPos = { x: 0, y: 0 };
let currentPos = { x: 0, y: 0 };
let dotSize = 8;
let started = false;

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

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  if (started) {
    canvas.mousePressed(setPosition);
  }

  setPosition();
  dots.push(new Dot(308, 332));

  const introPlayed = sessionStorage.getItem("introPlayed");

  if (introPlayed === "true") {
    lastPos.x = 308;
    lastPos.y = 332;
    currentIndex++;
    apuntesWrapper.style.animation = "none";
    header.style.animation = "none";
    started = true;
  } else {
    playIntro();
  }
}

function draw() {
  background(0, 0, 0);

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

function setPosition() {
  currentPos.x = mouseX;
  currentPos.y = mouseY;
}

function mouseReleased() {
  if (started) {
    setPosition();
    dots.push(new Dot(mouseX, mouseY));
    currentIndex++;
    lastPos.x = mouseX;
    lastPos.y = mouseY;
    if (arrow.style.display !== "block") {
      arrow.style.display = "block";
    }
  }
}

const restart = () => (dots = []);

const introSteps = [
  {
    text: "Aquí recogemos momentos",
    src: "./assets/media/intro/1.jpeg",
    position: { x: 426, y: 415 },
  },
  {
    text: "que tuvieron lugar",
    src: "./assets/media/intro/2.jpeg",
    position: { x: 622, y: 371 },
    delay: 3000,
  },
  {
    text: "en un tiempo aparte.",
    src: "./assets/media/intro/3.jpeg",
    position: { x: 715, y: 428 },
    delay: 6000,
  },
  {
    text: "De forma colectiva e infinita",
    src: "./assets/media/intro/4.jpeg",
    position: { x: 830, y: 376 },
    delay: 9000,
  },
  {
    text: "dibujamos una línea del tiempo",
    src: "./assets/media/intro/5.jpeg",
    position: { x: 851, y: 400 },
    delay: 12000,
  },
  {
    text: "que se ha vuelto constelación",
    src: "./assets/media/intro/6.jpeg",
    position: { x: 715, y: 428 },
    delay: 15000,
  },
  {
    text: "para pensar y rehacer",
    src: "./assets/media/intro/7.jpeg",
    position: { x: 735, y: 468 },
    delay: 18000,
  },
  {
    text: "Apuntes para un tiempo aparte.",
    src: "./assets/media/intro/1.jpeg",
    position: { x: 735, y: 468 },
    customPosition: true,
    delay: 21000,
  },
];

const playIntro = () => {
  introSteps.forEach((step, index) => {
    setTimeout(() => {
      dots.push(new Dot(step.position.x, step.position.y));
      intro.innerHTML = `<p class="introText">${step.text}</p>`;
      catscraddle.src = step.src;
      currentIndex++;

      if (step.customPosition) {
        dots.push(new Dot(mouseX, mouseY));
        setPosition();
        lastPos.x = mouseX;
        lastPos.y = mouseY;
        started = true;
        sessionStorage.setItem("introPlayed", true);
      }
    }, step.delay || index * 3000);
  });
};
