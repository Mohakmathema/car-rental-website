import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (!adminInfo) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      <div className="admin-content">
        <h2>Welcome, Admin!</h2>
        {/* Add your admin dashboard content here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
