import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./driverOwner.css";

const DriverOwner = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    vehicleImage: "",
    vehicleDetails: {},
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    // Reset fields not needed for login
    if (tab === "login") {
      setFormData({
        name: "",
        email: formData.email,
        password: formData.password,
        confirmPassword: "",
        vehicleImage: "",
        vehicleDetails: {},
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (activeTab === "register") {
      if (formData.password.length < 7) {
        setError("Password must be at least 7 characters long");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    try {
      if (activeTab === "register") {
        console.log("Register payload:", formData);
        const response = await axios.post("/api/drivers/register", formData, {
          headers: { "Content-Type": "application/json" },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        });
        localStorage.setItem("driverInfo", JSON.stringify(response.data));
        navigate("/driver-dashboard");
      } else {
        const loginPayload = {
          email: formData.email,
          password: formData.password,
        };
        console.log("Login payload:", loginPayload);
        const response = await axios.post("/api/drivers/login", loginPayload, {
          headers: { "Content-Type": "application/json" },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        });
        localStorage.setItem("driverInfo", JSON.stringify(response.data));
        navigate("/driver-dashboard");
      }
    } catch (error) {
      console.error("Request error:", error.response);
      if (error.response?.status === 413) {
        setError("Request entity too large. Please ensure no large files are included.");
      } else {
        setError(error.response?.data?.message || "An error occurred");
      }
    }
  };

  return (
    <div className="driver-auth-container">
      <div className="driver-auth-box">
        <div className="auth-tabs">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => handleTabChange("register")}
          >
            Register
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="driver-auth-form">
          {activeTab === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
              minLength={activeTab === "register" ? 7 : undefined}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {activeTab === "register" && (
            <>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  minLength={7}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Limit file size to 1MB
                    if (file.size > 1 * 1024 * 1024) {
                      setError("Image file is too large. Please upload an image smaller than 1MB.");
                      return;
                    }
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setFormData({ ...formData, vehicleImage: reader.result });
                    };
                  }
                }}
                required
              />
            </>
          )}
          <button type="submit" className="submit-btn">
            {activeTab === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverOwner;