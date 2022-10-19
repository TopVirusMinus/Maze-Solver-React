import { useState } from "react";
import CSS from "./Grid.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBorder, setStart, setEnd } from "../../Store/gridSlice";

const Grid = () => {
  const dispatch = useDispatch();
  const { grid, numCols, mode } = useSelector((state) => state.gridSlice);

  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 25px)`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, j) => {
          let cellCol = "#DFF1FF";
          if (grid[i][j].isBorder) {
            cellCol = "#000";
          } else if (grid[i][j].isVisited) {
            cellCol = "#B9881D";
          } else if (grid[i][j].isStart) {
            cellCol = "#368E88";
          } else if (grid[i][j].isEnd) {
            cellCol = "#BA9CB5";
          } else {
            cellCol = "#DFF1FF";
          }

          return (
            <div
              className={CSS.cell}
              key={`${i}-${j}`}
              onClick={(e) => {
                console.log(`Clicked ${i}-${j}`);
                if (mode === "border") {
                  dispatch(setBorder({ i, j }));
                }
                if (mode === "start") {
                  dispatch(setStart({ i, j }));
                }
                if (mode === "end") {
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
