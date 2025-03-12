export interface Appointment {
    appointmentID?: number;
    userID: number;
    date: string;
    timeSlot: string;
    status: 'Booked' | 'Cancelled';
}
