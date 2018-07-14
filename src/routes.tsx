import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./app/app";

const Routes = (props: any) => (
  <Router {...props}>
    <Route path="/" component={App} />
  </Router>
);

export default Routes;
