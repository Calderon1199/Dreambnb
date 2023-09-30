import { useState } from "react";


const ReviewModal = ({isOpen, onClose, onSubmit }) => {
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(1);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const handleReviewTextChange = (e) => {
        const newText = e.target.value;
        setReviewText(newText);
        setIsSubmitDisabled(newText.length < 10 || stars === 0);
      };

      const handleStarsChange = (e) => {
        const newStars = parseInt(e.target.value);
        setStars(newStars);
        setIsSubmitDisabled(reviewText.length < 10 || newStars === 0);
      };

    const handleSubmit = () => {
            onSubmit({ review: reviewText, stars });
            setReviewText("");
            onClose();

    };


  return (
    <div className={`review-modal ${isOpen ? "open" : ""}`}>
      <div className="review-modal-content">
        <h2>Create a Review</h2>
        <textarea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={handleReviewTextChange}
        />
        <div className="stars-input">
          <label>Stars:</label>
          <select
            value={stars}
            onChange={handleStarsChange}
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
        </div>
        <button onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</button>
      </div>
    </div>
  );
};

export default ReviewModal;
