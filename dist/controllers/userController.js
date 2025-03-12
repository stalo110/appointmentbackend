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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.bookAppointment = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    yield db_1.pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')", [name, email, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const [rows] = yield db_1.pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const user = rows[0];
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.userID, role: user.role }, "secret", { expiresIn: "1h" });
    res.json({ token, role: user.role });
});
exports.login = login;
const bookAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, date, timeSlot } = req.body;
    const [existing] = yield db_1.pool.query("SELECT * FROM appointments WHERE date = ? AND timeSlot = ?", [date, timeSlot]);
    if (existing.length) {
        res.status(400).json({ message: "Time slot already booked" });
        return;
    }
    yield db_1.pool.query("INSERT INTO appointments (userId, date, timeSlot, status) VALUES (?, ?, ?, 'booked')", [userId, date, timeSlot]);
    res.status(201).json({ message: "Appointment booked successfully" });
});
exports.bookAppointment = bookAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db_1.pool.query("UPDATE appointments SET status = 'cancelled' WHERE appointmentID = ?", [id]);
    res.json({ message: "Appointment cancelled" });
});
exports.cancelAppointment = cancelAppointment;
