import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FleetTable.css';

// Set the authorization token for all Axios requests
const token = localStorage.getItem('token'); // Adjust based on your storage method
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.warn('No token found in localStorage. Protected API requests will fail.');
}

const FleetTable = () => {
  const [fleetData, setFleetData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [filterAvailable, setFilterAvailable] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newFleet, setNewFleet] = useState({
    brand: '',
    model: '',
    licensePlate: '',
    image: '',
    isVerified: true,
  });
  const [editFleet, setEditFleet] = useState({
    _id: '',
    brand: '',
    model: '',
    licensePlate: '',
    image: '',
    isVerified: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch fleet data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehicles');
        setFleetData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error.response || error.message);
        setError(error.response?.data?.message || 'Failed to fetch fleet data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Toggle row selection using vehicle _id
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Delete selected vehicles
  const deleteSelected = async () => {
    try {
      await Promise.all(
        selected.map((id) =>
          axios.delete(`http://localhost:5000/api/vehicles/${id}`)
        )
      );
      setFleetData(fleetData.filter((row) => !selected.includes(row._id)));
      setSelected([]);
      alert('Selected vehicles deleted successfully!');
    } catch (error) {
      console.error('Error deleting vehicles:', error.response || error.message);
      const message = error.response?.status === 401
        ? 'Unauthorized: Please log in to delete vehicles'
        : error.response?.status === 404
        ? 'One or more vehicles not found'
        : error.response?.data?.message || error.message;
      alert(`Failed to delete vehicles: ${message}`);
    }
  };

  // Export data to CSV (without ID)
  const exportData = () => {
    const csv = [
      ['Brand', 'Model', 'License Plate', 'Image', 'Available'],
      ...fleetData.map((row) => [
        row.brand,
        row.model || '',
        row.licensePlate,
        row.images && row.images.length > 0 ? row.images[0] : '',
        row.isVerified ? 'Available' : 'Unavailable',
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fleet-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Add a new fleet entry
  const handleAddNew = async (e) => {
    e.preventDefault();
    if (!newFleet.brand || !newFleet.licensePlate || !newFleet.image) {
      alert('Please fill all required fields (Brand, License Plate, Image).');
      return;
    }

    const payload = {
      brand: newFleet.brand,
      model: newFleet.model || '',
      licensePlate: newFleet.licensePlate,
      images: [newFleet.image], // Backend expects images as an array
      isVerified: newFleet.isVerified,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/vehicles/submit', payload);
      setFleetData([response.data, ...fleetData]);
      setNewFleet({ brand: '', model: '', licensePlate: '', image: '', isVerified: true });
      setShowAddForm(false);
      alert('Vehicle added successfully!');
    } catch (error) {
      console.error('Error adding vehicle:', error.response || error.message);
      const message = error.response?.status === 401
        ? 'Unauthorized: Please log in to add a vehicle'
        : error.response?.status === 400
        ? error.response?.data?.message || 'Invalid data provided'
        : error.message;
      alert(`Failed to add vehicle: ${message}`);
    }
  };

  // Start editing a vehicle
  const startEdit = (vehicle) => {
    setEditFleet({
      _id: vehicle._id,
      brand: vehicle.brand,
      model: vehicle.model || '',
      licensePlate: vehicle.licensePlate,
      image: vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : '',
      isVerified: vehicle.isVerified,
    });
    setShowEditForm(true);
  };

  // Save edited vehicle
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editFleet.brand || !editFleet.licensePlate || !editFleet.image) {
      alert('Please fill all required fields (Brand, License Plate, Image).');
      return;
    }

    const payload = {
      brand: editFleet.brand,
      model: editFleet.model || '',
      licensePlate: editFleet.licensePlate,
      images: [editFleet.image], // Backend expects images as an array
      isVerified: editFleet.isVerified,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/vehicles/${editFleet._id}`, payload);
      setFleetData(fleetData.map((row) => (row._id === editFleet._id ? response.data : row)));
      setShowEditForm(false);
      alert('Vehicle updated successfully!');
    } catch (error) {
      console.error('Error updating vehicle:', error.response || error.message);
      const message = error.response?.status === 401
        ? 'Unauthorized: Please log in to update vehicles'
        : error.response?.status === 404
        ? 'Vehicle not found'
        : error.response?.data?.message || error.message;
      alert(`Failed to update vehicle: ${message}`);
    }
  };

  // Filter rows
  const filteredRows = fleetData.filter(
    (row) =>
      row.brand.toLowerCase().includes(search.toLowerCase()) &&
      (filterAvailable
        ? filterAvailable === 'available'
          ? row.isVerified
          : !row.isVerified
        : true)
  );

  if (loading) return <div>Loading fleet data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="fleet-table-container">
      <div className="fleet-table-header">
        <h2>Fleet Details</h2>
        <div className="fleet-table-actions">
          <button
            className="delete-btn"
            onClick={deleteSelected}
            disabled={!selected.length}
          >
            Delete Selected
          </button>
          <select
            onChange={(e) => setFilterAvailable(e.target.value)}
            value={filterAvailable}
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <button className="export-btn" onClick={exportData}>
            Export CSV
          </button>
          <button className="add-btn" onClick={() => setShowAddForm(true)}>
            + Add New
          </button>
        </div>
        <input
          className="search-input"
          type="text"
          placeholder="Search by brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showAddForm && (
        <div className="add-new-form">
          <h3>Add New Vehicle</h3>
          <form onSubmit={handleAddNew}>
            <input
              type="text"
              placeholder="Brand *"
              value={newFleet.brand}
              onChange={(e) => setNewFleet({ ...newFleet, brand: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Model"
              value={newFleet.model}
              onChange={(e) => setNewFleet({ ...newFleet, model: e.target.value })}
            />
            <input
              type="text"
              placeholder="License Plate *"
              value={newFleet.licensePlate}
              onChange={(e) => setNewFleet({ ...newFleet, licensePlate: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL *"
              value={newFleet.image}
              onChange={(e) => setNewFleet({ ...newFleet, image: e.target.value })}
              required
            />
            <select
              value={newFleet.isVerified ? 'available' : 'unavailable'}
              onChange={(e) =>
                setNewFleet({
                  ...newFleet,
                  isVerified: e.target.value === 'available',
                })
              }
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <div className="form-actions">
              <button type="submit" className="add-btn">Add Vehicle</button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showEditForm && (
        <div className="add-new-form">
          <h3>Edit Vehicle</h3>
          <form onSubmit={handleEditSave}>
            <input
              type="text"
              placeholder="Brand *"
              value={editFleet.brand}
              onChange={(e) => setEditFleet({ ...editFleet, brand: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Model"
              value={editFleet.model}
              onChange={(e) => setEditFleet({ ...editFleet, model: e.target.value })}
            />
            <input
              type="text"
              placeholder="License Plate *"
              value={editFleet.licensePlate}
              onChange={(e) => setEditFleet({ ...editFleet, licensePlate: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL *"
              value={editFleet.image}
              onChange={(e) => setEditFleet({ ...editFleet, image: e.target.value })}
              required
            />
            <select
              value={editFleet.isVerified ? 'available' : 'unavailable'}
              onChange={(e) =>
                setEditFleet({
                  ...editFleet,
                  isVerified: e.target.value === 'available',
                })
              }
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <div className="form-actions">
              <button type="submit" className="add-btn">Save Changes</button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => setShowEditForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="fleet-table-wrapper">
        <table className="fleet-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selected.length === fleetData.length && fleetData.length > 0}
                  onChange={(e) =>
                    setSelected(e.target.checked ? fleetData.map((r) => r._id) : [])
                  }
                />
              </th>
              <th>Brand</th>
              <th>Model</th>
              <th>License Plate</th>
              <th>Image</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <tr
                  key={row._id}
                  className={selected.includes(row._id) ? 'selected' : ''}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(row._id)}
                      onChange={() => toggleSelect(row._id)}
                    />
                  </td>
                  <td>{row.brand}</td>
                  <td>{row.model || '-'}</td>
                  <td>{row.licensePlate}</td>
                  <td>
                    <img
                      src={row.images && row.images.length > 0 ? row.images[0] : 'https://via.placeholder.com/60x40?text=No+Image'}
                      alt={row.brand}
                      style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/60x40?text=Image+Not+Found')}
                    />
                  </td>
                  <td>
                    <span
                      className={`status-badge ${row.isVerified ? 'available' : 'unavailable'}`}
                    >
                      {row.isVerified ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => startEdit(row)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No matching brand found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FleetTable;