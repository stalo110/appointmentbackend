"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAppointmentReport = exports.assignRole = exports.editTimeSlot = exports.deleteTimeSlot = exports.createTimeSlot = exports.getAllAppointments = void 0;
const db_1 = require("../config/db");
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [appointments] = yield db_1.pool.query("SELECT * FROM appointments");
    res.json(appointments);
});
exports.getAllAppointments = getAllAppointments;
const createTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, startTime, endTime } = req.body;
    const [existing] = yield db_1.pool.query("SELECT * FROM timeSlots WHERE date = ? AND startTime = ?", [date, startTime]);
    if (existing.length) {
        res.status(400).json({ message: "Time slot conflict" });
        return;
    }
    yield db_1.pool.query("INSERT INTO timeSlots (date, startTime, endTime, availability) VALUES (?, ?, ?, 'available')", [date, startTime, endTime]);
    res.status(201).json({ message: "Time slot created successfully" });
});
exports.createTimeSlot = createTimeSlot;
const deleteTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db_1.pool.query("DELETE FROM timeSlots WHERE slotID = ?", [id]);
    res.json({ message: "Time slot removed" });
});
exports.deleteTimeSlot = deleteTimeSlot;
const editTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { date, startTime, endTime, availability } = req.body;
    try {
        const [existingSlot] = yield db_1.pool.query("SELECT * FROM timeSlots WHERE slotID = ?", [id]);
        if (existingSlot.length === 0) {
            res.status(404).json({ message: "Time slot not found" });
            return;
        }
        yield db_1.pool.query("UPDATE timeSlots SET date = ?, startTime = ?, endTime = ?, availability = ? WHERE slotID = ?", [date, startTime, endTime, availability, id]);
        res.json({ message: "Time slot updated successfully" });
    }
    catch (error) {
        console.error("Error updating time slot:", error);
        res.status(500).json({ message: "An error occurred while updating the time slot" });
    }
});
exports.editTimeSlot = editTimeSlot;
const assignRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    yield db_1.pool.query("UPDATE users SET role = ? WHERE userID = ?", [role, id]);
    res.json({ message: "Role updated successfully" });
});
exports.assignRole = assignRole;
const generateAppointmentReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, status } = req.query;
    try {
        let query = "SELECT * FROM appointments WHERE 1";
        const queryParams = [];
        if (startDate) {
            query += " AND date >= ?";
            queryParams.push(startDate);
        }
        if (endDate) {
            query += " AND date <= ?";
            queryParams.push(endDate);
        }
        if (status) {
            query += " AND status = ?";
            queryParams.push(status);
        }
        const [appointments] = yield db_1.pool.query(query, queryParams);
        res.json({
            message: "Appointment report generated successfully",
            totalAppointments: appointments.length,
            appointments
        });
    }
    catch (error) {
        console.error("Error generating appointment report:", error);
        res.status(500).json({ message: "An error occurred while generating the report" });
    }
});
exports.generateAppointmentReport = generateAppointmentReport;
