const User = require('../../models/User');

// GET /api/users/profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: 'Unauthorized: Missing userId in token' });

        const user = await User.findById(userId).select('-passwordHash').lean();
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('GetProfile Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
};

// PUT /api/users/profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: 'Unauthorized: Missing userId in token' });

        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true }
        ).select('-passwordHash').lean();

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('UpdateProfile Error:', error.message);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

module.exports = {
    getProfile,
    updateProfile
};
