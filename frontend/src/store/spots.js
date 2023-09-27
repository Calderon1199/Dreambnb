import { csrfFetch } from "./csrf";
// import { DELETE_SPOT } from "./userSpots";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const CREATE_SPOT = "spot/CREATE_SPOTS";
const ADD_IMAGE = "spots/ADD_IMAGE";


//------------------CREATE------------------------


const loadAll = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots
    };
};

const createSpot = (spotData) => {
    return {
        type: CREATE_SPOT,
        payload: spotData
    };
};

const addImages = (url) => {
    return {
        type: ADD_IMAGE,
        url
    }
}


    //----------------READ--------------------------


export const addImageToSpot = (spotId, imageUrl) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(imageUrl),
    });
    const newImage = await response.json();
    dispatch(addImages(newImage));
    return newImage;
  };



export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAll(spots));
        return spots;
    }
}

export const createNewSpot = (spotData) => async(dispatch) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spotData)
      }

      const response = await csrfFetch("/api/spots", options);

      if (response.ok) {
          const newSpot = await response.json();
          dispatch(createSpot(newSpot));
        return newSpot
    }
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = {...state}
            action.payload.Spots.forEach((spot) => newState[spot.id] = spot)
        return newState;
        case CREATE_SPOT:
            newState = {...state}
            newState[action.payload.id] = action.payload
        return newState;
        case ADD_IMAGE:
            const { spotId, imageUrl } = action.payload;
            newState = { ...state };
            // Find the spot by spotId and add the imageUrl to it
            if (newState[spotId]) {
                newState[spotId] = {
                ...newState[spotId],
                images: [...newState[spotId].images, imageUrl], // assuming you have an 'images' property in your spot object
                };
            }
        return newState;
        default:
            return state;
    }
}

export default spotReducer;
    //------------------------------------------------------------------
