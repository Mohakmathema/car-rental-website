import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./driverDashboard.css";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [driverInfo, setDriverInfo] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState({
    brand: "",
    model: "",
    licensePlate: "",
    description: "",
    images: ["", "", "", ""],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);

  useEffect(() => {
    const storedDriverInfo = localStorage.getItem("driverInfo");
    if (!storedDriverInfo) {
      navigate("/driver");
      return;
    }
    const parsedDriverInfo = JSON.parse(storedDriverInfo);
    setDriverInfo(parsedDriverInfo);
    checkVerificationStatus();
    fetchVehicleInfo(parsedDriverInfo._id);
  }, [navigate]);

  const checkVerificationStatus = async () => {
    try {
      const driverData = JSON.parse(localStorage.getItem("driverInfo"));
      const response = await fetch(
        `http://localhost:5000/api/vehicles/status/${driverData._id}`
      );
      const data = await response.json();
      setIsVerified(data.isVerified);
      if (data.vehicleInfo) {
        setVehicleInfo(data.vehicleInfo);
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
    }
  };

  // In the handleImageUpload function, add image compression:
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image element to resize the image
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          // Create canvas
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate new dimensions - max width/height of 800px
          let width = img.width;
          let height = img.height;
          const maxSize = 800;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          // Resize image
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Get compressed image data
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.6);

          // Update state with compressed image
          const newImages = [...vehicleInfo.images];
          newImages[index] = compressedDataUrl;
          setVehicleInfo((prev) => ({
            ...prev,
            images: newImages,
          }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // In the same file, update the handleSubmit function:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (vehicleInfo.images.some((img) => !img)) {
        setError("Please upload all 4 images");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/vehicles/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${driverInfo.token}`,
          },
          body: JSON.stringify({
            driverId: driverInfo._id,
            ...vehicleInfo,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsVerified(true);
        alert("Vehicle information submitted successfully!");
      } else {
        setError(data.message || "Failed to submit vehicle information");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError(
        "An error occurred while submitting the information. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleInfo = async (driverId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/vehicles/driver/${driverId}`
      );
      if (response.ok) {
        const data = await response.json();
        setVehicleInfo(data);
        setVehicleId(data._id);
        setIsVerified(true);
      }
    } catch (error) {
      console.error("Error fetching vehicle info:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/vehicles/${vehicleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${driverInfo.token}`,
          },
          body: JSON.stringify(vehicleInfo),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        alert("Vehicle information updated successfully!");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update vehicle information");
      }
    } catch (error) {
      setError("An error occurred while updating");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your vehicle?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/vehicles/${vehicleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${driverInfo.token}`,
          },
        }
      );
      if (response.ok) {
        setIsVerified(false);
        setVehicleInfo({
          brand: "",
          model: "",
          licensePlate: "",
          description: "",
          images: ["", "", "", ""],
        });
        alert("Vehicle deleted successfully");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete vehicle");
      }
    } catch (error) {
      setError("An error occurred while deleting");
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="driver-dashboard-container">
        <h1>Driver Dashboard</h1>
        <div className="verified-dashboard">
          <div className="welcome-section">
            <h2>Welcome, {driverInfo?.name}</h2>
            <span className="verification-status">Verified Driver</span>
          </div>

          <div className="vehicle-info-section">
            <h3>Your Vehicle Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Brand</label>
                <p>{vehicleInfo.brand}</p>
              </div>
              <div className="info-item">
                <label>Model</label>
                <p>{vehicleInfo.model}</p>
              </div>
              <div className="info-item">
                <label>License Plate</label>
                <p>{vehicleInfo.licensePlate}</p>
              </div>
            </div>

            <div className="vehicle-images">
              <h4>Vehicle Images</h4>
              <div className="image-grid">
                {vehicleInfo.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Vehicle view ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Add more dashboard features here */}
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="driver-dashboard-container">
      {isVerified ? (
        <>
          <h1>Driver Dashboard</h1>
          <div className="verified-dashboard">
            <div className="welcome-section">
              <h2>Welcome, {driverInfo?.name}</h2>
              <span className="verification-status">Verified Driver</span>
            </div>

            <div className="vehicle-info-section">
              <h3>Your Vehicle Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Brand</label>
                  <p>{vehicleInfo.brand}</p>
                </div>
                <div className="info-item">
                  <label>Model</label>
                  <p>{vehicleInfo.model}</p>
                </div>
                <div className="info-item">
                  <label>License Plate</label>
                  <p>{vehicleInfo.licensePlate}</p>
                </div>
                <div className="info-item">
                  <label>Description</label>
                  <p>{vehicleInfo.description}</p>
                </div>
              </div>
              <div className="vehicle-images">
                <h4>Vehicle Images</h4>
                <div className="image-grid">
                  {vehicleInfo.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Vehicle view ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Complete Your Profile</h1>
          <div className="verification-form">
            <h2>Vehicle Information</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="vehicle-form">
              <div className="form-group">
                <label htmlFor="brand">Vehicle Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={vehicleInfo.brand}
                  onChange={handleInputChange}
                  placeholder="Enter vehicle brand"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="model">Vehicle Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={vehicleInfo.model}
                  onChange={handleInputChange}
                  placeholder="Enter vehicle model"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="licensePlate">License Plate Number</label>
                <input
                  type="text"
                  id="licensePlate"
                  name="licensePlate"
                  value={vehicleInfo.licensePlate}
                  onChange={handleInputChange}
                  placeholder="Enter license plate number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Vehicle Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={vehicleInfo.description}
                  onChange={handleInputChange}
                  placeholder="Enter vehicle description"
                  required
                />
              </div>

              <div className="image-upload-section">
                <label>Vehicle Images (4 required)</label>
                <div className="image-upload-grid">
                  {vehicleInfo.images.map((image, index) => (
                    <div key={index} className="image-upload-item">
                      <label className="image-upload-label">
                        {image ? (
                          <img src={image} alt={`Vehicle view ${index + 1}`} />
                        ) : (
                          <div className="upload-placeholder">
                            <span>Upload Image {index + 1}</span>
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

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Information"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
export default DriverDashboard;
