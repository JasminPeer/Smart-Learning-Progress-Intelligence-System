const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Profile = require('../models/Profile');

// Generate JWT
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        console.error("CRITICAL ERROR: JWT_SECRET is not defined in .env file");
        throw new Error("Server Configuration Error: Missing JWT Secret");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, educationLevel, mobileNumber, category } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all required fields');
    }

    if (role === 'admin') {
        res.status(403);
        throw new Error('Registration for Admin is not allowed');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'student',
        educationLevel: educationLevel || category, // Fallback or alias
        category,
        mobileNumber,
        enrolledCourses: []
    });

    if (user) {
        // Auto-create Profile
        await Profile.create({
            user: user._id,
            educationLevel: educationLevel || category || 'N/A',
            instituteName: 'N/A',
            mobile: mobileNumber || '',
            subjects: [],
            enrolledCourses: [],
            achievements: []
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            educationLevel: user.educationLevel,
            mobileNumber: user.mobileNumber,
            isDemo: user.email.toLowerCase() === 'demo@learniq.com',
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400);
            return res.json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            console.warn(`[AUTH] Login Failed: User ${email} not found.`);
            res.status(401);
            return res.json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`[AUTH] Login Debug for ${email}:`, { 
            found: !!user, 
            hasPassword: !!user?.password, 
            matches: isMatch,
            rawPassProvided: password.substring(0, 2) + "***" // Log prefix only for safety
        });

        if (isMatch) {
            // Update last login
            user.lastLogin = new Date();
            await user.save();

            const responseData = {
                _id: user.id,
                name: user.name,
                educationLevel: user.educationLevel,
                category: user.category,
                role: user.role ? user.role : 'student', // Explicit check
                isDemo: user.email.toLowerCase() === 'demo@learniq.com',
                avatar: user.avatar,
                token: generateToken(user._id.toString()),
            };

            console.log(`[DEBUG] authController - Successful login for ${user.email}`);
            console.log(`[DEBUG] authController - User Role from DB: '${user.role}'`);
            console.log(`[DEBUG] authController - Response Data Role: '${responseData.role}'`);
            console.log("[DEBUG] authController - Full response keys:", Object.keys(responseData));

            return res.json(responseData);
        } else {
            res.status(401);
            return res.json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ 
            message: "Authentication Service Error", 
            error: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
    }
});

// @desc    Update user details
// @route   PUT /api/auth/profile
// @access  Private
const updateUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        user.location = req.body.location || user.location;
        user.avatar = req.body.avatar !== undefined ? req.body.avatar : user.avatar;
        user.theme = req.body.theme || user.theme;
        user.fontSize = req.body.fontSize || user.fontSize;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            bio: updatedUser.bio,
            location: updatedUser.location,
            avatar: updatedUser.avatar,
            theme: updatedUser.theme,
            fontSize: updatedUser.fontSize,
            isDemo: updatedUser.email === 'demo@learniq.com',
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    const user = {
        ...req.user.toObject(),
        isDemo: req.user.email.toLowerCase() === 'demo@learniq.com'
    };
    res.status(200).json(user);
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUserDetails
};
