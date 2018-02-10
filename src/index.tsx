import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./utils/registerServiceWorker";

import { browserHistory } from "react-router";
import Routes from "./routes";

ReactDOM.render(<Routes history={browserHistory} />, document.getElementById(
  "root"
) as HTMLElement);
registerServiceWorker();
