import asyncHandler from "./asyncHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authorize = asyncHandler(async (req, res, next) => {
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

export { authorize, authorizeAdmin };