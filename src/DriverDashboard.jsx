import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./driverDashboard.css";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [driverInfo, setDriverInfo] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState({
    brand: "",
    model: "",
    licensePlate: "",
    images: [],
    description: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const storedDriverInfo = localStorage.getItem("driverInfo");
    if (!storedDriverInfo) {
      navigate("/driver");
      return;
    }
    const parsedInfo = JSON.parse(storedDriverInfo);
    setDriverInfo(parsedInfo);
    // Check if driver is verified
    setIsVerified(parsedInfo.isVerified || false);
  }, [navigate]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      setError("Maximum 4 images allowed");
      return;
    }

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((images) => setVehicleInfo((prev) => ({ ...prev, images })))
      .catch((error) => setError("Error processing images"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (vehicleInfo.images.length < 4) {
      setError("Please upload 4 images of your vehicle");
      return;
    }

    try {
      const response = await axios.post("/api/drivers/verify", {
        driverId: driverInfo._id,
        vehicleInfo,
      });

      if (response.data.success) {
        setIsVerified(true);
        const updatedDriverInfo = { ...driverInfo, isVerified: true };
        localStorage.setItem("driverInfo", JSON.stringify(updatedDriverInfo));
      }
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed");
    }
  };

  if (!driverInfo) return <div>Loading...</div>;

  return (
    <div className="driver-dashboard-container">
      <h1>Driver Dashboard</h1>

      {!isVerified ? (
        <div className="verification-form">
          <h2>Vehicle Verification</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="vehicle-form">
            <div className="form-group">
              <label>Vehicle Brand</label>
              <input
                type="text"
                value={vehicleInfo.brand}
                onChange={(e) =>
                  setVehicleInfo((prev) => ({
                    ...prev,
                    brand: e.target.value,
                  }))
                }
                required
                placeholder="e.g., Toyota, Honda"
              />
            </div>

            <div className="form-group">
              <label>Car Model</label>
              <input
                type="text"
                value={vehicleInfo.model}
                onChange={(e) =>
                  setVehicleInfo((prev) => ({
                    ...prev,
                    model: e.target.value,
                  }))
                }
                required
                placeholder="e.g., Camry 2022"
              />
            </div>

            <div className="form-group">
              <label>License Plate Number</label>
              <input
                type="text"
                value={vehicleInfo.licensePlate}
                onChange={(e) =>
                  setVehicleInfo((prev) => ({
                    ...prev,
                    licensePlate: e.target.value,
                  }))
                }
                required
                placeholder="Enter vehicle license plate number"
              />
            </div>

            <div className="form-group">
              <label>Vehicle Description</label>
              <textarea
                value={vehicleInfo.description}
                onChange={(e) =>
                  setVehicleInfo((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
                placeholder="Describe your vehicle (condition, features, etc.)"
              />
            </div>

            <div className="form-group">
              <label>Vehicle Images (4 required)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                required
              />
              <small>
                Please upload 4 images showing different angles of your vehicle
              </small>
            </div>

            <button type="submit" className="submit-btn">
              Submit for Verification
            </button>
          </form>
        </div>
      ) : (
        <div className="verified-dashboard">
          <div className="welcome-section">
            <h2>Welcome, {driverInfo.name}</h2>
            <p className="verification-status">✅ Vehicle Verified</p>
          </div>

          <div className="vehicle-details">
            <h3>Your Vehicle Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Brand:</label>
                <span>{vehicleInfo.brand}</span>
              </div>
              <div className="info-item">
                <label>Model:</label>
                <span>{vehicleInfo.model}</span>
              </div>
              <div className="info-item">
                <label>License Plate:</label>
                <span>{vehicleInfo.licensePlate}</span>
              </div>
            </div>

            <div className="vehicle-images">
              <h4>Vehicle Images</h4>
              <div className="image-grid">
                {vehicleInfo.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Vehicle view ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
