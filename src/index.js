import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import adapter from "webrtc-adapter";

import store from "../src/app/configureStore";
import App from "./app/App";
import GlobalStyle from "./common/components/GlobalStyle";
import reportWebVitals from "./reportWebVitals";

console.log(adapter.browserDetails.browser);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
