import {useRef, useEffect} from "react";
import {
  VideoContainer,
  VideoPlayer,
  Video,
  Title,
  Description,
  SubTitle,
} from "./videoPlayerElements";

const MainVideoPlayer = ({
  mainVideo,
  playlist,
  active,
  handleSetActive,
  handleSetMainVideo,
}) => {
  const videoRef = useRef(null);

  /**
   * Auto updating main video if current video gets over
   */
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoEnd = () => {
      const nextIndex = (active + 1) % playlist.length;
      setMainVideoAndPlay(nextIndex);
    };

    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [active, playlist]);

  /**
   * Event for updation of main video and active video index
   * @param {Number} index
   */
  const setMainVideoAndPlay = (index) => {
    handleSetMainVideo(playlist[index]);
    handleSetActive(index);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <VideoContainer>
      <VideoPlayer>
        <Video
          tabIndex={20}
          ref={videoRef}
          src={mainVideo.sources}
          controls
          autoPlay
          id="video"
          muted
          poster={mainVideo.thumb}
          controlsList="nodownload"
        />
        <Title>{mainVideo.title}</Title>
        <Description>
          <b>About:</b> {mainVideo.description}
        </Description>
        <SubTitle>{mainVideo.subtitle}</SubTitle>
      </VideoPlayer>
    </VideoContainer>
  );
};

export default MainVideoPlayer;
