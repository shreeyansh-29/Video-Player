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
    const clickedVideo = playlist[index];
    const updatedPlaylist = [
      clickedVideo,
      ...playlist.filter((_, idx) => idx !== index),
    ];
    setMainVideo(clickedVideo);
    setActive(0);
    dispatch(uploadPlaylist(updatedPlaylist));

    window.scrollTo({top: 0, behavior: "smooth"});
    
    const playlistContainer = document.getElementById("playlist-container");
    if (playlistContainer) {
      playlistContainer.scrollTop = {top: 0, behavior: "smooth"};
    }
  };

  return (
    <div className="App">
      <div className="header">
        <img src={Youtube} className="img" />
        <h3>Youtube Lite</h3>
      </div>
      <div className="container">
        <VideoPlayer mainVideo={mainVideo} />
        <Playlist onClick={onClick} active={active} />
      </div>
    </div>
  );
}

export default App;
