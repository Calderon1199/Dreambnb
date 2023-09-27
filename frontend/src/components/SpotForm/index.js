import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { createNewSpot } from "../../store/spots";
import { addImageToSpot } from "../../store/spots";
import "./SpotForm.css"

const SpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [lat, setLat] = useState("37.7645358");
    const [lng, setLng] = useState("-122.4730327");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("0");
    const [imageUrls, setImageUrls] = useState(["", "", "", ""]); // Array to store image URLs
    const [previewImageIndex, setPreviewImageIndex] = useState(0);

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
      imageUrls
    };




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

const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpot = await dispatch(createNewSpot(spotData));



    // Redirect to the newly created spot's page
    history.push(`/spots/${newSpot.id}`);
};

// const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     };

const handleImageChange = (index, imageUrl) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = imageUrl;
    setImageUrls(newImageUrls);

    // Set the previewImageIndex to the current index
    setPreviewImageIndex(index);
  };

    const handleCreateClick = () => {
        // Validate the form fields
        const newErrors = {};
    let hasErrors = false;

    for (const idx in spotData) {
        const value = spotData[idx];

        // Check if the value is a string before calling trim
        if (typeof value === 'string' && !value.trim()) {
            newErrors[idx] = true;
            hasErrors = true;
        } else {
            newErrors[idx] = false;
        }
    }

        // const imageFields = ['image1', 'image2', 'image3', 'image4', 'image5'];
        // imageFields.forEach((fieldName) => {
        //     const imageUrl = spotData[fieldName].trim();
        //     if (imageUrl && !/(?:\.png|\.jpg|\.jpeg)$/.test(imageUrl.toLowerCase())) {
        //     newErrors[fieldName] = true;
        //     hasErrors = true;
        //     } else {
        //     newErrors[fieldName] = false;
        //     }
        // });

        if (spotData.description.trim().length < 30) {
            newErrors.description = true;
            hasErrors = true;
          }

        if (hasErrors) {
          setErrors(newErrors);
        } else {
          // Submit the form if all fields are filled
          // Here you can make your API call to create a new spot
          console.log('Form submitted:', spotData);
        }
      };

    return (
        <div className="form-container">
            <div className="form-intro">
                <h1 className="new-spot-intro">Create a new spot</h1>
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
      {[1, 2, 3, 4].map((index) => (
        <div key={index}>
          <input
            type="text"
            name={`image${index}`} // Use unique names for each input
            value={imageUrls[`image${index}`]}
            placeholder={`Image ${index} url`}
            className="image-input"
            onChange={(e) => handleImageChange(index, e.target.value)}
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
                        <button className="submit-button" type="submit" onClick={handleCreateClick}>Create Spot</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SpotForm;
