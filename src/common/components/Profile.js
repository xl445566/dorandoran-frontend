import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Profile = ({ img, name }) => {
  return (
    <>
      {img === "women" && (
        <ProfileContent img={img}>
          <div>{name}</div>
        </ProfileContent>
      )}
    </>
  );
};

const ProfileContent = styled.div`
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background: red url("./assets/women.png") no-repeat 0% 45% 100% 100%;

  div {
    width: 200px;
    height: 20px;
    color: red;
    background: grey;
  }

  ${({ img }) => {
    return img
      ? `
      background: red url('./assets/women.png');
      background-position:center;
      background-size:cover;
      background-repeat:no-repeat;

      `
      : null;
  }}
`;

Profile.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};

export default Profile;
