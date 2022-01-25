import React, { useEffect, useState } from "react";
import "./board.scss";
import { useSelector, useDispatch } from "react-redux";
import Space from "../Space/Space";
import INIT_STATE from "../../State/INIT_STATE";
const { board } = INIT_STATE;

// Chessboard component returning a table
const Board = () => {
  console.log("Rendering Board Component");

  // Render board
  return (
    <div className="board">
      {Object.keys(board).map((key, y) => {
        return (
          <div className="row">
            {board[key].map((pieceType, x) => {
              return <Space x={x} y={y} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
