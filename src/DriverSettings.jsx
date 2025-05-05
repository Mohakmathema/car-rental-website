import React, { useState, useEffect } from "react";
import "./DriverSettings.css";

const DriverSettings = () => {
  const [vehicleId, setVehicleId] = useState(null);
  const [settings, setSettings] = useState({
    notifications: true,
    automaticBooking: false,
  });

  const [vehicleStatus, setVehicleStatus] = useState("available");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch vehicle info when component mounts
    const fetchVehicleInfo = async () => {
      try {
        const driverInfo = JSON.parse(localStorage.getItem("driverInfo"));
        if (!driverInfo) return;

        const response = await fetch(
          `http://localhost:5000/api/vehicles/driver/${driverInfo._id}`
        );
        const data = await response.json();

        if (response.ok) {
          setVehicleId(data._id);
          setVehicleStatus(data.status);
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };

    fetchVehicleInfo();
  }, []);

  const handleVehicleStatusChange = async (status) => {
    if (!vehicleId) {
      setError("Vehicle ID not found");
      return;
    }

    try {
      setLoading(true);
      const driverInfo = JSON.parse(localStorage.getItem("driverInfo"));

      if (!driverInfo || !driverInfo.token) {
        setError("Please login again");
        return;
      }
      const response = await fetch(
        `http://localhost:5000/api/vehicles/${vehicleId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${driverInfo.token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setVehicleStatus(status);
        setError("");
      } else {
        // const data = await response.json();
        setError(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Status update error:", error);
      setError("Error updating vehicle status. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="driver-settings">
      <h1>Settings</h1>

      {error && <div className="error-message">{error}</div>}

      <section className="settings-section">
        <h2>Vehicle Status</h2>
        <div className="settings-grid">
          <div className="setting-item">
            <label>
              Availability Status
              <select
                value={vehicleStatus}
                onChange={(e) => handleVehicleStatusChange(e.target.value)}
                disabled={loading}
              >
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="offline">Offline</option>
              </select>
            </label>
            {loading && <span className="status-loading">Updating...</span>}
          </div>
        </div>
      </section>

      {/* Other settings sections remain unchanged */}
    </div>
  );
};

export default DriverSettings;
