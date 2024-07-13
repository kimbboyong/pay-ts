import styled from "styled-components";

export const CalcForm = styled.form`
  .calcLabel {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const InputScroll = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 30px;
`;

export const AddBtn = styled.button`
  width: 100%;
  padding: 10px;

  background-color: #4392ff;
  border-radius: 10px;
  color: #fff;
  margin-bottom: 10px;

  /* &::after {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::before {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
  } */
`;

export const EndBtn = styled.button`
  width: 100%;
  padding: 10px;
  color: #4392ff;
  background-color: transparent;
  border: 1px solid #4392ff;
  border-radius: 10px;
`;

export const RemoveBtn = styled.button`
  display: block;
  width: 20px;
  height: 20px;
  margin: auto;
  border-radius: 50%;
  background-color: #f17373;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const MemberList = styled.div`
  display: flex;
  gap: 10px;
  span {
    border-radius: 10px;
    background-color: #f00;
    padding: 5px;
    font-size: 12px;
    color: #fff;
  }
`;

export const PreviewElement = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: -47px;
  width: 100%;
  height: auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 3px 2px 12px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;
