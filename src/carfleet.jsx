import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './carfleet.css';

const CarFleet = () => {
  const { brand } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        console.log('Fetching vehicles for brand:', brand);
        console.log('localStorage contents:', {
          driverInfo: localStorage.getItem('driverInfo'),
          token: localStorage.getItem('token'),
          userInfo: localStorage.getItem('userInfo'),
          adminInfo: localStorage.getItem('adminInfo'),
        });

        // Check multiple localStorage keys for token
        let token = null;
        if (localStorage.getItem('driverInfo')) {
          const driverInfo = JSON.parse(localStorage.getItem('driverInfo'));
          token = driverInfo?.token;
        } else if (localStorage.getItem('userInfo')) {
          const userInfo = JSON.parse(localStorage.getItem('userInfo'));
          token = userInfo?.token;
        } else if (localStorage.getItem('adminInfo')) {
          const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
          token = adminInfo?.token;
        } else if (localStorage.getItem('token')) {
          token = localStorage.getItem('token');
        }

        console.log('Extracted token:', token);

        if (!token) {
          console.warn('No token found in driverInfo, userInfo, adminInfo, or token. Redirecting to login.');
          navigate('/login');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const url = brand
          ? `http://localhost:5000/api/vehicles?brand=${encodeURIComponent(brand)}`
          : 'http://localhost:5000/api/vehicles';
        const response = await axios.get(url, config);
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
          throw new Error('Invalid vehicle data format: Missing brand or model');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        if (error.response) {
          console.error('Error response:', error.response.status, error.response.data);
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
  }, [brand, navigate]);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.brand.toLowerCase().includes(search.toLowerCase().trim());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'available' && vehicle.isVerified) ||
      (filter === 'unavailable' && !vehicle.isVerified);
    return matchesSearch && matchesFilter;
  });

  const getCardClass = (vehicle) => {
    const base = `${vehicle.brand.toLowerCase().replace(/\s+/g, '')}-card`;
    return `car-card ${base} ${!vehicle.isVerified ? 'unavailable' : ''}`;
  };

  if (loading) return <div className="loading">Loading vehicles...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="car-panel-container">
      <div className="main-content">
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
                to={`/vehicle/${vehicle._id}`}
                key={vehicle._id}
                className={getCardClass(vehicle)}
              >
                {!vehicle.isVerified && <div className="unavailable-badge">Unavailable</div>}
                <img
                  src={vehicle.images && vehicle.images.length > 0 && vehicle.images[0] ? vehicle.images[0] : 'https://via.placeholder.com/150'}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="car-image"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                />
                <h3 className="car-name">{vehicle.brand} {vehicle.model}</h3>
                <p>License: {vehicle.licensePlate || 'N/A'}</p>
                <div className="car-description">
                  {vehicle.isVerified ? 'Available for Rent' : 'Currently Unavailable'}
                </div>
              </Link>
            ))
          ) : (
            <p className="no-results">No vehicles found for {brand || 'this search'}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarFleet;