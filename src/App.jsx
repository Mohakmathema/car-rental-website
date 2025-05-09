import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutUs from './AboutUs';
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import ContactUs from "./ContactUs";
import Dashboard from "./Dashboard";
import DriverBookings from "./DriverBookings";
import DriverDashboard from "./DriverDashboard";
import DriverHistory from "./DriverHistory";
import DriverLayout from "./DriverLayout";
import DriverOwner from "./driverOwner";
import DriverSettings from "./DriverSettings";
import DriverVehicle from "./DriverVehicle";
import EditCars from "./EditCars";
import EditFleet from "./EditFleet";
import Faq from './Faq';
import Fleet from "./fleet";
import Home from "./home";
import Loader from "./loader";
import LoginSignup from "./loginSignup";
import Profile from "./profile";
import Terms from './Terms';
import ViewDrivers from "./ViewDrivers";
import ViewUsers from "./ViewUsers";

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

  if (loading) {
    return (
      <Loader
        onComplete={() => setLoading(false)}
        setLastFrame={setLastFrame}
      />
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home lastFrame={lastFrame} user={user} />} />
        <Route path="/login" element={<LoginSignup setUser={setUser} />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/services" element={<div>Services Page</div>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="faq" element={<Faq />} />
        <Route path="terms" element={<Terms />} />
        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />
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
          path="/driver-dashboard/vehicle"
          element={
            <DriverLayout>
              <DriverVehicle />
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

        {/* <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminLayout />} />
        <Route index element={<Dashboard />} />
        <Route path="users" element={<ViewUsers />} />
        <Route path="drivers" element={<ViewDrivers />} />
        <Route path="fleet" element={<EditFleet />} />
        <Route path="cars" element={<EditCars />} /> */}

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<ViewUsers />} />
          <Route path="drivers" element={<ViewDrivers />} />
          <Route path="fleet" element={<EditFleet />} />
          <Route path="cars" element={<EditCars />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="faq" element={<Faq />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
