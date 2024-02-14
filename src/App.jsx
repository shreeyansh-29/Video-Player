// App.js
import {useEffect, useState} from "react";
import VideoPlayer from "./components/videoPlayer/index";
import Playlist from "./components/playlist/index";
import {useDispatch, useSelector} from "react-redux";
import {upload} from "./redux/slices/playlistSlice";
import "./App.css";
import {mediaJSON} from "./constants/data";

function App() {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.videos);
  const [mainVideo, setMainVideo] = useState(mediaJSON.categories[0].videos[0]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    dispatch(upload());
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
      <h3>Video Control</h3>
      <div className="container">
        <VideoPlayer mainVideo={mainVideo} />
        <Playlist onClick={onClick} active={active} />
      </div>
    </div>
  );
}

export default App;
