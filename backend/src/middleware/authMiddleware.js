import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.codebuddy_token

        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.stsatus(401).json({message: "Unauthorized"});
        };

        req.user = user;
        next();

    } catch (error) {
        console.log("error in protected route", error);
        res.status(401).json({message: "Unauthorized"});
    }
};