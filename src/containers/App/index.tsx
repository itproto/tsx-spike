import * as React from "react";
import "./App.css";

import { handler } from "../../gql/schema";
import { comments } from "../../gql/queries";

const query = comments({ commentId: 1 });
class App extends React.Component<any, any> {
  componentDidMount() {
    handler(query).then(resp => {
      console.warn(query);
    });
  }
  public render() {
    return <div className="App">Hello World</div>;
  }
}

export default App;
