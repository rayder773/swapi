import axios from 'axios';

import { DEFAULT_URL } from '../../constants';
import {
  CHARACTER_SUCCESS,
  PEOPLE_ADD_TO_FAVORITE, PEOPLE_CHANGE_CURRENT_PAGE,
  PEOPLE_FAILURE, PEOPLE_REMOVE_FROM_FAVORITE,
  PEOPLE_REQUEST, PEOPLE_SERCHED_SUCCESS,
  PEOPLE_SUCCESS
} from '../types/people';

const successPeopleList = (data, isSearched) => {
  const { results } = data;
  results.forEach((item) => {
    return item.isFavorite = false;
  });

  return {
    type: isSearched ? PEOPLE_SERCHED_SUCCESS : PEOPLE_SUCCESS,
    payload: {
      results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    },
  }
};

const requestPeopleList = () => ({
  type: PEOPLE_REQUEST,
});

const failurePeopleList = (error) => ({
  type: PEOPLE_FAILURE,
  payload: {
    error,
  },
});

export const addToFavorite = (newList) => ({
  type: PEOPLE_ADD_TO_FAVORITE,
  payload: newList,
});

export const removeFromFavorite = (character) => ({
  type: PEOPLE_REMOVE_FROM_FAVORITE,
  payload: character,
});

export const changeCurrentPage = (page) => ({
  type: PEOPLE_CHANGE_CURRENT_PAGE,
  payload: page,
})

export const getPeople = (url = DEFAULT_URL, isSearched = false) => {
  return (dispatch) => {
    dispatch(requestPeopleList());
    axios
      .get(url)
      .then((res) => {
        dispatch(successPeopleList(res.data, isSearched));
      })
      .catch((err) => {
        dispatch(failurePeopleList(err.message));
      });
  };
};
