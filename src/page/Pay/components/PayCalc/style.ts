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
`;

export const AddBtn = styled.button`
  width: 100%;
  padding: 10px;

  background-color: #4392ff;
  border-radius: 10px;
  color: #fff;
  margin-top: 30px;

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
