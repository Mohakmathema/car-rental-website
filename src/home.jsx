import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import profileImage from "./assets/profile.svg";
import BlurText from "D:/samrat docs/Semester 4/Colaborative Development/colab projects/car-rental-website/react-bits-elements/BlurText/BlurText.jsx";

function Home({ lastFrame, user }) {
  const infoBoxRef = useRef(null);
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    console.log("Tagline animation completed!");
  };

  const handleProfileClick = () => {
    if (user) {
      // Navigate to the profile page if the user is logged in
      navigate("/profile");
    } else {
      // Navigate to login/signup if the user is not logged in
      navigate("/login");
    }
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        {lastFrame && (
          <div className="squircle-frame">
            <img src={lastFrame} alt="Luxury car" className="squircle-image" />
            <div className="profile-circle" onClick={handleProfileClick}>
              <div className="profile-image">
                {/* Conditionally render something if the user is logged in, e.g., a border */}
              </div>
            </div>
          </div>
        )}
        {/* Navigation Box */}
        <div className="nav-box">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/fleet">Our Fleet</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Tagline Box with BlurText */}
        <div className="tagline-box">
          <div
            style={{
              fontSize: "3em",
              fontFamily: '"Italiana", sans-serif',
              letterSpacing: "3px",
              margin: 0,
            }}
          >
            <BlurText
              text="Experience Luxury on Wheels"
              delay={100}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="tagline-blur"
            />
          </div>
          {/*do this replace the p tag thingy with BlurText */}
          <div
            style={{
              paddingTop: "5px",
              margin: "10px 0 0",
              fontSize: "1.05em",
              opacity: 0.9,
              // fontFamily: '"Montserrat", sans-serif',
              letterSpacing: "1px",
            }}
          >
            <BlurText
              text="Premium Car Rental Service"
              delay={70}
              animateBy="letters"
              direction="bottom"
              threshold={0.2}
            />
          </div>
        </div>
        {/* Info Box */}
        <div className="info-box" ref={infoBoxRef}>
          <p>
            Discover our exclusive collection of luxury vehicles. Perfect for
            those who demand excellence in every journey.
          </p>
        </div>
        {/* CTA Box */}
        <div className="cta-box">
          <button className="book-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
}

 export default Home;