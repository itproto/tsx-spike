import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";

import Routes from "./routes";
import registerMyServiceWorker from "./utils/registerMyServiceWorker";

ReactDOM.render(<Routes />, document.getElementById("root") as HTMLElement);
registerMyServiceWorker();
