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

const setDots = (nodes) => {
  if (nodes.length) {
    if (arrow.style.display !== "flex") {
      arrow.style.display = "flex";
      apuntesWrapper.style.display = "flex";
    }
  }

  nodes.forEach((node, i) => {
    if (i < nodes.length - 5) {
      dots.push(new Dot(node.x, node.y));
      dots[dots.length - 1].plot();
      if (node.figure) {
        catscraddle.src = `./assets/media/hands/${node.figure}.jpeg`;
        figuresLink.href = `/list#${node.figure}`;
        figuresLink.onclick = "navigate(event)";
      }

      if (node.text) {
        apuntes.innerHTML += ` ${node.text}`;
      }

      if (node?.image) {
        apuntes.innerHTML += `<figure>
          <img src="./assets/media/images/${
            node?.image
          }" alt="Imagen del evento" />
          <figcaption>
            <span class="caption">${
              node?.credits ? `Crédito: ${node.credits}` : ""
            }</span>
          </figcaption>
        </figure>`;
      }

      if (i > 0) {
        dots[dots.length - 1].connect(
          dots[dots.length - 2].x,
          dots[dots.length - 2].y
        );
      }
    } else {
      setTimeout(() => {
        dots.push(new Dot(node.x, node.y));
        dots[dots.length - 1].plot();
        lastPos.x = node.x;
        lastPos.y = node.y;
        currentIndex++;

        if (node.figure) {
          catscraddle.src = `./assets/media/hands/${node.figure}.jpeg`;
          figuresLink.href = `/list#${node.figure}`;
          figuresLink.onclick = "navigate(event)";
        }

        if (node.text) {
          apuntes.innerHTML += ` ${node.text}`;
        }

        if (node?.image) {
          apuntes.innerHTML += `<figure>
            <img src="./assets/media/images/${
              node?.image
            }" alt="Imagen del evento" />
            <figcaption>
              <span class="caption">${
                node?.credits ? `Crédito: ${node.credits}` : ""
              }</span>
            </figcaption>
          </figure>`;
        }

        if (i > 0) {
          dots[dots.length - 1].connect(
            dots[dots.length - 2].x,
            dots[dots.length - 2].y
          );
        }
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
    apuntesWrapper.style.display = "flex";
    header.style.animation = "none";
    started = true;

    fetchConstellation(setDots);
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

function mouseReleased(event) {
  const tagName = event.target?.tagName?.toLowerCase();
  const id = event.target?.id;
  const triggerUpdate =
    isLooping() &&
    tagName !== "button" &&
    tagName !== "a" &&
    id !== "catscraddle";

  if (started && triggerUpdate) {
    setPosition();
    dots.push(new Dot(mouseX, mouseY));
    currentIndex++;
    lastPos.x = mouseX;
    lastPos.y = mouseY;
    addNode({ x: mouseX, y: mouseY });
    if (arrow.style.display !== "flex") {
      arrow.style.display = "flex";
      apuntesWrapper.style.display = "flex";
    }
  }
}

const restart = async () =>
  await removeConstellation("api/constellation").then((isSuccess) => {
    if (isSuccess) {
      loop();

      dots = [];
      apuntesWrapper.style.display = "none";
      apuntes.innerHTML = "";
      ephemeralText.innerHTML = "";
      arrow.style.display = "none";
      closeModal();
    }
  });

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
        }, step.delay || index * 1000);
      })
  );

  setTimeout(() => {
    fetchConstellation(setDots);
  }, (introSteps.length + 1) * 3000);

  await Promise.all(promises);
  started = true;
  sessionStorage.setItem("introPlayed", true);
}

const addNode = (dot) =>
  saveNode("api/node", {
    ...dot,
    text: textToSave,
    figure: figureId,
    image,
    credits,
  });
