import {useSelector} from "react-redux";
import {Title, Video, VideoContent, VideoList} from "./playlistElements";

const Playlist = ({onClick, active}) => {
  const playlist = useSelector((state) => state.playlist.videos);

  return (
    <VideoList>
      {playlist &&
        playlist.map((ele, idx) => {
          return (
            <VideoContent
              key={idx}
              onClick={() => onClick(idx)}
              active={active === idx ? true : false}
            >
              <Video src={ele.sources[0]} muted poster={ele.thumb} />
              <Title active={active === idx ? true : false}>{ele.title}</Title>
            </VideoContent>
          );
        })}
    </VideoList>
  );
};

export default Playlist;
