import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginSignup.css";

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
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
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

    if (activeTab === "signup") {
      if (formData.password.length < 7) {
        setError("Password must be at least 7 characters long");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (!formData.fullName || !formData.contactNumber || !formData.address || !formData.carPreferences) {
        setError("All fields are required");
        return;
      }
    } else if (forgotPassword && !resetPassword) {
      if (!formData.email) {
        setError("Email is required");
        return;
      }
    } else if (resetPassword) {
      if (formData.newPassword.length < 7) {
        setError("New password must be at least 7 characters long");
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError("New passwords do not match");
        return;
      }
    }

    try {
      setLoading(true);

      if (forgotPassword && !resetPassword) {
        // Forgot password: Send reset email
        const response = await fetch("http://localhost:5000/api/users/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setResetToken(data.resetToken || "simulated-token"); // Simulated token
          setResetPassword(true);
          setError("");
        } else {
          setError(data.message || "Failed to send reset email");
        }
      } else if (resetPassword) {
        // Reset password
        const response = await fetch(`http://localhost:5000/api/users/reset-password/${resetToken}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: formData.newPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Password reset successfully!");
          setForgotPassword(false);
          setResetPassword(false);
          setResetToken("");
          setFormData((prev) => ({
            ...prev,
            email: "",
            newPassword: "",
            confirmNewPassword: "",
          }));
          setActiveTab("login");
        } else {
          setError(data.message || "Failed to reset password");
        }
      } else {
        // Login or Signup
        const endpoint = activeTab === "login" ? "/api/users/login" : "/api/users";
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
          localStorage.setItem("userInfo", JSON.stringify(data));
          setUser(data);
          alert("Successful!");
          navigate("/");
        } else {
          setError(data.message || "An error occurred");
        }
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
    setError("");
    setFormData((prev) => ({
      ...prev,
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    }));
  };

  const handleBackToLogin = () => {
    setForgotPassword(false);
    setResetPassword(false);
    setResetToken("");
    setError("");
    setFormData((prev) => ({
      ...prev,
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    }));
  };

  return (
    <div className="login-signup-container">
      <div className="auth-box">
        <div className="auth-tabs">
          {!forgotPassword && (
            <>
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
            </>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {forgotPassword ? (
            resetPassword ? (
              <>
                <h3>Reset Password</h3>
                <div style={{ position: "relative" }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                    minLength={7}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                    required
                    minLength={7}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  >
                    {showConfirmNewPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Processing..." : "Reset Password"}
                </button>
                <button
                  type="button"
                  className="back-btn"
                  onClick={handleBackToLogin}
                  style={{ marginTop: "10px" }}
                >
                  Back to Login
                </button>
              </>
            ) : (
              <>
                <h3>Forgot Password</h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Processing..." : "Send Reset Link"}
                </button>
                <button
                  type="button"
                  className="back-btn"
                  onClick={handleBackToLogin}
                  style={{ marginTop: "10px" }}
                >
                  Back to Login
                </button>
              </>
            )
          ) : (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="new-password"
                  minLength={activeTab === "signup" ? 7 : undefined}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {activeTab === "signup" && (
                <>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      autoComplete="new-password"
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
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="carPreferences"
                    placeholder="Car Preferences"
                    value={formData.carPreferences}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
              {activeTab === "login" && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <button
                    type="button"
                    className="forgot-password-btn"
                    onClick={handleForgotPasswordClick}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#4a90e2",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading
                  ? "Processing..."
                  : activeTab === "login"
                  ? "Login"
                  : "Sign Up"}
              </button>
            </>
          )}
        </form>

        {!forgotPassword && (
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
            <div
              className="admin-link"
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <p>
                Are you an admin?{" "}
                <Link
                  to="/admin-login"
                  style={{
                    color: "#e74c3c",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Click here
                </Link>
              </p>
              <p className="link-para">
                By signing in or creating an account, you agree with our{" "}
                <Link to="/terms">Terms & Conditions</Link>. Learn more about us
                on our <Link to="/about">About Us</Link> page or check our{" "}
                <Link to="/faq">FAQ</Link> for common questions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;