"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./carFilterPage.css"

function CarFilterPage() {
  const [cars, setCars] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetch("mongodb://localhost:27017/car-rental") // update to your backend route
      .then(res => res.json())
      .then(data => setCars(data))
  }, [])

  const filteredCars = cars.filter(car =>
    car.model.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="car-filter-page">
      <header className="filter-header">
        <input
          type="text"
          placeholder="Search car model"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </header>

      <div className="car-list">
        {filteredCars.map(car => (
          <div key={car._id} className="car-card">
            <img src={car.image || "/placeholder.svg"} alt={car.model} className="car-img" />
            <h2>{car.model}</h2>
            <p>Price: {car.price} per day</p>
            <p>Rating: {"★".repeat(car.rating)}</p>
            <button onClick={() => navigate(`/booking/${car._id}`)} className="book-now-button">
              Book now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarFilter
