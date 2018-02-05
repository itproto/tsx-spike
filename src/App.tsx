import * as React from "react";
import "./App.css";

class App extends React.Component<any, any> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to hell</h1>
          <Test />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

interface Props {}

const Test: React.SFC<Props> = props => {
  return <div>Hello</div>;
};

export default App;
