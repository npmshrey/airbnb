import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"

export const signup = async (req,res) =>{
    try {
        let {userName,name,email,password} = req.body
        let finalUserName = userName || name
        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User is already exist"})
        }
        let hashPassword = await bcrypt.hash(password,10)   
        let user = await User.create({userName:finalUserName,email,password:hashPassword})

        let token =await genToken(user._id)
        res.cookie("jwt",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT !== "development",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json(user) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"signup error"})
    }
}

export const login = async (req,res) =>{
    try {
        let {email,password} = req.body
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"})
        }
        let token =await genToken(user._id)
        res.cookie("jwt",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT !== "development",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"login error"})
    }
}

export const logout = async (req,res) =>{
    try {
        res.cookie("jwt","",{
            maxAge:0
        })
        return res.status(200).json({message:"Logout successful"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"logout error"})
    }
}