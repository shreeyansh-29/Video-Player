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
import {useEffect, useRef, useState} from "react";
import {mediaJSON} from "../../constants/data";
import {uploadPlaylist} from "../../redux/slices/playlistSlice";

const Playlist = ({onClick, active, handleSetActive, categories}) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.videos);
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, []);

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

  const handleSetFilter = () => setFilterDropDown(!filterDropDown);

  const handleFilterKeyDown = (e) => {
    if (e.key === "Enter") setFilterDropDown(!filterDropDown);
    if (e.key === "Escape") setFilterDropDown(false);
  };

  const handleFilterItemKeyDown = (e, category) => {
    if (e.key === "Enter") {
      setSelectedCategory(category);
      filterPlaylist(category);
    }
    if (e.key === "Escape") {
      setFilterDropDown(!filterDropDown);
    }
  };

  const filterPlaylist = (filteredCategory) => {
    if (filteredCategory === "All") {
      const allVideos = mediaJSON.categories.flatMap(
        (category) => category.videos
      );
      dispatch(uploadPlaylist(allVideos));
      return;
    }
    const temp = mediaJSON.categories.reduce((acc, category) => {
      if (category.name === filteredCategory) {
        return [...acc, ...category.videos];
      }
      return acc;
    }, []);
    temp.length && dispatch(uploadPlaylist(temp));
    setFilterDropDown(!filterDropDown);
  };

  const handleItemClick = (category) => {
    setSelectedCategory(category);
    filterPlaylist(category);
  };

  return (
    <PlaylistContainer>
      <WidgetContainer>
        <ShuffleContainer
          onClick={handleClick}
          tabIndex={21}
          onKeyDown={handleKeyDown}
        >
          Shuffle Videos
          <i className="fa-solid fa-shuffle" style={{marginLeft: "10px"}} />
        </ShuffleContainer>
        <FilterContainer
          onClick={() => handleSetFilter()}
          ref={filterRef}
          tabIndex={22}
          onKeyDown={handleFilterKeyDown}
        >
          {filterDropDown ? (
            <i className="fa-solid fa-circle-xmark"></i>
          ) : (
            <i className="fa-solid fa-filter"></i>
          )}
          {filterDropDown && (
            <>
              <UnorderedList>
                <ListItem
                  tabIndex={23}
                  onKeyDown={(e) => handleFilterItemKeyDown(e, "All")}
                  onClick={() => handleItemClick("All")}
                  active={selectedCategory === "All" ? true : false}
                >
                  All
                </ListItem>
                {categories.map((ele, i) => (
                  <ListItem
                    tabIndex={i + 24}
                    key={i}
                    onKeyDown={(e) => handleFilterItemKeyDown(e, ele)}
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
              tabIndex={idx + 28}
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
