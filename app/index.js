const catscraddle = document.getElementById("catscraddle");
const apuntes = document.getElementById("apuntes");
const ephemeralText = document.getElementById("ephemeral");


let handsCounter = 1;
let textCounter = 1;

const updateImage = () => {
  catscraddle.src = `./../assets/media/hands/${handsCounter}.jpeg`;

  if (handsCounter % 19 !== 0) {
    handsCounter++;
  } else {
    handsCounter = 1;
  }
};

const updateContent = () => {
  if (started) {
    updateImage();
    ephemeralText.innerHTML = `<p class="ephemeralText">${content[textCounter].text}</p>`;
    apuntes.innerText += ` ${content[textCounter].text}`;
    if (textCounter % 19 !== 0) {
      textCounter++;
    } else {
      textCounter = 1;
    }
  }
};
