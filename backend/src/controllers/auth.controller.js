import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ fullname, email, password });
    
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('codebuddy_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const {password:_, ...userWithoutPassword} = newUser.toObject(); // Exclude password from the user object

    res
      .status(201)
      .json({ message: "User created successfully", userWithoutPassword });

  } catch (error) {
    console.log("error in signup", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        };

        const isPasswordValid = await user.verifyPassword(password)
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"});
        };

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie("codebuddy_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const {password:_, ...userWithoutPassword} = user.toObject(); // Exclude password from the user object

        res.status(201).json({message: "Login successful", userWithoutPassword});

    } catch (error) {
        console.log("error in login", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req, res) => {
  try {
     res.clearCookie("codebuddy_token", {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "strict",
     });
     return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout", error);
    res.status(500).json({ message: "Internal server error" });
  }
}