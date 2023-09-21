import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./ContentCard.css"

const ContentCard = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const allSpotsObj = useSelector((state) => {
        return state.spots.Spots
    });



    useEffect(() => {
        dispatch(getAllSpots())
        .then(() => {
            // Data fetching completed, set isLoading to false
            setIsLoading(false);
        })
    }, [dispatch])


    if (isLoading) {
        // Display a loading indicator or message while data is fetching
        return <div>Loading...</div>;
    }

    return (
        <div className="card-container">
            {allSpotsObj.map((spot) => (
                    <div className="card" key={spot.address}>
                    <img src={spot.previewImage} alt={spot.name} className="card-image" />
                    <div className="card-info">
                      <h2 className="card-title">{spot.name}</h2>
                      <div className="card-details">
                        <p className="card-location">{`${spot.city}, ${spot.state}`}</p>
                        <p className="card-rating">{spot.avgRating}</p>
                      </div>
                      <p className="card-price">{`$${spot.price} per night`}</p>
                      {/* Add more spot data as needed */}
                    </div>
                  </div>
            ))}
        </div>
    )
}

export default ContentCard;
