import { csrfFetch } from "./csrf";

const GET_SPOT_BY_ID = "oneSpot/GET_ONE_SPOT";

const getSingleSpotAction = (spot) => {
    return {
        type: GET_SPOT_BY_ID,
        payload: spot
    }
}

export const getSingleSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(getSingleSpotAction(spot));
        return spot;
    }
}

const initialState = {}

const singleSpotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOT_BY_ID:
            newState = { ...state };
            newState.spot = action.payload
            return newState
        default:
            return state;
    }
};


export default singleSpotReducer;
