import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./common/components/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/app/configureStore";
import App from "./app/App";

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
