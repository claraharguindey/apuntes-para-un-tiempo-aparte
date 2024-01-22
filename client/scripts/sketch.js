const intro = document.getElementById("intro");
const header = document.getElementById("header");
const apuntesWrapper = document.getElementById("apuntesWrapper");
const arrow = document.getElementById("arrow");

let dots = [];
let currentIndex = 0;
let lastPos = { x: 0, y: 0 };
let currentPos = { x: 0, y: 0 };
let dotSize = 8;
const savedDots = [];
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

const setNodes = (nodes) => {
  nodes.map((node, i) => {
    setTimeout(() => {
      dots.push(new Dot(node.x, node.y));
      dots[i].plot();
      apuntes.innerText += ` ${node.text}`;
      if (i > 0) {
        dots[i].connect(dots[i - 1].x, dots[i - 1].y);
      }
    }, i * 200);
  });
};

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
    fetchConstellation(setNodes);
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
    addNode({ x: mouseX, y: mouseY });
    if (arrow.style.display !== "block") {
      arrow.style.display = "block";
    }
  }
}

const restart = async () =>
  await removeConstellation("http://localhost:3000/constellation").then(
    (isSuccess) => {
      if (isSuccess) {
        dots = [];
        apuntes.innerText = "";
        ephemeralText.innerHTML = "";
      }
    }
  );

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

async function playIntro() {
  const promises = introSteps.map(
    (step, index) =>
      new Promise((resolve) => {
        setTimeout(() => {
          dots.push(new Dot(step.position.x, step.position.y));
          intro.innerHTML = `<p class="introText">${step.text}</p>`;
          catscraddle.src = step.src;
          currentIndex++;

          if (step.customPosition) {
            if (mouseX === 0 && mouseY === 0) {
              dots.push(new Dot(750, 600));
            } else {
              dots.push(new Dot(mouseX, mouseY));
            }
            setPosition();
            if (mouseX === 0 && mouseY === 0) {
              lastPos.x = 750;
              lastPos.y = 600;
            } else {
              lastPos.x = mouseX;
              lastPos.y = mouseY;
            }
          }
          resolve();
        }, step.delay || index * 3000);
      })
  );

  await Promise.all(promises);
  fetchConstellation(setNodes);
  started = true;
  sessionStorage.setItem("introPlayed", true);
}

const addNode = (dot) =>
  saveNode("http://localhost:3000/node", {
    ...dot,
    text: textToSave,
  });