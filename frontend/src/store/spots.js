import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";

const loadAll = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const initialState = {
    spots: [],
}

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAll(spots));
    }
}

export const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            return {
                ...state,
                ...action.spots
            };
        default:
            return state;
    }
}
