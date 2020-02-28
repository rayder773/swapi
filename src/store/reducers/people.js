import {PEOPLE_FAILURE, PEOPLE_REQUEST, PEOPLE_SUCCESS} from "../types/people";

const initialState = {
  peopleList: [],
  isFetching: false
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
        peopleList: action.payload,
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