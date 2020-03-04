import axios from "axios";
import {
  FILMS_FAILURE,
  FILMS_REQUEST,
  FILMS_SUCCESS
} from "../types/character";

const requestFilms = () => ({
  type: FILMS_REQUEST,
});

const successFilms = (data) => ({
  type: FILMS_SUCCESS,
  payload: {
    ...data,
  },
});

const failureFilms = (error) => ({
  type: FILMS_FAILURE,
  payload: {
    error,
  },
});

export const getFilms = (films) => {
  const titles = [];
  return async (dispatch) => {
    dispatch(requestFilms());
    await Promise.all(films.map((v) => axios.get(v)))
      .then((resolvedValues) => {
        resolvedValues.forEach(({ data }) => {
          titles.push(data.title);
        });
        dispatch(successFilms(titles));
      })
      .catch((err) => {
        dispatch(failureFilms(err.message));
      });
  };
};
