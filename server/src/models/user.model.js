import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()

const userSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required: true,
            minLength:[3,"First Name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            required: true,
            minLength:[3,"Last Name must be at least 3 characters long"]
        },
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    socketId:{
        type: String
    }
})


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id, email: this.email , fullname: this.fullname}, process.env.JWT_SECRET_KEY, {expiresIn:"24h"})
    return token;
}

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare( userPassword, this.password )
}


export const User = mongoose.model("User", userSchema);
