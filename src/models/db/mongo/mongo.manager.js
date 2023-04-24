import mongoose from 'mongoose'
import { DB_CONFIG } from '../../../config/db.config.js'
import { logRed, logCyan } from '../../../utils/console.utils.js'

export class MongoManager {
    static #instance = false
    constructor(){
        mongoose.set('strictQuery', false)
        mongoose.connect(DB_CONFIG.mongo.uri, error => {
            if(error){
                logRed(`db connection failed: ${error}`)
                throw error
            }
            logCyan('connected to db')
        })
    }

    static connect(){
        if(!this.#instance){
            this.#instance = new MongoManager()
        }
        return this.#instance
    }
}