import Vehicle from '../vehicleModel.js';

//this to submit vehicle information
export const submitVehicle = async (req, res) => {
  try {
    const { driverId, brand, model, licensePlate, description, images } = req.body;

    //this to check if vehicle with license plate already exists
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
      isVerified: true //for now auto-verify this in production should be false until admin approves
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//vehicle status
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

//get vehicle by driverId
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
  
  //update vehicle
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
  
  //delete vehicle 
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

  //update or add this method
export const updateVehicleStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!['available', 'busy', 'maintenance', 'offline'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const vehicle = await Vehicle.findById(id);
      
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      //*donot uncomment authentication not done. will not do not necessary. Tried doesnot work wont do this.
    //   if (vehicle.driverId.toString() !== req.user._id.toString()) {
    //     return res.status(403).json({ message: 'Not authorized to update this vehicle' });
    //   }
  
      vehicle.status = status;
      await vehicle.save();
  
      res.json(vehicle);
    } catch (error) {
      console.error('Status update error:', error);
      res.status(500).json({ message: 'Error updating vehicle status' });
    }
  };