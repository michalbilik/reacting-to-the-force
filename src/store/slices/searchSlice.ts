// store/slices/searchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPeople } from "../../api";

interface SearchState {
  searchTerm: string;
  people: IPeople[];
  selectedPerson: IPeople | null;
  isOverlayOpen: boolean;
}

const initialState: SearchState = {
  searchTerm: "",
  people: [],
  selectedPerson: null,
  isOverlayOpen: false,
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
    setSelectedPerson: (state, action: PayloadAction<IPeople | null>) => {
      state.selectedPerson = action.payload;
    },
    toggleOverlay: (state) => {
      state.isOverlayOpen = !state.isOverlayOpen;
    },
  },
});

export const { setSearchTerm, setPeople, setSelectedPerson, toggleOverlay } = searchSlice.actions;

export default searchSlice.reducer;
