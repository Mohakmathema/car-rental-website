import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./loader";
import Home from "./home";
import LoginSignup from "./loginSignup";
import Fleet from "./fleet";
import MainFleet from "./mainFleet";
import Profile from "./profile";
import ContactUs from "./ContactUs";
import DriverOwner from "./driverOwner";
import DriverDashboard from "./DriverDashboard";
import DriverLayout from "./DriverLayout";
import DriverBookings from "./DriverBookings";
import DriverVehicle from "./DriverVehicle";
import DriverHistory from "./DriverHistory";
import DriverSettings from "./DriverSettings";
import Booking from "./Booking";
import FleetTable from "./fleetTable";

function App() {
  const [loading, setLoading] = useState(true);
  const [lastFrame, setLastFrame] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  return (
    <Router>
      <div>
        {loading ? (
          <Loader
            onComplete={() => setLoading(false)}
            setLastFrame={setLastFrame}
          />
        ) : (
          <Routes>
            <Route path="/" element={<Home lastFrame={lastFrame} user={user} />} />
            <Route path="/login" element={<LoginSignup setUser={setUser} />} />
            <Route path="/fleet" element={<MainFleet />} />
            <Route path="/fleet/:brand" element={<Fleet />} />
            <Route path="/services" element={<div>Services Page</div>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/driver" element={<DriverOwner />} />
            <Route
              path="/driver-dashboard"
              element={
                <DriverLayout>
                  <DriverDashboard />
                </DriverLayout>
              }
            />
            <Route
              path="/driver-dashboard/bookings"
              element={
                <DriverLayout>
                  <DriverBookings />
                </DriverLayout>
              }
            />
            <Route
              path="/driver-dashboard/vehicles" // New route for FleetTable
              element={
                <DriverLayout>
                  <FleetTable />
                </DriverLayout>
              }
            />
            <Route
              path="/driver-dashboard/history"
              element={
                <DriverLayout>
                  <DriverHistory />
                </DriverLayout>
              }
            />
            <Route
              path="/driver-dashboard/settings"
              element={
                <DriverLayout>
                  <DriverSettings />
                </DriverLayout>
              }
            />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/admin/vehicles" element={<FleetTable />} />
            <Route path="*" element={<div>404 - No Route Matched</div>} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;