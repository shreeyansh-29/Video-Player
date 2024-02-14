import {useDispatch, useSelector} from "react-redux";
import {
  Title,
  Video,
  VideoContent,
  VideoList,
  WidgetContainer,
  PlaylistContainer,
} from "./playlistElements";
import {shufflePlaylist} from "../../redux/slices/playlistSlice";

const Playlist = ({onClick, active}) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.videos);

  const shufflPlaylist = () => {
    let temp = [...playlist];

    let currentIndex = temp.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [temp[currentIndex], temp[randomIndex]] = [
        temp[randomIndex],
        temp[currentIndex],
      ];
    }
    dispatch(shufflePlaylist(temp));
  };

  return (
    <PlaylistContainer>
      <WidgetContainer onClick={shufflPlaylist}>
        Shuffle Videos{" "}
        <i className="fa-solid fa-shuffle" style={{marginLeft: "10px"}}></i>
      </WidgetContainer>
      <VideoList>
        {playlist &&
          playlist.map((ele, idx) => {
            return (
              <VideoContent
                key={idx}
                onClick={() => onClick(idx)}
                active={active === idx ? true : false}
              >
                <Video src={ele.sources} muted poster={ele.thumb} />
                <Title active={active === idx ? true : false}>
                  {ele.title}
                </Title>
              </VideoContent>
            );
          })}
      </VideoList>
    </PlaylistContainer>
  );
};

export default Playlist;
