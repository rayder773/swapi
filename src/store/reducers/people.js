import {
  PEOPLE_ADD_TO_FAVORITE,
  PEOPLE_CHANGE_CURRENT_PAGE,
  PEOPLE_FAILURE,
  PEOPLE_REMOVE_FROM_FAVORITE,
  PEOPLE_REQUEST, PEOPLE_SERCHED_SUCCESS, PEOPLE_SORT_PAGE,
  PEOPLE_SUCCESS
} from '../types/people';

// const initialState = {
//   results: [],
//   isFetching: false,
//   count: 0,
//   next: null,
//   previous: null,
//   error: null,
// };
const initialState = {
  pages: {},
  currentPage: 0,
  results: [], //
  isFetching: false,
  count: 0,
  next: null,
  previous: null,
  error: null,
};

export default function (state = initialState, action) {
  const {currentPage, pages} = state;

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
        pages: {
          ...state.pages,
          [currentPage + 1]: [...action.payload.results],
        },
        currentPage: currentPage + 1,
        results: [ //
          // ...state.results,
          ...action.payload.results,
        ],
        isFetching: false,
      };
    // case PEOPLE_SORT_PAGE:
    //   console.log(action.payload)
    //   return {
    //     ...state,
    //     pages: {
    //       ...pages,
    //       [action.payload]: pages[action.payload].sort((a, b) => {
    //         return a.name.localeCompare(b.name)
    //       }),
    //     }
    //   }
    case PEOPLE_SERCHED_SUCCESS:
      return {
        ...action.payload,
        pages: {
          1: [...action.payload.results],
        },
        currentPage: 1,
        isFetching: false,
      };
    case PEOPLE_FAILURE:
      return {
        ...initialState,
        error: action.payload,
      };
    case PEOPLE_ADD_TO_FAVORITE:
      return {
        ...state,
        pages: {
          ...state.pages,
          [currentPage]: action.payload,
        },
      };
    case PEOPLE_REMOVE_FROM_FAVORITE:
      let newPages = {};
      for(let key in state.pages) {
        newPages[key] = state.pages[key].map(item => {
          if (item.name === action.payload.name) {
            return {
              ...item,
              isFavorite: false,
            };
          } else {
            return item;
          }
        })
      }

      return {
        ...state,
        pages: {
          ...newPages,
        },
      };
    case PEOPLE_CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}