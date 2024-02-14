import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {
  Title,
  Video,
  VideoContent,
  VideoList,
  WidgetContainer,
  PlaylistContainer,
} from "./playlistElements";
import {
  shufflePlaylist,
  reorderPlaylist,
} from "../../redux/slices/playlistSlice";

const Playlist = ({onClick, active}) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.videos);

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
    dispatch(shufflePlaylist(temp));
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

  return (
    <PlaylistContainer>
      <WidgetContainer
        onClick={handleClick}
        tabIndex={1}
        onKeyDown={handleKeyDown}
      >
        Shuffle Videos
        <i className="fa-solid fa-shuffle" style={{marginLeft: "10px"}}></i>
      </WidgetContainer>
      <VideoList>
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
