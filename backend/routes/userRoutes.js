import { Router } from "express";
import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserByID,
    getUserByID,
    updateUserByID
} from "../controllers/userController.js";
import { authorize, authorizeAdmin, generateToken } from "../middlewares/authMiddleware.js";
const router = Router();

router.route("/").post(createUser);

router.route("/auth").post(loginUser, generateToken, authorize, getCurrentUserProfile);

router.route("/logout").post(logoutUser);

router.route("/profile")
    .get(authorize, getCurrentUserProfile)
    .put(authorize, updateCurrentUserProfile);


// ----- Admin Routes -----
//GET
router.route("/").get(authorize, authorizeAdmin, getAllUsers);
router.route("/:id")
    .get(authorize, authorizeAdmin, getUserByID)
    .put(authorize, authorizeAdmin, updateUserByID)
    .delete(authorize, authorizeAdmin, deleteUserByID);

export default router;