import styled from "styled-components"

export const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
`
export const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
`
export const ModalContainer = styled.div`
  width: 90%;
  height: auto;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #fff;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`

export const ModalCloseBtn = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  background-color: transparent;
  border-radius: 10px;
  color: #333;
  margin-top: 30px;
`
