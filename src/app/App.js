import React, { useEffect } from "react";

import { useBeforeunload } from "react-beforeunload";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, Router } from "react-router-dom";

import Error from "../common/components/Error";
import NotFound from "../common/components/NotFound";
import constants from "../common/utils/constants";
import history from "../common/utils/history";
import Login from "../feature/Auth/Login";
import Room from "../feature/room/Room";
import Rooms from "../feature/Rooms/Rooms";
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
      routerHistory.push(constants.ROUTE_MAIN);
    }
  }, [user]);

  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path={constants.ROUTE_MAIN} exact>
            {user && user.name ? <Rooms /> : <Login />}
          </Route>
          <Route path={constants.ROUTE_ROOM}>
            <Room />
          </Route>
          <Route path={constants.ROUTE_VIDEO}>
            <VideoChat />
          </Route>
          <Route path={constants.ROUTE_ERROR}>
            <Error />
          </Route>
          <Route path={constants.ROUTE_NOTFOUND}>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
