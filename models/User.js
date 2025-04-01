import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patient", "doctor", "admin"], required: true },
    isApproved: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model("User", userSchema);