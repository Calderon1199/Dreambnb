import { useState } from "react";
import "./ReviewModal.css";

const ReviewModal = ({isOpen, onClose, onSubmit }) => {
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(0);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [error, setError] = useState(null);

    const handleReviewTextChange = (e) => {
        const newText = e.target.value;
        setReviewText(newText);
        setIsSubmitDisabled(newText.length < 10 || stars === 0);
        setError(null);
      };

      const handleStarHover = (starValue) => {
        if (stars === 0) {
          setStars(starValue);
        }
      };

      const handleStarClick = (starValue) => {
        setStars(starValue);
      };

    const handleSubmit = async () => {
      try {
        const res = await onSubmit({ review: reviewText, stars });
        setReviewText("");
        onClose();
      } catch (err) {
        setError(err.errors || "Please enter text only."); // Set the error message
      }
    };


  return (
    <div className={`review-modal ${isOpen ? "open" : ""}`}>
      <div className="review-modal-content">
        <h2 className="review-header">How was your stay?</h2>
        {error && <p className="errors">{error}</p>}
        <textarea
            placeholder="Leave your review here..."
            value={reviewText}
            onChange={handleReviewTextChange}
            className="review-text-area"
        />
        <div className="stars-input">
          {[...Array(5)].map((star, i)=> (
            <label
              key={i}
              onMouseEnter={() => handleStarHover(i + 1)}
              onClick={() => handleStarClick(i + 1)}
              >
              <input type="radio" name="rating" className="star-radio-buttons" value={i+1} defaultChecked={i + 1 === stars}/>
              <i style={{
                  color: i + 1 <= stars ? "#fcb3bf" : "#ccc",
                }} className="fa-solid fa-star star"></i>
            </label>
          ))}
          <h4>Stars</h4>
        </div>
        <button onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</button>
      </div>
    </div>
  );
};

export default ReviewModal;
