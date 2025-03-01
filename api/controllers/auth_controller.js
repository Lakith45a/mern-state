import User from "../models/user.model.js";
import bcryptjs, { compareSync } from "bcryptjs";
import { errorHandler } from "../utils.js/error.js";
import jwt from "jsonwebtoken";


export const Signup = async(req,res,next)=>{
   const {username,email,password} = req.body;
   const hashPassword = bcryptjs.hashSync(password,10);
   const newUser = new User({username,email,password:hashPassword});
   try {
      await newUser.save();
      res.status(201).json("Successfully created  User!")
   } catch (error) {
      next(error)
   }
}

export const Signin = async(req,res,next)=>{
   const {email,password} = req.body; //get email and pw from user
   try {
      const validUser = await User.findOne({email}); //check validity
      if(!validUser)
         return next(errorHandler(404,'User not Found!'))
         const validpassword =bcryptjs.compareSync(password,validUser.password) // check encrypted pw with user enterd one
      if(!validpassword)
         return next(errorHandler(401,'Wrong Credentials!'))
      const token = jwt.sign({id:validUser._id},process.env.JWT_KEY)
      res
         .cookie('access_token',token,{httpOnly:true})
         .status(200)
         .json(validUser);
      } catch (error) {
      next(error)
   }
};
