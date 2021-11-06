const BOARD = document.getElementById("board");

let state = {
  board: [],
  p1: true,
  p2: false,
  computer: "p2",
};

function createBoard(m, n) {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const square = document.createElement("span");
      square.id = `square-${i}:${j}`; // later, i can access these values by splitting just the id and the colon as the separator
      // const [iValue, jValue] = square.id.slice(7).split(":")
      square.className = "square";
      BOARD.appendChild(square);
    }
  }

  state.board = new Array(m).fill(null).map(() => new Array(n).fill(null));
}

createBoard(3, 3);

let turn = 0;
const getTurn = () => (turn % 2 === 0 ? "p1" : "p2");

const clickHandler = (e) => {
  if (
    !e.target.classList.contains("square") ||
    e.target.classList.contains("p1") ||
    e.target.classList.contains("p2")
  ) {
    return;
  }

  e.target.classList.add(getTurn());

  state.p1 = !state.p1;
  state.p2 = !state.p2;

  turn++;

  if (turn === 9) {
    BOARD.removeEventListener("click", clickHandler);
    clearInterval(computerMoveInterval);
  }

  // queue up computer square
  console.log("is computer square? ", state[state.computer]);
};
BOARD.addEventListener("click", clickHandler);

/* add computer square logic */
let computerMoveInterval;

const computerMoveLoop = () => {
  computerMoveInterval = setInterval(() => {
    const isComputerMove = state[state.computer];
    if (!isComputerMove) {
      return;
    }

    let row, col, square;

    const getIdx = () => Math.floor(Math.random() * 3);

    const chooseSquare = () => {
      row = getIdx();
      col = getIdx();
      square = document.getElementById(`square-${row}:${col}`);
    };

    chooseSquare();

    // if computer randomly chose a game square that's already got a move
    // we need to loop indefinitely until it randomly selects a free square
    while (square.classList.contains("p1") || square.classList.contains("p2")) {
      chooseSquare();
    }

    square.click();
  }, 1000);
};

computerMoveLoop();
