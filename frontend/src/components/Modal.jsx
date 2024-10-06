import React from 'react';
import './Modal.css'; // Ensure this CSS file contains the styles for the modal

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>📩 Message 📩</h2>
        <p>{message}</p>
        <button onClick={onClose} className="btn close-btn">Close</button>
      </div>
    </div>
  );
};

export default Modal;
