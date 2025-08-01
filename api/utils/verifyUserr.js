import jwt from 'jsonwebtoken';
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
const token = req.cookies.access_token;
if(!token) return next(errorHandler(401, 'unauthorized'));

jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
if(err) next(errorHandler(403, 'Forbidden'));
req.user = user;
next();


})

} 