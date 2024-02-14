// App.js
import {useEffect, useState} from "react";
import VideoPlayer from "./components/videoPlayer/index";
import Playlist from "./components/playlist/index";
import {useDispatch, useSelector} from "react-redux";
import {uploadPlaylist} from "./redux/slices/playlistSlice";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.videos);
  const [mainVideo, setMainVideo] = useState({});
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (playlist) {
      setMainVideo(playlist[0]);
    }
  }, [playlist]);

  useEffect(() => {
    dispatch(uploadPlaylist());
  }, []);

  const onClick = (index) => {
    playlist.forEach((ele, idx) => {
      if (idx === index) {
        setMainVideo(ele);
        setActive(idx);
      }
    });
  };

  return (
    <div className="App">
      <h3>Youtube Lite</h3>
      <div className="container">
        <VideoPlayer mainVideo={mainVideo} />
        <Playlist onClick={onClick} active={active} />
      </div>
    </div>
  );
}

export default App;
