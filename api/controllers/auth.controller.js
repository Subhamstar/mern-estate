import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';  //this is used to hash the password
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
//import { errorHandler } from '../utils/error.js';
export const signup=async (req,res,next)=>{

  const {username,email,password}=req.body;
  const hashPassword=bcryptjs.hashSync(password,10);
  const newUser=new User({
      username,
      email,
      password:hsahPassword
  });
  try{
    await newUser.save()
    res.status(201).json({'message':'User created successfully'});
  }catch(error){
    // next(errorHandler(550,'Error from the function'));  //this error is created by us this is no internal server error
    next(error);
  }
};


export const signin=async (req,res,next)=>{
  const {email,password}=req.body;
  try{
    const user=await User.findOne({email});
    if(!validUser){
      return next(errorHandler(404,'User not found'));
    }
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
      return next(errorHandler(401,'Wrong credentila email and password !'));
    } 
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    const{password:pass, ...rest}=validUser._doc;
    res.cookie('access_token',token,{httpOnly:true})
    res.status(200).json(rest);
  }catch(error){
    next(error);
  }
}