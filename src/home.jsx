import React from "react";
import "./home.css";
import profileImage from "./assets/profile.svg";

function Home({ lastFrame }) {
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

        {/* Tagline Box */}
        <div className="tagline-box">
          <h1>Experience Luxury on Wheels</h1>
          <p>Premium Car Rental Service</p>
        </div>

        {/* Info Box */}
        <div className="info-box">
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
