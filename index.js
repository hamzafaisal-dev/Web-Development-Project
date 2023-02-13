import express from 'express'
const app = express();

import dotenv from 'dotenv'
dotenv.config() // load environment variables from .env file

import mongoose from 'mongoose'; // import mongoose library to work with MongoDB
import { hello, userSignUp, getAllUsers, userLogin, updateUser, deleteUser, deleteAll } from "./src/controllers/controllers.js";

//  sets up the Express application to handle incoming data in the JSON format
app.use(express.json());

// creates endpoint to handle GET requests to the '/' URL path
app.get('/', hello);

// (CREATE new user) endpoint for creating a new user
app.post('/users', userSignUp)

// (READ/GET all users) endpoint to handle GET requests to the '/users' URL path (fetching all users from database)
app.get('/users', getAllUsers)

// (READ/GET individual user) fetching individual user from database
app.get('/users/login', userLogin)

// change update and delete to change by req payload not by ID

// UPDATE a user
app.put('/users/:id', updateUser)

// DELETE a user
app.delete('/users/:id', deleteUser)

// DELETE all users
app.delete('/users', deleteAll)

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(3000, () => {
            console.log('Node API app is running on port 3000');
        });
    })
    .catch((error) => {
        console.log(error);
    })