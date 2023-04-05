import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import { starWarsApi } from "../starWarsApi";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
