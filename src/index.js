import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MainContextProvider } from "./contexts/MainContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MainContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MainContextProvider>
);
