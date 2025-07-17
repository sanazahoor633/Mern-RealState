import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
      email: {
        type: String,
        required: true,
        unique: true
    },
       password: {
        type: String,
        required: true,
        
    },
    avatar: {
        type: String,
        default: 'https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png'
    }
    

}, { timstamps: true } 
)

const User = mongoose.model('User', userSchema)
export default User;