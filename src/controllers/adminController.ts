// controllers/adminController.ts
import { Request, Response } from "express";
import { pool } from "../config/db";

export const getAllAppointments = async (req: Request, res: Response) => {
  const [appointments]: any = await pool.query("SELECT * FROM appointments");
  res.json(appointments);
};

export const createTimeSlot = async (req: Request, res: Response): Promise<void> => {
  const { date, startTime, endTime } = req.body;
  const [existing]: any = await pool.query("SELECT * FROM timeSlots WHERE date = ? AND startTime = ?", [date, startTime]);
  if (existing.length) {
     res.status(400).json({ message: "Time slot conflict" });
     return;
    }
  await pool.query("INSERT INTO timeSlots (date, startTime, endTime, availability) VALUES (?, ?, ?, 'available')", [date, startTime, endTime]);
  res.status(201).json({ message: "Time slot created successfully" });
};

export const deleteTimeSlot = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query("DELETE FROM timeSlots WHERE slotID = ?", [id]);
  res.json({ message: "Time slot removed" });
};


export const editTimeSlot = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; 
    const { date, startTime, endTime, availability } = req.body;

    try {
        const [existingSlot]: any = await pool.query("SELECT * FROM timeSlots WHERE slotID = ?", [id]);

        if (existingSlot.length === 0) {
            res.status(404).json({ message: "Time slot not found" });
            return;
        }

        await pool.query(
            "UPDATE timeSlots SET date = ?, startTime = ?, endTime = ?, availability = ? WHERE slotID = ?",
            [date, startTime, endTime, availability, id]
        );

        res.json({ message: "Time slot updated successfully" });

    } catch (error) {
        console.error("Error updating time slot:", error);
        res.status(500).json({ message: "An error occurred while updating the time slot" });
    }
};

export const assignRole = async (req: Request, res: Response) => {
    const { id } = req.params;
  const { role } = req.body;
  await pool.query("UPDATE users SET role = ? WHERE userID = ?", [role, id]);
  res.json({ message: "Role updated successfully" });
};

export const generateAppointmentReport = async (req: Request, res: Response) => {
    const { startDate, endDate, status } = req.query;  

    try {
        let query = "SELECT * FROM appointments WHERE 1";
        const queryParams: any[] = [];

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

        const [appointments]: any = await pool.query(query, queryParams);

        res.json({
            message: "Appointment report generated successfully",
            totalAppointments: appointments.length,
            appointments
        });

    } catch (error) {
        console.error("Error generating appointment report:", error);
        res.status(500).json({ message: "An error occurred while generating the report" });
    }
};