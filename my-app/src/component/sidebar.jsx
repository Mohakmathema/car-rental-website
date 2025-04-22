import React from "react"
import { FaCar, FaChartBar, FaCog, FaHome, FaSignOutAlt, FaUsers, FaUserTie } from "react-icons/fa"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">ELITE DRIVE</div>
      <ul className="nav">
        <li><FaHome /> HOME</li>
        <li><FaUsers /> View Users</li>
        <li><FaUserTie /> View Sellers</li>
        <li className="active"><FaCar /> Edit Fleet</li>
        <li><FaChartBar /> Analytics</li>
        <li><FaCog /> Settings</li>
        <li><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  )
}

export default Sidebar












































































































































