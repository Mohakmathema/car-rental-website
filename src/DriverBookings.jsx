import React, { useState, useEffect } from "react";
import "./DriverBookings.css";

const DriverBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings data
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:5000/api/bookings/driver");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="driver-bookings">
      <h1>Current Bookings</h1>

      {loading ? (
        <div className="loading">Loading bookings...</div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h3>Booking #{booking._id.slice(-4)}</h3>
                <span className={`status ${booking.status}`}>
                  {booking.status}
                </span>
              </div>
              <div className="booking-details">
                <p>
                  <strong>Customer:</strong> {booking.customerName}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Duration:</strong> {booking.duration} days
                </p>
                <p>
                  <strong>Amount:</strong> ${booking.amount}
                </p>
              </div>
              <div className="booking-actions">
                <button className="accept-btn">Accept</button>
                <button className="reject-btn">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverBookings;
