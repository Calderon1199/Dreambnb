import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { getSingleSpot } from "../../store/oneSpot";
import { editSpot } from "../../store/userSpots";
import { addImageToSpot } from "../../store/spots";
// import { updateOldSpot } from "../../store/spots";

const EditSpotForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.singleSpot.spot);
    const [isLoading, setIsLoading] = useState(true);

    const [country, setCountry] = useState(spot?.country);
    const [address, setAddress] = useState(spot?.address);
    const [state, setState] = useState(spot?.state);
    const [city, setCity] = useState(spot?.city);
    const [name, setName] = useState(spot?.name);
    const [lat, setLat] = useState(spot?.lat || "37.7645358");
    const [lng, setLng] = useState(spot?.lng || "-122.4730327");
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.SpotImages[0].url);
    const [extraImages, setExtraImages] = useState(spot?.SpotImages);


    useEffect(() => {
        dispatch(getSingleSpot(+spotId))
        .then(() => {
            setIsLoading(false);
        })
    }, [dispatch, spotId, isLoading]);

    useEffect(() => {
        if (!isLoading && spot) {
            setCountry(spot.country || "");
            setAddress(spot.address || "");
            setState(spot.state || "");
            setCity(spot.city || "");
            setName(spot.name || "");
            setLat(spot.lat || "");
            setLng(spot.lng || "");
            setDescription(spot.description || "");
            setPrice(spot.price || "");
            setPreviewImage(spot?.SpotImages[0].url || "");
            setExtraImages(spot.SpotImages || "");
        }
    }, [isLoading, spot]);


    const imageId = (spot?.SpotImages.find(img => img.preview === true).id);

    const [errors, setErrors] = useState({
        country: false,
        address: false,
        city: false,
        state: false,
        name: false,
        lat: false,
        lng: false,
        description: false,
        price: false,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const spotData = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
          };

          dispatch(editSpot(spotData, +spotId));
          // Clear the form fields after submission (if needed)
          // Redirect to the newly created spot's page
          history.push(`/spots/${spotId}`);
        };

        if (isLoading || !extraImages) {
            return <div>Loading...</div>;
        };

        //   const handleCreateClick = async () => {
            //     // Validate the form fields
//     const newErrors = {};
//     let hasErrors = false;

//     for (const idx in spotData) {
//     const value = spotData[idx];

//     // Check if the value is a string before calling trim
//         if (typeof value === 'string' && !value.trim()) {
//             newErrors[idx] = true;
//             hasErrors = true;
//         } else {
//             newErrors[idx] = false;
//         }
//     }

//     // const imageFields = ['image1', 'image2', 'image3', 'image4', 'image5'];
//     // imageFields.forEach((fieldName) => {
//     //     const imageUrl = formData[fieldName].trim();
//     //     if (imageUrl && !/(?:\.png|\.jpg|\.jpeg)$/.test(imageUrl.toLowerCase())) {
//     //     newErrors[fieldName] = true;
//     //     hasErrors = true;
//     //     } else {
//     //     newErrors[fieldName] = false;
//     //     }
//     // });

//     if (spotData.description.trim().length < 30) {
//         newErrors.description = true;
//         hasErrors = true;
//       }

