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

  /**
   * Click Event for shuffling videos in playlist
   */
  const handleShuffleClick = () => {
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

  /**
   * Keyboard Event for shuffling videos in playlist
   * @param {Event} e
   */
  const handleShuffleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleShuffleClick();
    }
  };

  /**
   *Keyboard event for updation of mainVideo
   * @param {Event} e
   * @param {Number} idx
   */
  const handleVideoKeyPress = (e, idx) => {
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

  /**
   * Click Event for updation of visibilty of filterDropDown
   */
  const handleSetFilter = () => setFilterDropDown(!filterDropDown);

  /**
   * Keyboard Event for updation of visibilty of filterDropDown
   * @param {Event} e
   */
  const handleFilterKeyDown = (e) => {
    if (e.key === "Enter") setFilterDropDown(!filterDropDown);
    if (e.key === "Escape") setFilterDropDown(false);
  };

  /**
   * Keyboard Event to update category and trigger filterPlaylist()
   * @param {Event} e
   * @param {String} category
   */
  const handleFilterItemKeyDown = (e, category) => {
    if (e.key === "Enter") {
      setSelectedCategory(category);
      filterPlaylist(category);
    }
    if (e.key === "Escape") {
      setFilterDropDown(!filterDropDown);
    }
  };

  /**
   * Click Event to update category and trigger filterPlaylist()
   * @param {String} category
   */
  const handleItemClick = (category) => {
    setSelectedCategory(category);
    filterPlaylist(category);
  };

  /**
   * Filters video to be updated in playlist as per the selectedCategory
   * @param {String} filteredCategory
   */
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

  return (
    <PlaylistContainer>
      <WidgetContainer>
        <ShuffleContainer
          onClick={handleShuffleClick}
          tabIndex={21}
          onKeyDown={handleShuffleKeyDown}
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
              onKeyDown={(e) => handleVideoKeyPress(e, idx)}
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
