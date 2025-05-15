import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminLogin.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      // Hardcoded admin username and password
      const ADMIN_USERNAME = "admin";
      const ADMIN_PASSWORD = "admin123";

      if (
        formData.username === ADMIN_USERNAME &&
        formData.password === ADMIN_PASSWORD
      ) {
        // Store admin info in localStorage (with a different key from regular users)
        localStorage.setItem(
          "adminInfo",
          JSON.stringify({
            username: ADMIN_USERNAME,
            isFirstLogin: true, // Flag to check if it's first login
            token: "ADMIN_TOKEN",
          })
        );

        // Navigate to admin dashboard
        navigate("/admin-dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-auth-box">
        <h2>Admin Login</h2>

        {error && <div className="admin-error-message">{error}</div>}

        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="admin-submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <div className="admin-footer-links">
          <Link to="/login" className="admin-back-link">
            Back to User Login
          </Link>
          <Link to="/" className="admin-back-link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;