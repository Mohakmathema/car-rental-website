import axios from 'axios';
import React, { useState } from 'react';

const AddCar = () => {
  const [formData, setFormData] = useState({
    model: '',
    number: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cars', formData);
      alert('Car added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add car.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Car</h2>
      <input name="model" placeholder="Model" onChange={handleChange} required />
      <input name="number" placeholder="Number" onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;
