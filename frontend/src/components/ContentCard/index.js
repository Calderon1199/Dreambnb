import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./ContentCard.css"
import { restoreUser } from "../../store/session";

const ContentCard = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const allSpotsObj = useSelector((state) => {
        return state.spots
    });





    useEffect(() => {
        dispatch(restoreUser())
        dispatch(getAllSpots())
        .then(() => {
            // Data fetching completed, set isLoading to false
            setIsLoading(false);
        })
    }, [dispatch])


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card-container">
            {Object.values(allSpotsObj).map((spot) => (
            <Link  to={`/spots/${spot.id}`} key={spot.id}  className="card-link">
                <div className="card" key={spot.address}>
                    <img src={spot.previewImage} alt={spot.name} className="card-image" />
                    <div className="card-info">
                      <div className="card-details">
                        <p className="card-location">{`${spot.city}, ${spot.state}`}</p>
                        <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <p className="card-rating">{spot.avgRating}</p>
                        </div>
                      </div>
                      <p className="card-price">{`$${spot.price} per night`}</p>
                      {/* Add more spot data as needed */}
                    </div>
                    <div className="tooltip">
                        {spot.name}
                    </div>
                  </div>
            </Link>
            ))}
        </div>
    )
}

export default ContentCard;
