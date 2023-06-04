import express from 'express'
const userRouter = express.Router();

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config() // load environment variables from .env file

import { home, userSignUp, getUser, getAllUsers, userLogin, updateUser, deleteUser, deleteAll } from "../controllers/user_controllers.js"
import { verifyAccessToken } from '../helpers/authHelpers.js'

// creates endpoint to handle GET requests to the '/' URL path
userRouter.get('/', home);

// CREATE new user
userRouter.post('/users/signup', userSignUp)

// GET indiv user
userRouter.get('/user', verifyAccessToken, getUser)

// READ / GET all users
userRouter.get('/users', getAllUsers)

// GET individual user. POST because in GET when u send data, it gets appended to URL as query parameters which is not safe way to send insensitive data
userRouter.post('/users/login', userLogin)

// UPDATE a user
userRouter.put('/users/:id', updateUser)

// DELETE a user
userRouter.delete('/users/:id', deleteUser)

// DELETE all users
userRouter.delete('/users', deleteAll)

// protected route
userRouter.get('/users/protected', verifyAccessToken, function (req, res) {

    jwt.verify(req.token, `${process.env.ACCESS_SECRET_KEY}`, function (err, data) {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
        } else {
            res.status(200).json({
                message: 'Profile accessed',
                data: data
            });
        }
    })
})

export { userRouter }