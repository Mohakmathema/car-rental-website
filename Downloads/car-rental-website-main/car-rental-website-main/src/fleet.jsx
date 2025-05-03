// src/fleet.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './fleet.css'; // Your existing CSS

const Fleet = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars')
      .then(response => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading cars...</div>;

  return (
    <div className="fleet-container">
      <h1>Our Fleet</h1>
      <div className="fleet-grid">
        {cars.map(car => (
          <div key={car._id} className="car-card">
            <img src={car.image} alt={car.brand} className="car-image" />
            <h2>{car.brand}</h2>
            <p>Price per day: ₹{car.price}</p>
            <p>Available: {car.available ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
