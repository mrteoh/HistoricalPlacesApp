import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VisitedState = {
  [key: string]: boolean;
};

const initialState: VisitedState = {};

const visitedSlice = createSlice({
  name: "visited",
  initialState,
  reducers: {
    toggleVisited(state, action: PayloadAction<{ id: number; visited: boolean }>) {
      const { id, visited } = action.payload;
      console.log('action.payload', action.payload)
      state[id] = visited; // store visited by id
    },
  },
});

export const { toggleVisited } = visitedSlice.actions;
export default visitedSlice.reducer;
