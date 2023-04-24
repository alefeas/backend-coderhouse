import { Router } from 'express'
import { ChatController } from '../../controllers/chat.controller.js'
import { userMiddleware } from '../../middlewares/role.middleware.js'
import { passportCall } from '../../middlewares/passport.middleware.js'

export const router = Router()

router.get('/', ChatController.getAll)
router.post('/', passportCall('jwt'), userMiddleware, ChatController.addMessage)
router.delete('/:mid', ChatController.deleteMessage)
router.delete('/', ChatController.deleteAllMessages)