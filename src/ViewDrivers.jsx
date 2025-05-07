import React, { useState, useEffect } from "react";
import "./AdminTables.css";

const ViewDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch("http://localhost:5000/api/admin/drivers", {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch drivers");
      }

      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      setError("Error loading drivers: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDriver = async (driverId) => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch(
        `http://localhost:5000/api/admin/drivers/${driverId}/verify`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify driver");
      }

      setDrivers(
        drivers.map((driver) =>
          driver._id === driverId ? { ...driver, isVerified: true } : driver
        )
      );
    } catch (error) {
      setError("Error verifying driver: " + error.message);
    }
  };

  const handleDeleteDriver = async (driverId) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;

    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch(
        `http://localhost:5000/api/admin/drivers/${driverId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete driver");
      }

      setDrivers(drivers.filter((driver) => driver._id !== driverId));
    } catch (error) {
      setError("Error deleting driver: " + error.message);
    }
  };

  if (loading) return <div className="loading">Loading drivers...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-table-container">
      <h2>Drivers List</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>License Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver._id}>
              <td>{driver.fullName}</td>
              <td>{driver.email}</td>
              <td>{driver.licenseNumber}</td>
              <td>
                <span
                  className={`status ${
                    driver.isVerified ? "verified" : "pending"
                  }`}
                >
                  {driver.isVerified ? "Verified" : "Pending"}
                </span>
              </td>
              <td>
                {!driver.isVerified && (
                  <button
                    className="action-btn verify"
                    onClick={() => handleVerifyDriver(driver._id)}
                  >
                    Verify
                  </button>
                )}
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteDriver(driver._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDrivers;
