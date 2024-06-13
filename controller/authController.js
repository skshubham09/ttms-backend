import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    if (user.role !== req.body.role) {
      return res.status(400).send({
        success: false,
        message: "Role does not match",
      });
    }
    const valid = await comparePassword(req.body.password, user.password);
    if (!valid) {
      return res.status(400).send({
        success: false,
        message: "Password is wrong",
      });
    }
    const token = JWT.sign({ userID: user._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Log In seccussesfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in logging you",
      error,
    });
  }
};

export const registerController = async (req, res) => {
  try {
    // console.log(req.body);
    const existingUser = await userModel.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already exits! Please Login",
      });
    }
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    // console.log(req.body);
    const user = new userModel(req.body);
    await user.save();

    res.status(201).send({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in registring",
      error,
    });
  }
};
