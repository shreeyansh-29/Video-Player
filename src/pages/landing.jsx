// App.js
import {useEffect, useState} from "react";
import VideoPlayer from "../components/videoPlayer/index";
import Playlist from "../components/playlist/index";
import {useDispatch, useSelector} from "react-redux";
import {uploadPlaylist} from "../redux/slices/playlistSlice";
import Youtube from "../assets/youtube.png";
import {mediaJSON} from "../constants/data";
import "../App.css";
import SearchInput from "../components/searchInput";

function Landing() {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.videos);
  const [mainVideo, setMainVideo] = useState({});
  const [active, setActive] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (playlist) {
      setMainVideo(playlist[0]);
    }
  }, [playlist]);

  useEffect(() => {
    const allVideos = mediaJSON.categories.flatMap(
      (category) => category.videos
    );
    const categoryNames = mediaJSON.categories.map((category) => category.name);
    setCategories(categoryNames);
    dispatch(uploadPlaylist(allVideos));
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
        <img src={Youtube} className="img" alt="youtube.png" />
        <h3>Youtube Lite</h3>
      </div>
      <SearchInput categories={categories} />
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
          categories={categories}
        />
      </div>
    </div>
  );
}

export default Landing;
