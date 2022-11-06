import { useState, useRef, useEffect } from "react";
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

function isItemInArray(array, item) {
  for (var i = 0; i < array.length; i++) {
    // This if statement depends on the format of your array
    if (array[i][0] === item[0] && array[i][1] === item[1]) {
      return i; // Found it
    }
  }
  return -1; // Not found
}

export const type2col = {
  b: "#011627",
  p: "#EDF170",
  s: "#98D831",
  d: "#FF1F3D",
  v: "#4B88A2",
};

const type2content = {
  s: "🐀",
  d: "🧀",
  v: "",
  up: "&#8593;",
  right: "&#8594;",
  down: "&#8595;",
  left: "&#8592;",
  empty: "",
};
const Grid = ({ visited, shortestPath, directionPath }) => {
  console.log(directionPath);
  const dispatch = useDispatch();
  const { grid, numCols, mode, isHold, startPos, endPos } = useSelector(
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
    //console.log("ueauau");
  }

  useEffect(() => {
    dispatch(setCell({ idx: [2, 23], type: "s" }));
    dispatch(setCell({ idx: [5, 33], type: "d" }));
  }, []);

  useEffect(() => {
    visited.forEach((e) => {
      setTimeout(() => {
        if (e[0] !== startPos["i"] || e[1] !== startPos["j"])
          if (e[0] !== endPos["i"] || e[1] !== endPos["j"]) {
            if (grid[e[0]][e[1]] !== "b") {
              dispatch(setCell({ idx: [e[0], e[1]], type: "v" }));
            }
          }
      }, 0);
    });
  }, [visited]);

  useEffect(() => {
    console.log(shortestPath);
    shortestPath.forEach((e) => {
      setTimeout(() => {
        dispatch(setCell({ idx: [e[0], e[1]], type: "p" }));
      }, 1);
    });
  }, [shortestPath]);

  return (
    <>
      {!shortestPath.length && visited.length > 0 && <h1>No Path!</h1>}
      <div
        className={CSS.grid}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 25px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => {
            let cellCol = "#FDFFFC";
            let cellContent = "";
            let cellContentColor = "#FDFFFC";
            if (grid[i][j] === "p") {
              cellContentColor = "#333";
            }
            cellCol = !type2col[grid[i][j]] ? "#FDFFFC" : type2col[grid[i][j]];
            cellContent = type2content[grid[i][j]];
            if (grid[i][j] === "p") {
              let pathIndex = isItemInArray(shortestPath, [i, j]);
              console.log(pathIndex);
              cellContent = type2content[directionPath[pathIndex]];
            }
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
                  color: cellContentColor,
                  transition: "all .5s ease-in-out",
                  WebkitTransition: "all .5s ease-in-out",
                  MozTransition: "all .5s ease-in-out",
                }}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: cellContent,
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Grid;
