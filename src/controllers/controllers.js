import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'; // import user model which defines the structure of the users to be stored in the MongoDB database
import { validateEmail } from '../helpers/authHelpers.js';

export async function hello(req, res, next) {
    res.send('Hello user');
}

export async function userSignUp(req, res, next) {
    try {

        // check for duplicate entry, return error message if true
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: 'This email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        //creates a new user document in the MongoDB database using the data in the request body. The req.body property contains the request payload. Hashes password first then stores it
        const user = await User.create({
            email: req.body.email,
            password: hashedPassword
        });

        const token = jwt.sign({ user }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '24h' });

        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: 'Unable to create your account' })
    }
}

export async function getAllUsers(req, res, next) {
    try {
        const users = await User.find({}); // User.find({}) retrieves all users from database
        res.status(200).json(users) // returns list of users as a JSON object
    } catch (error) {
        res.status(500).json({ message: 'Unable to get users' })
    }
}

export async function userLogin(req, res, next) {
    try {
        //const userID = req.params.id;
        const user = await User.findOne({ email: req.body.email });
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        // if email is not found or password does not match, give error
        if (!user || !isMatch) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }

        const token = jwt.sign({ user }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '24h' });

        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: 'Unable to find user' })
    }
}

export async function updateUser(req, res, next) {
    try {
        // if user is trying to change password, password is first hashed then stored
        if (req.body.hasOwnProperty('password')) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const userID = req.params.id;
        const user = await User.findByIdAndUpdate(userID, req.body);

        if (!user) {
            return res.status(404).json({ message: `Cannot find user with ID: ${userID}` });
        }

        const updatedUser = await User.findById(userID);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteUser(req, res, next) {
    try {
        const userID = req.params.id;
        const user = await User.findByIdAndDelete(userID);

        if (!user) {
            return res.status(404).json({ message: `User not found` });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteAll(req, res, next) {
    try {
        const deletedUsers = await User.deleteMany({});
        res.status(200).json(deletedUsers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}