import React, { useState, useEffect } from "react";
import "./fleet.css";

const Fleet = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [hoveredCar, setHoveredCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("most-least");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/items');
        
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        
        const data = await response.json();
        // Assuming the API returns an array of car objects
        setCars(data);
        setFilteredCars(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter cars based on search term, sort order, and availability
  useEffect(() => {
    if (cars.length === 0) return;
    
    let results = [...cars];
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        car.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by availability
    if (showOnlyAvailable) {
      results = results.filter(car => car.available);
    }
    
    // Sort by price
    results.sort((a, b) => {
      if (sortOrder === "most-least") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    
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

  if (loading) return <div className="loading">Loading cars...</div>;
  if (error) return <div className="error">Error: {error}</div>;

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
              key={car._id} // Using MongoDB _id
              className={`car-card ${car.brand ? car.brand.toLowerCase() : ''}-card ${hoveredCar === car._id ? 'hovered' : ''} ${!car.available ? 'unavailable' : ''}`}
              onMouseEnter={() => handleMouseEnter(car._id)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={car.image || '/placeholder-car.jpg'} alt={car.name} className="car-image" />
              <p className="car-name">{car.name}</p>
              <div className="car-description">{car.description}</div>
              <div className="car-price">${car.price}</div>
              <div className="car-status">
                {car.available ? 'Available' : 'Unavailable'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fleet;