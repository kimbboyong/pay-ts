import styled from "styled-components";

export const PayForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
export const FormInner = styled.div``;

export const Divide = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const PayBtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PaySubmit = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid #4392ff;
  border-radius: 10px;
  background-color: #fff;
  color: #4392ff;

  &.backBtn {
    border: 1px solid #f17373;
    color: #f17373;
  }
`;
