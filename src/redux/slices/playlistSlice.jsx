import {createSlice} from "@reduxjs/toolkit";
import {mediaJSON} from "../../constants/data";

const initialState = {
  videos: [],
  isLoading: false,
  error: "",
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    upload: (state) => {
      state.videos = mediaJSON.categories[0].videos;
    },
  },
});

export const {upload} = playlistSlice.actions;

export default playlistSlice.reducer;
