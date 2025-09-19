import User from "../models/user.model.js";


export const signup = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;

        if(!fullname || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        };

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        };

        user = await User.create({fullname, email, password});

        res.status(201).json({message: "User created successfully", user});

    } catch (error) {
        console.log("error in signup", error)
        res.status(500).json({ message: "Internal server error" });
    }
};