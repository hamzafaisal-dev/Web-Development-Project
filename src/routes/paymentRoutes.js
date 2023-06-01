import express from 'express'
const paymentRouter = express.Router();
import { verifyAccessToken } from '../helpers/authHelpers.js'

import { createPayment, updatePayment } from "../controllers/payment_controllers.js"

// CREATE new booking in a particular ground
paymentRouter.post('/payment', createPayment);

// GET individual booking of a particular ground
paymentRouter.put('/payment', updatePayment);

// GET all bookings of a particular ground
// bookingRouter.get('/bookings', getAllBookings);

// // UPDATE a particular slot of a particular ground
// slotRouter.put('/cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID', updateSlot);

// // DELETE a particular booking's details
// bookingRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/bookings/:bookingID', verifyAccessToken, deleteBooking);

export { paymentRouter }