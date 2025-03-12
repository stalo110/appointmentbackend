import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export const authMiddleware = (roles: string[]) => (req: Request | any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        req.user = decoded;

        if (roles.includes(decoded.role)) {
            next();
        } else {
            res.status(403).json({ message: 'Insufficient permissions' });
        }
    });
};
