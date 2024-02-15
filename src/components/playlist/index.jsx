import {useDispatch, useSelector} from "react-redux";
import {
  Title,
  Video,
  VideoContent,
  VideoList,
  WidgetContainer,
  PlaylistContainer,
  UnorderedList,
  ListItem,
  ShuffleContainer,
  FilterContainer,
} from "./playlistElements";
import {
  shufflePlaylist,
  reorderPlaylist,
} from "../../redux/slices/playlistSlice";
import {useState} from "react";
import {mediaJSON} from "../../constants/data";
import {uploadPlaylist} from "../../redux/slices/playlistSlice";

const Playlist = ({onClick, active, handleSetActive, categories}) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.videos);
  const [filter, setFilter] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState("");
  let selectedCategory;
  // const [loading, setLoading] = useState(false);

  const handleClick = () => {
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
    handleSetActive(0);
    dispatch(shufflePlaylist(temp));

    window.scrollTo({top: 0, behavior: "smooth"});

    const playlistContainer = document.getElementById("playlist-container");
    if (playlistContainer) {
      playlistContainer.scrollTop = {top: 0, behaviour: "smooth"};
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleKeyPress = (e, idx) => {
    if (e.key === "Enter") {
      onClick(idx);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    dispatch(reorderPlaylist({draggedIndex, targetIndex}));
  };

  const handleSetFilter = () => setFilter(!filter);

  const handleItemClick = (category) => {
    selectedCategory = category;

    const temp = mediaJSON.categories.reduce((acc, category) => {
      if (category.name === selectedCategory) {
        return [...acc, ...category.videos];
      }
      return acc;
    }, []);
    temp.length && dispatch(uploadPlaylist(temp));
    setFilter(!filter);
  };

  return (
    <PlaylistContainer>
      <WidgetContainer>
        <ShuffleContainer
          onClick={handleClick}
          tabIndex={1}
          onKeyDown={handleKeyDown}
        >
          Shuffle Videos
          <i className="fa-solid fa-shuffle" style={{marginLeft: "10px"}} />
        </ShuffleContainer>
        <FilterContainer onClick={() => handleSetFilter()}>
          <i className="fa-solid fa-filter"></i>
          {filter && (
            <>
              <UnorderedList>
                {categories.map((ele, i) => (
                  <ListItem
                    key={i}
                    onClick={() => handleItemClick(ele)}
                    active={selectedCategory === ele ? true : false}
                  >
                    {ele}
                  </ListItem>
                ))}
              </UnorderedList>
            </>
          )}
        </FilterContainer>
      </WidgetContainer>
      <VideoList id="playlist-container">
        {playlist &&
          playlist.map((ele, idx) => (
            <VideoContent
              tabIndex={idx + 2}
              key={idx}
              onClick={() => onClick(idx)}
              active={active === idx ? true : false}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, idx)}
              draggable
              onKeyDown={(e) => handleKeyPress(e, idx)}
            >
              <Video src={ele.sources} muted poster={ele.thumb} />
              <Title active={active === idx ? true : false}>{ele.title}</Title>
            </VideoContent>
          ))}
      </VideoList>
    </PlaylistContainer>
  );
};

export default Playlist;
