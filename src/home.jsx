import React, { useRef, useEffect } from "react";
import "./home.css";
import profileImage from "./assets/profile.svg";
import BlurText from "C:/Users/ACER/Desktop/react/test2/react-bits-elements/BlurText/BlurText"; // Import the BlurText component

function Home({ lastFrame }) {
  const infoBoxRef = useRef(null);

  // Log when animation completes
  const handleAnimationComplete = () => {
    console.log("Tagline animation completed!");
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        {lastFrame && (
          <div className="squircle-frame">
            <img src={lastFrame} alt="Luxury car" className="squircle-image" />
            <div className="profile-circle">
              <div className="profile-image"></div>
            </div>
          </div>
        )}
        {/* Navigation Box */}
        <div className="nav-box">
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#fleet">Our Fleet</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Tagline Box with BlurText */}
        <div className="tagline-box">
          {/* Replace the h1 with BlurText */}
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

          {/* Replace the p with BlurText */}
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
