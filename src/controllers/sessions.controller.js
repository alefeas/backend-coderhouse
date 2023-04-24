import { ENV_CONFIG } from "../config/enviroment.config.js";
import { HTTP_STATUS } from "../constants/api.constants.js";
import { apiSuccessResponse } from "../utils/api.utils.js";
import { HttpError } from "../utils/error.utils.js";
import { generateToken } from "../utils/session.utils.js";

export class SessionsController{

    static async login(req, res, next){
        const { user } = req;
        try {
            if(!user){
                throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'User not found')
            }
            const access_token = generateToken(user);
            res.cookie(ENV_CONFIG.SESSION_KEY, access_token, {
                maxAge: 60 * 60 * 24 * 1000,
                httpOnly: true
            });
            res.redirect('/products');
        } catch (error) {
            next(error)
        }
    }   

    static async loginGithub(req, res, next){
        const { user } = req;
        const access_token = generateToken(user);
        res.cookie(ENV_CONFIG.SESSION_KEY, access_token, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true
        });
        res.redirect('/products');
    }

    static async logout(req, res, next){
        try {
            res.clearCookie(ENV_CONFIG.SESSION_KEY);
            res.redirect('/');
        } catch (error) {
            next(error) 
        }
    }

    static async currentSession(req, res, next){
        const response = apiSuccessResponse(req.user);
        return res.json(response);
    }
}