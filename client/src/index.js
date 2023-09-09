import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { Contexto } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Contexto>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Contexto>
);
