import express from "express";
import { check } from "express-validator";
import { bookAppointment, cancelAppointment, getUserAppointments } from "../controllers/appointmentController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/book", protect, authorizeRoles("patient"), [
    check("doctorId", "Doctor ID is required").not().isEmpty(),
    check("date", "Valid date is required").isISO8601()
], bookAppointment);
router.put("/cancel/:id", protect, authorizeRoles("patient"), cancelAppointment);
router.get("/my-appointments", protect, authorizeRoles("patient"), getUserAppointments);
export default router;

