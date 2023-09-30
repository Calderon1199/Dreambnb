
const DeleteReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const handleDelete = () => {
    onSubmit();
    onClose();
  };

  return (
    <div className={`delete-review-modal ${isOpen ? "open" : ""}`}>
      <div className="delete-review-modal-content">
        <h2>Delete Review</h2>
        <p>Are you sure you want to delete this review?</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
