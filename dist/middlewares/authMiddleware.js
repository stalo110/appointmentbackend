"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const authMiddleware = (roles) => (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: 'Forbidden' });
        req.user = decoded;
        if (roles.includes(decoded.role)) {
            next();
        }
        else {
            res.status(403).json({ message: 'Insufficient permissions' });
        }
    });
};
exports.authMiddleware = authMiddleware;
