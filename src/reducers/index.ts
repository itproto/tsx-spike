import { contactsReducer } from "./contact-reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  contacts: contactsReducer
});
