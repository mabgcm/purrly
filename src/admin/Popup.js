// Popup.js
import React from 'react';
import "./popup.css"; // Create a CSS file for styling the popup

const Popup = ({ message, onClose, onConfirm, isConfirm }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <span className="popup-message">{message}</span>
                {isConfirm ? (
                    <div>
                        <button className="popup-button" onClick={onConfirm}>Yes</button>
                        <button className="popup-button" onClick={onClose}>No</button>
                    </div>
                ) : (
                    <button className="popup-button" onClick={onClose}>Close</button>
                )}
            </div>
        </div>
    );
};

export default Popup;
