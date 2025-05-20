import { NavLink, Outlet, useNavigate } from "react-router-dom"; // Add useNavigate for redirection
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    // Optional: Add logout logic here (e.g., clear auth token, user session, etc.)
    navigate("/"); // Redirect to the main page
  };

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
        {/* Add Logout Button at the bottom of the sidebar */}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
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