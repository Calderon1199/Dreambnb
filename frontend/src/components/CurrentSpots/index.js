import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteUserSpot, getUserSpots } from "../../store/userSpots";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import { getSingleSpot } from "../../store/oneSpot";


const CurrentSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const spots = useSelector(state => state.userSpots);
    const userId = useSelector(state => state.session.user.id);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDeleteSpotModalOpen, setIsDeleteSpotModalOpen] = useState(false);
    const { closeModal } = useModal();


    useEffect(() => {
        if (sessionUser) {
            dispatch(getUserSpots())
                .then(() => setIsLoaded(true))
        }
    }, [dispatch])

    if (!spots || spots.length === 0) {
        return <div>Loading...</div>;
    }

    const openDeleteSpotModal = () => {
        setIsDeleteSpotModalOpen(true);
    };

      // Function to close the delete spot modal
    const closeDeleteSpotModal = () => {
        setIsDeleteSpotModalOpen(false);
    };


    const handleCreateSpot = () => {
        history.push(`/spots/new`);
    };

    const handleDeleteSpot = (spotId) => {
        // e.preventDefault();
        // e.stopPropagation();

        dispatch(deleteUserSpot(spotId));
        closeModal();
    }

    const handleEditSpot = (e, spotId) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(getSingleSpot(+spotId));
        history.push(`/spots/${spotId}/edit`);
    };


    const usersSpots = Object.values(spots).filter(spot => spot.ownerId === userId)

    return (
        <div>
            <div>
                <h1>Manage Your Spots</h1>
                <button onClick={handleCreateSpot}>Create a spot</button>
            </div>
            {usersSpots.map((spot) => (
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
                <div>
                    <button onClick={(e) => { handleEditSpot(e, spot.id) }}>Update a spot</button>
                </div>
                <OpenModalButton
                    modalComponent={<DeleteSpotModal
                    isOpen={isDeleteSpotModalOpen}
                    onClose={closeDeleteSpotModal}
                    onSubmit={() => handleDeleteSpot(spot.id)}
                    />
                }
                buttonText="Create a Review"
                onClick={() => openDeleteSpotModal(spot.id)}
                />
                </div>
            ))}
        </div>
    );
}

export default CurrentSpots;
