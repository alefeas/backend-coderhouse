import { HTTP_STATUS } from "../constants/api.constants.js"

export const adminMiddleware = async (req, res, next) => {
    if(req.user.role === "admin"){
        next()
    }
    else{
        res.status(HTTP_STATUS.FORBIDDEN).json({
            success: false,
            message: 'Only admin can access this resource'
        })
    }
}

export const userMiddleware = async (req, res, next) => {
    if(req.user.role === "user"){
        next()
    }
    else{
        res.status(HTTP_STATUS.FORBIDDEN).json({
            success: false,
            message: 'Only users can access this resource'
        })
    }
}