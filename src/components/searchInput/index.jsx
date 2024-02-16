import {useEffect, useRef, useState} from "react";
import {
  InputField,
  SearchContainer,
  InputContainer,
  SearchIcon,
  SuggestionArea,
  ListItem,
  NotFound,
  ClearIcon,
} from "./searchInputElements";
import {useDispatch, useSelector} from "react-redux";
import {uploadPlaylist} from "../../redux/slices/playlistSlice";

const SearchInput = ({handleSetMainVideo}) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.videos);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionAreaVisible, setSuggestionAreaVisibilty] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const suggestionAreaRef = useRef(null);
  const inputRef = useRef(null);

  /**
   * InputField onChangeHandler
   * @param {Event} e
   */
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    if (searchQuery.length > 3) filteredResult(playlist, searchQuery);
  };

  /**
   * Set searchedVideo to primary video onClick on SearchIcon
   */
  const handleSearchClick = () => {
    if (searchQuery.length > 3) {
      filteredResult(playlist, searchQuery);
      if (searchResult) {
        handleSetMainVideo(searchResult[0]);
        setSearchResult([]);
        setSuggestionAreaVisibilty(false);
        updatePlaylist(searchResult[0]);
      }
    }
  };
  /**
   * Set searchedVideo to primary video onKeyDown on SearchIcon
   * @param {Event} e
   */
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.length > 3) {
      filteredResult(playlist, searchQuery);
      if (searchResult) {
        handleSetMainVideo(searchResult[0]);
        setSearchResult([]);
        setSuggestionAreaVisibilty(false);
        updatePlaylist(searchResult[0]);
      }
    }
  };

  /**
   * updating search video to be pushed in top of playlist
   * @param {video} selectedVideo
   */
  const updatePlaylist = (selectedVideo) => {
    const mainVideoIndex = playlist.findIndex(
      (video) => video.title === selectedVideo.title
    );

    if (mainVideoIndex !== -1) {
      const updatedPlaylist = [
        selectedVideo,
        ...playlist.filter((video, index) => index !== mainVideoIndex),
      ];
      dispatch(uploadPlaylist(updatedPlaylist));
    } else {
      dispatch(uploadPlaylist([selectedVideo, ...playlist]));
    }
    const playlistContainer = document.getElementById("playlist-container");
    if (playlistContainer) {
      playlistContainer.scrollTop = {top: 0, behavior: "smooth"};
    }
  };

  /**
   * Set video clicked from searchResult to primary video onKeyDown event
   * @param {Event} e
   * @param {video} element
   */
  const handleListKeyDown = (e, element) => {
    if (e.key === "Enter") {
      setSearchQuery(element.title);
      handleSetMainVideo(element);
      setSearchResult([]);
      setSuggestionAreaVisibilty(false);
      updatePlaylist(element);
    }
  };

  /**
   * Set video clicked from searchResult to primary video onClick event
   * @param {video} element
   */
  const handleListItemClick = (element) => {
    setSearchQuery(element.title);
    handleSetMainVideo(element);
    setSearchResult([]);
    updatePlaylist(element);
  };

  /**
   * Clear input onClick event
   */
  const handleClear = () => {
    setSearchQuery("");
    setSearchResult([]);
  };

  /**
   * Clear input onKeyDown event
   * @param {Event} e
   */
  const handleClearKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery("");
      setSearchResult([]);
    }
  };

  /**
   * Filter videos from playlist
   * @param {videos[]} playlist
   * @param {String} searchQuery
   */
  const filteredResult = (playlist, searchQuery) => {
    const filteredResults = playlist.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    setSearchResult(filteredResults);
  };

  /**
   * event listeners
   */
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        e.target !== inputRef.current &&
        e.target !== suggestionAreaRef.current
      ) {
        setSuggestionAreaVisibilty(false);
      }
    });

    return () => {
      document.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <SearchContainer>
      <InputContainer tabIndex={1}>
        <InputField
          tabIndex={1}
          type="text"
          name="search"
          id="search"
          value={searchQuery}
          autoFocus
          placeholder="Search"
          onFocus={() => (
            setSuggestionAreaVisibilty(true),
            filteredResult(playlist, searchQuery)
          )}
          onChange={handleChange}
          ref={inputRef}
          autoComplete="off"
        />
        {searchQuery && (
          <ClearIcon
            onClick={handleClear}
            tabIndex={3}
            onKeyDown={handleClearKeyDown}
          >
            <i className="fa-solid fa-xmark"></i>
          </ClearIcon>
        )}
        <SearchIcon
          tabIndex={2}
          onClick={handleSearchClick}
          onKeyDown={handleSearchKeyDown}
        >
          <i className="fa-solid fa-magnifying-glass" />
        </SearchIcon>
      </InputContainer>
      {suggestionAreaVisible && searchQuery.length > 3 && (
        <SuggestionArea ref={suggestionAreaRef}>
          {searchResult.length ? (
            searchResult.map((elm, idx) => (
              <ListItem
                tabIndex={idx + 4}
                key={idx}
                onKeyDown={(e) => handleListKeyDown(e, elm)}
                onClick={() => handleListItemClick(elm)}
              >
                {elm.title}
              </ListItem>
            ))
          ) : (
            <NotFound>No result found</NotFound>
          )}
        </SuggestionArea>
      )}
    </SearchContainer>
  );
};

export default SearchInput;
