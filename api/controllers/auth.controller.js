import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
export const signUp = async (req, res, next) => {
 
    const {username, email, password} = req.body;
    // const salt =  await bcrypt.genSalt(10);
    // const hashpassword = await bcrypt.hash(password, salt)


    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt)
    const userData = new User({username, email, password: hashpassword});


try{
  await userData.save();
res.status(201).json({message: 'user created successfull'});
}
catch(error){
next(error)
}
}