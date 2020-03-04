import {FILMS_FAILURE, FILMS_REQUEST, FILMS_SUCCESS} from "../types/character";

const initialState = {
  isFetching: false,
  films: {},
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FILMS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FILMS_SUCCESS:
      return {
        ...state,
        films: action.payload,
        isFetching: false,
      };
    case FILMS_FAILURE:
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
}