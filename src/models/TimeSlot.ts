export interface TimeSlot {
    slotID?: number;
    date: string;
    startTime: string;
    endTime: string;
    availability: 'Available' | 'Booked';
}
