import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';

const register = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
    }

    const user = await User.findOne({ email: userData.email }).select({ _id: 1 });
    if (user) {
        throw new Error('User with this email already exists');
    }
    
    const createdUser = await User.create(userData);
    const token = generateToken(createdUser);
    return token;
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email');
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid password');
    }

    const token = generateToken(user);
    return token;
};

const authService = {
    register,
    login
};

export default authService;