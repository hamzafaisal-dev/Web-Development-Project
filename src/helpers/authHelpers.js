import jwt from 'jsonwebtoken'

export async function validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

// middleware function
export async function verifyToken(req, res, next) {
    // checks if authorization header exists
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403);
    }
}

// // middleware function
// export async function verifyToken(req, res, next) {
//     // checks if req payload contains token
//     const token = req.header('auth-token');

//     if (!token) {
//         return res.status(401).send('Access Denied')
//     }

//     try {
//         const verified = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
//         req.user = verified;
//     } catch (error) {
//         res.status(400).send('Invalid token');
//     }
// }
