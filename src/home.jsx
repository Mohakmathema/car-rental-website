import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import profileImage from "./assets/profile.svg";
import BlurText from "../react-bits-elements/BlurText/BlurText"; //Importing the BlurText component
//*NOTE: blur text extrnal library ho download gara hai */
function Home({ lastFrame, user }) {
  const infoBoxRef = useRef(null);
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    console.log("Tagline animation completed!");
  };

  const handleProfileClick = () => {
    if (user) {
      //go to user profile login bhaxa bhane
      navigate("/profile");
    } else {
      //go to login/signup if login bhaeko xaina
      navigate("/login");
    }
  };

  const handleBookNowClick = () => {
    navigate("/book-now");
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
        {/* Nav bar right ma hune tyo box thingy*/}
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
          <button className="book-btn" onClick={handleBookNowClick}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
