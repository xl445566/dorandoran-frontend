import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (response) {
        console.log("연결끊기 성공결과", response);
        history.push("/");
      },
      fail: function (error) {
        if (error.msg === "this access token does not exist") {
          console.log("Not logged in.");
          return;
        }
        console.log("error", error);
      },
    });
  };

  return <Button onClick={handleLogout}>logout</Button>;
};

const Button = styled.button`
  width: 150px;
`;

export default LogoutButton;
