import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
export const approveDoctor = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id);
        if (!doctor || doctor.role !== "doctor") {
            return res.status(404).json({ message: "Doctor not found" });
        }
        doctor.isApproved = true;
        await doctor.save();
        res.json({ message: "Doctor approved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error approving doctor" });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate("patientId doctorId");
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
};