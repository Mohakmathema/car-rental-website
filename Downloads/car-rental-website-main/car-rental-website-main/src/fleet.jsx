import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './fleet.css';

const Fleet = () => {
  const { brand } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

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

  const filteredCars = cars.filter(car => {
    const matchesBrand = brand ? car.brand.toLowerCase() === brand.toLowerCase() : true;
    const matchesSearch = car.brand.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'available' && car.available) ||
      (filter === 'unavailable' && !car.available);
    return matchesBrand && matchesSearch && matchesFilter;
  });

  const getCardClass = (car) => {
    const base = `${car.brand.toLowerCase().replace(/\s+/g, '')}-card`;
    return `car-card ${base} ${!car.available ? 'unavailable' : ''}`;
  };

  if (loading) return <div>Loading cars...</div>;

  return (
    <div className="fleet-container">
      <header>
        <h2>{brand ? `${brand} Cars` : 'Our Fleet'}</h2>
        <div className="search-filter-row">
          <input
            type="text"
            placeholder="Search by brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
          <div className="filters">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="available">Available Only</option>
              <option value="unavailable">Unavailable Only</option>
            </select>
          </div>
        </div>
      </header>

      <div className="fleet-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <div key={car._id} className={getCardClass(car)}>
              {!car.available && <div className="unavailable-badge">Unavailable</div>}
              <img src={car.image} alt={car.brand} className="car-image" />
              <h3 className="car-name">{car.brand}</h3>
              <p className="car-model">{car.model}</p>
              <p className="car-number">Car No: {car.number}</p>
              <p>Price per day: ₹{car.price}</p>
              <button 
                className={`availability-btn ${car.available ? 'available' : 'unavailable'}`}
                disabled
              >
                {car.available ? 'Available' : 'Unavailable'}
              </button>
              <div className="car-description">
                {car.available ? `${car.brand} ${car.model} - Ready to Rent` : 'Currently Unavailable'}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No cars found for {brand}.</div>
        )}
      </div>
    </div>
  );
};

export default Fleet;