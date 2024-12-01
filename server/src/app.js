import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";


const app = express()


//middleware
app.use(express.json({limit: "15kb"}))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("Server is working fine")
})



//user routes
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";


app.use("/api/v1/user", userRoutes)
app.use("/api/v1/captain", captainRoutes)


export default app