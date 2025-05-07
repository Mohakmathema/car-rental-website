import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin-dashboard" end>
            Dashboard
          </NavLink>
          <NavLink to="/admin-dashboard/users">View Users</NavLink>
          <NavLink to="/admin-dashboard/drivers">View Drivers</NavLink>
          <NavLink to="/admin-dashboard/fleet">Edit Fleet</NavLink>
          <NavLink to="/admin-dashboard/cars">Edit Cars</NavLink>
        </nav>
      </aside>
      <main className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
