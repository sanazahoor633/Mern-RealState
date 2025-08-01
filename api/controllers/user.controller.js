import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcrypt'

export const test = (req, res)=>{
res.json({
    msg: 'working'
})
}

export const updatedUser =  async (req, res, next) => {
if(req.user.id !== req.params.id) return next(errorHandler(403, 'You can only update your own account'));

try{
    if(req.body.password){
        req.body.password =  bcrypt.hashSync(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar

        }
    }, {new: true})

    const {password, ...rest} = updatedUser._doc;

    return res.status(200).json(rest)
    }
    catch(error){
 next(errorHandler(500, 'Failed to update user'))
}
}
export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account'))
        try{
    await User.findByIdAndDelete(req.params.id);
    clearCookie('access_token')
    return res.status(200).json('User has been deleted')
        }
    catch(error){
next(error)
    }
}