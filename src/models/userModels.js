import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: [true, 'This email is already in use']
        },

        password: {
            type: String,
            required: [true, 'Please enter your password'],
            min: 6  
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;