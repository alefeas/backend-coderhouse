import { messageModel } from '../../schemas/message.model.js'
import { logYellow } from '../../../utils/console.utils.js'

export class ChatMongoDao {
    
    async getAll() {
        const messages = await messageModel.find().lean()
        return messages
    }

    async add(newMessage) {
        const message = await messageModel.create(newMessage)
        return message
    }

    async delete(mid) {
        const cleanChat = await messageModel.deleteOne({_id: mid})
        logYellow(`message deleted`)
        return cleanChat  
    }

    async deleteAll() {
        const cleanChat = await messageModel.deleteMany()
        logYellow(`chat cleaned`)
        return cleanChat  
    }
}