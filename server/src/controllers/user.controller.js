import {  asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import BlackListToken from "../models/blackListToken.model.js";

const register  = asyncHandler( async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            message:errors.array()
        })
    }
    //get data
    const {firstname,lastname,email,password} = req.body

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
    }
    const user  = await User.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    const token = user.generateAuthToken()
    console.log("token::from controllers::", token);
    
    return res.status(200).json({
        success:true,
        message:"User registered successfully",
        user,
        token
    })
})


const login = asyncHandler(async(req,res,next)=>{

    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Please provide email and password"
        })
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found , please register"
        })
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Invalid password"
        })
    }

    const token  =  user.generateAuthToken()

    
    res.cookie("token" , token)
    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        user,
        token
    })
})

const getUserProfile = asyncHandler(async(req,res,next)=>{
    return res.status(200).json({
        success:true,
        captain:req.user
    })
})

const logout = asyncHandler(async(req,res,next)=>{
    res.clearCookie("token")
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    await BlackListToken.create({token})

    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })

})

// const login = asyncHandler(async(req,res,next)=>{
//
// })

export {
    register,
    login,
    getUserProfile,
    logout
}