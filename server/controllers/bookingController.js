import Booking from '../bookingModel.js';
import Vehicle from '../vehicleModel.js';

export const createBooking = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate, requireDriver } = req.body;
    const userId = req.user._id;

    // Check if vehicle exists and is available
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    if (vehicle.status !== 'available') {
      return res.status(400).json({ message: 'Vehicle is not available' });
    }

    // Create booking
    const booking = await Booking.create({
      userId,
      vehicleId,
      startDate,
      endDate,
      requireDriver,
      status: 'pending',
      totalAmount: 0 // You can calculate this based on your business logic
    });

    // Update vehicle status
    vehicle.status = 'busy';
    await vehicle.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

export const getDriverBookings = async (req, res) => {
    try {
      const driverId = req.params.driverId;
      
      // First find vehicles owned by this driver
      const vehicles = await Vehicle.find({ driverId });
      const vehicleIds = vehicles.map(vehicle => vehicle._id);
      
      // Then find bookings for these vehicles
      const bookings = await Booking.find({
        vehicleId: { $in: vehicleIds }
      })
      .populate('userId', 'fullName email') // Get user details
      .populate('vehicleId', 'brand model licensePlate') // Get vehicle details
      .sort({ createdAt: -1 }); // Most recent first
      
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const updateBookingStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const bookingId = req.params.bookingId;
  
      if (!['confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const booking = await Booking.findById(bookingId)
        .populate('vehicleId')
        .populate('userId');
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Update booking status
      booking.status = status;
      await booking.save();
  
      // If booking is cancelled, make vehicle available again
      if (status === 'cancelled') {
        const vehicle = booking.vehicleId;
        vehicle.status = 'available';
        await vehicle.save();
      }
  
      res.json(booking);
    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ message: 'Error updating booking status' });
    }
  };

//   export const getUserBookings = async (req, res) => {
//     try {
//       const userId = req.params.userId;
      
//       const bookings = await Booking.find({ userId })
//         .populate('vehicleId', 'brand model licensePlate')
//         .sort({ createdAt: -1 }); // Most recent first
      
//       res.json(bookings);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };