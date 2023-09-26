import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getSingleSpot } from "../../store/oneSpot";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    // const reviews = useSelector((state) => state.reviews.Reviews);
    const spot = useSelector(state => state.singleSpot.spot);


    useEffect(() => {
        dispatch(getSingleSpot(+spotId))
        // dispatch(getAllReviews(spotId))
        .then(() => {
            // Data fetching completed, set isLoading to false
            setIsLoading(false);
        })
    }, [dispatch, spotId, isLoading]);

    if (isLoading || !spot) {
        // Display a loading indicator or message while data is fetching
        return <div>Loading...</div>;
    };

    // const spot = spots.find(spot => spot.id === +spotId)




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

            {/* {reviews && reviews.length > 0 && (
                <div>
                    {reviews.map((review) => (
                    <div key={review.id}>
                        <p>{review.review}</p>
                    </div>
                    ))}
                </div>
            )} */}
        </>
    );
}

export default SpotDetails;
