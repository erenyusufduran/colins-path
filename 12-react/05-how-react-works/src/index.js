import React from "react";

import ReactDOM from "react-dom/client";
// import ReactDOM from 'react-dom';

import App from "./App";
import "./index.css";
import CurrencyConverter from "./component/CurrencyConverter";

// REACT 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <CurrencyConverter />
  </React.StrictMode>
);

// REACT 17
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
