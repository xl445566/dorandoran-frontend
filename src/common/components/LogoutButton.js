import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authSliceActions } from "../../modules/slice/authSlice";

const LogoutButton = () => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (response) {
        console.log("연결끊기 성공결과", response);
        dispatch(authSliceActions.logoutRequest({ _id: user._id }));
      },
      fail: function (error) {
        console.log("error", error);
        if (error.msg === "this access token does not exist") {
          console.log("Not logged in.");
          return;
        }
      },
    });
  };
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn]);

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
