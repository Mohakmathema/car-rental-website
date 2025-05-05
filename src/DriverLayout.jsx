import React from "react";
import DriverSidebar from "./DriverSidebar";
import "./DriverLayout.css";

const DriverLayout = ({ children }) => {
  return (
    <div className="driver-layout">
      <DriverSidebar />
      <main className="driver-main-content">{children}</main>
    </div>
  );
};

export default DriverLayout;
