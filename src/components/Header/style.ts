import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #4392ff;
  border-bottom: 1px solid #ddd;
`;

export const Inner = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  position: relative;
`;

export const HeaderInfo = styled.div`
  display: flex;
  gap: 10px;
  span {
    font-size: 15px;
    color: #fff;
    cursor: pointer;
  }
`;
