import React from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../actions";
const { SELECT, MOVE, MARK } = actions;

const Space = ({ y, x }) => {
  console.log("Rendering Space Component");
  const marked = useSelector((state) => state.board[y][x].marked);
  const color = useSelector((state) => state.board[y][x].color);
  const type = useSelector((state) => state.board[y][x].type);
  const icon = useSelector((state) => state.board[y][x].icon);
  const dispatch = useDispatch();

  // console.log(marked, type);

  // Update current and previos selected piece
  const handleSelect = (e) => {
    // Update current selection

    dispatch({
      type: SELECT,
      payload: {
        x: x,
        y: y,
        element: e.target,
      },
    });

    // Mark spaces if able to
    dispatch({
      type: MARK,
    });

    // Move if able to
    dispatch({
      type: MOVE,
    });
  };
  return (
    <div
      className={`${(x + y) % 2 === 0 ? "white" : "black"} ${
        marked ? "marked" : ""
      } space`}
      onClick={handleSelect}
    >
      <div className={`${color === "W" ? "white" : "black"} piece`}>{icon}</div>
    </div>
  );
};

export default Space;
