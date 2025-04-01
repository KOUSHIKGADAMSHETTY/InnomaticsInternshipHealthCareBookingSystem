import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    availability: [{ day: String, timeSlots: [String] }]
}, { timestamps: true });
export default mongoose.model("Doctor", doctorSchema);