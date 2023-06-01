import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

import mongoose from 'mongoose';
import { cityRouter } from './src/routes/cityRoutes.js'
import { areaRouter } from './src/routes/areaRoutes.js'
import { groundRouter } from './src/routes/groundRoutes.js'
import { slotRouter } from './src/routes/slotRoutes.js'
import { userRouter } from './src/routes/userRoutes.js'
import { reviewRouter } from './src/routes/reviewRoutes.js'
import { bookingRouter } from './src/routes/bookingRoutes.js'
import { paymentRouter } from './src/routes/paymentRoutes.js'

const app = express();
// sets up the Express application to handle incoming data in JSON format
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config() // load environment variables from .env file

// users router
app.use('/', userRouter);

// cities router
app.use('/', cityRouter);

// areas router
app.use('/', areaRouter);

// grounds router
app.use('/', groundRouter);

// slots router
app.use('/', slotRouter);

// reviews router
app.use('/', reviewRouter);

// bookings router
app.use('/', bookingRouter);

// bookings router
app.use('/', paymentRouter);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB');

        const port = process.env.PORT || 3001;

        app.listen(port, () => {
            console.log(`Node API app is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
