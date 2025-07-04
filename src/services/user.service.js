const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async ({ email, password }) => {
    const existing = await User.findOne({ email });
    if (existing) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token };
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token };
};

exports.getUserById = async (userId) => {
    return User.findById(userId).select('-password');
};
