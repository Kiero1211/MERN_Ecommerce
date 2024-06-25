import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/createToken.js";
import { generateHashPassword, comparePassword } from "../utils/hashPassword.js";

// ---------- POST ----------
/*
    POST /api/users/
*/
const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new Error("Please fill in all inputs")
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await generateHashPassword(password);

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

/*
    POST /api/users/auth
*/
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isValidPassword = await comparePassword(password, existingUser.password);

        if (isValidPassword) {
            generateToken(res, existingUser._id);

            return res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });
        } else {
            throw new Error("Wrong password");
        }
    } else {
        throw new Error("Cannot find user");
    }
})

/*
    POST /api/users/logout
*/
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logged out successfully" });
})


/*
    GET /api/users/
*/
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const results = await User.find();
        return res.status(200).json({ users: results });
    } catch (error) {
        throw new Error(error.message);
    }
})

// ---------- GET ----------
/*
    GET /api/users/profile
*/
const getCurrentUserProfile = asyncHandler(async (req, res) => {
    try {
        const currentUserID = req.user.id;
        if (!currentUserID) return res.status(401).json({ message: "Not currently logged in" });

        const currentUser = await User.findOne({ _id: currentUserID }, { password: 0 });
        return res.status(200).json({ currentUser });
    } catch (error) {
        throw new Error(error.message);
    }
})

/* 
    GET /:id
*/
const getUserByID = asyncHandler(async (req, res) => {
    try {
        const requestedID = req.params.id;
        const requestedUser = await User.findById(requestedID, { password: 0 });

        if (!requestedUser) {
            res.status(400);
            throw new Error("Cannot find User");
        }
        return res.status(200).json({ requestedUser })
    } catch (error) {
        throw new Error(error.message);
    }
})


// ---------- PUT ----------

/*
    PUT /api/users/profile
*/
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const currentUser = await User.findById(req.user.id);
        if (!currentUser) return res.status(403).json({ message: "Not currently logged in" });

        // Update currentUser
        currentUser.username = username || currentUser.username;
        currentUser.email = email || currentUser.email;
        if (password) {
            currentUser.password = await generateHashPassword(password);
        }

        await currentUser.save();
        return res.status(200).json({
            _id: currentUser._id,
            username: currentUser.username,
            email: currentUser.email,
            isAdmin: currentUser.isAdmin
        });
    } catch (error) {
        throw new Error(error.message);
    }
})

/*
    PUT /api/users/:id
*/
const updateUserByID = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const requestedID = req.params.id;

        const requestedUser = await User.findById(requestedID);
        if (!requestedUser) return res.status(403).json({ message: "Cannot find user" });

        // Update requestedUser
        requestedUser.username = username || requestedUser.username;
        requestedUser.email = email || requestedUser.email;
        if (password) {
            requestedUser.password = await generateHashPassword(password);
        }

        await requestedUser.save();
        return res.status(200).json({
            _id: requestedUser._id,
            username: requestedUser.username,
            email: requestedUser.email,
            password: requestedUser.password
        });
    } catch (error) {
        throw new Error(error.message);
    }
})


// ---------- DELETE ----------
/*
    DELETE /:id
*/
const deleteUserByID = asyncHandler(async (req, res) => {
    try {
        const requestedID = req.params.id;
        const requestedUser = await User.findById(requestedID);

        if (!requestedUser) {
            res.status(400)
            throw new Error("Cannot find user");
        }

        if (requestedUser.isAdmin) {
            res.status(400)
            throw new Error("Cannot delete admin users");
        }

        await User.deleteOne({ _id: requestedID });
        res.status(200).json({ message: "User removed successfuly" });

    } catch (error) {
        throw new Error(error.message);
    }
})

export {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserByID,
    getUserByID,
    updateUserByID
};