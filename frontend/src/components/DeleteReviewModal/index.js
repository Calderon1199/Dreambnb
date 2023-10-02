import { useModal } from "../../context/Modal";
import "./DeleteReviewModal.css";

const DeleteReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const { closeModal } = useModal();
  const handleDelete = () => {
    onSubmit();
    onClose();
  };

  return (
    <div className={`delete-review-modal ${isOpen ? "open" : ""}`}>
      <div className="delete-review-modal-content">
        <h2 className="delete-review-header">Confrm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
          <button id="delete-review-1" className="delete-review-button" onClick={handleDelete}>Yes (Delete Review)</button>
        <div className="delete-review-button-container">
        </div>
        <div className="delete-review-button-container">
          <button id="delete-review-2" className="delete-review-button" onClick={closeModal}>No (Keep Review)</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
