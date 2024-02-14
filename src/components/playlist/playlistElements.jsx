import styled from "styled-components";

export const VideoList = styled.div`
  background: #fff;
  border-radius: 5px;
  height: 520px;
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
  background: ${({active}) => (active ? "#2980b9" : "#f7f7f7")};
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
