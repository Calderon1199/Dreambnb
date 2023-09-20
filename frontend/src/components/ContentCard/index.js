import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

const ContentCard = () => {
    const dispatch = useDispatch();
    const allSpotsObj = useSelector((state) => {
        return state.spots
    });
    const allSpots = Object.values(allSpotsObj);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    return (
        <>
        {allSpots.map((spot) => (
                <div key={spot.id}>
                    {/* Render each spot */}
                    <h2>{spot.name}</h2>
                    {/* Add more spot data as needed */}
                </div>
            ))}
        </>
    )
}

export default ContentCard;
