import express from "express";
import { getAllAppointments, createTimeSlot,editTimeSlot, deleteTimeSlot, assignRole, generateAppointmentReport } from "../controllers/adminController";
const router = express.Router();

router.get("/appointments", getAllAppointments);
router.post("/timeslots", createTimeSlot);
router.delete("/timeslots/:id", deleteTimeSlot);
router.put("/users/assign-role/:id", assignRole);
router.put("/timeslots/:id", editTimeSlot);
router.get("/gernerate-report", generateAppointmentReport);

export default router;