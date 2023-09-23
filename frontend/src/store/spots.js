import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT";

const createSpot = (spots) => ({
  type: CREATE_SPOT,
  spots,
});

    //----------------READ--------------------------
const loadAll = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const initialState = {}

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAll(spots));
    }
}

export const createNewSpot = (spotData) => async (dispatch) => {

      const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(spotData),
      });

      if (response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot));
        return newSpot
      }
  };

export const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            return {
                ...state,
                ...action.spots
            };
        case CREATE_SPOT:
            return {
                ...state,
                [action.spots.id]: action.spots,
      };
        default:
            return state;
    }
}
    //------------------------------------------------------------------
