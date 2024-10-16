import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isValidEmail } from "../utils/helpers.js";

// Register
const registerAuth = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required details: name, email, and password.",
            });
        }


        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists. Please log in.",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during registration.",
        });
    }
};

// Login
const logInAuth = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password.",
            });
        }


        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials.",
            });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials.",
            });
        }


        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });


        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,

                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000, 
            })
            .json({
                success: true,
                message: "Logged in successfully.",
                token,
                user: {
                    email: user.email,
                    role: user.role,
                },
            });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during login.",
        });
    }
};


const logOutAuth = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during logout.",
        });
    }
};

export { registerAuth, logInAuth, logOutAuth };
