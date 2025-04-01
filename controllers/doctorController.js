import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

// Update Doctor Profile
export const updateProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.user.id });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        Object.assign(doctor, req.body);
        await doctor.save();
        res.json({ success: true, message: "Profile updated", doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating profile" });
    }
};

// Set Availability
export const setAvailability = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.user.id });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        doctor.availability = req.body.availability;
        await doctor.save();
        res.json({ success: true, message: "Availability updated", doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating availability" });
    }
};
