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

export { createUser };