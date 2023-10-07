import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getAllSpots } from "../../store/spots";
import { restoreUser } from "../../store/session";
import "./ContentCard.css"

const ContentCard = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const allSpotsObj = useSelector((state) => state.spots);

    useEffect(() => {
        dispatch(getAllSpots())
        .then(() => {
            setIsLoading(false);
        })
    }, [dispatch])


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content-card-container">
            {Object.values(allSpotsObj).map((spot) => (
            <Link  to={`/spots/${spot.id}`} key={spot.id}  className="content-card-link">
                <div className="content-card" key={spot.address}>
                    <div className="content-card-image-container">
                        <img src={spot.previewImage} alt={spot.name} className="content-card-image" />
                    </div>
                    <div className="content-card-info">
                      <div className="content-card-details">
                        <p className="content-card-location">{`${spot.city}, ${spot.state}`}</p>
                        <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <p className="card-rating">{spot.avgRating || "NEW"}</p>
                        </div>
                      </div>
                      <div className="content-card-price-container">
                        <p className="content-card-price">{`$${spot.price}`}</p>
                        <p className="price-night"> Night</p>
                      </div>
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
