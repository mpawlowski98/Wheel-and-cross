let playerTurn = "x";
let moves = 0;
let isGameOver = false;
const span = document.getElementsByTagName("span");
const restartButton =
  '<button onclick="playAgain()"><svg fill="#ffff00" height="30px" width="30px" version="1.1" id="Layer_1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M511.957,185.214L512,15.045l-67.587,67.587l-7.574-7.574c-48.332-48.332-112.593-74.95-180.946-74.95C114.792,0.107,0,114.901,0,256s114.792,255.893,255.893,255.893S511.785,397.099,511.785,256h-49.528c0,113.79-92.575,206.365-206.365,206.365S49.528,369.79,49.528,256S142.103,49.635,255.893,49.635c55.124,0,106.947,21.467,145.925,60.445l7.574,7.574l-67.58,67.58L511.957,185.214z"/></g></g></svg></button>';

function play(y) {
  if (y.dataset.player === "none" && !isGameOver) {
    y.innerHTML = playerTurn;
    y.dataset.player = playerTurn;
    moves++;
    if (playerTurn === "x") {
      playerTurn = "o";
    } else if (playerTurn === "o") {
      playerTurn = "x";
    }
  }

  checkWinner(1, 2, 3);
  checkWinner(4, 5, 6);
  checkWinner(7, 8, 9);
  checkWinner(1, 4, 7);
  checkWinner(2, 5, 8);
  checkWinner(3, 6, 9);
  checkWinner(1, 5, 9);
  checkWinner(3, 5, 7);

  /* No Winner */

  if (moves === 9 && !isGameOver) {
    draw();
  }
}

function checkWinner(a, b, c) {
  a--;
  b--;
  c--;
  if (
    span[a].dataset.player === span[b].dataset.player &&
    span[b].dataset.player === span[c].dataset.player &&
    span[a].dataset.player === span[c].dataset.player &&
    (span[a].dataset.player === "x" || span[a].dataset.player === "o") &&
    !isGameOver
  ) {
    span[a].parentNode.classList.add("activeBox");
    span[b].parentNode.classList.add("activeBox");
    span[c].parentNode.classList.add("activeBox");
    gameOver(a);
  }
}

function playAgain() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {
    alert.parentNode.removeChild(alert);
  });
  resetGame();
  isGameOver = false;
  for (let k = 0; k < span.length; k++) {
    span[k].parentNode.classList.remove("activeBox");
  }
}

function resetGame() {
  for (let i = 0; i < span.length; i++) {
    span[i].dataset.player = "none";
    span[i].innerHTML = "&nbsp;";
  }
  playerTurn = "x";
}

function gameOver(a) {
  const gameOverAlertElement =
    "<b>GAME OVER </b><br><br> Player " +
    span[a].dataset.player.toUpperCase() +
    " Win !!! <br><br>" +
    restartButton;
  const div = document.createElement("div");
  div.classList.add("alert");
  div.innerHTML = gameOverAlertElement;
  document.body.appendChild(div);
  isGameOver = true;
  moves = 0;
}

function draw() {
  const drawAlertElement = "<b>DRAW!!!</b><br><br>" + restartButton;
  const div = document.createElement("div");
  div.classList.add("alert");
  div.innerHTML = drawAlertElement;
  document.body.appendChild(div);
  isGameOver = true;
  moves = 0;
}
