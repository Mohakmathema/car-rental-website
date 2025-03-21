import React, { useRef, useEffect } from "react";
import "./home.css";
import profileImage from "./assets/profile.svg";

function Home({ lastFrame }) {
  const infoBoxRef = useRef(null);

  useEffect(() => {
    const infoBox = infoBoxRef.current;

    if (!infoBox) return;

    // Variables to control the tilt effect
    const maxTilt = 15; // Maximum tilt in degrees

    const handleMouseMove = (e) => {
      // Get the dimensions and position of the info box
      const rect = infoBox.getBoundingClientRect();

      // Calculate mouse position relative to the center of the box
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calculate percentage of the mouse position within the box
      const percentX = (mouseX / rect.width - 0.5) * 2; // -1 to 1
      const percentY = (mouseY / rect.height - 0.5) * 2; // -1 to 1

      // Calculate tilt angles based on mouse position
      // Invert Y-axis rotation for natural feel (mouse right → tilt right)
      const tiltX = -percentY * maxTilt; // Rotate around X-axis (horizontal)
      const tiltY = percentX * maxTilt; // Rotate around Y-axis (vertical)

      // Apply the transform
      infoBox.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = () => {
      // Reset the transform when mouse leaves
      infoBox.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };

    // Add event listeners
    infoBox.addEventListener("mousemove", handleMouseMove);
    infoBox.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      infoBox.removeEventListener("mousemove", handleMouseMove);
      infoBox.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
