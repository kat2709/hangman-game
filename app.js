const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const questionnaire = [
  {
    question: "It is green and it has sharp teeth. It lives in a river",
    word: "crocodile",
  },
  {
    question: "Her nice tail is bushy and the color of this animal is red",
    word: "fox",
  },
  {
    question:
      "In winter it is white, in summer it is grey, it likes carrots and cabbage",
    word: "hare",
  },
  {
    question: "It is small and green. It can jump well. It lives in a swamp",
    word: "frog",
  },
  {
    question: "It is brown. It lives in the forest. It likes to eat honey.",
    word: "bear",
  },
  {
    question:
      "It has a long neck and a lot of spots. It likes to eat green leaves.",
    word: "giraffe",
  },
  {
    question: "It is small and shy. It has eight legs. It eats bugs.",
    word: "spider",
  },
  {
    question:
      "It is black and white, it's a kind of bear. It is very nice and funny. It lives in China.",
    word: "panda",
  },
  {
    question: "It can swim and dive. It can quack.",
    word: "duck",
  },
  {
    question: "It has little curly tail and it is pink.",
    word: "pig",
  },
  {
    question: "It is very colorful bird. It can speak.",
    word: "parrot",
  },
  {
    question: "It is a farm animal and it gives milk.",
    word: "cow",
  },
  {
    question: "It is farm bird. It likes worms and bugs. It gives eggs.",
    word: "chicken",
  },
];

let currentQuestion = "";
let currentAnswer = "";
let count = 0;
let countLetter = 0;
let resultGame = "";
let randomNumber = Math.floor(Math.random() * questionnaire.length);

function generateQustion() {
  currentQuestion = questionnaire[randomNumber].question;
  currentAnswer = questionnaire[randomNumber].word;
  console.log("Secter word is " + `"${currentAnswer}"`);
}

function drawBoard() {
  const main = document.createElement("main");
  main.classList.add("page");
  document.body.appendChild(main);

  // gallows section
  const gallowsPart = document.createElement("section");
  gallowsPart.classList.add("gallows-part");
  main.appendChild(gallowsPart);

  const gallows = document.createElement("div");
  gallows.classList.add("gallows");
  gallowsPart.appendChild(gallows);

  const head = document.createElement("div");
  head.classList.add("head", "hide-body-part");
  gallows.appendChild(head);

  const corpus = document.createElement("div");
  corpus.classList.add("corpus", "hide-body-part");
  gallows.appendChild(corpus);

  const leftArm = document.createElement("div");
  leftArm.classList.add("left-arm", "hide-body-part");
  gallows.appendChild(leftArm);

  const rightArm = document.createElement("div");
  rightArm.classList.add("right-arm", "hide-body-part");
  gallows.appendChild(rightArm);

  const leftLeg = document.createElement("div");
  leftLeg.classList.add("left-leg", "hide-body-part");
  gallows.appendChild(leftLeg);

  const rightLeg = document.createElement("div");
  rightLeg.classList.add("right-leg", "hide-body-part");
  gallows.appendChild(rightLeg);

  const header = document.createElement("h1");
  header.innerHTML = "hangman game";
  gallowsPart.appendChild(header);

  // quiz section
  const quizPart = document.createElement("section");
  quizPart.classList.add("quiz-part");
  main.appendChild(quizPart);

  // draw secret word
  const secretWord = document.createElement("div");
  secretWord.classList.add("secret-word");
  quizPart.appendChild(secretWord);
  for (let i = 0; i < currentAnswer.length; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", i);
    secretWord.appendChild(cell);
  }

  // draw hint
  const hint = document.createElement("div");
  hint.classList.add("question");
  hint.innerHTML = "Hint:" + " ";
  const hintSpan = document.createElement("span");
  hintSpan.classList.add("hint-span");
  hintSpan.innerHTML = `${currentQuestion}`;
  hint.appendChild(hintSpan);
  quizPart.appendChild(hint);

  // draw incorrect attempts
  const incorrectAttempts = document.createElement("div");
  incorrectAttempts.classList.add("incorrect-attempts");
  incorrectAttempts.innerHTML = "Incorrect guesses:" + " ";
  const incorrectCount = document.createElement("span");
  incorrectCount.classList.add("count-span");
  incorrectCount.innerHTML = `${count}` + " " + "/" + " " + "6";
  incorrectAttempts.appendChild(incorrectCount);
  quizPart.appendChild(incorrectAttempts);

  // draw keyboard
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  quizPart.appendChild(keyboard);

  for (let i = 0; i < alphabet.length; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    let idx = alphabet[i];
    square.setAttribute("id", idx);
    square.innerHTML = idx;
    keyboard.appendChild(square);
  }
}