//     if (hasErrors) {
//       setErrors(newErrors);
//     } else {
//         // Submit the form if all fields are filled
//       // Here you can make your API call to create a new spot
//       console.log('Form submitted:', spotData);
//       history.push(`/spots/${spotId}`);
//     }
//   };

    return (
        <div className="form-container">
            <div className="form-intro">
                <h1 className="new-spot-intro">Update your Spot</h1>
                <div className="intro-text-container">
                    <h3 className="intro-text" id="intro-text-1">Where's your place located?</h3>
                    <p className="intro-text">Guests will only get your exact address once they booked a reservation</p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="location-container">
                    <label className="country-address-input">
                        Country
                            <input
                            type="text"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                            />
                            {errors.country && <div className="error">Country is required</div>}
                    </label>
                    <label className="country-address-input">
                        Street Address
                        <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street Address"
                        />
                        {errors.address && <div className="error">Address is required</div>}
                    </label>
                    <div className="city-state-container">
                        <div>
                            <label className="city-input">
                                City
                                <input
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                                />
                                {errors.city && <div className="error">City is required</div>}
                            </label>
                        </div>
                        <div>
                            <label className="state-input">
                                State
                                <input
                                type="text"
                                name="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="STATE"
                                />
                                {errors.state && <div className="error">State is required</div>}
                            </label>
                        </div>
                    </div>
                </div>
                {/* ------------------ */}
                <div className="description-container">
                    <label>
                        <h2 className="section-title">Describe your place to guests</h2>
                        <p className="section-title-p">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <textarea
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="description-textarea"
                            placeholder="Please write at least 30 characters"
                        />
                        {errors.description && <div className="error">description should be 30 characters or more</div>}
                    </label>
                </div>

                {/* --------------------------- */}
                <div className="name-container">
                    <label>
                        <h2 className="section-title">Create a title for your spot</h2>
                        <p className="section-title-p">Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="name-input"
                            placeholder="Name of your spot"
                        />
                        {errors.name && <div className="error">Name is required</div>}
                    </label>
                </div>
                <div className="price-container">
                    <label>
                        <h2 className="section-title">Set a base price for your spot</h2>
                        <p className="section-title-p">Competitive pricing can help your listing stand out and rank higher in search results</p>
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="price-input"
                            required
                            placeholder="Price per night (USD)"
                        />
                        {errors.price && <div className="error">Price is required</div>}
                    </label>
                </div>
                <div className="image-container">
  <label>
    <h2 className="section-title">Liven up your spot with photos</h2>
    <p className="section-title-p">Submit links to at least one photo to publish your spot</p>
    <div className="image-input-container">
    <label>
    <h2 className="section-title">Liven up your spot with photos</h2>
    <p className="section-title-p">Submit links to at least one photo to publish your spot</p>
    <input
          name="previewImg"
          placeholder={previewImage}
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
        {errors.previewImage && <p className="error">{errors.previewImage}</p>}
        <input
          name="Img1"
          placeholder={extraImages[1]?.url}
          value={extraImages[1]?.url || ""}
          onChange={(e) => {
            const updatedExtraImages = [...extraImages];
            updatedExtraImages[1] = {url: e.target.value, preview:false};
            setExtraImages(updatedExtraImages);
          }}
        />
        {errors.image1Url && <p className="error">{errors.image1Url}</p>}
        <input
          name="Img2"
          placeholder={extraImages[2]?.url}
          value={extraImages[2]?.url || ""}
          onChange={(e) => {
            const updatedExtraImages = [...extraImages];
            updatedExtraImages[2] = {url: e.target.value, preview:false};
            setExtraImages(updatedExtraImages);
          }}
        />
        {errors.image2Url && <p className="error">{errors.image2Url}</p>}
        <input
          name="Img3"
          placeholder={extraImages[3]?.url}
          value={extraImages[3]?.url || ""}
          onChange={(e) => {
            const updatedExtraImages = [...extraImages];
            updatedExtraImages[3] = {url: e.target.value, preview:false};
            setExtraImages(updatedExtraImages);
          }}
        />
        {errors.image3Url && <p className="error">{errors.image3Url}</p>}
        <input
          name="Img4"
          placeholder={extraImages[4]?.url}
          value={extraImages[4]?.url || ""}
          onChange={(e) => {
            const updatedExtraImages = [...extraImages];
            updatedExtraImages[4] = {url: e.target.value, preview:false};
            setExtraImages(updatedExtraImages);
          }}
        />
        {errors.image4Url && <p className="error">{errors.image4Url}</p>}
  </label>
    </div>
  </label>
</div>

                {/* Add input fields for other spot details */}
                <div className="submit-container">
                    <div className="button-container">
                        <button className="submit-button" type="submit">Update Spot</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditSpotForm;
