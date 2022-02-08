import React from "react";
import styled from "styled-components";

const Button = ({ onClick, text, type, size }) => {
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
      {size === "large" && (
        <Large onClick={onClick} type={type}>
          {text}
        </Large>
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
      border-bottom: 2px solid var(--black-color);
      border-radius: 0;
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

export default Button;
