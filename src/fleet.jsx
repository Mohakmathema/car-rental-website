import React, { useState, useEffect } from "react";
import "./fleet.css";

const Fleet = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    //*: this is just dummy data
    //TODO: admin should be able to add the id, name and image of the car and also add/remove brands
    setCars([
      { id: 1, brand: "Bugatti", image: "https://via.placeholder.com/200" },
      { id: 2, brand: "Bugatti", image: "https://via.placeholder.com/200" },
      { id: 3, brand: "Bugatti", image: "https://via.placeholder.com/200" },
      { id: 4, brand: "Bugatti", image: "https://via.placeholder.com/200" },
      { id: 5, brand: "Bugatti", image: "https://via.placeholder.com/200" },
      { id: 6, brand: "Bugatti", image: "https://via.placeholder.com/200" },
    ]);
  }, []);

  return (
    <div className="fleet-container">
      <header>
        <input type="text" placeholder="Search" className="search-bar" />
        <div className="filters">
          <select>
            <option>Lowest to highest</option>
            <option>Highest to lowest</option>
          </select>
          <button className="availability-btn">
            Available <span className="status-indicator"></span>
          </button>
        </div>
      </header>

      <h2>Pick your Brand</h2>

      <div className="fleet-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.brand} className="car-image" />
            <p className="car-name">{car.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
