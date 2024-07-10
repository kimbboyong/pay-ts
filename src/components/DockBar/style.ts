import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 60px;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background-color: #fff;
  border-top: 1px solid #ddd;
`

export const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  svg {
    cursor: pointer;
  }
`
