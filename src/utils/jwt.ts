import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret';

export const generateToken = (userID: number, role: string) => {
    return jwt.sign({ userID, role }, secret, { expiresIn: '1d' });
};
