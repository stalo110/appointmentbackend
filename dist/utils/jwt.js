"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'your_jwt_secret';
const generateToken = (userID, role) => {
    return jsonwebtoken_1.default.sign({ userID, role }, secret, { expiresIn: '1d' });
};
exports.generateToken = generateToken;
