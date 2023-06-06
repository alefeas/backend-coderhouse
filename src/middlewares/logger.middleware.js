import { prodLogger, devLogger } from "../utils/logger.utils.js"
import args from "../config/args.config.js"

export const addLogger = (req, res, next) =>{
    if(args.mode === 'production'){
        req.logger = prodLogger
    }else{
        req.logger = devLogger
    }
    next()
}