"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql2_1 = require("mysql2");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = (0, mysql2_1.createPool)({
    host: process.env.DATABASE_HOST, // Use environment variable for host  
    user: process.env.DATABASE_USER, // Use environment variable for user  
    password: process.env.DATABASE_PASSWORD, // Use environment variable for password  
    database: process.env.DATABASE_NAME, // Use environment variable for database  
    waitForConnections: true,
    connectionLimit: 10,
}).promise();
// Optional connection test
// export const connectDB = async () => {
//     try {
//         const connection = await pool.getConnection();
//         console.log('✅ Database connected successfully');
//         connection.release();
//     } catch (error) {
//         console.error('❌ Database connection failed:', error);
//         process.exit(1); // Stop the app if DB fails to connect
//     }
// };
