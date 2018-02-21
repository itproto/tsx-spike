import { Dispatch, AnyAction } from "redux";

export const ADD_CONTACT = "add/contact";
export const GET_CONTACTS = "get/contact";

import { contacts } from "./../contacts-data";

export const fetchContacts = (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: GET_CONTACTS,
    payload: contacts
  });
};
