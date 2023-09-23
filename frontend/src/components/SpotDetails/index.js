import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { getAllReviews } from "../../store/reviews";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const spots = useSelector((state) => state.spots.Spots);
    const reviews = useSelector((state) => state.reviews.Reviews);



    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getAllReviews(spotId))
        .then(() => {
            // Data fetching completed, set isLoading to false
            setIsLoading(false);
        })
    }, [dispatch, spotId]);

    if (isLoading) {
        // Display a loading indicator or message while data is fetching
        return <div>Loading...</div>;
    };

    const spot = spots.find(spot => spot.id === Number(spotId));
    console.log(reviews, '<-------------------------------------------this is reviews');
    console.log(spots, '<-------- this is spotDetails state');
    console.log(spotId, '<------------this is spotid');
    console.log(spot, '<------------- this is single spot');
    return (
        <>
            <h1>{spot.name}</h1>
            <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            <img src={spot.previewImage}/>
            <p>{spot.description}</p>

            {reviews && reviews.length > 0 && (
                <div>
                    {reviews.map((review) => (
                    <div key={review.id}>
                        <p>{review.review}</p>
                    </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default SpotDetails;
