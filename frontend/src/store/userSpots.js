import { csrfFetch } from "./csrf";

const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const DELETE_SPOT = "spots/DELETE_SPOT";
const USER_SPOT = "spots/USER_SPOT";

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        payload: spotId,
    }
}

const loadUserSpots = (userSpots) => {
    return {
        type: USER_SPOT,
        payload: userSpots
    }
}


const updateSpot = (newSpotData) => {
    return {
        type: UPDATE_SPOT,
        payload: newSpotData,

    };
};

export const deleteUserSpot = (spotId) => async (dispatch)=> {
    const response = await csrfFetch(`/api/spots/${spotId}`, {method: 'DELETE'});
    if (response.ok) {
        dispatch(deleteSpot(spotId));
        return spotId;
    };
};


export const getUserSpots = () => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/user`);
    const spots = await response.json();

    if (response.ok) {
        dispatch(loadUserSpots(spots));
        return response

    };
};

export const editSpot = (newSpotData, spotId) => async(dispatch) =>{
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpotData)
    };

    console.log(JSON.stringify(newSpotData), '----------------------')
    const response = await csrfFetch(`/api/spots/${spotId}`, options);
    if(response.ok) {
        const newSpot = await response.json();
        dispatch(updateSpot(newSpot));
        return newSpot;
    }
};

const initialState = {};

const userSpotReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case USER_SPOT:
            newState = {...state}
            action.payload.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState;
        case DELETE_SPOT:
            const spotIdToDelete = action.payload;
            console.log(spotIdToDelete, '------id')
            newState = { ...state };
            delete newState[spotIdToDelete];
            return newState;
        case UPDATE_SPOT:
            newState = {...state};
            const itemId = action.payload.id
            newState[itemId] = action.payload
                return newState
        default:
        return state;
    }
};

export default userSpotReducer
