"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.get("/appointments", adminController_1.getAllAppointments);
router.post("/timeslots", adminController_1.createTimeSlot);
router.delete("/timeslots/:id", adminController_1.deleteTimeSlot);
router.put("/users/assign-role/:id", adminController_1.assignRole);
router.put("/timeslots/:id", adminController_1.editTimeSlot);
router.get("/gernerate-report", adminController_1.generateAppointmentReport);
exports.default = router;
