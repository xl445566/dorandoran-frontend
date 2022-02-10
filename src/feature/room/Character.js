import React from "react";

import styled from "styled-components";

const Character = ({ count, x, y, side, name }) => {
  const sides = {
    down: [-67, -70],
    left: [-140, -70],
    right: [-214, -70],
    up: [-290, -70],
  };

  return (
    <Container
      count={count}
      xPos={64}
      yPos={72}
      left={x * 60}
      top={y * 60}
      sidePos={sides[side]}
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
  background-image: url("/assets/character-big3.png");
  background-position: ${(props) => props.count * props.sidePos[1]}px
    ${(props) => props.sidePos[0]}px;
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
