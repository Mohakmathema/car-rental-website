import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js"; // Use named imports
import { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from "../controllers/vehicleController.js";

const router = express.Router();

// Public routes
router.get("/", getVehicles);
router.get("/:id", getVehicleById);

// Protected routes (require authentication)
router.post("/", protect, admin, createVehicle); // Use protect and admin
router.put("/:id", protect, admin, updateVehicle);
router.delete("/:id", protect, admin, deleteVehicle);

export default router;