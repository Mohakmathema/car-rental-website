"use client"

import { useNavigate } from "react-router-dom"
import "./carDetails.css"

function CarDetails({ car }) {
  const navigate = useNavigate()

  const handleBookNow = () => {
    // Navigate to the booking page with the car ID
    navigate(`/booking/${car.id}`)
  }

  return (
    <div className="car-details-container">
      <div className="car-card">
        <div className="header">
          <button className="back-button">
            <span>←</span>
          </button>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button className="search-button">🔍</button>
          </div>
          <nav className="navigation">
            <a href="#" className="nav-link">
              HOME
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
          </nav>
          <div className="profile-icon">
            <div className="avatar"></div>
          </div>
        </div>

        <div className="car-content">
          <img src={car.image || "/placeholder.svg"} alt={car.model} className="car-image" />

          <h1 className="car-model">{car.model}</h1>

          <div className="car-info">
            <p className="car-number">Number: {car.number}</p>
            <p className="car-price">Price: {car.price} per day</p>
            <div className="car-rating">Rating: {"★".repeat(car.rating)}</div>
            <p className="upload-date">Uploaded on {car.uploadDate}</p>
          </div>

          <button className="book-now-button" onClick={handleBookNow}>
            Book now
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarDetails
