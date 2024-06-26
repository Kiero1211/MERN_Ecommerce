import asyncHandler from "./asyncHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authorize = asyncHandler(async (req, res, next) => {
    console.log("In authorize");
    console.log(req.cookies);
    const token = req.cookies.jwt;
    if (!token) {
        throw new Error("Authorize failed, no token");
    }

    try {
        const decoded = jwt.verify(token, process.env.JTW_TOKEN_SECRET);
        const currentUser = await User.findOne({ _id: decoded.userID }, { password: 0 });
        req.user = currentUser;
        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

// Authorize admin
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        throw new Error("Not authorized as admin");
    }
}

const generateToken = asyncHandler(async(req, res, next) => {
    console.log("In generateToken");
    const userID = req.userID;
    const token = jwt.sign({ userID }, process.env.JTW_TOKEN_SECRET, {
        expiresIn: "30d"
    })

    // Set JWT as an HTTP-Only Cookie
    await res.cookie("jwt", token, {
        maxAge: 60 * 60 * 24 * 30 * 1000
    })
    
    req.cookies.jwt = token;
    console.log(req.cookies);
    next();
})

export { authorize, authorizeAdmin, generateToken };