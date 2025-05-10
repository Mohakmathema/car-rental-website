import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./carDetails.css";

function CarDetails() {
  const { brand, carId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const token = localStorage.getItem("driverInfo")
          ? JSON.parse(localStorage.getItem("driverInfo")).token
          : localStorage.getItem("token");

        if (!token) throw new Error("No token found. Please log in.");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:5000/api/vehicles/${carId}`, config);
        let vehicleData = response.data;

        if (response.data.status === "success" && response.data.data) {
          vehicleData = response.data.data;
        } else if (response.data.vehicle) {
          vehicleData = response.data.vehicle;
        } else if (!vehicleData.brand || !vehicleData.model) {
          throw new Error("Invalid vehicle data format");
        }

        setVehicle(vehicleData);
        setLoading(false);
      } catch (error) {
        setError(
          error.response
            ? `Failed to fetch vehicle: ${error.response.status} - ${error.response.data.message || error.message}`
            : `Cannot connect to the server: ${error.message}`
        );
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [carId]);

  const handleBookNow = () => {
    console.log("handleBookNow triggered");
    console.log("brand:", brand, "carId:", carId, "vehicle:", vehicle);
    if (vehicle && vehicle._id && brand && carId) {
      const targetPath = `/fleet/${brand}/${carId}/booking`;
      console.log("Navigating to:", targetPath);
      navigate(targetPath);
    } else {
      console.error("Navigation failed: Missing vehicle, brand, or carId", {
        vehicle,
        brand,
        carId,
      });
    }
  };

  const handleBack = () => {
    navigate(`/fleet/${brand}`);
  };

  if (loading) return <div className="car-details-wrapper"><div className="car-details-loading">Loading vehicle details...</div></div>;
  if (error) return (
    <div className="car-details-wrapper">
      <div className="car-details-error">
        {error.includes("404")
          ? `Vehicle not found for ID: ${carId}. Please check the ID or try another vehicle.`
          : error}
        <button onClick={handleBack}>Back to Fleet</button>
      </div>
    </div>
  );
  if (!vehicle) return <div className="car-details-wrapper"><div className="car-details-error">No vehicle found for ID: {carId}</div></div>;

  return (
    <div className="car-details-wrapper">
      <div className="car-details-container">
        <div className="car-details-card">
          {/* Header */}
          <div className="car-details-header">
            <button className="car-details-back-button" onClick={handleBack}>
              <span className="car-details-arrow-left"></span>
            </button>
            
            <div className="car-details-search-container">
              <input
                type="text"
                placeholder="Search"
                className="car-details-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="car-details-search-icon"></span>
            </div>
            
            <div className="car-details-nav-links">
              <Link to="/" className="car-details-nav-link">HOME</Link>
              <Link to="/contact" className="car-details-nav-link">Contact</Link>
            </div>
            
            <div className="car-details-profile-avatar"></div>
          </div>
          
          {/* Car Image */}
          <div className="car-details-image-container">
            <img 
              src={vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : "/placeholder.svg"}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="car-details-image"
              onError={(e) => (e.target.src = "/placeholder.svg")}
            />
          </div>
          
          {/* Car Details */}
          <div className="car-details-info">
            <h1 className="car-details-title">{vehicle.brand} {vehicle.model}</h1>
            <div className="car-details-number">
              <span className="car-details-label">Number:</span>
              <span className="car-details-value">{vehicle.licensePlate}</span>
            </div>
            <div className="car-details-price">
              <span className="car-details-label">Price:</span>
              <span className="car-details-value">{vehicle.price || "8000"} per day</span>
            </div>
            
            <div className="car-details-footer">
              <div className="car-details-rating-container">
                <span className="car-details-rating-label">Rating</span>
                <div className="car-details-star-rating">★★★★★</div>
              </div>
              
              <div className="car-details-booking-container">
                <span className="car-details-upload-date">Uploaded on {new Date(vehicle.createdAt || Date.now()).toLocaleDateString()}</span>
                <button className="car-details-book-now-button" onClick={handleBookNow}>
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;