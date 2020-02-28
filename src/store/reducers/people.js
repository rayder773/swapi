import { PEOPLE_FAILURE, PEOPLE_REQUEST, PEOPLE_SUCCESS } from '../types/people';

const initialState = {
  results: [],
  isFetching: false,
  count: 0,
  next: null,
  previous: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PEOPLE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PEOPLE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      };
    case PEOPLE_FAILURE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}