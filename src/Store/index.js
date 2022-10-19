import { configureStore } from "@reduxjs/toolkit";
import gridSlice from "./gridSlice";

const store = configureStore({ reducer: { gridSlice } });

export default store;
