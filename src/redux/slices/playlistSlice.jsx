import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  isLoading: false,
  error: "",
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    uploadPlaylist: (state, action) => {
      state.videos = action.payload;
    },
    shufflePlaylist: (state, action) => {
      state.videos = action.payload;
    },
    reorderPlaylist: (state, action) => {
      const {draggedIndex, targetIndex} = action.payload;
      const reorderedVideos = [...state.videos];
      const [draggedVideo] = reorderedVideos.splice(draggedIndex, 1);
      reorderedVideos.splice(targetIndex, 0, draggedVideo);
      state.videos = reorderedVideos;
    },
  },
});

export const {uploadPlaylist, shufflePlaylist, reorderPlaylist} =
  playlistSlice.actions;

export default playlistSlice.reducer;
