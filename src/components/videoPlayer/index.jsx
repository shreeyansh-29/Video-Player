import {
  VideoContainer,
  VideoPlayer,
  Video,
  Title,
  Description,
} from "./videoPlayerElements";
import {mediaJSON} from "../../constants/data";
import {useState} from "react";

const MainVideoPlayer = ({mainVideo}) => {
  return (
    <>
      <VideoContainer>
        <VideoPlayer>
          <Video src={mainVideo.sources} controls autoPlay />
          <Title>{mainVideo.title}</Title>
          <Description>{mainVideo.description}</Description>
        </VideoPlayer>
      </VideoContainer>
    </>
  );
};

export default MainVideoPlayer;
