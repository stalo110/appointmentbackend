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
exports.connectDB = exports.pool = void 0;
const mysql2_1 = require("mysql2");
exports.pool = (0, mysql2_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appointment_db',
    waitForConnections: true,
    connectionLimit: 10,
}).promise();
// Optional connection test
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield exports.pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1); // Stop the app if DB fails to connect
    }
});
exports.connectDB = connectDB;
