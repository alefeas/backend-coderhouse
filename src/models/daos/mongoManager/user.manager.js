import { UserModel } from "../../schemas/user.model.js"
import { logCyan } from "../../../utils/console.utils.js"

export class UserMongoDao {
    
    async getAll() {
        const users = await UserModel.find().lean()
        return users
    }

    async getById(uid){
        const user = await UserModel.findById(uid).lean()
        return user
    }

    async getByEmail(email){
        const user = await UserModel.findOne({email: email}).lean()
        return user
    }

    async addUser(payload){
        const newUser = await UserModel.create(payload)
        logCyan('New user created')
        return newUser
    }

    async updateUser(uid, payload){
        const updatedUser = await UserModel.findByIdAndUpdate(uid, {$set: payload})
        logCyan('User updated')
        return updatedUser
    }

    async deleteUser(uid) {
        const deletedUser = await UserModel.findByIdAndDelete(uid);
        return deletedUser;
    }
}