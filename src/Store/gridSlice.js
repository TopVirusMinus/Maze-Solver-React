import { createSlice } from "@reduxjs/toolkit";
const numRows = 28;
const numCols = 75;

const grid = [];
for (let i = 0; i < numRows; i++) {
  grid.push(
    Array.from(Array(numCols), () => {
      return "e";
    })
  );
}

//console.log(grid);

const gridSlice = createSlice({
  name: "grid",
  initialState: {
    grid,
    numCols,
    numRows,
    mode: "b",
    startPos: { i: 2, j: 23 },
    endPos: { i: 5, j: 33 },
    isHold: false,
    algorithm: "bfs",
  },
  reducers: {
    setHold: (state, action) => {
      state.isHold = action.payload;
    },
    setCell: (state, action) => {
      //console.log(action.payload);
      state.grid[action.payload.idx[0]][action.payload.idx[1]] =
        action.payload.type;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setBorder: (state, action) => {
      if (state.mode === "b") {
        if (state.grid[action.payload.i][action.payload.j] === "e") {
          state.grid[action.payload.i][action.payload.j] = "b";
        } else {
          state.grid[action.payload.i][action.payload.j] = "e";
        }
      }
    },
    setStart(state, action) {
      if (state.startPos.i !== -1 && state.startPos.j !== -1) {
        state.grid[state.startPos.i][state.startPos.j] = "e";
      }
      state.grid[action.payload.i][action.payload.j] = "s";
      state.startPos.i = action.payload.i;
      state.startPos.j = action.payload.j;
    },
    setEnd(state, action) {
      //console.log(action.payload);
      if (state.endPos.i !== -1 && state.endPos.j !== -1) {
        state.grid[state.endPos.i][state.endPos.j] = "e";
      }
      state.grid[action.payload.i][action.payload.j] = "d";
      state.endPos.i = action.payload.i;
      state.endPos.j = action.payload.j;
    },
  },
});

export const { setMode, setBorder, setStart, setEnd, setHold, setCell } =
  gridSlice.actions;
export default gridSlice.reducer;
