
import Appointment from "../models/Appointment.js";
import { validationResult } from "express-validator";
export const bookAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
        const { doctorId, date } = req.body;
        const appointment = new Appointment({ patientId: req.user.id, doctorId, date, status: "pending" });
        await appointment.save();
        res.status(201).json({ success: true, message: "Appointment booked successfully", appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error booking appointment" });
    }
};
export const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        appointment.status = "cancelled";
        await appointment.save();
        res.json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error cancelling appointment" });
    }
};
export const getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user.id }).populate({
            path: "doctorId",
            select: "name specialization"
        });
        res.json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching appointments" });
    }
};
