import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookNow.css";

const BookNow = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const navigate = useNavigate();

  const handleVehicleClick = (vehicleId) => {
    navigate(`/vehicle/${vehicleId}`);
  };

  if (loading) return <div className="loading">Loading vehicles...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="book-now-container">
      <h1>Available Vehicles</h1>
      <div className="vehicles-grid">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="vehicle-card"
            onClick={() => handleVehicleClick(vehicle._id)}
          >
            <img
              src={vehicle.images[0]}
              alt={`${vehicle.brand} ${vehicle.model}`}
            />
            <div className="vehicle-info">
              <h3>
                {vehicle.brand} {vehicle.model}
              </h3>
              <p className="license-plate">License: {vehicle.licensePlate}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookNow;
