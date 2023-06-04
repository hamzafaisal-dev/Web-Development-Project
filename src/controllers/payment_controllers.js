import models from "../models/allModels.js";
const { City, Booking, Payment } = models;

export async function createPayment(req, res, next) {
    try {
        const { creditCardNumber, cvv, expirationDate } = req.body;

        if (creditCardNumber.length > 16 || creditCardNumber.length < 16) {
            return res.status(500).json({ message: 'Invalid credit card number' });
        }

        if (cvv.length > 3 || cvv.length < 3) {
            return res.status(500).json({ message: 'Invalid cvv' });
        }

        // check expiration date validity
        const expirationMonth = parseInt(expirationDate.substring(0, 2));
        const expirationYear = parseInt(expirationDate.substring(3, 5));

        if (!Number.isInteger(expirationMonth) || expirationMonth.length > 2 || expirationMonth.length < 2 || expirationMonth < 0 || expirationMonth > 12) {
            return res.status(500).json({ message: 'Invalid expiration date' });
        }

        const currentYear = new Date().getFullYear().toString().substring(2, 4); // gets last 2 digits of current year

        if (expirationYear.length > 2 || expirationYear.length < 2 || expirationYear < currentYear) {
            return res.status(500).json({ message: 'Invalid expiration date' });
        }

        const newPayment = await Payment.create({
            "paymentStatus": req.body.paymentStatus,
            // "user":,
            "ground": req.body.groundID,
            "creditCardNumber": req.body.creditCardNumber,
            "cvv": req.body.cvv,
            "expirationDate": req.body.expirationDate,
            "paymentAmount": req.body.paymentAmount
        });

        res.status(200).json(newPayment);

    } catch (error) {
        if (error.errors.creditCardNumber) {
            return res.status(500).json({ message: 'Invalid credit card number' });
        } else if (error.errors.cvv) {
            return res.status(500).json({ message: 'Invalid cvv' });
        } else if (error.errors.expirationDate) {
            return res.status(500).json({ message: 'Invalid expiration date' });
        } else {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    }
}

export async function updatePayment(req, res, next) {
    try {
        const paymentID = req.body._id;

        const updatedPayment = await Payment.findByIdAndUpdate(paymentID, req.body, { new: true });

        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json({ updatePayment });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function deleteAllPayments(req, res, next) {
    try {
        const allPayments = await Payment.deleteMany({});

        return res.status(200).json({ allPayments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}