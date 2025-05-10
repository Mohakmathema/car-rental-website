import Vehicle from '../models/VehicleModel.js';

// Submit a new vehicle
export const submitVehicle = async (req, res) => {
  // Existing logic for submitting a vehicle
};

// Get vehicle status by driver ID
export const getVehicleStatus = async (req, res) => {
  // Existing logic for getting vehicle status
};

// Get vehicles by driver ID
export const getVehicleByDriver = async (req, res) => {
  // Existing logic for getting vehicles by driver
};

// Update a vehicle
export const updateVehicle = async (req, res) => {
  // Existing logic for updating a vehicle
};

// Delete a vehicle
export const deleteVehicle = async (req, res) => {
  // Existing logic for deleting a vehicle
};

// Update vehicle status
export const updateVehicleStatus = async (req, res) => {
  // Existing logic for updating vehicle status
};

// Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

// Get single vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};