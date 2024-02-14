import styled from "styled-components";

export const VideoContainer = styled.div`
  background-color: #000;
  border-radius: 5px;
  padding: 10px;
`;

export const VideoPlayer = styled.div``;

export const Video = styled.video`
  width: 100%;
  border-radius: 5px;
`;

export const Title = styled.h3`
  color: #fff;
  font-size: 30px;
  padding-top: 15px;
  font-weight: 900;
`;

export const Description = styled.p`
  padding: 15px 0;
  color: #fff;
  font-size: 18px;
  transition: 0.4s ease;

  @media only screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

export const SubTitle = styled.span`
  margin: 20px 0;
  font-weight: 600;
  color: #fff;
`;
