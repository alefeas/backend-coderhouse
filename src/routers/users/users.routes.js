import { Router } from 'express'
import { uploader } from '../../utils/multer.utils.js'
import { UsersController } from '../../controllers/users.controller.js'

export const router = Router()

router.get('/', UsersController.getAll)
router.get('/:uid', UsersController.getById)
router.post('/', uploader.single('file'), UsersController.addUser)
router.put('/:uid', UsersController.updateUser)
router.delete('/:uid', UsersController.deleteUser)