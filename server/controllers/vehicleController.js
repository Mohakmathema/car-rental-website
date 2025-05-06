import Vehicle from '../models/VehicleModel.js';

// Existing controller functions (keep your existing implementations)
export const submitVehicle = async (req, res) => {
  // Existing logic for submitting a vehicle
};

export const getVehicleStatus = async (req, res) => {
  // Existing logic for getting vehicle status
};

export const getVehicleByDriver = async (req, res) => {
  // Existing logic for getting vehicles by driver
};

export const updateVehicle = async (req, res) => {
  // Existing logic for updating a vehicle
};

export const deleteVehicle = async (req, res) => {
  // Existing logic for deleting a vehicle
};

export const updateVehicleStatus = async (req, res) => {
  // Existing logic for updating vehicle status
};

// Add the new function to get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};