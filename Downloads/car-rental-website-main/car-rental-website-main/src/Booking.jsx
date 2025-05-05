import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookings = location.state?.bookings || [];

  console.log("Bookings received in Booking.jsx:", bookings); // Debug log

  const handleBackToProfile = () => {
    navigate("/profile");
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="booking-container">
        <p className="no-bookings">No bookings found.</p>
        <button className="back-button" onClick={handleBackToProfile}>
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <h2 className="booking-header">Booking History</h2>
      <div className="booking-list">
        {bookings.map((booking, index) => (
          <div key={index} className="booking-item">
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Car Brand:</strong> {booking.carBrand}</p>
            <p><strong>Car Model:</strong> {booking.carModel}</p>
            <p><strong>Car Number:</strong> {booking.carNumber}</p>
            <p><strong>Price:</strong> ₹{booking.price}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <hr />
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleBackToProfile}>
        Back to Profile
      </button>
    </div>
  );
};

export default Booking;