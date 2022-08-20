const letters = "ALLER VOUS FAIRE FOUT BANN DE COUNIA MANMAN A ZOT CE BICOOL KI DI SAA OK 509 971 972 ".split(
    ""
  ),
  windowSize = {},
  container = document.querySelector(".container"),
  loaderMessage = document.querySelector(".loader-message"),
  lettersQty = letters.length,
  pills = Array.from(document.querySelectorAll(".pill"));

let intervalDelay = 1,
  intervalId = null,
  iteration = 0,
  maxIter = 100,
  animationSpeed = 5,
  nbCol = 0,
  colId = [];

// restart the anim when the page is resized
window.addEventListener("resize", () => {
  clearInterval(intervalId);
  launchLoader();
});

// because i use a lot of random integer numbers
const getRandomInt = (max) => Math.floor(Math.random() * max);

function launchLoader() {
  getSize().then(() => {
    // how many columns will I have ?
    nbCol = Math.floor(windowSize.width / 16);

    // now I set my interval and the iteration
    maxIter = nbCol * (getRandomInt(10) + 5);

    intervalDelay = 600 - 56 * Math.log(570 * nbCol + 112);

    intervalId = setInterval(fillThePage, intervalDelay);
  });
}

async function getSize() {
  windowSize.width = window.innerWidth;
  windowSize.height = window.innerHeight;

  return windowSize;
}

// I get the position of my column, I want to fill all the columns. When all the columns are filled, I refilled.
function getColPos() {
  colId.length === 0 &&
    (colId = Array(nbCol)
      .fill()
      .map((_, idx) => idx));
  let valueIdx = getRandomInt(colId.length);
  let colPos = colId[valueIdx];
  colId.splice(valueIdx, 1);

  return colPos;
}

function fillThePage() {
  iteration++;
  iteration === maxIter && pageIsLoaded();

  const newColumn = document.createElement("div");
  newColumn.className = "txt-col";

  const colPos = getColPos();

  animationSpeed = Math.random() * 6 + 5;

  newColumn.style.setProperty("--col-pos", colPos + "rem");
  newColumn.style.setProperty("--animation-speed", animationSpeed + "s");

  let sentence = Array(getRandomInt(15) + 35).fill(0);

  sentence.forEach((letter) => {
    letter = letters[getRandomInt(lettersQty)];

    const newLetter = document.createElement("span");

    newLetter.innerText = letter;
    newColumn.appendChild(newLetter);
  });

  container.appendChild(newColumn);

  setTimeout(() => {
    newColumn.remove();
  }, animationSpeed * 1000);
}

function pageIsLoaded() {
  clearInterval(intervalId);
  setTimeout(() => {
    // the animation has ended
    container.style.opacity = 0;
    container.style.pointerEvents = "none";
    loaderMessage.style.display = "none";
  }, animationSpeed * 1000);
}

launchLoader();

pills.forEach((pill) =>
  pill.addEventListener("click", () => {
    //because there is no prevent default, the page will refresh
  })
);
