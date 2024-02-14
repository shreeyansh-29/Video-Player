import {
  VideoContainer,
  VideoPlayer,
  Video,
  Title,
  Description,
  SubTitle,
} from "./videoPlayerElements";

const MainVideoPlayer = ({mainVideo}) => {
  return (
    <>
      <VideoContainer>
        <VideoPlayer>
          <Video
            src={mainVideo.sources}
            controls
            autoPlay
            buffer
            id="video"
            muted
            poster={mainVideo.thumb}
          />
          <Title>{mainVideo.title}</Title>
          <Description>
            <b>About:</b> {mainVideo.description}
          </Description>
          <SubTitle>{mainVideo.subtitle}</SubTitle>
        </VideoPlayer>
      </VideoContainer>
    </>
  );
};

export default MainVideoPlayer;
