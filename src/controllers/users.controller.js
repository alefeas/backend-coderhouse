import { getDaos } from "../models/daos/factory.js";
import { HTTP_STATUS } from "../constants/api.constants.js";
import { apiSuccessResponse } from "../utils/api.utils.js";
import { AddUserDTO, GetUserDTO, UpdateUserDTO } from "../models/dtos/users.dto.js";
import { UsersService } from '../services/users.service.js'

const usersService = new UsersService()

export class UsersController{

    static async getAll(req, res, next) {
        try {
            const users = await usersService.getAll()
            const usersPayload = []
            users.forEach(user => {
                usersPayload.push(new GetUserDTO(user))
            });
            const response = apiSuccessResponse(usersPayload)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        const { uid } = req.params
        try {
            const user = await usersService.getById(uid)
            const userPayload = new GetUserDTO(user)
            const response = apiSuccessResponse(userPayload)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async addUser(req, res, next) {
        const payload = req.body
        const { file } = req
        try {
            const userPayload = new AddUserDTO(payload)
            const newUser = await usersService.createUser(userPayload, file)
            const response = apiSuccessResponse(newUser)
            return res.status(HTTP_STATUS.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next){
        const { uid } = req.params
        const payload = req.body
        try {
            const userPayload = new UpdateUserDTO(payload)
            const updatedUser = await usersService.updateUser(uid, userPayload)
            const response = apiSuccessResponse(updatedUser)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next){
        const { uid } = req.params
        try {
            const deletedUser = await usersService.deleteUser(uid)
            const response = apiSuccessResponse(deletedUser)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }    
}