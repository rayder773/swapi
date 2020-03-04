import axios from "axios";
import {SPECIES_FAILURE, SPECIES_REQUEST, SPECIES_SUCCESS} from "../types/species";

const requestSpecies = () => ({
    type: SPECIES_REQUEST,
});

const successSpecies = (data) => ({
    type: SPECIES_SUCCESS,
    payload: {
        ...data,
    },
});

const failureSpecies = (error) => ({
    type: SPECIES_FAILURE,
    payload: {
        error,
    },
});

export const getSpecies = (species) => {
    const names = [];
    return async (dispatch) => {
        dispatch(requestSpecies());
        await Promise.all(species.map((v) => axios.get(v)))
            .then((resolvedValues) => {
                resolvedValues.forEach(({ data }) => {
                    names.push(data.name);
                });
                dispatch(successSpecies(names));
            })
            .catch((err) => {
                dispatch(failureSpecies(err.message));
            });
    };
};
