import express from "express";
import { register, login, bookAppointment, cancelAppointment } from "../controllers/userController";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/appointments", bookAppointment);
router.delete("/appointments/:id", cancelAppointment);
export default router;