import styled from "styled-components";

export const PayTitle = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  span {
    font-size: 15px;
    &.active {
      display: block;
      color: #4392ff;
      padding-bottom: 5px;
      position: relative;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      background-color: #4392ff;
      height: 2px;
      transition: all 0.4s ease;
    }
    &.active::after {
      width: 100%;
    }
  }
`;

export const PayUl = styled.ul`
  height: 100%;
`;
export const PayList = styled.li`
  width: 100%;
  background-color: #fff;
  padding: 15px;
  box-shadow: 3px 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 5px;
    background-color: #4392ff;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const PayInner = styled.div``;
export const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Name = styled.strong`
  display: block;
  font-size: 13px;
  margin-bottom: 10px;
  color: #333;
`;
export const Money = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  p {
    font-size: 15px;
    color: #333;
    &::before {
      display: block;
      font-size: 12px;
      width: 100%;
      color: #333;
    }
  }
  .moneyMax {
    color: #4392ff;
    &::before {
      content: "총 금액";
    }
  }
  .moneyRemain {
    color: #f17373;
    &::before {
      content: "남은 금액";
    }
  }
`;

export const Date = styled.span`
  font-size: 12px;
  color: #a9a9a9;
`;

export const PayCreateBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4392ff;
  position: fixed;
  bottom: 75px;
  right: 15px;
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
    border-radius: 10px;
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
    border-radius: 10px;
  }
`;
