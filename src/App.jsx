import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./loader";
import Home from "./home";
import LoginSignup from "./loginSignup";
import Fleet from "./fleet";
import Profile from "./profile";
import ContactUs from "./ContactUs";
import DriverOwner from "./driverOwner";
import DriverDashboard from "./DriverDashboard";
import DriverLayout from "./DriverLayout";
import DriverBookings from "./DriverBookings";
import DriverVehicle from "./DriverVehicle";
import DriverHistory from "./DriverHistory";
import DriverSettings from "./DriverSettings";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import ViewUsers from "./ViewUsers";
import ViewDrivers from "./ViewDrivers";
import EditFleet from "./EditFleet";
import EditCars from "./EditCars";
import BookingForm from "./BookingForm";
import BookNow from "./BookNow";
import VehicleDetails from "./VehicleDetails";
import UserBookings from "./UserBookings";

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
        </Route>

        <Route path="/book-now" element={<BookNow />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/my-bookings" element={<UserBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
