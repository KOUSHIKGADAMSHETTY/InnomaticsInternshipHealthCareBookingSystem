import express from "express";
import { updateProfile, setAvailability } from "../controllers/doctorController.js";
const router = express.Router();
router.put("/update", updateProfile);
router.post("/availability", setAvailability);
export default router;
