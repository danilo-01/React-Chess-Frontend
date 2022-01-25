/**
 * Simple function to change modifiers baseed on players perspective (for pawn)
 * @param {Number} directionModifier Determine wether the modifers should be negative or positive. Positive by default
 * @param {Array} modifiers Array modifers
 * @returns {Array} Returns array of updated modifiers
 */
const pawnDirectionToModifer = (directionModifier = 1, modifiers) => {
  // Pure
  const newArr = [...modifiers];

  for (let i = 0; i < newArr.length; i++) {
    newArr[i][1] *= directionModifier;
  }
  return newArr;
};

/**
 *   Get available spaces for this piece to move
 *   @param {Array} boardArray Game board Array
 *   @param {Object} modifers object with modifiers
 *   @returns {Array} y x coordinates to move on board array
 */
const availableSpaces = (boardArray, selectedSpace) => {
  // Modifers come in [x, y] order
  const spaces = [];
  const modifiers = selectedSpace.modifiers;
  const selectY = selectedSpace.y;
  const selectX = selectedSpace.x;
  const enemyColor = selectedSpace.color === "W" ? "B" : "W";

  // Check multiple modifiers spaces
  if (modifiers.multiple) {
    for (let modifier of modifiers.multiple) {
      let movedMultiplier = 1;
      while (true) {
        // If space exists and if so save to variable
        try {
          console.log("Trying to loop");
          const piece =
            boardArray[selectY + modifier[1] * movedMultiplier][
              selectX + modifier[0] * movedMultiplier
            ];
          console.log(
            "y",
            selectY + modifier[1] * movedMultiplier,
            "x",
            selectX + modifier[0] * movedMultiplier
          );

          if (!piece) break;
          console.log("potential mark");
          console.log(piece);
          // If piece is the same color break while loop
          if (piece.color === selectedSpace.color) {
            console.log("1");
            break;
          }

          // If its an enemy space add and break while loop
          if (piece.color === enemyColor) {
            console.log("2");
            spaces.push(piece);
            break;
          }

          // If empty space add and continue
          if (piece.color === "E") {
            console.log("3");
            spaces.push(piece);
            movedMultiplier++;
          } else {
            break;
          }
        } catch (e) {
          console.log("Could not loop");
          break;
        }
      }
    }
  }

  // Check single modifiers spaces
  if (modifiers.once) {
    for (let modifer of modifiers.once) {
      if (
        boardArray[modifer[1] + selectedSpace.y] &&
        boardArray[modifer[1] + selectedSpace.y][
          modifer[0] + selectedSpace.x
        ] &&
        boardArray[modifer[1] + selectedSpace.y][modifer[0] + selectedSpace.x]
          .color !== selectedSpace.color
      ) {
        spaces.push(
          boardArray[modifer[1] + selectedSpace.y][modifer[0] + selectedSpace.x]
        );
      }
    }
  }

  // check for pawn since pawns move differently than other pieces
  if (selectedSpace.type === "PAWN") {
    // const pawnMoveForward = 2;
    // let i = 1;
    // while (i < pawnMoveForward + 1) {
    //   if (
    //     boardArray[selectedSpace.y + directionModifier * i] &&
    //     boardArray[selectedSpace.y + directionModifier * i][selectedSpace.x]
    //   ) {
    //     if (
    //       boardArray[selectedSpace.y + directionModifier * i][selectedSpace.x]
    //         .type !== "EMPTY_SPACE"
    //     )
    //       break;

    //     // Add space to available spaces to move
    //     spaces.push(
    //       boardArray[selectedSpace.y + directionModifier * i][selectedSpace.x]
    //     );

    //     i++;
    //   }
    // }

    const directionModifier = selectedSpace.direction;
    const pawnFirstMove = selectedSpace.moved === 0 ? true : false;

    // Check spaces moving forward
    const pawnUp = pawnFirstMove
      ? [
          [0, 1],
          [0, 2],
        ]
      : [[0, 1]];
    for (let modifiers of pawnUp) {
      if (
        boardArray[selectY + modifiers[1] * directionModifier] &&
        boardArray[selectY + modifiers[1] * directionModifier][
          selectX + modifiers[0]
        ]
      ) {
        // If the space isnt empty space break loop
        if (
          boardArray[selectY + modifiers[1] * directionModifier][
            selectX + modifiers[0]
          ].color !== "E"
        )
          break;
        spaces.push(
          boardArray[selectedSpace.y + modifiers[1] * directionModifier][
            selectedSpace.x + modifiers[0]
          ]
        );
      }
    }

    // Check spaces diagonaly
    const pawnDiagonal = [
      [-1, 1],
      [1, 1],
    ];

    for (let modifiers of pawnDiagonal) {
      if (
        boardArray[selectY + modifiers[1] * directionModifier] &&
        boardArray[selectY + modifiers[1] * directionModifier][
          selectX + modifiers[0]
        ] &&
        boardArray[selectY + modifiers[1] * directionModifier][
          selectX + modifiers[0]
        ].color === (selectedSpace.color === "W" ? "B" : "W")
      ) {
        // If the space isnt an enemy space break loop

        spaces.push(
          boardArray[selectedSpace.y + modifiers[1] * directionModifier][
            selectedSpace.x + modifiers[0]
          ]
        );
      }
    }
  }
  return spaces;
};

export default {
  pawnDirectionToModifer: pawnDirectionToModifer,
  availableSpaces: availableSpaces,
};
