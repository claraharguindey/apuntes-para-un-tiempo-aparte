const catscraddle = document.getElementById("catscraddle");
const apuntes = document.getElementById("apuntes");
const ephemeralText = document.getElementById("ephemeral");
const figuresLink = document.getElementById("figuresLink");
const modal = document.getElementById("modal");
let image;
let credits;
let figureId;
let counter = 1;
let imgCounter = 0;

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
  if (started) {
    ephemeralText.innerHTML = `<p class="ephemeralText">${shuffledContent[counter].text}</p>`;
    catscraddle.src = `./assets/media/hands/${shuffledContent[counter].figure}.jpeg`;
    textToSave = shuffledContent[counter].text;
    apuntes.innerText += ` ${textToSave}`;
    image = shuffledContent[counter].image;
    credits = shuffledContent[counter].credits;
    if (image) {
      if (gallery.childElementCount < 10) {
        gallery.innerHTML += `<figure>
          <img src="./assets/media/images/${image}" alt="Imagen del evento" />
          <figcaption>
            <span class="caption">${credits ? `Crédito: ${credits}` : ""}</span>
          </figcaption>
        </figure>`;
      } else {
        const indexToChange = imgCounter % 10;

        gallery.children
          .item(indexToChange)
          .querySelector("img").src = `./assets/media/images/${image}`;
        gallery.children
          .item(indexToChange)
          .querySelector(".caption").innerText = credits
          ? `Crédito: ${credits}`
          : "";

        imgCounter++;
      }
    }
    figureId = shuffledContent[counter].figure;
    figuresLink.href = `./pages/list.html#${figureId}`;

    if (counter % shuffledContent.length !== 0) {
      counter++;
    } else {
      counter = 1;
      imgCounter = 1;
    }
  }
};

const openModal = () => (modal.style.display = "block");

const closeModal = () => (modal.style.display = "none");
