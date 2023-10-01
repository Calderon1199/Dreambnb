import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotReview, getAllReviews } from "../../store/reviews";
import { createNewReview } from "../../store/reviews";
import { useParams, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getSingleSpot } from "../../store/oneSpot";
import ReviewModal from "../ReviewModal";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import "./SpotDetails.css";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const reviews = useSelector((state) => Object.values(state.reviews));
    const spot = useSelector(state => state.singleSpot.spot);
    const [images, setImages] = useState(spot?.SpotImages);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isDeleteReviewModalOpen, setIsDeleteReviewModalOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const [hasReviews, setHasReviews] = useState(false);
    const userId2 = useSelector(state => state.session.user?.id);
    const [ userId, setUserId ] = useState(null);
    const { closeModal } = useModal();


    useEffect(() => {
        for (let i = 0; i < reviews.length; i++) {
          if (
            Number(reviews[i].spotId) === +spotId &&
            Number(reviews[i].userId) === +userId
          ) {
            setHasReviews(true);
            break; // Exit the loop as soon as a review is found
          }
        }
        return setUserId(userId2)
      }, [reviews.length, spotId]);

    useEffect(() => {
        dispatch(getAllReviews(+spotId))
        dispatch(getSingleSpot(+spotId))
        .then(() => {
            setIsLoading(false);
        })
    }, [dispatch, spotId, isLoading, setHasReviews]);

    useEffect(() => {
        if (!isLoading && spot) {
            setImages(spot.SpotImages || "")
    }}, [isLoading, spot]);



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
        setReviewToDelete(review);
        setIsDeleteReviewModalOpen(true);
    };

    const closeDeleteReviewModal = () => {
        setIsDeleteReviewModalOpen(false);
        setReviewToDelete(null);
    };

    const handleDeleteReview = async () => {
        const reviewToDelete = reviews.find((review) => review.userId === userId);

        if (reviewToDelete) {
            await dispatch(deleteSpotReview(reviewToDelete.id))
            .then(async () => {
                await dispatch(getAllReviews(+spotId))
            }).then(() => {
                closeModal();
            })
        }
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (isLoading || !spot) {
        return <div>Loading...</div>;
    };


    // const hasReviews = reviews.some(review => review.userId === userId);


    return ( <div className="details-container">
            <div className="spot-details-container">
                <h1>{spot.name}</h1>
                <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            </div>
            {images && images.length > 0 && (
                <div className="image-container">
                    {images.map((image) => (
                    <div key={image.id} className={`pic${image.id}`}>
                        <img src={image.url} alt={`Image ${image.id}`} />
                    </div>
                    ))}
                </div>
            )}
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <div className="details-text-container">
                <div className="description">
                    <p>{spot.description}</p>
                </div>
                <div className="reserve">
                    <div className="price">
                            <p>${spot.price} / Night</p>
                    </div>
                                    <div className="reserve-button">
                                        <button onClick={() => alert("Feature Coming Soon...")}>RESERVE</button>
                                    </div>
                    <div className="star-review-container">
                        <div className="rating">
                            {reviews.length ? (
                                <div className="rating-after">
                                    <i className="fa-solid fa-star"></i>
                                    <p>{spot.avgStarRating}</p>
                                </div>
                                ) : (
                                    <></>
                            )}
                        </div>
                        <div className="review">
                        {reviews.length ? (
                            <h4>{spot.numReviews} Reviews</h4>
                            ) : (
                            <p>New</p>
                        )}
                        </div>
                    </div>
                </div>
            </div>
                            <div className="review-intro-container">
                                <div className="star-review">
                                    <i className="fa-solid fa-star"></i>
                                {reviews.length ? (
                                    <div>
                                        <p>{spot.avgStarRating}</p>
                                    </div>
                                    ) : (
                                <h2>New</h2>
                                )}
                                </div>
                                {reviews.length ? (
                            <h4>{spot.numReviews} Reviews</h4>
                            ) : (
                            <></>
                        )}
                            </div>


            {hasReviews ? (
                <div>
                    {reviews.map((review) => (
                        <div key={review.id}>
                            <div>
                            {review.User && (
                            <h3>{review.User.firstName}</h3>
            )}
                            <h3 className="date">{formatDate(review.createdAt)}</h3>
                                <p>{review.review}</p>
                                {Number(review.userId) === +userId && (
                                    <OpenModalButton
                                    modalComponent={
                                        <DeleteReviewModal
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
                <div className="creat-review-button">
                        {userId && !hasReviews ? (
                            <OpenModalButton
                                modalComponent={
                                <ReviewModal
                                    isOpen={isReviewModalOpen}
                                    onClose={closeReviewModal}
                                    onSubmit={handleSubmitReview}
                                />
                                }
                                buttonText="Post Your Review"
                                onClick={openReviewModal}
                            />
                        ): null}
                    {reviews.map((review) => (
                        <div key={review.id}>
                            <h3>{review.User.firstName}</h3>
                            <h3 className="date">{formatDate(review.createdAt)}</h3>
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
            )}
        </div>
    );
}

export default SpotDetails;
