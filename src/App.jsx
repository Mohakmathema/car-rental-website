import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./loader";
import Home from "./home";
import LoginSignup from "./loginSignup";
import Fleet from "./fleet";
import Profile from "./profile";
import ContactUs from "./ContactUs";
// import AdminLogin from "./AdminLogin";

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
            <Route
              path="/"
              element={<Home lastFrame={lastFrame} user={user} />}
            />
            <Route path="/login" element={<LoginSignup setUser={setUser} />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/services" element={<div>Services Page</div>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />{" "}
            {/* Add the profile route */}
            {/* <Route path="/adminLogin" element={<AdminLogin />}></Route> */}
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
