import styled from "styled-components";

export const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const VideoList = styled.div`
  background: #000;
  border-radius: 5px;
  max-height: 80vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background: red;
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
  color: ${({active}) => (active ? "#fff" : "#000")};

  &:hover {
    background: ${({active}) => (active ? "" : "lightgrey")};
    ${"" /* color: ${({active}) => (active ? "" : "white")}; */}
  }
`;

export const Video = styled.video`
  width: 100px;
  border-radius: 5px;
`;

export const Title = styled.h3`
  font-size: 17px;
`;

export const WidgetContainer = styled.div`
  border-radius: 5px;
  background: #fff;
  font-size: 18px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  position: relative;
`;

export const ShuffleContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-right-style: solid;
  border-right-color: #ccc;
  border-right-width: 1px;
  padding: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  ${
    "" /* 
  &:hover {
    background: lightgrey;
  } */
  }
`;

export const FilterContainer = styled.div`
  height: 100%;
  width: 15%;
  padding: 10px;
  text-align: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  ${
    "" /* &:hover {
    background: lightgrey;
  } */
  }
`;

export const UnorderedList = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 1;
  right: 0px;
  top: 50px;
  background: #fff;
  border: 1.5px solid #000;
  border-radius: 5px;
`;

export const ListItem = styled.li`
  padding: 10px 20px;
  cursor: default;
  background: ${({active}) => (active ? "red" : "")};
  color: ${({active}) => (active ? "#fff" : "")};

  &:hover {
    text-decoration: underline;
  }
`;
