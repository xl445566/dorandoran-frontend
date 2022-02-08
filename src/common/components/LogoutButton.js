import React from "react";
import styled from "styled-components";

const LogoutButton = ({ onClick }) => {
  return (
    <Logout onClick={onClick}>
      <span>
        <img src={"./assets/logout.png"} />
      </span>
      로그아웃
    </Logout>
  );
};

const Logout = styled.button`
  width: 95px;
  border-radius: 0;
  border-bottom: 2px solid var(--black-color);
  font-size: 20px;
  font-weight: bold;
  &:hover {
    border-bottom: 2px solid var(--scarlet-color);
    color: var(--scarlet-color);
  }

  span {
    display: inline-block;
    margin-right: 6px;
  }

  span img {
    object-fit: cover;
  }
`;

export default LogoutButton;
