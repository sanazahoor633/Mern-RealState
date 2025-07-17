import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(process.env.BCRT);
  const hashpassword = bcrypt.hashSync(password, salt);
  const userData = new User({ username, email, password: hashpassword });

  try {
    await userData.save();
    res.status(201).json({ message: "user created successfull" });
  } catch (error) {
    next(error);
  }
};                                                                                                                      [[]]

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKEN);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
