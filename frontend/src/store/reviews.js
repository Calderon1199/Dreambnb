import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";


const loadAllReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews
});

const createReview = (newReview) => ({
    type: CREATE_REVIEW,
    payload: newReview
});

const initialState = {}

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAllReviews(reviews));
        return reviews;
    }  else if (response.status === 404) {
    // Handle the case where there are no reviews
    return [];
    }
}

export const createNewReview = (newReviewData, spotId) => async (dispatch) => {
    let options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newReviewData)
    }
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, options);

    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReview(newReview));
    }
}

export const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {...state}
            if (Array.isArray(action.payload.Reviews)) {
                action.payload.Reviews.forEach((review) => {
                    newState[review.id] = review;
                });
            }
            return newState;
        case CREATE_REVIEW:
            newState = {...state}
            newState[action.payload.id] = action.payload
        return newState;
        default:
            return state;
    }
}
