import { HTTP_STATUS } from "../constants/api.constants.js";

export const errorMiddleware = (error, req, res, next) => {
  console.log(error.cause);
  return res.status(error.code || HTTP_STATUS.SERVER_ERROR).json({status: 'error', error: error.name});
};