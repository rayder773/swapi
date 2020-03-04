import { combineReducers } from 'redux';
import people from "./people";
import character from "./character";
import favorite from "./favorite";
import films from "./films";
import starships from "./starships";
import species from "./species";

export default combineReducers({
  people,
  character,
  favorite,
  films,
  starships,
  species,
});
