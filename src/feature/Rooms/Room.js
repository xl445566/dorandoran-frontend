import React from "react";
import styled from "styled-components";
import Profile from "../../common/components/Profile";

const Room = () => {
  return (
    <Entry>
      <Profile img="women" name="한지원 님" />
    </Entry>
  );
};

const Entry = styled.main`
  width: 200px;
  height: 200px;
  background-color: #f6f8f9;
`;

export default Room;
