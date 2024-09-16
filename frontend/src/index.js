import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from "./context/AuthContext.js";
import { SocketContextProvider } from "./context/SocketContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
