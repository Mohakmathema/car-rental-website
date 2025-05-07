import React, { useState, useEffect } from "react";
import "./AdminCars.css";

const EditCars = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, pending, verified

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch("http://localhost:5000/api/admin/vehicles", {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch vehicles");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      setError("Error loading vehicles: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (vehicleId) => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch(
        `http://localhost:5000/api/admin/vehicles/${vehicleId}/verify`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to verify vehicle");

      setVehicles(
        vehicles.map((vehicle) =>
          vehicle._id === vehicleId ? { ...vehicle, isVerified: true } : vehicle
        )
      );
    } catch (error) {
      setError("Error verifying vehicle: " + error.message);
    }
  };

  const handleDelete = async (vehicleId) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;

    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch(
        `http://localhost:5000/api/admin/vehicles/${vehicleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete vehicle");
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
    } catch (error) {
      setError("Error deleting vehicle: " + error.message);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filter === "pending") return !vehicle.isVerified;
    if (filter === "verified") return vehicle.isVerified;
    return true;
  });

  if (loading) return <div className="loading">Loading vehicles...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="cars-management">
      <div className="cars-header">
        <h2>Manage Vehicles</h2>
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={filter === "verified" ? "active" : ""}
            onClick={() => setFilter("verified")}
          >
            Verified
          </button>
        </div>
      </div>

      <div className="vehicles-grid">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle._id} className="vehicle-card">
            <img
              src={vehicle.images[0]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="vehicle-image"
            />
            <div className="vehicle-info">
              <h3>
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="year">Year: {vehicle.year}</p>
              <p className="category">Category: {vehicle.category}</p>
              <p className="price">Price per day: ${vehicle.pricePerDay}</p>
              <p className="status">
                Status:{" "}
                <span className={vehicle.isVerified ? "verified" : "pending"}>
                  {vehicle.isVerified ? "Verified" : "Pending"}
                </span>
              </p>
              <div className="vehicle-actions">
                {!vehicle.isVerified && (
                  <button
                    className="verify-btn"
                    onClick={() => handleVerify(vehicle._id)}
                  >
                    Verify
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(vehicle._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCars;
