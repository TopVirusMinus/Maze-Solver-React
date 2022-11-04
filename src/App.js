import "./App.css";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid, { type2col } from "./Components/Grid/Grid";
import Button from "./Components/Button/Button";
import Navbar from "./Components/Navbar/Navbar";
import { setMode, setCell, setEnd, setStart } from "./Store/gridSlice";

function App() {
  const dispatch = useDispatch();
  const { grid, numCols, numRows, startPos, endPos } = useSelector(
    (state) => state.gridSlice
  );

  const [res, setRes] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000/").then((res) => {
      //console.log(res.data.message);
      setRes((prev) => res.data.message);
    });
  }, [res]);

  const [shortestPath, setShortestPath] = useState([]);
  const [visited, setVisited] = useState([]);
  const [algorithm, setAlgorithm] = useState("bfs");
  const [directionPath, setDirectionPath] = useState([]);

  const onSelectChange = (e) => {
    setAlgorithm(() => e.target.value);
  };

  console.log(algorithm);

  const resetGrid = useCallback(() => {
    //console.log(grid[0]);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        dispatch(setCell({ idx: [i, j], type: "e" }));
      }
    }
    dispatch(setStart({ i: 2, j: 23 }));
    dispatch(setEnd({ i: 5, j: 33 }));
  }, [grid]);

  return (
    <div className="App">
      <h1>{res}</h1>
      <Navbar>
        <Button
          solidCol={type2col["s"]}
          text="Start"
          handleClick={() => dispatch(setMode("s"))}
        />
        <Button
          solidCol={type2col["b"]}
          text="Border"
          handleClick={() => dispatch(setMode("b"))}
        />
        <Button
          solidCol={type2col["d"]}
          text="Destination"
          handleClick={() => dispatch(setMode("d"))}
        />
      </Navbar>
      <Navbar>
        <select onChange={(e) => onSelectChange(e)}>
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
        </select>
      </Navbar>
      <Button
        className="Visualize"
        text="Visualize"
        img="settings-gears.png"
        handleClick={() => {
          return axios
            .post("http://localhost:8000/receiveInfo/", {
              grid,
              numCols,
              numRows,
              startPos,
              endPos,
              algorithm,
            })
            .then((res) => console.log(res))
            .then(() => axios.get("http://localhost:8000/getShortestPath/"))
            .then((res) => {
              //console.log(res.data[0]);
              setShortestPath((prev) => res.data[0]);
              setVisited((prev) => res.data[1]);
              setDirectionPath((prev) => res.data[2]);
            })
            .catch((err) => console.log(err));
        }}
      />
      <Button
        className="Clear"
        text="Clear"
        img="trash-can.png"
        handleClick={() => resetGrid()}
      />
      <div className="grid">
        <Grid
          className="grid"
          visited={visited}
          shortestPath={shortestPath}
          directionPath={directionPath}
        />
      </div>
    </div>
  );
}

export default App;
