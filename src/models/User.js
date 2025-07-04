const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Use "password" as the field name
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
});

// Method to verify password
userSchema.methods.verify = function (password) {
    return bcrypt.compare(password, this.password);
};

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
