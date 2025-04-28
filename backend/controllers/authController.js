import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/response.js';

const {User} = db;

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return successResponse(res,201,"User registerd successfully", user, false);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return errorResponse(res, 400,"Email already in use")
    }
    return errorResponse(res,500,"Internal Server Error")
  }
};  
  

export const login = async(req,res) => { 
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email }});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return errorResponse(res, 401, "Email Or Password Wrong");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return successResponse(res,201,"User login successfully", token);
  } catch (error) {
    return errorResponse(res,500,"Internal Server Error");
  }
}

export const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email']
    });

    if (!user){
      return errorResponse(res, 400, "User not found");
    }

    return successResponse(res,200,"Get profile successfully", user);
  } catch (error) {
    return errorResponse(res,500,"Internal Server Error");
  }
};