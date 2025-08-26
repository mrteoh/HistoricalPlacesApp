import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Place = {
  id?: string;
  name: string;
  description: string;
  image?: string;
  visited?: boolean;
};

interface PlacesState {
  places: Place[];
}

const initialState: PlacesState = {
  places: [],
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<Place[]>) {
      state.places = action.payload;
    },

  },
});

export const { setPlaces, toggleVisited } = placesSlice.actions;
export default placesSlice.reducer;
