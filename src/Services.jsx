import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Services.module.css"; // Use CSS Module

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <button onClick={() => navigate("/")} className={styles.backBtn} aria-label="Go back to home page">
          ←
        </button>
        <h1 className={styles.title}>Elite Drive - Luxury Car Rentals</h1>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <h2 className={styles.mainTitle}>Our Services</h2>

        {/* Luxury Cars Section */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Explore Our Luxury Car Collection</h3>
          <p className={styles.sectionText}>
            At Elite Drive, we offer an exclusive fleet of luxury vehicles designed to elevate your driving experience. From sleek sports cars like the Lamborghini Aventador to sophisticated sedans like the Rolls-Royce Phantom, our collection caters to those who demand the finest in automotive excellence. Each vehicle is meticulously maintained to ensure unparalleled performance, comfort, and style, making every journey unforgettable.
          </p>
        </section>

        {/* Booking Options Section */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Flexible Booking Options</h3>
          <p className={styles.sectionText}>
            Elite Drive provides versatile booking options to suit your needs. Choose to drive yourself and enjoy the thrill of our luxury cars, perfect for business trips, special occasions, or leisurely escapes. Alternatively, opt for a professional driver to accompany you, allowing you to relax and savor the journey in utmost comfort. Whether you need a car for a day, a week, or longer, our seamless booking process ensures a hassle-free experience tailored to your schedule.
          </p>
        </section>

        {/* Driver Profiles Section */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Meet Our Professional Drivers</h3>
          <p className={styles.sectionText}>
            Our team of highly skilled drivers at Elite Drive is dedicated to providing a safe, reliable, and luxurious travel experience. Each driver is carefully selected for their expertise, professionalism, and commitment to customer satisfaction. Browse detailed driver profiles to learn about their experience, qualifications, and customer ratings, ensuring you find the perfect match for your journey. With Elite Drive, you can trust that your travel is in the best hands.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2025 Elite Drive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;