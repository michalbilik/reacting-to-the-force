// store/slices/searchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPeople } from "../../api";

interface SearchState {
  searchTerm: string;
  people: IPeople[];
}

const initialState: SearchState = {
  searchTerm: "",
  people: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPeople: (state, action: PayloadAction<IPeople[]>) => {
      state.people = action.payload;
    },
  },
});

export const { setSearchTerm, setPeople } = searchSlice.actions;

export default searchSlice.reducer;
