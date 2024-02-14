import {configureStore} from "@reduxjs/toolkit";
import playlistReducer from "./slices/playlistSlice";

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
});
