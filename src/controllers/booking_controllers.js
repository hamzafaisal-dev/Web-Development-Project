import models from '../models/allModels.js'
const { City, Area, Ground, Booking, User } = models;
import mongoose from 'mongoose';

// /cities/:cityID/areas/:areaID/grounds/:groundID/bookings
export async function createBooking(req, res, next) {
    try {

        // will retrieve user ID from authenticated user session
        const userID = new mongoose.Types.ObjectId(req.user.id);

        const user = await User.findById(userID);
        console.log('User is');
        console.log(userID);

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        // const cityID = req.params.cityID;

        // // check if city ID request parameter is valid
        // const city = await City.findById(cityID);

        // if (!city) {
        //     return res.status(404).json({ message: "City not found" });
        // }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        // get current date
        const todayDate = new Date().toLocaleDateString("en-US");

        // push selected slots to booking
        // for (let slot of ground.slots) {
        //     if (slot.status === 'selected') {
        //         totalAmount += slot.rate;
        //         selectedSlots.push(slot);

        //         // update status of selected slots to pending. Slots cannot be selected by anyone now
        //         slot.status = 'pending';
        //         await ground.save();
        //     }
        // }
        console.log(req.body.subtotal);
        for (let slot of req.body.slots) {
            slot.status = 'pending';
        }

        // if no slots are selected, throw error
        if (req.body.slots.length === 0) {
            return res.status(400).json({ message: 'Select a slot to book' });
        }

        // create new booking
        const newBooking = await Booking.create({
            "bookingStatus": "pending",
            "bookingDate": todayDate,
            "user": userID,
            "ground": req.params.groundID,
            "slots": req.body.slots,
            "totalAmount": req.body.subtotal
        });

        await newBooking.save();

        user.bookings.push(newBooking._id);
        await user.save();

        res.status(200).json({ newBooking, groundName });

    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' && error.message.includes('bookingStatus')) {
            return res.status(400).json({ message: 'Invalid status' })
        }

        if (error.name === 'ValidationError' && error.message.includes('bookingDate')) {
            return res.status(400).json({ message: 'Invalid booking date' });
        }

        if (error.name === 'ValidationError' && error.message.includes('slots')) {
            return res.status(400).json({ message: 'Invalid slots' });
        }

        if (error.name === 'ValidationError' && error.message.includes('totalAmount')) {
            return res.status(400).json({ message: 'Invalid total amount' });
        }

        res.status(500).json({ message: "Something went wrong" });
    }
}

// // get a particular user's bookings
// export async function getBookings(req, res, next) {
//     try {

//         const cityID = req.params.cityID;

//         // check if city ID request parameter is valid
//         const city = await City.findById(cityID);

//         if (!city) {
//             return res.status(404).json({ message: "City not found" });
//         }

//         const areaID = req.params.areaID;

//         // check if area ID request parameter is valid
//         const area = await Area.findById(areaID);

//         if (!area) {
//             return res.status(404).json({ message: "Area not found" });
//         }

//         const groundID = req.params.groundID;

//         // check if ground ID request parameter is valid
//         const ground = await Ground.findById(groundID);

//         if (!ground) {
//             return res.status(404).json({ message: "Ground not found" });
//         }

//         const bookingID = req.params.bookingID;

//         // check if booking ID request parameter is valid
//         const booking = await Booking.findById(bookingID);

//         if (!booking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         res.status(200).json({ booking });

//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }

// get a particular user's bookings
export async function getBookings(req, res, next) {
    try {
        const userID = new mongoose.Types.ObjectId(req.user.id);

        const user = await User.findById(userID).populate({
            path: 'bookings',
            populate: {
                path: 'ground'
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const bookings = user.bookings;
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


// /cities/:cityID/areas/:areaID/grounds/:groundID/bookings
export async function getAllBookings(req, res, next) {
    try {

        // will retrieve user ID from authenticated user session
        const userID = new mongoose.Types.ObjectId(req.user.id);
        // console.log(req.user.payload.id);

        // check if ground ID request parameter is valid
        const bookings = await Booking.find({}).populate('ground');

        if (bookings.length == 0) {
            return res.status(404).json({ message: "Booking history is empty for this ground" });
        }

        res.status(200).json({ bookings });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/bookings/:bookingID
export async function deleteBooking(req, res, next) {
    try {

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        const bookingID = req.params.bookingID;

        // check if ground ID request parameter is valid
        const deletedBooking = await Booking.findByIdAndDelete(bookingID);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: 'Booking deleted successfully', deletedBooking });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/bookings/:bookingID
export async function approveBooking(req, res, next) {
    try {

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        const bookingID = req.params.bookingID;
        q
        // check if booking ID request parameter is valid
        const booking = await Booking.findByIdAndUpdate(bookingID, { "status": "confirmed" });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ booking });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/bookings/:bookingID
export async function rejectBooking(req, res, next) {
    try {

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        const bookingID = req.params.bookingID;

        // check if booking ID request parameter is valid
        const booking = await Booking.findByIdAndUpdate(bookingID, { "status": "rejected" });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ booking });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}