import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginSignup.css";

//login ra signup handle garne part ho do not touch bigrinxa 🥹
const LoginSignup = ({ setUser }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    contactNumber: "",
    address: "",
    carPreferences: "",
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

    //this is signup and check if password matches
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
          fullName: formData.fullName,
          contactNumber: formData.contactNumber,
          address: formData.address,
          carPreferences: formData.carPreferences,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        //storing user info in localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data); //setting the user state in App.jsx
        alert("Successful!"); //showing a success message
        navigate("/"); //go to homr page
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to admin login page
  // const handleAdminClick = () => {
  //   navigate("/adminLogin");
  // };

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
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="new-password"
          />
          {activeTab === "signup" && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                autoComplete="new-password"
              />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="carPreferences"
                placeholder="Car Preferences"
                value={formData.carPreferences}
                onChange={handleInputChange}
              />
            </>
          )}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading
              ? "Processing..."
              : activeTab === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        {/* Admin button
        <div className="admin-link-container">
          <button onClick={handleAdminClick} className="admin-btn">
            Admin Login
          </button>
        </div> */}

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
          <div
            className="driver-link"
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <p>
              Are you a driver?{" "}
              <Link
                to="/driver"
                style={{
                  color: "#4a90e2",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Click here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
