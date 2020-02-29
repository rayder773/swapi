import { CHARACTER_FAILURE, CHARACTER_REQUEST, CHARACTER_SUCCESS } from '../types/character';

const initialState = {
  isFetching: false,
  character: {},
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHARACTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CHARACTER_SUCCESS:
      return {
        ...state,
        character: action.payload,
        isFetching: false,
      };
    case CHARACTER_FAILURE:
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
}