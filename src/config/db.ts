import { createPool } from "mysql2";
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appointment_db',
    waitForConnections: true,
    connectionLimit: 10,
}).promise();

// Optional connection test
export const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1); // Stop the app if DB fails to connect
    }
};