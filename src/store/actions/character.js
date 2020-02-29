import axios from "axios";
import {DEFAULT_URL} from "../../constants";
import {CHARACTER_FAILURE, CHARACTER_REQUEST, CHARACTER_SUCCESS} from "../types/character";

const requestCharacter = () => ({
  type: CHARACTER_REQUEST,
});

const successCharacter = (data) => ({
  type: CHARACTER_SUCCESS,
  payload: {
    ...data,
  },
});


const failureCharacter = (error) => ({
  type: CHARACTER_FAILURE,
  payload: {
    error,
  },
});


export const getPerson = (id = 1) => {
  return (dispatch) => {
    dispatch(requestCharacter());
    axios
      .get(`${DEFAULT_URL}/${id}`)
      .then((res) => {
        dispatch(successCharacter(res.data));
      })
      .catch((err) => {
        dispatch(failureCharacter(err.message));
      });
  };
};