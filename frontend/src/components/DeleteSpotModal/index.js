const DeleteSpotModal = ({ isOpen, onClose, onSubmit }) => {
    const handleDelete = () => {
      onSubmit();
      onClose();
    };

    return (
      <div className={`delete-spot-modal ${isOpen ? "open" : ""}`}>
        <div className="delete-spot-modal-content">
          <h2>Delete Spot</h2>
          <p>Are you sure you want to delete this spot?</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

  export default DeleteSpotModal;
