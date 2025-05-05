import React, { useState, useEffect } from "react";
import "./DriverHistory.css";

const DriverHistory = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTripHistory();
  }, []);

  const fetchTripHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/trips/history");
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trip history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="driver-history">
      <h1>Trip History</h1>

      {loading ? (
        <div className="loading">Loading trip history...</div>
      ) : (
        <div className="history-list">
          {trips.map((trip) => (
            <div key={trip._id} className="history-card">
              <div className="trip-header">
                <h3>Trip #{trip._id.slice(-4)}</h3>
                <span className={`trip-status ${trip.status}`}>
                  {trip.status}
                </span>
              </div>
              <div className="trip-details">
                <p>
                  <strong>Customer:</strong> {trip.customerName}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(trip.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Duration:</strong> {trip.duration} days
                </p>
                <p>
                  <strong>Earnings:</strong> ${trip.amount}
                </p>
                <p>
                  <strong>Rating:</strong> {trip.rating}/5
                </p>
              </div>
              {trip.review && (
                <div className="trip-review">
                  <p>
                    <strong>Review:</strong> {trip.review}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverHistory;
