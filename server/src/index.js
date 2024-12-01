import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
import { connectToDb } from "./config/dbConnect.js";
dotenv.config();


//db Connection
connectToDb()

const port = process.env.PORT || 5000;

const server = http.createServer(app)

server.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})

