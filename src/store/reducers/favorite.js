import {SET_FAVORITE_LIST} from "../types/favoriteList";

const initialState = {
  favoriteList: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITE_LIST:
      return {
        ...state,
        favoriteList: action.payload,
      };
    default:
      return state;
  }
}