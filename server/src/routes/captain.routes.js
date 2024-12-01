import express from "express";
import { registerCaptain , loginCaptain , logoutCaptain , getCaptainProfile } from "../controllers/captain.controller.js";
import { body } from "express-validator";
import { authCaptain } from "../middleware/auth.middleware.js";


const router = express.Router();


router.post("/register-captain" ,
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    registerCaptain
)

router.post("/login-captain" , loginCaptain)
router.get("/profile-captain" , authCaptain , getCaptainProfile)
router.get("/logout-captain" , authCaptain , logoutCaptain)



export default router