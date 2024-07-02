// PopOutComponent.js
import React from 'react';
import './PopOutComponent.css';

const PopOutComponent = ({ children, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default PopOutComponent;
