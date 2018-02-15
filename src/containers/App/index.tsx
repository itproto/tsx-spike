import * as React from "react";
import "./App.css";

import * as firebase from "firebase";
import config from "./firebase-config";
import { ReactElement } from "react";

class App extends React.Component<any, any> {
  state = { posts: [], loading: false };
  constructor(props: any) {
    super(props);
    firebase.initializeApp(config);
  }

  get postsRef() {
    return firebase.database().ref("posts");
  }

  get fdb() {
    return firebase.database();
  }

  componentWillMount() {
    this.postsRef.on("value", (snapshot: any) => {
      console.log(snapshot.val());

      this.setState({
        posts: snapshot.val(),
        loading: false
      });
    });
  }

  public render() {
    const { children } = this.props;
    const { posts, loading } = this.state;
    return (
      <div className="App">
        {children &&
          React.cloneElement(children as ReactElement<any>, {
            posts,
            loading,
            postsRef: this.postsRef,
            fdb: this.fdb
          })}
      </div>
    );
  }
}

export default App;