function resultGameWindow() {
  const squares = document.querySelectorAll(".square");
  const finishGameWindow = document.createElement("dialog");
  finishGameWindow.classList.add("finish-game");
  finishGameWindow.setAttribute("id", "dialogId");
  document.body.appendChild(finishGameWindow);

  const result = document.createElement("h2");
  result.innerHTML = `${resultGame}`;
  finishGameWindow.appendChild(result);

  const keyWord = document.createElement("h3");
  keyWord.innerHTML = "Secret word is" + " " + `"${currentAnswer}"` + "!";
  finishGameWindow.appendChild(keyWord);

  const playAgain = document.createElement("button");
  playAgain.classList.add("play-btn");
  playAgain.innerHTML = "play again";
  finishGameWindow.appendChild(playAgain);
  document.body.style.backgroundColor = "#292828";
  document.body.style.opacity = "0.2";
  finishGameWindow.showModal();

  playAgain.addEventListener("click", () => {
    document.body.removeChild(finishGameWindow);
    document.body.style.backgroundColor = "white";
    document.body.style.opacity = "1";
    document.addEventListener("keydown", physicalKeyboards);
    count = 0;
    countLetter = 0;
    gallows();
    if (randomNumber === questionnaire.length - 1) {
      randomNumber = 0;
      generateQustion();
    } else {
      randomNumber++;
      generateQustion();
    }
    const incorrectCount = document.querySelector(".count-span");
    incorrectCount.innerHTML = `${count}` + " " + "/" + " " + "6";
    const hintSpan = document.querySelector(".hint-span");
    hintSpan.innerHTML = `${currentQuestion}`;

    const secretWord = document.querySelector(".secret-word");
    secretWord.innerHTML = "";
    for (let i = 0; i < currentAnswer.length; i++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("id", i);
      secretWord.appendChild(cell);
    }
  });

  keyboardSquares.forEach((btn) =>
    btn.addEventListener("click", virtualKeyboard)
  );
  squares.forEach((btn) => btn.classList.remove("used-square"));
}

function gallows() {
  const head = document.querySelector(".head");
  const corpus = document.querySelector(".corpus");
  const leftArm = document.querySelector(".left-arm");
  const rightArm = document.querySelector(".right-arm");
  const leftLeg = document.querySelector(".left-leg");
  const rightLeg = document.querySelector(".right-leg");
  if (count === 1) {
    head.classList.remove("hide-body-part");
    removeAllState()
    head.classList.add("first-state");
  }
  if (count === 2) {
    corpus.classList.remove("hide-body-part");
    removeAllState()
    head.classList.add("second-state");
  }
  if (count === 3) {
    leftArm.classList.remove("hide-body-part");
    removeAllState()
    head.classList.add("third-state");
  }
  if (count === 4) {
    rightArm.classList.remove("hide-body-part");
    removeAllState()
    head.classList.add("fourth-state");
  }
  if (count === 5) {
    leftLeg.classList.remove("hide-body-part");
    removeAllState()
    head.classList.add("fifth-state");
  }
  if (count === 6) {
    rightLeg.classList.remove("hide-body-part");
    removeAllState()
    head.classList.add("sixth-state");
    keyboardSquares.forEach((btn) =>
      btn.removeEventListener("click", virtualKeyboard)
    );
    document.removeEventListener("keydown", physicalKeyboards);
    resultGame = "You lose!";
    setTimeout(() => {
      resultGameWindow();
    }, "500");
  }
  if (count === 0) {
    removeAllState()
    head.classList.add("hide-body-part");
    corpus.classList.add("hide-body-part");
    corpus.classList.add("hide-body-part");
    rightArm.classList.add("hide-body-part");
    leftArm.classList.add("hide-body-part");
    leftLeg.classList.add("hide-body-part");
    rightLeg.classList.add("hide-body-part");
  }
}

