import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotReview, getAllReviews } from "../../store/reviews";
import { createNewReview } from "../../store/reviews";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getSingleSpot } from "../../store/oneSpot";
import ReviewModal from "../ReviewModal";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const reviews = useSelector((state) => Object.values(state.reviews));
    const spot = useSelector(state => state.singleSpot.spot);
    const userId = useSelector(state => state.session.user.id);
    const hasReviews = reviews.length > 0;
    const { closeModal } = useModal();
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isDeleteReviewModalOpen, setIsDeleteReviewModalOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);

    useEffect(() => {
        dispatch(getSingleSpot(+spotId))
        dispatch(getAllReviews(+spotId))
        .then(() => {
            setIsLoading(false);
        })
    }, [dispatch, spotId, isLoading]);

    const openReviewModal = (review) => {
        setIsReviewModalOpen(true);
      };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    const handleSubmitReview = async (reviewData) => {
        await dispatch(createNewReview(reviewData, +spotId))
        .then(async() => {
            await dispatch(getAllReviews(+spotId))
        })
        .then(() => {
            closeModal();
        }); // Close the modal after review submission
    };

    const openDeleteReviewModal = (review) => {
        console.log(reviewToDelete, "openDeleteReviewModal")
        console.log(review, "openDeleteReviewModal");
        setReviewToDelete(review);
        setIsDeleteReviewModalOpen(true);
    };

    const closeDeleteReviewModal = () => {
        console.log(reviewToDelete, "closeDeleteReviewModal")
        setIsDeleteReviewModalOpen(false);
        setReviewToDelete(null);
    };

    const handleDeleteReview = async () => {
        const reviewToDelete = reviews.find((review) => review.userId === userId);

        if (reviewToDelete) {
            console.log(reviewToDelete, reviewToDelete);
            await dispatch(getAllReviews(+spotId))
            await dispatch(deleteSpotReview(reviewToDelete.id))
            closeModal();
        }

    };

    if (isLoading || !spot) {
        return <div>Loading...</div>;
    };



    return ( <>
            <div>
                <h1>{spot.name}</h1>
                <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            </div>
            <div>
                <img src={spot.previewImage}/>
            </div>
            <p>{spot.description}</p>
            <p>{spot.price}</p>

            {hasReviews ? (
                <div>
                    {reviews.map((review) => (
                        <div key={review.id}>
                            <div>
                                <p>{review.stars}</p>
                                <p>{reviews.length}</p>
                            </div>
                            <div>
                                <p>{review.review}</p>
                                {review.userId === userId && (
                                    <OpenModalButton
                                        modalComponent={<DeleteReviewModal
                                        isOpen={isDeleteReviewModalOpen}
                                        onClose={closeDeleteReviewModal}
                                        onSubmit={handleDeleteReview}

                                    />
                                }
                                    buttonText="Delete a Review"
                                    onClick={() => openDeleteReviewModal(review)}
                                />
                                )}
                            </div>
                        </div>
                    ))}

                </div>
                ) : (
                <div>
                    <h1>New Review</h1>
                    <OpenModalButton
                        modalComponent={<ReviewModal
                            isOpen={isReviewModalOpen}
                            onClose={closeReviewModal}
                            onSubmit={handleSubmitReview}

                        />
                    }
                        buttonText="Create a Review"
                        onClick={openReviewModal}
                    />
                </div>
            )}
        </>
    );
}

export default SpotDetails;
