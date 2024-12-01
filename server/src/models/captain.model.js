import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength:[3,"First Name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            minLength:[3,"Last Name must be at least 3 characters long"]
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
    },
    socketId: {
        type: String
    },
    status:{
        type: String,
        enum: ["online" , "offline"],
        default: "offline"
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minLength:[3 , "Color Must be Atleast 3 characters long"]

        },
        plate:{
            type: String,
            required: true,
            minLength:[3 , "Plate Must be Atleast 3 characters long"]
        },
        capacity:{
            type: Number,
            required: true,
            minLength:[1 , "Capacity Must have be at least 1"]
        },
        vehicleType:{
            type: String,
            required: [true , "We Only Support car, auto and motorcycle"] ,
            enum:['car' , 'motorcycle', 'auto'],
        }
    },
    location:{
        lat:{
            type: Number,
        },
        long:{
            type: Number
        }
    }
})  

captainSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        console.log("password has been hashed");
        
    }
    next();
})
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id:this._id , email:this.email} , process.env.JWT_SECRET_KEY , {expiresIn:"24h"})
    return token
}

captainSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare( userPassword, this.password )
}



const Captain = mongoose.model("Captain" , captainSchema)
export default Captain