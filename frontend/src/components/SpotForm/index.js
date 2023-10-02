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
    const [price, setPrice] = useState("");
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [imageUrl4, setImageUrl4] = useState('');
    const [errors, setErrors] = useState({});


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
      url: previewImageUrl,
      preview: true
    };




    const extraImages = [imageUrl1, imageUrl2, imageUrl3, imageUrl4];

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorsObj = {}
        if (!country) errorsObj.country = "Country is required"
        if (!address) errorsObj.address = "Address is required"
        if (!city) errorsObj.city = "City is required"
        if (!state) errorsObj.state = "State is required"
        if (!lat) errorsObj.lat = "Latitude is required"
        if (!lng) errorsObj.lng = "Longitude is required"
        if (description.length < 30) errorsObj.description = "Description needs a minimum of 30 characters"
        if (!name) errorsObj.name = "Name is required"
        if (!price) errorsObj.price = "Price is required"
        if (!previewImageUrl) errorsObj.previewImageUrl = "Preview image is required."
        if (previewImageUrl && (!previewImageUrl.endsWith('.png') && !previewImageUrl.endsWith('.jpg') && !previewImageUrl.endsWith('.jpeg'))) errorsObj.previewImageUrl = "Image URL must end in .png, .jpg, or .jpeg"
        if (imageUrl1 && !imageUrl1.endsWith('.png') && !imageUrl1.endsWith('.jpg') && !imageUrl1.endsWith('.jpeg')) errorsObj.image1Url = "Image URL must end in .png, .jpg, or .jpeg"
        if (imageUrl2 && !imageUrl2.endsWith('.png') && !imageUrl2.endsWith('.jpg') && !imageUrl2.endsWith('.jpeg')) errorsObj.image2Url = "Image URL must end in .png, .jpg, or .jpeg"
        if (imageUrl3 && !imageUrl3.endsWith('.png') && !imageUrl3.endsWith('.jpg') && !imageUrl3.endsWith('.jpeg')) errorsObj.image3Url = "Image URL must end in .png, .jpg, or .jpeg"
        if (imageUrl4 && !imageUrl4.endsWith('.png') && !imageUrl4.endsWith('.jpg') && !imageUrl4.endsWith('.jpeg')) errorsObj.image4Url = "Image URL must end in .png, .jpg, or .jpeg"

        if (Object.values(errorsObj).length) {
            return setErrors(errorsObj)
        }

        const newSpot = await dispatch(createNewSpot(spotData));


    await dispatch(addImageToSpot(newSpot.id, previewImageUrl, spotData.preview))
    .then(() => {
        spotData.preview = false;
    }).then(async() => {
        for(let i = 0; i < extraImages.length; i++) {
            if (extraImages[i] !== "") {
                await dispatch(addImageToSpot(newSpot.id, extraImages[i], spotData.preview))
            }
        }
    })

    history.push(`/spots/${newSpot.id}`);
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
            <form onSubmit={handleSubmit} noValidate>
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
                    <label className="name-input">
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
                    <label className="price-input">
                        <h2 className="section-title">Set a base price for your spot</h2>
                        <p className="section-title-p">Competitive pricing can help your listing stand out and rank higher in search results</p>
                        <div className="price-sign">
                            <p>$</p>
                            <input
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="price-input"
                                required
                                placeholder="Price per night (USD)"
                            />
                        </div>
                        {errors.price && <div className="error">Price is required</div>}
                    </label>
                </div>
                <div className="image-container">
  <label className="img-inputs">
    <h2 className="section-title">Liven up your spot with photos</h2>
    <p className="section-title-p">Submit a link to at least one photo to publish your spot</p>
    <input
        className="image-input-container"
          name="previewImg"
          placeholder="Preview Image URL"
          value={previewImageUrl}
          onChange={(e) => setPreviewImageUrl(e.target.value)}
        />
        {errors.previewImageUrl && <p className="error">{errors.previewImageUrl}</p>}
        <input
        className="image-input-container"
          name="Img1"
          placeholder="Image URL"
          value={imageUrl1}
          onChange={(e) => setImageUrl1(e.target.value)}
        />
        {errors.image1Url && <p className="error">{errors.image1Url}</p>}
        <input
            className="image-input-container"
          name="Img2"
          placeholder="Image URL"
          value={imageUrl2}
          onChange={(e) => setImageUrl2(e.target.value)}
        />
        {errors.image2Url && <p className="error">{errors.image2Url}</p>}
        <input
            className="image-input-container"
          name="Img3"
          placeholder="Image URL"
          value={imageUrl3}
          onChange={(e) => setImageUrl3(e.target.value)}
        />
        {errors.image3Url && <p className="error">{errors.image3Url}</p>}
        <input
            className="image-input-container"
          name="Img4"
          placeholder="Image URL"
          value={imageUrl4}
          onChange={(e) => setImageUrl4(e.target.value)}
        />
        {errors.image4Url && <p className="error">{errors.image4Url}</p>}
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

export default SpotForm;
