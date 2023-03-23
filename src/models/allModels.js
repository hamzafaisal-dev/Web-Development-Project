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
            type: String
        },
        slots: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Slot'
            }
        ],
        inchargeID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const slotSchema = mongoose.Schema(
    {
        status: {
            type: String,
            enum: ['Available', 'Unavailable', 'Selected', 'Pending'],
            required: true
        },
        rate: {
            type: Number,
            required: true
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

    },
    {
        timestamps: true
    }
);

const bookingSchema = mongoose.Schema(
    {
        bookingStatus: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Denied'],
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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Slot'
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
            min: 3
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
        role: {
            type: String,
            enum: ['player', 'captain', 'ground-in-charge', 'admin'],
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
const Slot = mongoose.model('Slot', slotSchema);
const Booking = mongoose.model('Booking', bookingSchema);

export default { User, City, Area, Ground, Slot, Booking };