import {pool} from '../config/db';

export const isTimeSlotAvailable = async (date: string, timeSlot: string) => {
    const [rows]: any = await pool.query(
        'SELECT * FROM appointments WHERE date = ? AND timeSlot = ? AND status = "Booked"',
        [date, timeSlot]
    );
    return rows.length === 0;
};
