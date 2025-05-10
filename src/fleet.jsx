import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Added Link for navigation
import './fleet.css';

const Fleet = () => {
  const { brand } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("driverInfo")
          ? JSON.parse(localStorage.getItem("driverInfo")).token
          : localStorage.getItem("token");

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:5000/api/vehicles', config);
        console.log('API Response:', response);

        let vehicleData = [];
        if (Array.isArray(response.data)) {
          vehicleData = response.data;
        } else if (response.data.status === 'success' && Array.isArray(response.data.data)) {
          vehicleData = response.data.data;
        } else if (Array.isArray(response.data.vehicles)) {
          vehicleData = response.data.vehicles;
        } else {
          throw new Error('Unexpected data format from API');
        }

        if (vehicleData.every(v => v.brand && v.model)) {
          setVehicles(vehicleData);
        } else {
          throw new Error('Invalid vehicle data format');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        if (error.response) {
          setError(
            error.response.status === 401
              ? 'Unauthorized. Please log in to view the fleet.'
              : `Failed to fetch vehicles: ${error.response.data.message || error.message}`
          );
        } else {
          setError(`Cannot connect to the server: ${error.message}. Please check your connection and try again.`);
        }
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesBrand = brand ? vehicle.brand.toLowerCase() === brand.toLowerCase().trim() : true;
    const matchesSearch = vehicle.brand.toLowerCase().includes(search.toLowerCase().trim());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'available' && vehicle.isVerified) ||
      (filter === 'unavailable' && !vehicle.isVerified);
    return matchesBrand && matchesSearch && matchesFilter;
  });

  const getCardClass = (vehicle) => {
    const base = `${vehicle.brand.toLowerCase().replace(/\s+/g, '')}-card`;
    return `car-card ${base} ${!vehicle.isVerified ? 'unavailable' : ''}`;
  };

  if (loading) return <div className="loading-message">Loading vehicles...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="fleet-container">
      <header>
        <h2>{brand ? `${brand} Vehicles` : 'Our Fleet'}</h2>
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
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map(vehicle => (
            <Link
              to={`/fleet/${brand}/${vehicle._id}`} // Navigate to CarDetails
              key={vehicle._id}
              className={getCardClass(vehicle)} // Reuse existing card class
            >
              {!vehicle.isVerified && <div className="unavailable-badge">Unavailable</div>}
              <img
                src={vehicle.images && vehicle.images.length > 0 && vehicle.images[0] ? vehicle.images[0] : 'https://via.placeholder.com/150'}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="car-image"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
              />
              <h3 className="car-name">{vehicle.brand} {vehicle.model}</h3>
              <p>License: {vehicle.licensePlate}</p>
              <div className="car-description">
                {vehicle.isVerified ? 'Available for Rent' : 'Currently Unavailable'}
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">No vehicles found for {brand || 'this search'}.</div>
        )}
      </div>
    </div>
  );
};

export default Fleet;