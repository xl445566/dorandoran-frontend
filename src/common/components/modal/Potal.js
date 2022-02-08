import React from "react";

import ReactDOM from "react-dom";

function Portals({ children }) {
  const modalElement = document.getElementById("overlay-root");

  return ReactDOM.createPortal(children, modalElement);
}

export default React.memo(Portals);
