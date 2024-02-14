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
    uploadPlaylist: (state) => {
      state.videos = mediaJSON.categories[0].videos;
    },
    shufflePlaylist: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const {uploadPlaylist, shufflePlaylist} = playlistSlice.actions;

export default playlistSlice.reducer;
