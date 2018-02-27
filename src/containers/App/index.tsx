import * as React from "react";
import "./App.css";

import axios from "axios";
import clean from "../../query-utils";

class App extends React.Component<any, any> {
  componentDidMount() {
    const id = 1;
    const query = clean`{
      movie(index:${id}) {
        title,
        cover,
        year,
        starring {
          name
        }
      }
    }`;
    axios.get(`/q?=query=${query}`).then(resp => {
      console.info(resp);
    });
  }
  public render() {
    return <div className="App">Hello World</div>;
  }
}

export default App;
