import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./DriverSidebar.css";

const DriverSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("driverInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo"); // Clear userInfo if used
    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="driver-sidebar">
      <div className="sidebar-header">
        <h2>Driver Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        <Link
          to="/driver-dashboard"
          className={`nav-item ${
            location.pathname === "/driver-dashboard" ? "active" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/driver-dashboard/bookings"
          className={`nav-item ${
            location.pathname === "/driver-dashboard/bookings" ? "active" : ""
          }`}
        >
          Bookings
        </Link>
        <Link
          to="/driver-dashboard/vehicle"
          className={`nav-item ${
            location.pathname === "/driver-dashboard/vehicle" ? "active" : ""
          }`}
        >
          Vehicle
        </Link>
        <Link
          to="/driver-dashboard/history"
          className={`nav-item ${
            location.pathname === "/driver-dashboard/history" ? "active" : ""
          }`}
        >
          History
        </Link>
        <Link
          to="/driver-dashboard/settings"
          className={`nav-item ${
            location.pathname === "/driver-dashboard/settings" ? "active" : ""
          }`}
        >
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="nav-item logout-button"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default DriverSidebar;