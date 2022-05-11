import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import urljoin from "url-join";
import App from "./App";
import { AuthProvider } from "./features/users/auth/auth.context";
import "./index.css";

axios.defaults.baseURL = "/api/v1/";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
