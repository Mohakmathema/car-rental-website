import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';



//loading the env variable
dotenv.config();

//connecting to the database with function
connectDB();

const app = express();

//callning the middleware user
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

//calling the routes server
app.use('/api/users', userRoutes);

app.use('/api/drivers', driverRoutes);

app.use('/api/vehicles', vehicleRoutes);

//getting the basic route with API
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));