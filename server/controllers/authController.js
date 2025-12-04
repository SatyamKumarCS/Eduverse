import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
};

// Register new user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            role: 'student',
            enrolledCourses: []
        });

        const token = generateToken(user._id);

        return res.json({
            success: true,
            message: 'Registration successful',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl,
                role: user.role,
                enrolledCourses: user.enrolledCourses
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        return res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl,
                role: user.role,
                enrolledCourses: user.enrolledCourses
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Get current user (verify token)
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.auth.userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        return res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl,
                role: user.role,
                enrolledCourses: user.enrolledCourses
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
