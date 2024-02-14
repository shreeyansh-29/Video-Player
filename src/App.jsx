// App.js
import {useEffect, useState} from "react";
import VideoPlayer from "./components/videoPlayer/index";
import Playlist from "./components/playlist/index";
import {useDispatch, useSelector} from "react-redux";
import {uploadPlaylist} from "./redux/slices/playlistSlice";
import Youtube from "./assets/youtube.png";
import {mediaJSON} from "./constants/data";
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
    dispatch(uploadPlaylist(mediaJSON.categories[0].videos));
  }, []);

  const onClick = (index) => {
    playlist.forEach((ele, idx) => {
      if (idx === index) {
        setMainVideo(ele);
        setActive(idx);
      }
    });

    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handleSetActive = (idx) => setActive(idx);

  const handleSetMainVideo = (obj) => setMainVideo(obj);

  return (
    <div className="App">
      <div className="header">
        <img src={Youtube} className="img" />
        <h3>Youtube Lite</h3>
      </div>
      <div className="container">
        <VideoPlayer
          mainVideo={mainVideo}
          playlist={playlist}
          active={active}
          handleSetActive={handleSetActive}
          handleSetMainVideo={handleSetMainVideo}
        />
        <Playlist
          onClick={onClick}
          active={active}
          handleSetActive={handleSetActive}
        />
      </div>
    </div>
  );
}

export default App;
