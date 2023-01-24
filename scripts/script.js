const enterWord = document.getElementById("enter-word");
const start = document.getElementById("start-btn");
const letterContainer = document.getElementById("letter-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let correctLetter = 0;
let wrongLetters = 0;

let chosenWord = "";

function startGame(ev) {
    ev.preventDefault();
    for (let number = 65; number < 91; ++number) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(number);
        console.log(button);
        button.addEventListener("click", function(event) {checkLetter(event)});
        letterContainer.appendChild(button);
    }
    chosenWord = enterWord.value.toUpperCase();
    let displayDashes = chosenWord.replace(/./g, '<span class="dashes">_</span>');
    userInputSection.innerHTML = displayDashes;
    userInputSection.style.letterSpacing = "10px";
    canvas.classList.remove("hide");
    enterWord.value ="";
    enterWord.disabled = true;
    start.disabled = true;

    let { frameDrawing } = canvasDraw();
    frameDrawing();
}

start.addEventListener("click", startGame);

function checkLetter(event) {
    let splitedWord = chosenWord.split("");
    let dashedWord = document.querySelectorAll('.dashes');
    let clickedButton = event.target;
    if (splitedWord.includes(clickedButton.innerHTML)) {
        splitedWord.forEach((letter, index) => {
            if (letter === clickedButton.innerHTML) {
                dashedWord[index].innerHTML = letter;
                ++correctLetter;
                if (correctLetter === splitedWord.length) {
                    resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    blockAllButtons();
                }
            }
        });
    } else {
        ++wrongLetters;
        drawMan(wrongLetters);
        if (wrongLetters === 6) {
            resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
            blockAllButtons();
        }
    }
    clickedButton.disabled = true;
}

function blockAllButtons() {
    const buttons = document.querySelectorAll('.letters');
    buttons.forEach(button => button.disabled = true);
    newGameContainer.classList.remove("hide");
}

function canvasDraw() {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    const drawLine = (fromX, fromY, toX, toY) => {
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    };

    const head = () => {
        ctx.beginPath();
        ctx.arc(70, 30, 10, 0, Math.PI * 2, true);
        ctx.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    const frameDrawing = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawLine(10, 130, 130, 130);
        drawLine(10, 10, 10, 131);
        drawLine(10, 10, 70, 10);
        drawLine(70, 10, 70, 20);
    };

    return { frameDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
}

function drawMan(wrongLetters) {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasDraw();
    switch (wrongLetters) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        leftArm();
        break;
      case 4:
        rightArm();
        break;
      case 5:
        leftLeg();
        break;
      case 6:
        rightLeg();
        break;
      default:
        break;
    }
  };

  function newGame() {
    newGameContainer.classList.add("hide");
    canvas.classList.add("hide");
    resultText.innerHTML = "";
    userInputSection.innerHTML = "";
    letterContainer.innerHTML = "";
    correctLetter = 0;
    wrongLetters = 0;
    enterWord.disabled = false;
    start.disabled = false;
  }

  newGameButton.addEventListener("click", newGame);