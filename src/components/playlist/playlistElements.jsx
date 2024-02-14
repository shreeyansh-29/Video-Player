import styled from "styled-components";

export const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const VideoList = styled.div`
  background: #000;
  border-radius: 5px;
  height: 80vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: #ccc;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 50px;
  }
`;
export const VideoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: ${({active}) => (active ? "red" : "#f7f7f7")};
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: ${({active}) => (active ? "" : "#eee")};
  }
`;

export const Video = styled.video`
  width: 100px;
  border-radius: 5px;
`;

export const Title = styled.h3`
  color: ${({active}) => (active ? "#fff" : "#333")};
  font-size: 17px;
`;

export const WidgetContainer = styled.div`
  border-radius: 5px;
  background: #fff;
  padding: 10px 0px;
  font-size: 18px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: red;
    color: #fff;
  }
`;
