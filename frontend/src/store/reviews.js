import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";


const loadAllReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews
});

const createReview = (newReview) => ({
    type: CREATE_REVIEW,
    payload: newReview
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId,
});

const initialState = {}

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAllReviews(reviews));
        return reviews;
    }  else if (response.status === 404) {
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
};

export const deleteSpotReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    const review = await response.json()
    dispatch(deleteReview(reviewId))
    return review;
}

export const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {}
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
        case DELETE_REVIEW:
            newState = {...state};
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}
