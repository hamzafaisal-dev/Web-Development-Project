// import jwt from 'jsonwebtoken'

// // middleware function
// export async function authToken(req, res, next) {
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