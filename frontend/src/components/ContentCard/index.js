import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

const ContentCard = () => {
    const dispatch = useDispatch();
    const allSpotsObj = useSelector((state) => {
        return state.spots
    });
    console.log(allSpotsObj);
    const allSpots = Object.values(allSpotsObj);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    return (
        <>
        {allSpots.map((spot) => (
                    <h2>hello</h2>
            ))}
        </>
    )
}

export default ContentCard;
