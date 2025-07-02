const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Register a new user
exports.registerUser = async (req, res) => {
    console.log('Received registration request:', req.body);
    const { name, email, password, role } = req.body;
    console.log('Registering user:', { name, email, role });

    try {
        // Check if user already exists
        let userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password:hashedPassword, role})
        return res.status(201).json({ message: 'User registered successfully', user });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for user:', email);
        // Check if user exists
        const user = await User.findOne({ email });
        if(user && await bcrypt.compare(password, user.password)) {
            console.log('User authenticated successfully:', email);
            const token = generateToken(user);
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error', error: error.message});
    }
}