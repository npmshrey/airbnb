import express from "express"   
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"

dotenv.config()
let port = process.env.PORT || 8000

let app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)

app.listen(port,async()=>{
    await connectDB()
    console.log(`Server is running on port ${port}`)
})

