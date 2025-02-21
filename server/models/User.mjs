import mongoose from 'mongoose';

// User is required for current config of NextAuth.js
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        required: false,
        default: '', 
    },
    role: {
        type: String,
        default: 'user',
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;