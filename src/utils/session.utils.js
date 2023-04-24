import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "../config/enviroment.config.js";

export const generateToken = (user) => {
  const token = jwt.sign(user, ENV_CONFIG.SECRET_KEY, { expiresIn: '24h' });
  return token;
};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[ENV_CONFIG.SESSION_KEY];
  }
  return token;
}