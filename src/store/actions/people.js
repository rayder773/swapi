import axios from 'axios';

import { DEFAULT_URL } from '../../constants';
import { CHARACTER_SUCCESS, PEOPLE_FAILURE, PEOPLE_REQUEST, PEOPLE_SUCCESS } from '../types/people';

const successPeopleList = (data) => ({
  type: PEOPLE_SUCCESS,
  payload: {
    ...data,
  },
});

const requestPeopleList = () => ({
  type: PEOPLE_REQUEST,
});

const failurePeopleList = (error) => ({
  type: PEOPLE_FAILURE,
  payload: {
    error,
  },
});

export const getPeople = (url = DEFAULT_URL) => {
  return (dispatch) => {
    dispatch(requestPeopleList());
    axios
      .get(url)
      .then((res) => {
        dispatch(successPeopleList(res.data));
      })
      .catch((err) => {
        dispatch(failurePeopleList(err.message));
      });
  };
};
