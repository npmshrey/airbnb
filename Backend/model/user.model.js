import monggose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,required:true
        },
        email:{
            type:String,required:true
        },
        password:{
            type:String,required:true
        },
        listings:{
            type:mongoose.Schema.Types.ObjectId,ref:"Listing"
        },
        booking:{
            type:mongoose.Schema.Types.ObjectId,ref:"Booking"
        }
    },
    {timestamp:true}
)

export default mongoose.model("User",userSchema);
