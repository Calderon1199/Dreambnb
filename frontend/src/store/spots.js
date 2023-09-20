const LOAD_SPOTS = "spots/LOAD_SPOTS";

const loadAll = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const initialState = {
    spots: [],
}

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch("/api/spots");
    console.log(response);

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAll(spots));
    }
}

export const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            if (!Array.isArray(action.spots)) {
                return state; // Return the current state if action.spots is not an array
            }

            const allSpots = {};
            action.spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });

            return {
                ...state,
                ...allSpots
            };
        default:
            return state;
    }
}
