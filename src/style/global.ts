import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
`;

export const Wrap = styled.div`
  padding: 80px 15px;
  height: 100%;
`;
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
`;
export const RadioBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
