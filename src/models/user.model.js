import mongoose from "mongoose"

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    gitHubLogin: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    }
})

export const UserModel = mongoose.model(userCollection, userSchema)