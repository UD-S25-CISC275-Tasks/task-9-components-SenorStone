// You will not need to modify this file

import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom/client";
=======
import ReactDOM from "react-dom";
>>>>>>> solved-components
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

<<<<<<< HEAD
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
=======
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
>>>>>>> solved-components
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
