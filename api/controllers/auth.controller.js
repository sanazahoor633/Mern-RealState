import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
export const signUp = async (req, res) => {
 
    const {username, email, password} = req.body;
    // const salt =  await bcrypt.genSalt(10);
    // const hashpassword = await bcrypt.hash(password, salt)


    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt)
    const userData = new User({username, email, password: hashpassword});


try{
  await userData.save();
res.status(201).json({message: 'user created succefull'});
}
catch(error){
res.status(500).json({error: 'you are tryiing same password and email'})
}
}