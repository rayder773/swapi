import {SET_FAVORITE_LIST} from "../types/favoriteList";

export const setFavoriteList = (list) => ({
  type: SET_FAVORITE_LIST,
  payload: list,
});