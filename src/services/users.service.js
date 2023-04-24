import { HTTP_STATUS } from "../constants/api.constants.js";
import { getDaos } from "../models/daos/factory.js";
import { HttpError } from "../utils/error.utils.js";

const { usersDao, cartsDao } = getDaos()

export class UsersService {
    async getAll(){
        const users = await usersDao.getAll()
        return users
    }

    async getById(uid){
        if(!uid){
            throw new HttpError('Must provide an id', HTTP_STATUS.BAD_REQUEST)
        }
        const user = await usersDao.getById(uid)
        if(!user){
            throw new HttpError('User not found', HTTP_STATUS.NOT_FOUND)
        }
        return user
    }

    async createUser(payload, file){
        if(!firstName || !lastName || !age || !email || !password){
            throw new HttpError('Missing fields', HTTP_STATUS.BAD_REQUEST)
        }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if(!email.match(validRegex)){
                throw new HttpError('Not valid E-Mail', HTTP_STATUS.BAD_REQUEST)
            }
        if(file){
            const paths = {
                path: file.path,
                originalName: file.originalname  
                }  
            payload.profilePic = paths
        }
        const newCart = await cartsDao.add()
        payload.cart = newCart._id
        const newUser = await usersDao.addUser(payload)
        return newUser
    }

    async updateUser(uid, payload){
        if(!uid || !Object.keys(payload).length){
            throw new HttpError('Missing data for user', HTTP_STATUS.BAD_REQUEST)
        }
        const user = await usersDao.getById(uid)
        if(!user){
            throw new HttpError('User not found', HTTP_STATUS.NOT_FOUND)
        }
        const updatedUser = await usersDao.updateUser(uid, payload)
        return updatedUser
    }

    async deleteUser(uid){
        if(!uid){
            throw new HttpError('Must provide an id', HTTP_STATUS.BAD_REQUEST)
        }
        const user = await usersDao.getById(uid)
        if(!user){
            throw new HttpError('User not found', HTTP_STATUS.NOT_FOUND)
        }
        const deletedUser = await usersDao.deleteUser(uid)
        return deletedUser
    }
}