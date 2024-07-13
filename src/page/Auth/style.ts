import styled from "styled-components";

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 15px;
`;
export const Inner = styled.div`
  margin-bottom: 10px;
`;
export const AuthInput = styled.input``;

export const AuthButton = styled.button`
  border-radius: 10px;
  padding: 10px;
  color: #fff;
  background-color: #4392ff;
  cursor: pointer;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  &.backBtn {
    background-color: #f17373;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  font-size: 14px;
  color: #f17373;
`;