generateQustion();
drawBoard();

const keyboardSquares = document.querySelectorAll(".square");
function physicalKeyboards(e) {
  let item = e.code.toLowerCase();
  let key = item[3];
  if (item.length !== 4) {
    key = item;
  }
  const squareCurrent = document.getElementById(`${key}`);
  if (
    !alphabet.includes(key) ||
    squareCurrent.classList.contains("used-square")
  ) {
    return;
  }
  for (let i = 0; i < currentAnswer.length; i++) {
    if (currentAnswer[i] === key) {
      let openCell = document.getElementById(`${i}`);
      openCell.innerHTML = `${currentAnswer[i]}`;
      openCell.classList.add("open-cell");
      squareCurrent.classList.add("used-square");
      countLetter++;
      if (countLetter === currentAnswer.length) {
        removeAllState()
        const head = document.querySelector(".head");
        head.classList.add("happy");
        resultGame = "You win!";
        keyboardSquares.forEach((btn) =>
          btn.removeEventListener("click", virtualKeyboard)
        );
        document.removeEventListener("keydown", physicalKeyboards);
        setTimeout(() => {
          resultGameWindow();
        }, "500");
        return;
      }
    }
  }
  if (!currentAnswer.includes(key)) {
    if (count < 6) {
      count++;
      const countSpan = document.querySelector(".count-span");
      countSpan.innerHTML = `${count}` + " " + "/" + " " + "6";
      squareCurrent.classList.add("used-square");
      gallows();
    }
  }
}

function virtualKeyboard(e) {
  let squareId = e.target.id;
  const squareCurrent = document.getElementById(String(squareId));
  squareCurrent.classList.add("used-square");

  for (let i = 0; i < currentAnswer.length; i++) {
    if (currentAnswer[i] === e.target.id) {
      let openCell = document.getElementById(String(i));
      openCell.innerHTML = String(currentAnswer[i]);
      openCell.classList.add("open-cell");
      countLetter++;
      if (countLetter === currentAnswer.length) {
        removeAllState()
        const head = document.querySelector(".head");
        head.classList.add("happy");
        resultGame = "You win!";
        keyboardSquares.forEach((btn) =>
          btn.removeEventListener("click", virtualKeyboard)
        );
        document.removeEventListener("keydown", physicalKeyboards);
        setTimeout(() => {
          resultGameWindow();
        }, "500");
        return;
      }
    }
  }
  if (!currentAnswer.includes(e.target.id)) {
    if (count < 6) {
      count++;
      const countSpan = document.querySelector(".count-span");
      countSpan.innerHTML = `${count} / 6`;
      gallows();
    }
  }
}

document.addEventListener("keydown", physicalKeyboards);
keyboardSquares.forEach((btn) =>
  btn.addEventListener("click", virtualKeyboard)
);


function removeAllState(){
  const head=document.querySelector(".head")
  head.classList.remove("first-state");
  head.classList.remove("second-state");
  head.classList.remove("third-state");
  head.classList.remove("fourth-state");
  head.classList.remove("fifth-state");
  head.classList.remove("sixth-state");
  head.classList.remove("happy");
}