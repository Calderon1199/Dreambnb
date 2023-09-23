import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { createNewSpot } from "../../store/spots";
import "./SpotForm.css"

const SpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
            address: "",
            city: "",
            state: "",
            country: "",
            name: "",
            lat: "0",
            lng: "0",
            description: "",
            price: "",
            previewImage: "",
            image1: "", // Initialize image fields with empty strings
            image2: "",
            image3: "",
            image4: "",
            image5: "",
    });

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
        previewImage: false
      });

      const handleSubmit = async (e) => {
      e.preventDefault();

      // Dispatch the createNewSpot action with the formData
      let newSpot = await dispatch(createNewSpot(formData));

      console.log(newSpot)


      // Clear the form fields after submission (if needed)
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        lat: "0",
        lng: "0",
        description: "",
        price: "",
        previewImage: "",
        image1: "", // Initialize image fields with empty strings
        image2: "",
        image3: "",
        image4: "",
        image5: "",
    });
    // Redirect to the newly created spot's page
    history.push(`/spots/${newSpot.id}`);
};

const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleCreateClick = () => {
        // Validate the form fields
        const newErrors = {};
        let hasErrors = false;

        for (const idx in formData) {
          if (!formData[idx].trim()) {
            newErrors[idx] = true;
            hasErrors = true;
          } else {
            newErrors[idx] = false;
          }
        }

        const imageFields = ['image1', 'image2', 'image3', 'image4', 'image5'];
        imageFields.forEach((fieldName) => {
            const imageUrl = formData[fieldName].trim();
            if (imageUrl && !/(?:\.png|\.jpg|\.jpeg)$/.test(imageUrl.toLowerCase())) {
            newErrors[fieldName] = true;
            hasErrors = true;
            } else {
            newErrors[fieldName] = false;
            }
        });

        if (formData.description.trim().length < 30) {
            newErrors.description = true;
            hasErrors = true;
          }

        if (hasErrors) {
          setErrors(newErrors);
        } else {
          // Submit the form if all fields are filled
          // Here you can make your API call to create a new spot
          console.log('Form submitted:', formData);
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
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                            />
                            {errors.country && <div className="error">Country is required</div>}
                    </label>
                    <label className="country-address-input">
                        Street Address
                        <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
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
                                value={formData.city}
                                onChange={handleInputChange}
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
                                value={formData.state}
                                onChange={handleInputChange}
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
                            value={formData.description}
                            onChange={handleInputChange}
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
                            value={formData.name}
                            onChange={handleInputChange}
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
                            value={formData.price}
                            onChange={handleInputChange}
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
            value={formData[`image${index}`]}
            onChange={handleInputChange}
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
                        <button className="submit-button" type="submit" onClick={handleCreateClick}>Create Spot</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SpotForm;
