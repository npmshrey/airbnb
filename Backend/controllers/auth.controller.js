export const signup = async (req,res) =>{
    try {
        let {userName,email,password} = req.body
        let existUser = await User.findOne({email})
        if(existUser){
            res.status(400).json({message:"User is already exist"})
        }
        let hashPassword = await bcrypt.hash(password,10)   
        let user = await User.create({userName,email,password:hashPassword})

        let token =await genToken(user._id)
        res.cookie("jwt",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT !== "development",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json({_id:user._id,
            userName:user.userName,
            email:user.email}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"signup error"})
    }
}