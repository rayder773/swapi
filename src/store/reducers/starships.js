import {STARSHIPS_FAILURE, STARSHIPS_REQUEST, STARSHIPS_SUCCESS} from "../types/starships";

const initialState = {
  isFetching: false,
  starships: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STARSHIPS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case STARSHIPS_SUCCESS:
      return {
        ...state,
        starships: action.payload,
        isFetching: false,
      };
    case STARSHIPS_FAILURE:
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
}