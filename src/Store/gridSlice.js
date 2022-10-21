import { createSlice } from "@reduxjs/toolkit";
const numRows = 28;
const numCols = 70;

const grid = [];
for (let i = 0; i < numRows; i++) {
  grid.push(
    Array.from(Array(numCols), () => {
      return "e";
    })
  );
}

console.log(grid);

const gridSlice = createSlice({
  name: "grid",
  initialState: {
    grid,
    numCols,
    numRows,
    mode: "b",
    keyDown: false,
    startPos: { i: -1, j: -1 },
    endPos: { i: -1, j: -1 },
  },
  reducers: {
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
      console.log(action.payload);
      if (state.endPos.i !== -1 && state.endPos.j !== -1) {
        state.grid[state.endPos.i][state.endPos.j] = "e";
      }
      state.grid[action.payload.i][action.payload.j] = "d";
      state.endPos.i = action.payload.i;
      state.endPos.j = action.payload.j;
    },
  },
});

export const { setMode, setBorder, setStart, setEnd } = gridSlice.actions;
export default gridSlice.reducer;