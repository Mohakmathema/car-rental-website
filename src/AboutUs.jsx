import React from "react";
import "./AboutUs.css";

// Import images from src/assets/
import AayushmaImg from "./assets/aayushma.jpg";
import MohakImg from "./assets/mohak.jpg";
import SamratImg from "./assets/samrat.jpg";
import SubinImg from "./assets/subin.jpg";
import SushmitaImg from "./assets/sushmita.jpg";

function AboutUs() {
  return (
    <div className="about-us-container">
      {/* Header Section */}
      <header className="about-header">
        <h1>About Us</h1>
        <p>Discover the story behind our passion for luxury car rentals.</p>
      </header>

      {/* Company Overview Section */}
      <section className="company-overview">
        <h2>Who We Are</h2>
        <p>
          We are a premier online car rental service dedicated to providing
          luxury vehicles for those who seek excellence in every journey.
          Founded in 2020, our mission has been to redefine the car rental
          experience by offering a seamless booking process, a curated fleet of
          high-end cars, and exceptional customer service.
        </p>
      </section>

      {/* Mission and Vision Section */}
      <section className="mission-vision">
        <div className="mission">
          <h3>Our Mission</h3>
          <p>
            To deliver an unparalleled car rental experience by combining
            luxury, convenience, and affordability, ensuring every customer
            drives away with a smile.
          </p>
        </div>
        <div className="vision">
          <h3>Our Vision</h3>
          <p>
            To be the leading global platform for luxury car rentals, setting
            the standard for quality and innovation in the industry.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img
              src={MohakImg}
              alt="Mohak Bhakta Mathema"
              className="member-image"
            />
            <h4>Mohak Bhakta Mathema</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img
              src={SamratImg}
              alt="Samrat Prajapati"
              className="member-image"
            />
            <h4>Samrat Prajapati</h4>
            <p>Head of Operations</p>
          </div>
          <div className="team-member">
            <img
              src={AayushmaImg}
              alt="Aayushma Poudel"
              className="member-image"
            />
            <h4>Aayushma Poudel</h4>
            <p>Chief Marketing Officer</p>
          </div>
          <div className="team-member">
            <img
              src={SushmitaImg}
              alt="Sushmita Shrestha"
              className="member-image"
            />
            <h4>Sushmita Shrestha</h4>
            <p>Chief Financial Officer</p>
          </div>
          <div className="team-member">
            <img src={SubinImg} alt="Subin Pradhan" className="member-image" />
            <h4>Subin Pradhan</h4>
            <p>Chief Operational Officer</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Experience Luxury?</h2>
        <button className="cta-button">Book a Car Now</button>
      </section>
    </div>
  );
}

export default AboutUs;
