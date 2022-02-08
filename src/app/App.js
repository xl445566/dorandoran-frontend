import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Rooms from "../feature/rooms/Rooms";
import Login from "../feature/auth/Login";
import VideoChat from "../feature/videochat/VideoChat";
import Room from "../feature/room/Room";

function App() {
  // const history = useHistory();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     history.push("/login");
  //   }
  // }, [isLoggedIn]);
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
          <Room />
        </Route>
        <Route path="/video">
          <h1>화상채팅</h1>
          <VideoChat />
        </Route>
        <Route path="/error">
          <h1>에러페이지</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
