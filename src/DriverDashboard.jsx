import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./driverDashboard.css";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [driverInfo, setDriverInfo] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState({
    brand: "",
    model: "",
    licensePlate: "",
    description: "",
    images: ["", "", "", ""], // Array for 4 images
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const storedDriverInfo = localStorage.getItem("driverInfo");
    if (!storedDriverInfo) {
      navigate("/driver");
      return;
    }
    setDriverInfo(JSON.parse(storedDriverInfo));
  }, [navigate]);

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...vehicleInfo.images];
        newImages[index] = reader.result;
        setVehicleInfo((prev) => ({
          ...prev,
          images: newImages,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehicleInfo.images.some((img) => !img)) {
      setError("Please upload all 4 images");
      return;
    }
    // Handle form submission
    console.log("Vehicle Info:", vehicleInfo);
  };

  return (
    <div className="driver-dashboard-container">
      <h1>Driver Dashboard</h1>
      <div className="verification-form">
        <h2>Vehicle Information</h2>
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

          <div className="image-upload-group">
            <label>Vehicle Images (4 required)</label>
            <div className="image-upload-grid">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="image-upload-item">
                  <label className="image-upload-label">
                    {vehicleInfo.images[index] ? (
                      <img
                        src={vehicleInfo.images[index]}
                        alt={`Vehicle view ${index + 1}`}
                        className="preview-image"
                      />
                    ) : (
                      <div className="upload-placeholder">
                        <span>Image {index + 1}</span>
                        <small>Click to upload</small>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverDashboard;