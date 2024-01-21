const catscraddle = document.getElementById("catscraddle");
const apuntes = document.getElementById("apuntes");
const ephemeralText = document.getElementById("ephemeral");
const figuresLink = document.getElementById("figuresLink");
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
  if (started) {
    ephemeralText.innerHTML = `<p class="ephemeralText">${shuffledContent[counter].text}</p>`;
    catscraddle.src = `./assets/media/hands/${shuffledContent[counter].figure}.jpeg`;
    textToSave = shuffledContent[counter].text;
    apuntes.innerText += ` ${textToSave}`;
    figuresLink.href = `./pages/list.html#${shuffledContent[counter].figure}`;

    if (counter % shuffledContent.length !== 0) {
      counter++;
    } else {
      counter = 1;
    }
  }
};
