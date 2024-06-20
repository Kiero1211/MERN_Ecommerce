import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new Error("Please fill in all inputs")
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        generateToken(res, newUser._id);

        res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        })

    } catch (error) {
        throw new Error(error.message);
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isValidPassword = bcrypt.compare(password, existingUser.password);

        if (isValidPassword) {
            generateToken(res, existingUser._id);

            return res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                password: existingUser.password
            });
        }
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logged out successfully" });
})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const results = await User.find();
        return res.status(200).json({ users: results });
    } catch (error) {
        throw new Error(error.message);
    }
})

export { createUser, loginUser, logoutUser, getAllUsers };