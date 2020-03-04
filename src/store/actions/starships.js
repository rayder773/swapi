import axios from "axios";
import {STARSHIPS_FAILURE, STARSHIPS_REQUEST, STARSHIPS_SUCCESS} from "../types/starships";

const requestStarships = () => ({
  type: STARSHIPS_REQUEST,
});

const successStarships = (data) => ({
  type: STARSHIPS_SUCCESS,
  payload: {
    ...data,
  },
});

const failureStarships = (error) => ({
  type: STARSHIPS_FAILURE,
  payload: {
    error,
  },
});

export const getStarships = (starships) => {
  const names = [];
  return async (dispatch) => {
    dispatch(requestStarships());
    await Promise.all(starships.map((v) => axios.get(v)))
      .then((resolvedValues) => {
        resolvedValues.forEach(({ data }) => {
          names.push(data.name);
        });
        dispatch(successStarships(names));
      })
      .catch((err) => {
        dispatch(failureStarships(err.message));
      });
  };
};
