import { useState, useRef } from "react";
import CSS from "./Grid.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setBorder,
  setStart,
  setEnd,
  setHold,
  setCell,
} from "../../Store/gridSlice";
import useLongPress from "../../hooks/useLongPress";

export const type2col = {
  b: "#000",
  p: "#B9881D",
  s: "#368E88",
  d: "#BA9CB5",
  v: "gray",
};

const Grid = ({ visited, shortestPath }) => {
  const dispatch = useDispatch();
  const { grid, numCols, mode, isHold } = useSelector(
    (state) => state.gridSlice
  );
  const [counter, setCounter] = useState(100);
  const intervalRef = useRef(null);

  const startCounter = () => {
    //console.log("click");
    dispatch(setHold(true));
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 0);
  };

  const stopCounter = () => {
    //console.log("unclick");
    dispatch(setHold(false));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  if (shortestPath) {
    console.log("ueauau");
  }

  // visited.forEach((e) => {
  //   setTimeout(() => {
  //     dispatch(setCell({ idx: [e[0], e[1]], type: "v" }));
  //   }, 0);
  // });

  shortestPath.forEach((e) => {
    setTimeout(() => {
      dispatch(setCell({ idx: [e[0], e[1]], type: "p" }));
    }, 0);
  });
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
              onMouseDown={startCounter}
              onMouseUp={stopCounter}
              className={CSS.cell}
              key={`${i}-${j}`}
              onMouseOver={() => {
                if (!isHold) {
                  return;
                }
                //console.log(`Clicked ${i}-${j}`);
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
              onClick={(e) => {
                //console.log(`Clicked ${i}-${j}`);
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
