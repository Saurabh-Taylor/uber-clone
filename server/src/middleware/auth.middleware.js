import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
//MODELS
import { User } from "../models/user.model.js";
import Captain from "../models/captain.model.js";
import BlackListToken from "../models/blackListToken.model.js";


export const authUser = asyncHandler(async (req, res, next) => {
    
    const token = req?.cookies?.token || req?.headers?.authorization?.split(" ")[1]
    
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Token not found"
        })
    }

    const isBlackListedToken = await BlackListToken.findOne({token})

    if(isBlackListedToken){
        return res.status(401).json({
            success: false,
            message: "Token is expired , please login again"
        })
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
    const user = await User.findById(decoded.id)
    
    req.user = user
    console.log("finally we get the user");
    
    return next()
})

export const authCaptain = asyncHandler(async (req, res, next) => {
    
    const token = req?.cookies?.token || req?.headers?.authorization?.split(" ")[1]
    
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Token not found, please login again"
        })
    }

    const isBlackListedToken = await BlackListToken.findOne({token})

    if(isBlackListedToken){
        return res.status(401).json({
            success: false,
            message: "Token is expired , please login again"
        })
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
    const captain = await Captain.findById(decoded.id)
    
    req.captain = captain
    console.log("finally we get the user");
    
    return next()
})