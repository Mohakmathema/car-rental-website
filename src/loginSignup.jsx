import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginSignup.css";

const LoginSignup = ({ setUser }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

    // For signup, validate that passwords match
    if (
      activeTab === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        activeTab === "login" ? "/api/users/login" : "/api/users";

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }
      // Store user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data); // Set the user state in App.jsx
      alert("Successful!"); // Show a success message
      navigate("/"); // Redirect to the home page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="auth-box">
        <div className="auth-tabs">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {activeTab === "signup" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          )}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading
              ? "Processing..."
              : activeTab === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              opacity: 0.7,
              transition: "opacity 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "1")}
            onMouseOut={(e) => (e.target.style.opacity = "0.7")}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
