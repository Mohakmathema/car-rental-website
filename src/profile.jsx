import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;
