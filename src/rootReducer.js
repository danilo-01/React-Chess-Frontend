import boardHelpers from "./Helpers/boardHelpers";
import actions from "./actions";
import pieceData from "./State/pieceData";
import INIT_STATE from "./State/INIT_STATE";

// Variables
const { availableSpaces } = boardHelpers;
const { MOVE, MARK, SELECT } = actions;

/**
 * Root reducer
 * @param {Object} state
 * @param {Object} action
 * @returns same or updated state
 */
const rootReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SELECT:
      console.log("SELECT");
      console.log(state);
      if (state.currentSelected) {
        // Clone current selection so that original state isnt changed
        const currentSelectedClone = { ...state.currentSelected };

        // Change spaces current selected status
        currentSelectedClone.spaceData.current = false;

        return {
          ...state,
          previousSelected: currentSelectedClone,
          currentSelected: {
            spaceData: { ...state.board[action.payload.y][action.payload.x] },
            element: action.payload.element,
          },
        };
      }

      // Edge case where currentSelected is null
      return {
        ...state,
        previousSelected: state.currentSelected,
        currentSelected: {
          spaceData: { ...state.board[action.payload.y][action.payload.x] },
          element: action.payload.element,
        },
      };

    case MARK:
      console.log("MARK");
      // Clone board and current space
      const boardClone = { ...state.board };

      // Unmark all marked spaces
      const oldSpacesToMark = [...state.markedSpaces];

      if (state.markedSpaces.length) {
        for (let i = 0; i < oldSpacesToMark.length; i++) {
          const markY = oldSpacesToMark[i].y;
          const markX = oldSpacesToMark[i].x;

          // Update spaces marked state to true
          boardClone[markY][markX].marked = false;
        }
      }

      // If its not the current turns color selecting dont do anything
      if (state.currentSelected.spaceData.color !== state.turn) return state;

      const currentSpaceClone =
        boardClone[state.currentSelected.spaceData.y][
          state.currentSelected.spaceData.x
        ];

      // Get available spaces that currentSelected can move to
      const spacesToMark = availableSpaces(boardClone, currentSpaceClone);

      // Mark all spaces that currentSelected can move to
      for (let i = 0; i < spacesToMark.length; i++) {
        const markY = spacesToMark[i].y;
        const markX = spacesToMark[i].x;

        // Update spaces marked state to true
        boardClone[markY][markX].marked = true;
      }

      // Return updated state
      return { ...state, board: boardClone, markedSpaces: spacesToMark };

    // Moves date from one space on state.board to another
    case MOVE:
      console.log("MOVE");

      if (
        state.previousSelected &&
        state.previousSelected.spaceData.color === state.turn &&
        state.currentSelected.spaceData.color !== state.turn
      ) {
        let canMove = false;
        if (state.markedSpaces.length) {
          for (let i = 0; i < state.markedSpaces.length; i++) {
            const currentX = state.currentSelected.spaceData.x;
            const currentY = state.currentSelected.spaceData.y;

            // check if allowed to move to selected space
            if (
              state.markedSpaces[i].x === currentX &&
              state.markedSpaces[i].y === currentY
            )
              canMove = true;
          }
        }

        if (!canMove) return state;

        // Clone board
        const boardClone = { ...state.board };

        // Save space to that will be moved (cloned copy)
        const tempFrom = {
          ...boardClone[state.previousSelected.spaceData.y][
            state.previousSelected.spaceData.x
          ],
        };

        // Replace current selection's space with tempFrom
        boardClone[state.currentSelected.spaceData.y][
          state.currentSelected.spaceData.x
        ] = tempFrom;

        // Update tempFrom's x and y values to match new position
        tempFrom.x = state.currentSelected.spaceData.x;
        tempFrom.y = state.currentSelected.spaceData.y;
        tempFrom.moved += 1;

        // Update previous selection's space with an empty bspace class
        boardClone[state.previousSelected.spaceData.y][
          state.previousSelected.spaceData.x
        ] = new pieceData[0](
          state.previousSelected.spaceData.x,
          state.previousSelected.spaceData.y,
          "E"
        );

        const nextTurn = state.turn === "W" ? "B" : "W";

        return {
          ...state,
          board: boardClone,
          turn: nextTurn,
          currentSelected: null,
          previousSelected: null,
        };
      }

      return state;

    default:
      return state;
  }
};

export default rootReducer;
