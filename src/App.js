import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "./Components/Grid/Grid";
import Button from "./Components/Button/Button";
import Navbar from "./Components/Navbar/Navbar";
import { setMode } from "./Store/gridSlice";

function App() {
  const dispatch = useDispatch();
  const { grid, numCols, numRows, startPos, endPos } = useSelector(
    (state) => state.gridSlice
  );

  const [res, setRes] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000/").then((res) => {
      console.log(res.data.message);
      setRes((prev) => res.data.message);
    });
  }, [res]);

  return (
    <div className="App">
      <h1>{res}</h1>
      <Navbar>
        <Button
          img="greater-than.png"
          text="Start"
          handleClick={() => dispatch(setMode("s"))}
        />
        <Button
          img="border.png"
          text="Border"
          handleClick={() => dispatch(setMode("b"))}
        />
        <Button
          img="flag.png"
          text="Destination"
          handleClick={() => dispatch(setMode("d"))}
        />
      </Navbar>
      <Button
        text="Visualize"
        img="settings-gears.png"
        handleClick={() =>
          axios
            .post("http://localhost:8000/receiveInfo/", {
              grid,
              numCols,
              numRows,
              startPos,
              endPos,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        }
      />
      <Grid />
    </div>
  );
}

export default App;
