import React, { useState, useEffect } from "react";
import "./fleet.css";
import { getCars, filterCars } from "./data.js";

const Fleet = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [hoveredCar, setHoveredCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("most-least");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    // Load cars from the service
    const carData = getCars();
    setCars(carData);
    setFilteredCars(carData);
  }, []);

  useEffect(() => {
    // Apply filtering whenever search, sort or availability criteria change
    const results = filterCars(cars, searchTerm, sortOrder, showOnlyAvailable);
    setFilteredCars(results);
    setNoResults(results.length === 0 && searchTerm !== "");
  }, [cars, searchTerm, sortOrder, showOnlyAvailable]);

  const handleMouseEnter = (id) => {
    setHoveredCar(id);
  };

  const handleMouseLeave = () => {
    setHoveredCar(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const toggleAvailability = () => {
    setShowOnlyAvailable(!showOnlyAvailable);
  };

  const navigateToHome = () => {
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <div className="fleet-container">
      <header>
        <div className="header-left">
          <button className="back-button" onClick={navigateToHome}>
            &larr; Home
          </button>
          <input
            type="text"
            placeholder="Search by brand or description"
            className="search-bar"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="filters">
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="most-least">most-least expensive</option>
            <option value="least-most">least-most expensive</option>
          </select>
          <button 
            className={`availability-btn ${showOnlyAvailable ? 'active' : ''}`}
            onClick={toggleAvailability}
          >
            Available <span className={`status-indicator ${showOnlyAvailable ? 'active' : ''}`}></span>
          </button>
        </div>
      </header>
      
      <h2>Pick your Brand</h2>
      
      {noResults ? (
        <div className="no-results">No cars found matching "{searchTerm}"</div>
      ) : (
        <div className="fleet-grid">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className={`car-card ${car.brand.toLowerCase()}-card ${hoveredCar === car.id ? 'hovered' : ''} ${!car.available ? 'unavailable' : ''}`}
              onMouseEnter={() => handleMouseEnter(car.id)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={car.image} alt={car.brand} className="car-image" />
              <p className="car-name">{car.brand}</p>
              <div className="car-description">{car.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

 export default Fleet;