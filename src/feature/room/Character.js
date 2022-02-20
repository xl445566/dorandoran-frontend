import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import Profile from "../../common/components/Profile";

const Character = ({ count, isChatting, x, y, side, name, type, profile }) => {
  const sides = {
    down: [0, -70],
    left: [-71, -70],
    right: [-142, -70],
    up: [-213, -70],
  };

  return (
    <>
      {isChatting ? (
        <>
          <Profile left={x * 60} top={y * 60} type={profile} text={name} />
        </>
      ) : (
        <Container
          count={count}
          xPos={64}
          yPos={69}
          left={x * 60}
          top={y * 60}
          sidePos={sides[side]}
          type={type}
        >
          <UserName>{name}</UserName>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.xPos}px;
  height: ${(props) => props.yPos}px;
  background-image: url(${(props) => props.type});
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

Character.propTypes = {
  count: PropTypes.number,
  isChatting: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  side: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
};

export default Character;
