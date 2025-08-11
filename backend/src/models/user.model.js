import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            minlength: 6,
        },
        fullName: {
            type: String,
            require: true,
        },
        profilePic: {
            type: String,
            default: ""
        }
    },{
        timestamps:true
    }
);

const User = mongoose.model("User",UserSchema);

export default User;