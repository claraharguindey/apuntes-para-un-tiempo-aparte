const catscraddle = document.getElementById("catscraddle");
const apuntes = document.getElementById("apuntes");
const ephemeralText = document.getElementById("ephemeral");

const content = [
  {
    figure: 1,
    text: "El delirio de querer vivir muchos ritmos en una sola vida.",
    ref: "Instituto del Tiempo Suspendido",
  },
  {
    figure: 1,
    text: "Viene de tan lejos en el pasado e incumbe tanto al futuro que su fundación se encuentra, suspendida, dentro y fuera del tiempo.",
    ref: "Instituto del Tiempo Suspendido",
  },
  {
    figure: 1,
    text: "Hacia la reapropiación del tiempo expropiado, robado, perdido por todas las prácticas que reducen la cronodiversidad constitutiva de los seres.",
    ref: "Instituto del Tiempo Suspendido",
  },
  {
    figure: 1,
    text: "Un agujero negro dentro de internet porque atrae y altera el tiempo de quien la visita.",
    ref: "Instituto del Tiempo Suspendido",
  },
  {
    figure: 1,
    text: "Somos, cada cual, tiempos.",
    ref: "Instituto del Tiempo Suspendido",
  },
];
let handsCounter = 1;
let textCounter = 1;

const updateImage = () => {
  catscraddle.src = `./../assets/media/hands/${handsCounter}.png`;

  if (handsCounter % 2 !== 0) {
    handsCounter++;
  } else {
    handsCounter = 1;
  }
};

const updateContent = () => {
  if (started) {
    updateImage();
    ephemeralText.innerHTML = `<p class="ephemeralText">${content[textCounter].text}</p>`;
    apuntes.innerText += content[textCounter].text;
    if (textCounter % 2 !== 0) {
      textCounter++;
    } else {
      textCounter = 1;
    }
  }
};
