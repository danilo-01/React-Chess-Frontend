import pieceIcons from "../Helpers/pieceIcons";
import boardHelpers from "../Helpers/boardHelpers";
const { pawnDirectionToModifer } = boardHelpers;

// General piece data
class GeneralPieceData {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.current = false;
    this.marked = false;
    this.moved = 0;
    this.direction = null;
    this.icon = null;

    // Modifiers are in [x, y] order
    this.modifiers = {
      multiple: null,
      once: null,
    };
  }
}

/* Class representing a pawn piece */
class Pawn extends GeneralPieceData {
  constructor(x, y, color) {
    super(x, y, color);
    this.direction = this.color === "W" ? -1 : 1;
    this.type = "PAWN";
    this.icon = pieceIcons[this.type];

    // Modifiers are in [x, y] order
    this.modifiers = {
      multiple: null,
      once: null,
    };
  }
}

/* Class representing a Knight piece */
class Knight extends GeneralPieceData {
  constructor(x, y, color) {
    super(x, y, color);
    this.type = "KNIGHT";
    this.icon = pieceIcons[this.type];

    // Modifiers are in [x, y] order
    this.modifiers = {
      multiple: null,
      once: [
        [1, -2],
        [-1, -2],
        [1, 2],
        [-1, 2],
        [2, 1],
        [-2, -1],
        [2, -1],
        [-2, 1],
      ],
    };
  }
}
/* Class representing a rook piece */
class Rook extends GeneralPieceData {
  constructor(x, y, color) {
    super(x, y, color);
    this.type = "ROOK";
    this.icon = pieceIcons[this.type];

    // Modifiers are in [x, y] order
    this.modifiers = {
      multiple: [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ],
      once: null,
    };
  }
}

/* Class representing a bishop piece */
class Bishop extends GeneralPieceData {
  constructor(x, y, color) {
    super(x, y, color);
    this.type = "BISHOP";
    this.icon = pieceIcons[this.type];

    // Modifiers are in [x, y] order
    this.modifiers = {
      multiple: [
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
      ],
      once: null,
    };
  }
}

/* Class representing a Queen piece */
class Queen extends GeneralPieceData {
  constructor(x, y, color) {
    super(x, y, color);
    this.type = "QUEEN";
    this.icon = pieceIcons[this.type];

    // Modifiers are in [x, y] order
    this.modifiers = {
      multiple: [
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ],
      once: null,
    };
  }
}

/* Class representing a King piece */
class King extends GeneralPieceData {
  constructor(x, y, color) {
    super(x, y, color);
    this.type = "KING";
    this.icon = pieceIcons[this.type];

    // Modifiers are in [x, y] order
    this.modifiers = {
      multiple: null,
      once: [
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ],
    };
  }
}

/* Class representing an empty space */
class EmptySpace extends GeneralPieceData {
  constructor(x, y, color) {
    super(x, y, color);

    this.type = "EMPTY_SPACE";
  }
}

export default {
  0: EmptySpace,
  1: Pawn,
  2: Rook,
  3: Knight,
  4: Bishop,
  5: Queen,
  6: King,
};
