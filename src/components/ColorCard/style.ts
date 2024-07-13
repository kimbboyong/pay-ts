import styled from "styled-components";

interface CardValueProps {
  CardValue?: string;
  size?: string;
}

export const Container = styled.div<CardValueProps>`
  em {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    font-size: 12px;
    color: #fff;
    background-color: ${(props) => {
      if (props.color === "blue") return "#4392ff";
      if (props.color === "red") return "#f17373";
      if (props.color === "yellow") return "#e2c235";
      if (props.color === "green") return "#91c66c";
      if (props.CardValue === "완료") return "#4392ff";
      if (props.CardValue === "진행중") return "#e2c235";
      return "#fff";
    }};

    ${(props) => {
      if (props.size === "full") {
        return `
      width:100%;
      padding: 15px;   
    `;
      }
      if (props.size === "free") {
        return `
    width: auto;
    
  `;
      }
    }}
  }
`;
