import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { div } from "framer-motion/client";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
    carPreferences: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const handleViewBookings = () => {
    navigate("/my-bookings");
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("userInfo");
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    } else if (user) {
      // Simulate fetching profile data from API
      setTimeout(() => {
        const fetchedData = {
          fullName: user.fullName,
          contactNumber: user.contactNumber,
          address: user.address,
          carPreferences: user.carPreferences,
        };
        setProfileData(fetchedData);
      }, 500);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/login");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        localStorage.removeItem("userInfo");
        alert("Account deleted.");
        setUser(null);
        navigate("/login");
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error(error);
      alert("Deletion error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("userInfo", JSON.stringify(profileData));
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");

    console.log("New Password:", passwordData.newPassword);
    console.log("Confirm Password:", passwordData.confirmNewPassword);
    console.log(
      "Do passwords match?",
      passwordData.newPassword === passwordData.confirmNewPassword
    );

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmNewPassword
    ) {
      setPasswordError("All password fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user._id}/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update password");
      }
      // if (response.ok) {
      alert("Password updated successfully");
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      // } else {
      //   setPasswordError(data.message || "Failed to update password");
      // }
    } catch (error) {
      console.error(error);
      setPasswordError("An error occurred while updating password");
    }
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {isEditing ? (
        <div className="profile-section">
          <h3>Edit Personal Information</h3>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleChange}
            />
          </label>
          <label>
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={profileData.contactNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Car Preferences:
            <input
              type="text"
              name="carPreferences"
              value={profileData.carPreferences}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="profile-section">
            <h3>Personal Information</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Full Name:</strong> {profileData.fullName}
            </p>
            <p>
              <strong>Contact Number:</strong> {profileData.contactNumber}
            </p>
            <p>
              <strong>Address:</strong> {profileData.address}
            </p>
            <p>
              <strong>Car Preferences:</strong> {profileData.carPreferences}
            </p>
          </div>
          <button onClick={handleEditClick} className="edit-profile-button">
            Edit Profile
          </button>
          <button
            onClick={() => setIsChangingPassword(true)}
            className="change-password-button"
          >
            Change Password
          </button>

          <button onClick={handleViewBookings} className="my-bookings-button">
            My Bookings
          </button>

          {/* Added Delete Profile Button */}
          <button
            onClick={handleDelete}
            className="delete-profile-button"
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete Profile
          </button>
        </>
      )}
      {isChangingPassword && (
        <div className="password-change-overlay">
          <div className="password-change-modal">
            <h3>Change Password</h3>
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Current Password:</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password:</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value.trim(),
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm new Password:</label>
                <input
                  type="password"
                  value={passwordData.confirmNewPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmNewPassword: e.target.value.trim(),
                    })
                  }
                  required
                />
              </div>
              <div className="button-group">
                <button type="submit" className="save-button">
                  Update Password
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordError("");
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmNewPassword: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;
//user management system
