import * as React from "react";
import * as ReactDOM from "react-dom";
import "semantic-ui-css/semantic.css";
import "./index.css";
import registerServiceWorker from "./utils/registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
