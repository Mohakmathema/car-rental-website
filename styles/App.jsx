import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContactUs from '../component/ContactUs';
import Fleet from "../fleet";
import Home from "../home";
import Loader from "../loader";
import LoginSignup from "../loginSignup";
import Profile from "../profile"; // Import the Profile component



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
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
