import React, { useEffect, useState } from "react";
import "./Modeldetails.css";

const ModelDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Show popup on component load
  useEffect(() => {
    setPopupMessage("✅ Booking successful!");
    setShowPopup(true);
  }, []);

  const handleRequestApproval = () => {
    setPopupMessage("📨 Request sent to owner. You will be notified soon.");
    setShowPopup(true);
    // Optionally call API
  };

  const handleCancelBooking = () => {
    setPopupMessage("❌ Booking cancelled.");
    setShowPopup(true);
    // Optionally call API
  };

  return (
    <div className="container">
      {/* Navbar */}
      <div className="navbar">
        <button className="back-button">←</button>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-icon">🔍</button>
        </div>
        <div className="nav-links">
          <a href="/">HOME</a>
          <a href="/contact">Contact</a>
        </div>
      </div>

      {/* Car Info Section */}
      <div className="car-info-section">
        <img
          src="https://www.bmw.com/content/dam/bmw/common/all-models/3-series/sedan/2022/navigation/bmw-3-series-sedan-lci-modelfinder.png"
          alt="BMW Series 3"
          className="car-image"
        />

        <div className="car-details">
          <h2>BMW Series 3</h2>
          <p><strong>Number:</strong> BA 3256</p>
          <p><strong>Price:</strong> 8000 per day</p>

          <div className="booking-buttons">
            <button className="request-approval" onClick={handleRequestApproval}>
              Request Owner Approval
            </button>
            <button className="cancel-booking" onClick={handleCancelBooking}>
              Cancel Booking
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <p>{popupMessage}</p>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelDetails;
  