// Declaración de variables
let dots = [];
let currentIndex = 0;

let lastPos = { x: 0, y: 0 };
let currentPos = { x: 0, y: 0 };
let dotSize = 8;

let osc, playing, freq, amp;

// Definición de la clase Dot (Punto)
class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Método para conectar un punto con otro
  connect(px, py) {
    stroke(255, 255, 255);
    drawingContext.setLineDash([2,5]);
    line(this.x, this.y, px, py);
  }
  // Método para dibujar un punto
  plot() {
    strokeWeight(1);
    drawingContext.setLineDash([0,0]);
    ellipse(this.x, this.y, dotSize);
  }
  // Método para verificar si un punto está dentro de ciertas coordenadas
  within(px, py) {
    let d = dist(px, py, this.x, this.y);
    let isWithin = d < dotSize;
    return isWithin;
  }
}

let monoSynth;
// Función de configuración al inicio del programa
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(playOscillator);
  osc = new p5.Oscillator("sine");
}
// Función de dibujo
function draw() {
  background(0, 0, 0);
  // Configuración de frecuencia y amplitud del oscilador según posición del mouse
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  // Actualización de frecuencia y amplitud si se está reproduciendo el sonido
  if (playing) {
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
  // Dibujo de los puntos y conexiones entre ellos
  for (let i = 0; i < dots.length; i++) {
    dots[i].plot();
    if (i > 0) {
      dots[i].connect(dots[i - 1].x, dots[i - 1].y);
    }
  }
  // Dibujo de los puntos y conexiones entre ellos
  if (currentIndex == 0) {
    fill(255, 255, 255);
    stroke(255, 255, 255);
    textSize(24);
  } else {
    stroke(255, 255, 255);
    strokeWeight(1);
    drawingContext.setLineDash([2,5]);
    line(lastPos.x, lastPos.y, currentPos.x, currentPos.y);
  }
}
// Función para manejar el redimensionamiento de la ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
  currentPos.x = mouseX;
  currentPos.y = mouseY;
}

function playOscillator() {
  currentPos.x = mouseX;
  currentPos.y = mouseY;
  osc.start();
  playing = true;
}

function mouseReleased() {
  osc.amp(0, 0.5);
  currentPos.x = mouseX;
  currentPos.y = mouseY;
  // Creación de un nuevo punto en las coordenadas actuales del mouse
  dots.push(new Dot(mouseX, mouseY));
  currentIndex++;
  lastPos.x = mouseX;
  lastPos.y = mouseY;
  playing = false;
}
