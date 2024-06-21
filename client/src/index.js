import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import AppContext from "./utils/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContext>
    <App />
  </AppContext>
);
