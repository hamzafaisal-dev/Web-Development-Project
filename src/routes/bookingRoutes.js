import express from 'express'
const bookingRouter = express.Router();
import { verifyAccessToken } from '../helpers/authHelpers.js'

import { createBooking, getBookings, getAllBookings, deleteBooking, approveBooking, rejectBooking } from "../controllers/booking_controllers.js"

// CREATE new booking in a particular ground
bookingRouter.post('/cities/:cityID/grounds/:groundID/bookings', verifyAccessToken, createBooking);

// GET bookings of a particular user
bookingRouter.get('/mybookings', verifyAccessToken, getBookings)

// GET all bookings of a particular ground
bookingRouter.get('/bookings', verifyAccessToken, getAllBookings)

// // UPDATE a particular slot of a particular ground
// slotRouter.put('/cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID', updateSlot);

// // DELETE a particular booking's details
bookingRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/bookings/:bookingID', verifyAccessToken, deleteBooking);

export { bookingRouter }