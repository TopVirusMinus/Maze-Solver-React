import { useState } from "react";
import CSS from "./Grid.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBorder, setStart, setEnd } from "../../Store/gridSlice";
export const type2col = {
  b: "#000",
  v: "#B9881D",
  s: "#368E88",
  d: "#BA9CB5",
};

const Grid = () => {
  const dispatch = useDispatch();
  const { grid, numCols, mode } = useSelector((state) => state.gridSlice);

  return (
    <div
      className={CSS.grid}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 25px)`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, j) => {
          let cellCol = "#DFF1FF";
          cellCol = !type2col[grid[i][j]] ? "#DFF1FF" : type2col[grid[i][j]];

          return (
            <div
              className={CSS.cell}
              key={`${i}-${j}`}
              onClick={(e) => {
                console.log(`Clicked ${i}-${j}`);
                if (mode === "b") {
                  dispatch(setBorder({ i, j }));
                }
                if (mode === "s") {
                  dispatch(setStart({ i, j }));
                }
                if (mode === "d") {
                  dispatch(setEnd({ i, j }));
                }
              }}
              style={{
                width: 25,
                height: 25,
                border: "1px solid lightblue",
                backgroundColor: cellCol,
              }}
            ></div>
          );
        })
      )}
    </div>
  );
};

export default Grid;
