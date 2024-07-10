import styled from "styled-components"

interface CardValueProps {
  CardValue?: string
  position?: string
  size?: string
}

export const Container = styled.div<CardValueProps>`
  ${(props) =>
    props.position &&
    `
    position: absolute;
    top: 15px;
    right: 15px;
  `}
  em {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    font-size: 12px;
    color: #fff;
    background-color: ${(props) => {
      if (props.color === "blue") return "#4392ff"
      if (props.color === "red") return "#f17373"
      if (props.color === "yellow") return "#e2c235"
      if (props.color === "green") return "#91c66c"
      return "#fff"
    }};

    ${(props) =>
      props.size === "full" &&
      `
      width:100%;
      padding: 15px;    
  `}
  }
`
