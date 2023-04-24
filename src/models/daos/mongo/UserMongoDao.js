import { userModel } from '../../schemas/user.model.js'
import { logCyan } from '../../../utils/console.utils.js'

export class UserMongoDao {
    
    async getAll() {
        const users = await userModel.find().lean()
        return users
    }

    async getById(uid){
        const user = await userModel.findById(uid).lean()
        return user
    }

    async getByEmail(email){
        const user = await userModel.findOne({email: email}).lean()
        return user
    }

    async addUser(payload){
        const newUser = await userModel.create(payload)
        logCyan('New user created')
        return newUser
    }

    async updateUser(uid, payload){
        const updatedUser = await userModel.findByIdAndUpdate(uid, {$set: payload})
        logCyan('User updated')
        return updatedUser
    }

    async deleteUser(uid) {
        const deletedUser = await userModel.findByIdAndDelete(uid);
        return deletedUser;
    }
}