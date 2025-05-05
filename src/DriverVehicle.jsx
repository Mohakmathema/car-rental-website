import React, { useState, useEffect } from "react";
import "./DriverVehicle.css";

const DriverVehicle = () => {
  const [vehicleStats, setVehicleStats] = useState({
    totalTrips: 0,
    totalEarnings: 0,
    rating: 0,
    status: "available",
  });

  useEffect(() => {
    // Fetch vehicle statistics
    fetchVehicleStats();
  }, []);

  const fetchVehicleStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vehicles/stats");
      const data = await response.json();
      setVehicleStats(data);
    } catch (error) {
      console.error("Error fetching vehicle stats:", error);
    }
  };

  return (
    <div className="driver-vehicle">
      <h1>Vehicle Management</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Trips</h3>
          <p className="stat-value">{vehicleStats.totalTrips}</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p className="stat-value">${vehicleStats.totalEarnings}</p>
        </div>
        <div className="stat-card">
          <h3>Rating</h3>
          <p className="stat-value">{vehicleStats.rating.toFixed(1)}/5.0</p>
        </div>
        <div className="stat-card">
          <h3>Status</h3>
          <p className={`status ${vehicleStats.status}`}>
            {vehicleStats.status}
          </p>
        </div>
      </div>

      <div className="maintenance-section">
        <h2>Maintenance Schedule</h2>
        <div className="maintenance-timeline">
          <div className="timeline-item">
            <div className="timeline-date">Next Service</div>
            <div className="timeline-content">
              <h4>Regular Maintenance</h4>
              <p>Due in 2 weeks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverVehicle;
