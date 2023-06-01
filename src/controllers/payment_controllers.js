import models from "../models/allModels";
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
        expirationMonth = expirationDate.substring(0, 2);
        expirationYear = expirationDate.substring(3, 5);

        if (expirationMonth.length > 2 || expirationMonth.length < 2 || expirationMonth < 0 || expirationMonth > 12) {
            return res.status(500).json({ message: 'Invalid expiration date' });
        }

        const currentYear = new Date().getFullYear().toString().substring(2, 4); // gets last 2 digits fo curr year

        if (expirationYear.length > 2 || expirationYear.length < 2 || expirationYear < currentYear) {
            return res.status(500).json({ message: 'Invalid expiration date' });
        }

        const newPayment = await Payment.create({
            "paymentStatus": "pending",
            // "user":,
            "ground": req.body.groundID,
            "creditCardNumber": req.body.creditCardNumber,
            "cvv": req.body.cvv,
            "expirationDate": req.body.expirationDate,
            "paymentAmount": req.body.subtotal

        });

        res.status(200).json({ newPayment });

    } catch (error) {

    }
}

export async function updatePayment(req, res, next) {
    try {

    } catch (error) {

    }
}