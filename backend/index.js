import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

// Utils
import connectDB from "./config/db.js"

// Initialize
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();


// Config middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello backend")
})

app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));