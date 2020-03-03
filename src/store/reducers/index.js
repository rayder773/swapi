import { combineReducers } from 'redux';
import people from "./people";
import character from "./character";
import favorite from "./favorite";

export default combineReducers({
  people,
  character,
  favorite,
});
