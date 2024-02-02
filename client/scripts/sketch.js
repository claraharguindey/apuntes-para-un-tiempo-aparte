const intro = document.getElementById("intro");
const header = document.getElementById("header");
const apuntesWrapper = document.getElementById("apuntesWrapper");

let dots = [];
let currentIndex = 0;
let lastPos = { x: 0, y: 0 };
let currentPos = { x: 0, y: 0 };
let dotSize = 8;
const savedDots = [];
let started = false;

const FETCH_NODES_TIMEOUT = 24000;
const DASH_LENGTH = 2;
const GAP_LENGTH = 5;

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  connect(px, py) {
    stroke(255);
    drawingContext.setLineDash([DASH_LENGTH, GAP_LENGTH]);
    line(this.x, this.y, px, py);
  }

  plot() {
    stroke(255);
    strokeWeight(1);
    drawingContext.setLineDash([0, 0]);
    ellipse(this.x, this.y, dotSize);
  }

  within(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < dotSize;
  }
}

const setDots = (nodes) => {
  if (nodes.length) {
    showElements();
  }

  nodes.forEach((node, i) => {
    if (i < nodes.length - 5) {
      processNode(node);
    } else {
      setTimeout(() => {
        processNode(node);
      }, (i - (nodes.length - 5)) * 500);
    }
  });
};

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  if (started) {
    canvas.mousePressed(setPosition);
  }

  const introPlayed = sessionStorage.getItem("introPlayed");

  if (introPlayed === "true") {
    header.style.animation = "none";
    started = true;
    fetchConstellation(setDots);
  } else {
    playIntro();
  }
}

function draw() {
  background(0);
  drawDots();
  drawLines();
}

function drawDots() {
  dots.forEach((dot) => dot.plot());
}

function drawLines() {
  stroke(255);
  strokeWeight(1);
  drawingContext.setLineDash([DASH_LENGTH, GAP_LENGTH]);
  line(lastPos.x, lastPos.y, currentPos.x, currentPos.y);
  for (let i = 1; i < dots.length; i++) {
    dots[i].connect(dots[i - 1].x, dots[i - 1].y);
  }
}

function showElements() {
  arrow.style.display = "flex";
  apuntesWrapper.style.display = "flex";
}

function processNode(node) {
  dots.push(new Dot(node.x, node.y));
  dots[dots.length - 1].plot();
  lastPos = { x: node.x, y: node.y };

  if (node.figure) {
    updateFigure(node.figure);
  }

  if (node.text) {
    updateApuntes(node.text);
  }

  if (node.image) {
    updateApuntesWithImage(node.image, node.credits);
  }

  if (dots.length > 1) {
    dots[dots.length - 1].connect(
      dots[dots.length - 2].x,
      dots[dots.length - 2].y
    );
  }
}

function updateFigure(figure) {
  catscraddle.src = `./assets/media/hands/${figure}.jpg`;
  figuresLink.href = `/list#${figure}`;
  figuresLink.onclick = navigate;
}

function updateApuntes(text) {
  apuntes.innerHTML += ` ${text}`;
}

function updateApuntesWithImage(image, credits) {
  apuntes.innerHTML += `<figure>
    <img src="./assets/media/images/${image}" alt="Imagen del evento" />
    <figcaption>
      <span class="caption">${credits ? `> Crédito: ${credits}` : ""}</span>
    </figcaption>
  </figure>`;
}

function setPosition() {
  currentPos.x = mouseX;
  currentPos.y = mouseY;
}

function mouseReleased(event) {
  if (isTriggerUpdate(event)) {
    updateMousePosition();
    addDot();
    updateLastPosition();
    if (dots.length === 1) {
      showElements();
    }
  }
}

function mouseMoved() {
  if (started) {
    currentPos.x = mouseX;
    currentPos.y = mouseY;
  }
}

function isTriggerUpdate(event) {
  const tagName = event.target?.tagName?.toLowerCase();
  const id = event.target?.id;
  return (
    started &&
    isLooping() &&
    tagName !== "button" &&
    tagName !== "a" &&
    id !== "catscraddle"
  );
}

function updateMousePosition() {
  currentPos.x = mouseX;
  currentPos.y = mouseY;
}

function addDot() {
  dots.push(new Dot(mouseX, mouseY));
  currentIndex++;
  addNode({ x: mouseX, y: mouseY });
}

function updateLastPosition() {
  lastPos.x = mouseX;
  lastPos.y = mouseY;
}

async function playIntro() {
  await executeIntroSteps();
  started = true;
  sessionStorage.setItem("introPlayed", true);
  fetchConstellation(setDots);
}

async function executeIntroSteps() {
  for (const step of introSteps) {
    await executeStep(step);
  }
  setTimeout(() => {
    fetchConstellation(setDots);
  }, FETCH_NODES_TIMEOUT);
}

async function executeStep(step) {
  return new Promise((resolve) => {
    setTimeout(() => {
      processIntroStep(step);
      resolve();
    }, step.delay);
  });
}

function processIntroStep(step) {
  dots.push(new Dot(step.position.x, step.position.y));
  intro.innerHTML = `<p class="introText">${step.text}</p>`;
  catscraddle.src = step.src;
  currentIndex++;

  if (step.customPosition) {
    updateCustomPosition(step);
  }
}

function updateCustomPosition(step) {
  if (mouseX === 0 && mouseY === 0) {
    dots.push(new Dot(750, 600));
    lastPos = { x: 750, y: 600 };
  } else {
    dots.push(new Dot(mouseX, mouseY));
    lastPos = { x: mouseX, y: mouseY };
  }
}

const restart = async () => {
  const isSuccess = await removeConstellation("api/constellation");
  if (isSuccess) {
    resetVariables();
    closeModal();
  }
};

function resetVariables() {
  loop();
  dots = [];
  apuntesWrapper.style.display = "none";
  apuntes.innerHTML = "";
  ephemeralText.innerHTML = "";
  arrow.style.display = "none";
}

const addNode = (dot) =>
  saveNode("api/node", {
    ...dot,
    text: textToSave,
    figure: figureId,
    image,
    credits,
  });
