import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./loader";
import Home from "./home";
import LoginSignup from "./loginSignup";

function App() {
  const [loading, setLoading] = useState(true);
  const [lastFrame, setLastFrame] = useState(null);

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
            <Route path="/" element={<Home lastFrame={lastFrame} />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/fleet" element={<div>Fleet Page</div>} />
            <Route path="/services" element={<div>Services Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
