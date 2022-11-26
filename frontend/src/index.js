import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bulma/css/bulma.css";
import "antd/dist/antd.min.css";
import "aos/dist/aos.css";
import "./global.css";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
