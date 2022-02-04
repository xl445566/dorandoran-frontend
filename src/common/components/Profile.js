import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Profile = ({ type, text }) => {
  console.log(type);
  return (
    <>
      <ProfileContent>
        <img src={type} />
        <div>{text}</div>
      </ProfileContent>
    </>
  );
};

const ProfileContent = styled.div`
  div {
    width: 100%;
    padding: 10px 0;
    border-radius: 20px;
    background-color: var(--black-color);
    color: var(--white-color);
    font-size: 20px;
    text-align: center;
    opacity: 0.6;
  }
`;

Profile.propTypes = {
  type: PropTypes.string,
  gender: PropTypes.string,
  text: PropTypes.string,
};

export default Profile;
