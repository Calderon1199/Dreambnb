import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

const loadAllReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const initialState = {}

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAllReviews(reviews));
    }
}

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            return {
                ...state,
                ...action.reviews
            };
        default:
            return state;
    }
}
