// controllers/userController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db";
import { User } from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')", [name, email, hashedPassword]);
  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const [rows]: any = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!rows.length){
    res.status(401).json({ message: "Invalid credentials" });
    return; 
  } 
  const user: User = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }  
  const token = jwt.sign({ userId: user.userID, role: user.role }, "secret", { expiresIn: "1h" });
  res.json({ token, role: user.role });
};

export const bookAppointment = async (req: Request, res: Response): Promise<void> => {
  const { userId, date, timeSlot } = req.body;
  const [existing]: any = await pool.query("SELECT * FROM appointments WHERE date = ? AND timeSlot = ?", [date, timeSlot]);
  if (existing.length){
    res.status(400).json({ message: "Time slot already booked" });
    return;
  } 
  await pool.query("INSERT INTO appointments (userId, date, timeSlot, status) VALUES (?, ?, ?, 'booked')", [userId, date, timeSlot]);
  res.status(201).json({ message: "Appointment booked successfully" });
};

export const cancelAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query("UPDATE appointments SET status = 'cancelled' WHERE appointmentID = ?", [id]);
  res.json({ message: "Appointment cancelled" });
};