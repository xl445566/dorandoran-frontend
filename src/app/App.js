import React, { useEffect } from "react";

import { useBeforeunload } from "react-beforeunload";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import Login from "../feature/auth/Login";
import Rooms from "../feature/rooms/Rooms";
import VideoChat from "../feature/videochat/VideoChat";
import { authSliceActions } from "../modules/slice/authSlice";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useBeforeunload((event) => {
    event.preventDefault();
  });

  useEffect(() => {
    if (!user) {
      dispatch(authSliceActions.cookieClear());
      history.push("/");
    }
  }, [user]);
  return (
    <>
      <ul>
        <li>
          <Link to="/rooms">3 . 방페이지로</Link>
        </li>
        <li>
          <Link to="/video">4 . 화상채팅페이지로</Link>
        </li>
        <li>
          <Link to="/error">5 . 에러페이지로</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/" exact>
          {user && user.name ? <Rooms /> : <Login />}
        </Route>
        <Route path="/rooms">
          <h1>노인정 방 리스트</h1>
        </Route>
        <Route path="/video">
          <VideoChat />
        </Route>
        <Route path="/error">
          <h1>에러페이지</h1>
          <p>에러내용</p>
        </Route>
      </Switch>
    </>
  );
}

export default App;
