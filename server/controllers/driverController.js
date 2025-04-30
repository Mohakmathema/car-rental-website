import Driver from '../driverModel.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register driver
const registerDriver = async (req, res) => {
  try {
    const { name, email, password, vehicleImage, vehicleDetails } = req.body;

    const driverExists = await Driver.findOne({ email });

    if (driverExists) {
      res.status(400).json({ message: 'Driver already exists' });
      return;
    }

    const driver = await Driver.create({
      name,
      email,
      password,
      vehicleImage,
      vehicleDetails,
    });

    if (driver) {
      res.status(201).json({
        _id: driver._id,
        name: driver.name,
        email: driver.email,
        token: generateToken(driver._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login driver
const loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email });

    if (driver && (await driver.matchPassword(password))) {
      res.json({
        _id: driver._id,
        name: driver.name,
        email: driver.email,
        token: generateToken(driver._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { registerDriver, loginDriver };