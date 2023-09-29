import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllSpots, getSpotById } from "../../store/spots";
import { useEffect, useState } from "react";
import { getSingleSpot } from "../../store/oneSpot";
import { editSpot } from "../../store/userSpots";
// import { updateOldSpot } from "../../store/spots";

const EditSpotForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spots = useSelector(state => state.userSpots);
    const spot = spots[+spotId];

    const [country, setCountry] = useState(spot?.country);
    const [address, setAddress] = useState(spot?.address);
    const [state, setState] = useState(spot?.state);
    const [city, setCity] = useState(spot?.city);
    const [name, setName] = useState(spot?.name);
    const [lat, setLat] = useState(spot?.lat || "37.7645358");
    const [lng, setLng] = useState(spot?.lng || "-122.4730327");
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [img4, setImg4] = useState("");



    console.log('this is spot', spot);

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
          console.log(spotData, 'this is spot data');
        // Clear the form fields after submission (if needed)
      // Redirect to the newly created spot's page
      history.push(`/spots/user`);
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
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index}>
          <input
            type="text"
            name={`image${index}`} // Use unique names for each input
            value={[`image${index}`]}
            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder={`Image ${index} url`}
            className="image-input"

          />
          {errors[`image${index}`] && (
            <div className="error">Preview url is required</div>
          )}
        </div>
      ))}
    </div>
  </label>
</div>

                {/* Add input fields for other spot details */}
                <div className="submit-container">
                    <div className="button-container">
                        <button className="submit-button" type="submit">Create Spot</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditSpotForm;
