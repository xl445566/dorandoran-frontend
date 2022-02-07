import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Rooms from "../feature/rooms/Rooms";
import Login from "../feature/auth/Login";
import VideoChat from "../feature/videochat/VideoChat";

function App() {
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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/login"></Route>
        <Route path="/" exact>
          <Rooms />
        </Route>
        <Route path="/rooms">
          <h1>노인정 방 리스트</h1>
        </Route>
        <Route path="/video/:roomId">
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
