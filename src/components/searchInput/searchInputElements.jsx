import styled from "styled-components";

export const SearchContainer = styled.div`
  ${"" /* background: gray; */}
  width: 100%;
  display: flex;
  ${"" /* align-items: center; */}
  justify-content: center;
  border-radius: 5px;
  margin: 20px 0px 30px 0px;
`;

export const InputContainer = styled.div`
  width: 40%;
  background: #121212;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  border: 0.1px solid #dbdbdb;
  transition: 0.4s ease-in;

  @media only screen and (max-width: 991px) {
    width: 50%;
  }

  @media only screen and (max-width: 768px) {
    width: 60%;
  }

  @media only screen and (max-width: 480px) {
    width: 90%;
  }
  ${"" /* background: red; */}
`;

export const InputField = styled.input`
  padding: 12px;
  outline: none;
  ${"" /* border-radius: 14px; */}
  font-size: 16px;
  font-weight: 800;
  width: 85%;
  border: none;
  background: #121212;
  color: #fff;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-left: 10px;
`;

export const SearchIcon = styled.div`
  background: #26282a;
  width: 15%;
  height: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-left-style: solid;
  border-left-color: #dbdbdb;
  border-left-width: 0.1px;
`;
