import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchContacts } from "../actions/contact-acton";
import { Component } from "react";
import { IContact } from "../@types/interfaces";

class ContactListPageCore extends Component<any, any> {
  componentDidMount() {
    const { fetchContacts } = this.props;
    fetchContacts();
  }
  render() {
    const { contacts } = this.props;
    if (!contacts) {
      return <div>No Contacts</div>;
    }
    return <div>{contacts.map((contact: IContact) => contact.name.last)}</div>;
  }
}

export const ContactListPage = connect(
  (state: any) => ({
    contacts: state.contacts
  }),
  (dispatch: any) => ({
    fetchContacts: bindActionCreators(fetchContacts, dispatch)
  })
)(ContactListPageCore);
