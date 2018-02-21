import { IContact } from "./../@types/interfaces";
import { ADD_CONTACT, GET_CONTACTS } from "./../actions/contact-acton";
import { AnyAction } from "redux";

const initState: IContact | any = [];
export const contactsReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case GET_CONTACTS:
      return [...action.payload];
    case ADD_CONTACT:
      return [...state, action.payload];
    default:
      return state;
  }
};
