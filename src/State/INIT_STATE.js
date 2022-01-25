import pieceData from "./pieceData";

// Start with board data that looks like this
const board = [
  ["2-B", "3-B", "4-B", "5-B", "6-B", "4-B", "3-B", "2-B"],
  ["1-B", "1-B", "1-B", "1-B", "1-B", "1-B", "1-B", "1-B"],
  ["0-E", "0-E", "0-E", "0-E", "0-E", "0-E", "0-E", "0-E"],
  ["0-E", "0-E", "0-E", "0-E", "0-E", "0-E", "0-E", "0-E"],
  ["0-E", "0-E", "0-E", "0-E", "0-E", "0-E", "0-E", "0-E"],
  ["0-E", "0-E", "0-E", "0-E", "0-E", "0-E", "0-E", "0-E"],
  ["1-W", "1-W", "1-W", "1-W", "1-W", "1-W", "1-W", "1-W"],
  ["2-W", "3-W", "4-W", "6-W", "5-W", "4-W", "3-W", "2-W"],
];

// Replace spaces in the array of arrays with classes in place of each space

// Fill space with data based on piece id
for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    const [pieceId, color] = board[i][j].split("-");

    board[i][j] = pieceData[pieceId]
      ? new pieceData[pieceId](j, i, color)
      : new pieceData[0](j, i, color);
  }
}

const INIT_STATE = {
  board: board,
  turn: "W",
  previousSelected: null,
  currentSelected: null,
  markedSpaces: [],
};

export default INIT_STATE;
