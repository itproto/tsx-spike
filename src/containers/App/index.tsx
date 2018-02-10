import * as React from "react";
import "./App.css";

import * as firebase from "firebase";
import config from "./firebase-config";

class App extends React.Component<any, any> {
  componentDidMount() {
    firebase.initializeApp(config);
  }
  public render() {
    return <div className="App">Hello World</div>;
  }
}

export default App;
