import React from "react";

import styled from "styled-components";

const Character = ({ count, x, y, side, name }) => {
  // const size = 32;
  const sides = {
    down: 0,
    left: -71,
    right: -140,
    up: -211,
  };
  return (
    <Container
      count={count}
      xPos={67}
      yPos={70}
      left={x * 60}
      top={y * 60}
      sidePos={sides[side] ?? 0}
    >
      <UserName>{name}</UserName>
    </Container>
  );
};

const Container = styled.div`
  width: ${(props) => props.xPos}px;
  height: ${(props) => props.yPos}px;
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  background-image: url("/assets/character-big.png");
  background-position: ${(props) => props.count * props.sidePos}px
    ${(props) => props.sidePos}px;
`;

const UserName = styled.p`
  position: relative;
  top: 80px;
  right: 15px;
  width: 100px;
  border-radius: 10px;
  background: #0000007d;
  color: #fff;
  font-size: 15px;
`;

export default Character;
