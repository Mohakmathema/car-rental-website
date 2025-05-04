import Vehicle from '../vehicleModel.js';

// Submit vehicle information
export const submitVehicle = async (req, res) => {
  try {
    const { driverId, brand, model, licensePlate, description, images } = req.body;

    // Check if vehicle with license plate already exists
    const existingVehicle = await Vehicle.findOne({ licensePlate });
    if (existingVehicle) {
      return res.status(400).json({ message: 'Vehicle already registered' });
    }

    const vehicle = await Vehicle.create({
      driverId,
      brand,
      model,
      licensePlate,
      description,
      images,
      isVerified: true // For now, auto-verify. In production, this should be false until admin approves
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get vehicle status
export const getVehicleStatus = async (req, res) => {
  try {
    const { driverId } = req.params;
    const vehicle = await Vehicle.findOne({ driverId });

    if (!vehicle) {
      return res.json({ isVerified: false });
    }

    res.json({
      isVerified: vehicle.isVerified,
      vehicleInfo: vehicle
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add these new controller methods

// Get vehicle by driverId
export const getVehicleByDriver = async (req, res) => {
    try {
      const { driverId } = req.params;
      const vehicle = await Vehicle.findOne({ driverId });
      
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update vehicle
  export const updateVehicle = async (req, res) => {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
  
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete vehicle 
  export const deleteVehicle = async (req, res) => {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findByIdAndDelete(id);
  
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };