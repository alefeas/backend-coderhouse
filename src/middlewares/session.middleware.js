import { ENV_CONFIG } from "../config/enviroment.config.js";

export const sessionMiddleware = async (req, res, next) => {
  const cookies = req.cookies
  if (Object.keys(cookies).includes(ENV_CONFIG.SESSION_KEY)) {
    res.redirect('/products');
  } else {
    next();
  }
}