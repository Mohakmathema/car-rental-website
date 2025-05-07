import React, { useState, useEffect } from "react";
import "./AdminTables.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      // if (!adminInfo || !adminInfo.token) {
      //   throw new Error("No admin token found");
      // }
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError("Error loading users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setError("Error deleting user: " + error.message);
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-table-container">
      <h2>Users List</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>{user.address}</td>
              <td>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
