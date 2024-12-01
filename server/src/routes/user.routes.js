import express from "express";
import { body } from "express-validator";
import { register , login , getUserProfile , logout } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",
    body("email").isEmail(),
    body("password").isLength({min: 5}).withMessage("password must be atleaset 5 characters"),
    // body("fullname.firstname").isLength({min: 3}).withMessage("firstName must be atleaset 3 characters"),
    register
 )

router.post("/login", login)


router.get("/profile" , authUser, getUserProfile)
router.get("/logout" , authUser, logout)


export default router