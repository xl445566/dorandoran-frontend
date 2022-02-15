import React, { useEffect } from "react";

import { useBeforeunload } from "react-beforeunload";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, Router } from "react-router-dom";

import NotFound from "../common/components/NotFound";
import history from "../common/utils/history";
import Login from "../feature/auth/Login";
import Room from "../feature/room/Room";
import Rooms from "../feature/rooms/Rooms";
import VideoChat from "../feature/videochat/VideoChat";
import { authSliceActions } from "../modules/slice/authSlice";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const routerHistory = useHistory();

  useBeforeunload((event) => {
    event.preventDefault();
  });

  useEffect(() => {
    if (!user) {
      dispatch(authSliceActions.cookieClear());
      routerHistory.push("/");
    }
  }, [user]);

  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            {user && user.name ? <Rooms /> : <Login />}
          </Route>
          <Route path="/room/:roomId">
            <Room />
          </Route>
          <Route path="/video/:roomId">
            <VideoChat />
          </Route>
          <Route path="/error">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
