import express from 'express'
const app = express();

import dotenv from 'dotenv'
dotenv.config() // load environment variables from .env file

import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { hello, userSignUp, getAllUsers, userLogin, updateUser, deleteUser, deleteAll } from "./src/controllers/controllers.js";
import { addCity, getAllCities, getCity, deleteCity, } from "./src/controllers/city_controllers.js";
import { addArea, getArea, getAllAreas, updateArea, deleteArea } from "./src/controllers/area_controllers.js"
import { addGround, viewGrounds, viewGround, updateGround, deleteGround } from "./src/controllers/ground_controllers.js"
import { addSlot, getSlots, updateSlot, deleteSlot } from "./src/controllers/slot_controllers.js"
import { verifyToken } from './src/helpers/authHelpers.js'

//  sets up the Express application to handle incoming data in JSON format
app.use(express.json());

// 1.Cities CRUD operations // 

app.post('/cities', addCity);
app.get('/cities/:id', getCity);
app.get('/cities', getAllCities);
app.delete('/cities/:id', deleteCity);

//---------------------------------------------------------

// 2.Areas CRUD operations //

// CREATE new area in a particular city
app.post('/cities/:cityID/areas', addArea);

// GET individual area of a particular city
app.get('/cities/:cityID/areas/:areaID', getArea);

// GET all areas of a particular city
app.get('/cities/:cityID/areas', getAllAreas);

// UPDATE individual area of a particular city
app.put('/cities/:cityID/areas/:areaID', updateArea);

// DELETE individual area of a particular city
app.delete('/cities/:cityID/areas/:areaID', deleteArea);
//---------------------------------------------------------

// 3.Grounds CRUD operations //

// CREATE new ground in a particular area
app.post('/cities/:cityID/areas/:areaID/grounds', addGround);

// GET all grounds in a particular area
app.get('/cities/:cityID/areas/:areaID/grounds', viewGrounds);

// GET particular ground in a particular area. Search by name
app.get('/cities/:cityID/areas/:areaID/grounds', viewGround);

// UPDATE a particular ground
app.put('/cities/:cityID/areas/:areaID/grounds/:groundID', updateGround);

// DELETE a particular ground
app.delete('/cities/:cityID/areas/:areaID/grounds/:groundID', deleteGround);

//---------------------------------------------------------

// 4.Slots CRUD operations //

// CREATE new slot in a particular ground
app.post('/cities/:cityID/areas/:areaID/grounds/:groundID/slots', addSlot);

// GET all slots of a particular ground
app.get('/cities/:cityID/areas/:areaID/grounds/:groundID/slots', getSlots)

// UPDATE a particular slot of a particular ground
app.put('/cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID', updateSlot);

// DELETE a particular slot of a particular ground
app.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID', deleteSlot);

//---------------------------------------------------------

// creates endpoint to handle GET requests to the '/' URL path
app.get('/', hello);

// CREATE new user
app.post('/users/signup', userSignUp)

// READ / GET all users
app.get('/users', getAllUsers)

// READ / GET individual user
app.get('/users/login', userLogin)

// UPDATE a user
app.put('/users/:id', updateUser)

// DELETE a user
app.delete('/users/:id', deleteUser)

// DELETE all users
app.delete('/users', deleteAll)

// protected route
app.get('/users/protected', verifyToken, function (req, res) {

    jwt.verify(req.token, `${process.env.JWT_SECRET_KEY}`, function (err, data) {
        if (err) {
            res.status(403);
        } else {
            res.json({
                message: 'You do not have authorization to access this information',
                data: data
            });
        }
    })

    res.status(200).json({
        message: 'This is a protected route'
    });
})

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB');

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`Node API app is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
