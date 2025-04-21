import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
    carPreferences: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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
            Car Prefrences:
            <input
              type="text"
              name="carPrefrences"
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
              <strong>Car Prefrences:</strong> {profileData.carPreferences}
            </p>
          </div>
          <button onClick={handleEditClick} className="edit-profile-button">
            Edit Profile
          </button>
        </>
      )}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;
