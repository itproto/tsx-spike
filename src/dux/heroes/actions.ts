import { action } from 'typesafe-actions';

// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const enum HeroesActionTypes {
  FETCH_REQUEST = '@@heroes/FETCH_REQUEST',
  FETCH_SUCCESS = '@@heroes/FETCH_SUCCESS',
  FETCH_ERROR = '@@heroes/FETCH_ERROR',
  SELECTED = '@@heroes/SELECTED'
}
import { HeroesActionTypes, Hero } from './types';

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(HeroesActionTypes.FETCH_REQUEST);

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Hero[]) =>
  action(HeroesActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) =>
  action(HeroesActionTypes.FETCH_ERROR, message);
