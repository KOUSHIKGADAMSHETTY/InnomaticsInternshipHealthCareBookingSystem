import express from "express";
import { approveDoctor, getAllUsers, getAllAppointments } from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.put("/approve-doctor/:id", protect, authorizeRoles("admin"), approveDoctor);
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.get("/appointments", protect, authorizeRoles("admin"), getAllAppointments);
export default router;