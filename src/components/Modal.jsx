import React from "react";
import "./Modal.css";

function Modal({ onClose, children }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;