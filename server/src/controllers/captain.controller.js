import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import Captain from "../models/captain.model.js";
import BlackListToken from "../models/blackListToken.model.js";

const registerCaptain = asyncHandler(async (req,res,next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            message:errors.array()
        })
    }

    // get data
    const {email , password , fullname:{firstname , lastname} , vehicle:{color , plate , capacity , vehicleType } } = req.body
    
    const existingCaptain = await Captain.findOne({email})
    if(existingCaptain){
        return res.status(400).json({
            success:false,
            message:"Captain already exists"
        })
    }
    
    const captain  = await Captain.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    const token = captain.generateAuthToken()

    res.cookie("token" , token)
    return res.status(200).json({
        success:true,
        message:"Captain registered successfully",
        token
    })

})


const loginCaptain = asyncHandler(async (req,res,next) => {

    //get data
    // add validations
    //find user
    // check password
    //generate token
    // return 200 status

    const {email , password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email and password are required"
        })
    }
    const captain = await Captain.findOne({email})
    if(!captain){
        return res.status(404).json({
            success:false,
            message:"Captain Doesnt Exist, Please register"
        })
    }

    const isMatch = await captain.comparePassword(password)
    if(!isMatch){
        return res.status(404).json({
            success:false,
            message:"Password Doesnt Match , Please check again"
        })
    }

    const token = captain.generateAuthToken()
    res.cookie("token" , token)

    return res.status(200).json({
        success:true,
        message:"Captain Logged In Successfully",
        token
    })

})

const getCaptainProfile = asyncHandler(async (req,res,next) => {
   return res.status(200).json({
       success:true,
       captain:req.captain
   })
})

const logoutCaptain = asyncHandler(async (req,res,next) => {
    res.clearCookie("token")
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    await BlackListToken.create({token})

    res.status(200).json({
        success:true,
        message:"Captain logged out successfully"
    })
    
})



// const registerCaptain = asyncHandler(async (req,res,next) => {
    
// })

export {
    registerCaptain,
    loginCaptain,
    logoutCaptain,
    getCaptainProfile
}