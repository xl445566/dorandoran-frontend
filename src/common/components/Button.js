import React from "react";

import styled from "styled-components";

import constants from "../utils/constants";

const Button = ({ onClick, text, type, size }) => {
  return (
    <>
      {size === constants.SIZE_S && (
        <Small onClick={onClick} type={type}>
          {text}
        </Small>
      )}
      {size === constants.SIZE_M && (
        <Medium onClick={onClick} type={type}>
          {text}
        </Medium>
      )}
      {size === constants.SIZE_L && (
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
  font-size: 18px;

  ${({ type }) => {
    return type === "refresh"
      ? `
      border-radius: 0;
      background: url('/assets/refresh.svg') no-repeat 0% 45%;
      color: var(--dark-gray-color);
      text-align: right;

      &:hover {
        background: url('/assets/scarletRefresh.svg') no-repeat 0% 45%;
        color: var(--scarlet-color);
        transition: all 0.25s ease-out;
      }
      `
      : null;
  }};
`;

const Medium = styled.button`
  padding: 5px 27px;
  border: 2px solid var(--scarlet-color);
  border-radius: 20px;
  background-color: var(--dark-orange-color);
  color: var(--white-color);
  font-size: 18px;
  font-weight: bold;

  &:hover {
    border: 2px solid var(--scarlet-color);
    background: none;
    color: var(--scarlet-color);
    transition: all 0.25s ease-out;
  }
`;

const Large = styled.button`
  width: 100px;
  padding: 5px 20px;
  border: 2px solid var(--scarlet-color);
  border-radius: 20px;
  background-color: var(--dark-orange-color);
  color: var(--white-color);
  font-size: 24px;
  font-weight: bold;

  &:hover {
    border: 2px solid var(--scarlet-color);
    background-color: var(--white-color);
    color: var(--scarlet-color);
    transition: all 0.25s ease-out;
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
