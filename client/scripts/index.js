const catscraddle = document.getElementById("catscraddle");
const apuntes = document.getElementById("apuntes");
const ephemeralText = document.getElementById("ephemeral");
const figuresLink = document.getElementById("figuresLink");
const modal = document.getElementById("modal");
const arrow = document.getElementById("arrow");

let image;
let credits;
let figureId;
let counter = 1;

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const shuffledContent = shuffleArray(content);
let textToSave;

const updateContent = () => {
  if (started && isLooping()) {
    ephemeralText.innerHTML = `<p class="ephemeralText">${shuffledContent[counter].text}</p>`;
    catscraddle.src = `./assets/media/hands/${shuffledContent[counter].figure}.jpeg`;
    textToSave = shuffledContent[counter].text;
    apuntes.innerHTML += ` ${textToSave}`;
    image = shuffledContent[counter].image;
    credits = shuffledContent[counter].credits;
    if (image) {
      apuntes.innerHTML += `<figure>
        <img src="./assets/media/images/${image}" alt="Imagen del evento" />
        <figcaption>
          <span class="caption">${credits ? `Crédito: ${credits}` : ""}</span>
        </figcaption>
      </figure>`;
    }
    figureId = shuffledContent[counter].figure;
    figuresLink.href = `/list#${figureId}`;
    figuresLink.onclick = "navigate(event)";

    if (counter % shuffledContent.length !== 0) {
      counter++;
    } else {
      counter = 1;
    }
  }
};

const navigate = (e) => {
  noLoop();
  e.stopPropagation();
};

const openModal = (e) => {
  noLoop();
  modal.style.display = "block";
  e.stopPropagation();
};

const closeModal = () => {
  modal.style.display = "none";
  loop();
};

window.addEventListener("scroll", () => {
  arrow.style.display = "none";
});
