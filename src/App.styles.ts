import styled from "styled-components";

export const Container = styled.div`
  background-color: #27282f;
  min-height: 100vh;
  color: #fff;
`;

export const Area = styled.div`
  margin: auto;
  padding: 30px 0;
  width: 980px;
`;

export const Header = styled.h1`
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
  text-align: center;
`;
export const ScreenWarning = styled.div`
  text-align: center;

  .emoji {
    font-size: 50px;
    margin-bottom: 20px;
  }
`;

export const PhotoList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
