// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalDrivers: 0,
//     totalVehicles: 0,
//     activeBookings: 0,
//   });

//   useEffect(() => {
//     // Fetch stats from your MongoDB collections
//     const fetchStats = async () => {
//       try {
//         const [users, drivers, vehicles, bookings] = await Promise.all([
//           fetch("http://localhost:5000/api/admin/stats/users").then((res) =>
//             res.json()
//           ),
//           fetch("http://localhost:5000/api/admin/stats/drivers").then((res) =>
//             res.json()
//           ),
//           fetch("http://localhost:5000/api/admin/stats/vehicles").then((res) =>
//             res.json()
//           ),
//           fetch("http://localhost:5000/api/admin/stats/bookings").then((res) =>
//             res.json()
//           ),
//         ]);

//         setStats({
//           totalUsers: users.count,
//           totalDrivers: drivers.count,
//           totalVehicles: vehicles.count,
//           activeBookings: bookings.activeCount,
//         });
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       <h1>Dashboard Overview</h1>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <h3>Total Users</h3>
//           <p>{stats.totalUsers}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Total Drivers</h3>
//           <p>{stats.totalDrivers}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Total Vehicles</h3>
//           <p>{stats.totalVehicles}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Active Bookings</h3>
//           <p>{stats.activeBookings}</p>
//         </div>
//       </div>

//       {/* Add more dashboard widgets as needed */}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalVehicles: 0,
    activeBookings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const headers = {
        Authorization: `Bearer ${adminInfo?.token}`,
        "Content-Type": "application/json",
      };

      const [users, drivers, vehicles, bookings] = await Promise.all([
        fetch("http://localhost:5000/api/admin/stats/users", { headers }).then(
          (res) => res.json()
        ),
        fetch("http://localhost:5000/api/admin/stats/drivers", {
          headers,
        }).then((res) => res.json()),
        fetch("http://localhost:5000/api/admin/stats/vehicles", {
          headers,
        }).then((res) => res.json()),
        fetch("http://localhost:5000/api/admin/stats/bookings", {
          headers,
        }).then((res) => res.json()),
      ]);

      setStats({
        totalUsers: users.count || 0,
        totalDrivers: drivers.count || 0,
        totalVehicles: vehicles.count || 0,
        activeBookings: bookings.activeCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Drivers</h3>
          <p className="stat-value">{stats.totalDrivers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Vehicles</h3>
          <p className="stat-value">{stats.totalVehicles}</p>
        </div>
        <div className="stat-card">
          <h3>Active Bookings</h3>
          <p className="stat-value">{stats.activeBookings}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
