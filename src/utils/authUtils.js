import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const generateToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});

    return token;    
};