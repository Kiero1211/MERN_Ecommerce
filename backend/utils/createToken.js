import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
    const token = jwt.sign({ userID }, process.env.JTW_TOKEN_SECRET, {
        expiresIn: "30d"
    })

    // Set JWT as an HTTP-Only Cookie
    res.cookie("jwt", token, {
        maxAge: 60 * 60 * 24 * 30 * 1000
    })

    return token;
}

export default generateToken;