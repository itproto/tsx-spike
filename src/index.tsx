import * as React from "react";
import * as ReactDOM from "react-dom";
import "semantic-ui-css/semantic.css";
import "./index.css";
import registerServiceWorker from "./utils/registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
