import {SPECIES_FAILURE, SPECIES_REQUEST, SPECIES_SUCCESS} from "../types/species";

const initialState = {
    isFetching: false,
    species: [],
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SPECIES_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case SPECIES_SUCCESS:
            return {
                ...state,
                species: action.payload,
                isFetching: false,
            };
        case SPECIES_FAILURE:
            return {
                ...initialState,
                error: action.payload,
            };
        default:
            return state;
    }
}