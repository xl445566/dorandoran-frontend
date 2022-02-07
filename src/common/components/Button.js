import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = ({ onClick, text, type, size, color, img }) => {
  return (
    <>
      {size === "small" && (
        <Small onClick={onClick} type={type}>
          {text}
        </Small>
      )}
      {size === "medium" && (
        <Medium onClick={onClick} type={type}>
          {text}
        </Medium>
      )}
      {size === "large" && <Large type={type}>{text}</Large>}
      {type === "logout" && (
        <Logout onClick={onClick} color={color} img={img}>
          {text}
        </Logout>
      )}
    </>
  );
};

const Small = styled.button`
  width: 85px;
  border-radius: 20px;
  background-color: var(--dark-orange-color);
  color: var(--white-color);
  font-size: 18px;

  ${({ type }) => {
    return type === "refresh"
      ? `
      border-radius: 0;
      border-bottom: 2px solid var(--black-color);
      background: url('./assets/refresh.png') no-repeat 0% 45%;
      color: var(--black-color);
      font-weight: bold;
      text-align: right;
      `
      : null;
  }};
`;

const Medium = styled.button`
  width: 120px;
  border-radius: 20px;
  background-color: var(--dark-orange-color);
  color: var(--white-color);
  font-size: 18px;
  font-weight: bold;
  &:hover {
    border: 2px solid var(--scarlet-color);
    background-color: var(--white-color);
    color: var(--dark-orange-color);
  }

  ${({ type }) => {
    return type === "cancel"
      ? `
      border 2px solid var(--scarlet-color);
      background: none;
      color: var(--scarlet-color);
      &:hover {
        background-color: var(--dark-orange-color);
        color: var(--white-color);
      }
      `
      : null;
  }}
`;

const Large = styled.button`
  width: 160px;
  border-radius: 20px;
  background-color: var(--dark-orange-color);
  color: var(--white-color);
  font-size: 24px;
  font-weight: bold;

  &:hover {
    border: 2px solid var(--scarlet-color);
    background-color: var(--white-color);
    color: var(--dark-orange-color);
  }

  ${({ type }) => {
    return type === "color"
      ? `
    background-color: var(--white-color);
    color: var(--scarlet-color);
    `
      : null;
  }}
`;

const Logout = styled.button`
  ${({ color, img }) => {
    return color
      ? `
    width: 95px;
    border-radius: 0;
    border-bottom: 2px solid ${color};
    background: url(${img}) no-repeat 0% 45%;
    color: ${color};
    font-size: 20px;
    font-weight: bold;
    text-align: right;
    `
      : null;
  }}
`;

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  img: PropTypes.string,
};

export default Button;
