import * as React from "react";
import "./App.css";
/*
import axios from "axios";*/
import clean from "../../query-utils";

import { handler } from "../../gql/schema";

const query = clean`{
  comment(id: 2) {
    content,
    id,
    user {
      id,
      name
    },
    post{
      title,
      user {
        id,
        posts{
          title
        }
      }
    }
    
  }
}`;

/*
const Gql = () => {
  return 'foo'
};
const foo = (
  <Gql name="foo">
  </Gql>
)
*/
const _ = (name, val = _) => {
  return { [name]: _ };
};
const content = { content: _ };
const id = _("id");

const jsonQuery = {
  comment: {
    _: { id: 2 },
    ...id,
    ...content,
    user: {
      ...id,
      name: _
    },
    post: {
      title: _,
      user: {
        ...id
      }
    }
  }
};

class App extends React.Component<any, any> {
  componentDidMount() {
    handler(query).then(resp => {
      console.warn(query);
    });

    /*
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
    });*/
  }
  public render() {
    return <div className="App">Hello World</div>;
  }
}

export default App;
