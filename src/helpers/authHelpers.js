import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config() // load environment variables from .env file

export async function validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

export function generateAccessToken(payload) {
    try {
        const accessToken = jwt.sign(payload, `${process.env.ACCESS_SECRET_KEY}`, { expiresIn: '1200s' });
        return accessToken;
    } catch (error) {
        console.log(error);
    }
}

export function generateRefreshToken(userID) {
    try {
        const refreshToken = jwt.sign({ sub: userID }, `${process.env.REFRESH_SECRET_KEY}`, { expiresIn: '1d' });
        return refreshToken;
    } catch (error) {
        console.log(error);
    }
}

export async function verifyAccessToken(req, res, next) {
    console.log('verifyAccessToken middleware called');
    // checks if authorization header exists
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        const token = bearerToken;

        jwt.verify(token, `${process.env.ACCESS_SECRET_KEY}`, function (err, data) {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                // attach the authenticated user data to the request object
                req.user = data;
                next();
            }
        })
    } else {
        res.status(403).json({ message: 'Invalid header' });
    }
}

export async function verifyRefreshToken(refreshToken) {
    console.log('verifyRefreshToken middleware called');

    jwt.verify(refreshToken, `${process.env.REFRESH_SECRET_KEY}`, function (err, data) {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        } else {
            // Attach the authenticated user data to the request object
            req.user = data;
            next();
        }
    })
}
