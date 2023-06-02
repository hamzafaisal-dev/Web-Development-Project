import mongoose from 'mongoose';

const citySchema = mongoose.Schema(
    {
        cityName: {
            type: String,
            required: true,
            unique: true
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        },
        grounds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ground'
            }
        ],
        areas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Area'
            }
        ]
    },
    {
        timestamps: true
    }
);

const areaSchema = mongoose.Schema(
    {
        areaName: {
            type: String,
            required: true,
            min: 5
        },
        postalCode: {
            type: Number
        },
        grounds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ground'
            }
        ]
    },
    {
        timestamps: true
    }
);

const groundSchema = mongoose.Schema(
    {
        groundName: {
            type: String,
            required: true,
            unique: true,
            min: 4
        },
        area: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
            min: 6
        },
        images: [
            {
                type: String,
            }
        ],
        information: {
            type: String
        },
        type: {
            type: String,
            required: true
        },
        slots: [
            {
                dayOfWeek: {
                    type: String,
                    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    required: true
                },
                status: {
                    type: String,
                    enum: ['available', 'unavailable', 'selected', 'pending'],
                    required: true
                },
                rate: {
                    type: Number,
                    required: true,
                    min: 0
                },
                startTime: {
                    type: String,
                    required: true,
                    match: /^([01]\d|2[0-3]):[0-5]\d$/, // regular expression for hh:mm format
                    validate: {
                        validator: function (v) {
                            const endTime = this.endTime;
                            if (endTime && v >= endTime) {
                                return false;
                            }
                            return true;
                        }
                    }
                },
                endTime: {
                    type: String,
                    required: true,
                    match: /^([01]\d|2[0-3]):[0-5]\d$/, // regular expression for hh:mm format
                    validate: {
                        validator: function (v) {
                            const startTime = this.startTime;
                            if (startTime && v <= startTime) {
                                return false;
                            }
                            return true;
                        }
                    }
                }
            }
        ],
        inchargeID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]
    },
    {
        timestamps: true
    }
);

const reviewSchema = mongoose.Schema(
    {
        comment: {
            type: String
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            default: 1
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const bookingSchema = mongoose.Schema(
    {
        bookingStatus: {
            type: String,
            enum: ['pending', 'confirmed', 'rejected'],
            required: true
        },
        bookingDate: {
            type: Date,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        ground: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ground'
        },
        slots: [
            {
                dayOfWeek: {
                    type: String,
                    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    required: true
                },
                status: {
                    type: String,
                    enum: ['available', 'unavailable', 'selected', 'pending'],
                    required: true
                },
                rate: {
                    type: Number,
                    required: true,
                    min: 0
                },
                startTime: {
                    type: String,
                    required: true,
                    match: /^([01]\d|2[0-3]):[0-5]\d$/, // regular expression for hh:mm format
                    validate: {
                        validator: function (v) {
                            const endTime = this.endTime;
                            if (endTime && v >= endTime) {
                                return false;
                            }
                            return true;
                        }
                    }
                },
                endTime: {
                    type: String,
                    required: true,
                    match: /^([01]\d|2[0-3]):[0-5]\d$/, // regular expression for hh:mm format
                    validate: {
                        validator: function (v) {
                            const startTime = this.startTime;
                            if (startTime && v <= startTime) {
                                return false;
                            }
                            return true;
                        }
                    }
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const paymentSchema = mongoose.Schema(
    {
        paymentStatus: {
            type: String,
            enum: ['pending', 'confirmed'],
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        ground: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ground'
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        },
        creditCardNumber: {
            type: String,
            required: true,
            match: /^\d{16}$/ // Validates 16-digit numeric string
        },
        cvv: {
            type: String,
            required: true,
            match: /^\d{3}$/ // Validates 3-digit numeric string
        },
        expirationDate: {
            type: String,
            required: true
        },
        paymentAmount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2
        },
        lastName: {
            type: String,
            required: true,
            min: 2
        },
        age: {
            type: Number,
            //required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female']
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            min: 11,
            max: 11
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: [true, 'This email is already in use']
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            min: 6
        },
        profileImage: {
            type: String
        },
        position: {
            type: String,
        },
        role: {
            type: String,
            enum: ['player', 'ground-in-charge', 'admin'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
const City = mongoose.model('City', citySchema);
const Area = mongoose.model('Area', areaSchema);
const Ground = mongoose.model('Ground', groundSchema);
const Review = mongoose.model('Review', reviewSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Payment = mongoose.model('Payment', paymentSchema);

export default { User, City, Area, Ground, Review, Booking, Payment };