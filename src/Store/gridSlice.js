import { createSlice } from "@reduxjs/toolkit";
const numRows = 28;
const numCols = 70;

const grid = [];
for (let i = 0; i < numRows; i++) {
  grid.push(
    Array.from(Array(numCols), () => {
      return {
        isVisited: false,
        isBorder: false,
        isPath: false,
        isStart: false,
        isEnd: false,
      };
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
    mode: "border",
    keyDown: false,
    startPos: { i: -1, j: -1 },
    endPos: { i: -1, j: -1 },
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setBorder: (state, action) => {
      if (state.mode === "border") {
        const currCell = state.grid[action.payload.i][action.payload.j];
        currCell.isBorder = !currCell.isBorder;
        currCell.isVisited = false;
        currCell.isPath = false;
        currCell.isStart = false;
        currCell.isEnd = false;
      }
    },
    setStart(state, action) {
      if (state.startPos.i !== -1 && state.startPos.j !== -1) {
        state.grid[state.startPos.i][state.startPos.j].isStart = false;
      }

      const currCell = state.grid[action.payload.i][action.payload.j];
      state.startPos.i = action.payload.i;
      state.startPos.j = action.payload.j;

      currCell.isStart = true;
      currCell.isBorder = false;
      currCell.isVisited = false;
      currCell.isPath = false;
      currCell.isEnd = false;
    },
    setEnd(state, action) {
      if (state.endPos.i !== -1 && state.endPos.j !== -1) {
        state.grid[state.endPos.i][state.endPos.j].isEnd = false;
      }

      const currCell = state.grid[action.payload.i][action.payload.j];
      state.endPos.i = action.payload.i;
      state.endPos.j = action.payload.j;

      currCell.isEnd = true;
      currCell.isBorder = false;
      currCell.isVisited = false;
      currCell.isPath = false;
      currCell.isStart = false;
    },
  },
});

export const { setMode, setBorder, setStart, setEnd } = gridSlice.actions;
export default gridSlice.reducer;
