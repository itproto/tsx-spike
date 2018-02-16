import * as React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { NavLink, Route } from "react-router-dom";
import { ContactListPage } from "./pages/contact-list-page";
import { ContactFormPage } from "./pages/contact-form-page";

class App extends React.Component<any, any> {
  public render() {
    return (
      <Container>
        <div className="ui two item menu">
          <NavLink
            exact={true}
            to="/"
            className="item"
            activeClassName="active"
          >
            Contacts List
          </NavLink>
          <NavLink
            exact={true}
            to="/contacts/new"
            className="item"
            activeClassName="active"
          >
            New Item
          </NavLink>
        </div>
        <Route exact={true} path="/" component={ContactListPage} />
        <Route path="/contacts/new" component={ContactFormPage} />
        <Route path="/contacts/edit/:_id" component={ContactFormPage} />
      </Container>
    );
  }
}

export default App;
