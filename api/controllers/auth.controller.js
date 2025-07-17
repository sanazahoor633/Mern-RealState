import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()




export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;


  const salt = bcrypt.genSaltSync(20);
  const hashpassword = bcrypt.hashSync(password, salt);
  const userData = new User({ username, email, password: hashpassword });

  try {
    await userData.save();
    res.status(201).json({ message: "user created successfull"});
  } catch (error) {
    next(error);
  }
};            


export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKEN);
    const { password: pass, ...rest } = validUser._doc;
    //user add my self
    res.cookie("token", token, { httpOnly: true }).status(200).json({success: true, user: rest});
  } catch (error) {
    next(error);
  }
};

export const signUpWithGoogle = async (req, res, next) => {
  try{
const user = await User.findOne({email: req.body.email});
if(user){
const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN)
const {password, pass, ...rest} = user._doc;
res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
} else {
  const generatePassword = Math.random().toString(36).slice(-8);

  const hashpassword = bcrypt.hashSync(generatePassword, 10);
  const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() +  Math.random().toString(36).slice(-4), email: req.body.email, password: hashpassword, avatar: req.body.photo});
  await newUser.save();
  const token = jwt.sign({id: newUser._id}, process.env.JWT_TOKEN);
  const {password, pass, ...rest} = newUser._doc;
  res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
}
  }
  catch(error){
next(error)
  }
};


