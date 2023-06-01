import express from 'express'
const bookingRouter = express.Router();
import { verifyAccessToken } from '../helpers/authHelpers.js'

import { createBooking, getBooking, getAllBookings, deleteBooking, approveBooking, rejectBooking } from "../controllers/booking_controllers.js"

// CREATE new booking in a particular ground
bookingRouter.post('/cities/:cityID/grounds/:groundID/bookings', createBooking);

// GET individual booking of a particular ground
bookingRouter.get('/cities/:cityID/areas/:areaID/grounds/:groundID/bookings/:bookingID', verifyAccessToken, getBooking)

// GET all bookings of a particular ground
bookingRouter.get('/bookings', getAllBookings)

// // UPDATE a particular slot of a particular ground
// slotRouter.put('/cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID', updateSlot);

// // DELETE a particular booking's details
bookingRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/bookings/:bookingID', verifyAccessToken, deleteBooking);

export { bookingRouter }