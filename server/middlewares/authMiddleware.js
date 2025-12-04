import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes (verify JWT token)
export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({ success: false, message: 'No token provided, authorization denied' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach userId to request object
        req.auth = { userId: decoded.userId };
        
        next();
    } catch (error) {
        console.log('Token verification error:', error.message);
        return res.json({ success: false, message: 'Token is not valid' });
    }
};

// Middleware to protect educator routes
export const protectEducator = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({ success: false, message: 'No token provided, authorization denied' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user and check role
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.role !== 'educator') {
            return res.json({ success: false, message: 'Unauthorized Access! Educator role required.' });
        }

        // Attach userId to request object
        req.auth = { userId: decoded.userId };
        
        next();
    } catch (error) {
        console.log('Token verification error:', error.message);
        return res.json({ success: false, message: 'Token is not valid' });
    }
};