// server/controllers/carController.js

import Car from '../models/carModel.js';

export const getAllCars = async (req, res) => {
  try {
    console.log("Fetching all cars from the database...");
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
};
