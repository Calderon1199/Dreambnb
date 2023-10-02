import "./DeleteSpotModal.css";
import { useModal } from "../../context/Modal";

const DeleteSpotModal = ({ isOpen, onClose, onSubmit }) => {
  const { closeModal } = useModal();
    const handleDelete = () => {
      onSubmit();
      onClose();
    };

    return (
      <div className={`delete-spot-modal ${isOpen ? "open" : ""}`}>
        <div className="delete-spot-modal-content">
          <h2 className="delete-header">Confrm Delete</h2>
          <p>Are you sure you want to remove this spot
              from the listings?
            </p>
            <div className="delete-button-container">
              <button id="delete-1" className="delete-button" onClick={handleDelete}>Yes (Delete Spot)</button>
            </div>
            <div className="delete-button-container">
              <button id="delete-2" className="delete-button" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
      </div>
    );
  };

  export default DeleteSpotModal;
