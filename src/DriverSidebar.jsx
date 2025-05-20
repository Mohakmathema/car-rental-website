import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./DriverSidebar.css";

const DriverSidebar = () => {
  const location = useLocation();

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
        {/* <Link
          to="/driver-dashboard/vehicle"
          className={`nav-item ${
            location.pathname === "/driver-dashboard/vehicle" ? "active" : ""
          }`}
        >
          Vehicle
        </Link> */}
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
      </nav>
    </div>
  );
};

export default DriverSidebar;
