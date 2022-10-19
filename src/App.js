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
  const { isStart, isEnd } = useSelector((state) => state.gridSlice);

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
          handleClick={() => dispatch(setMode("start"))}
        />
        <Button
          img="border.png"
          text="Border"
          handleClick={() => dispatch(setMode("border"))}
        />
        <Button
          img="flag.png"
          text="End"
          handleClick={() => dispatch(setMode("end"))}
        />
      </Navbar>
      <Button
        style={{ borderBottom: "2 rem" }}
        text="Visualize"
        img="settings-gears.png"
      />
      <Grid />
    </div>
  );
}

export default App;
