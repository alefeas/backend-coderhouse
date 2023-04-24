import { Router } from 'express'
import { uploader } from '../../utils/multer.utils.js'
import { ProductsController } from '../../controllers/products.controller.js'
import { adminMiddleware } from '../../middlewares/role.middleware.js'
import { passportCall } from '../../middlewares/passport.middleware.js'

export const router = Router()

router.get('/',ProductsController.getAll)
router.get('/:pid', ProductsController.getById)
router.post('/', passportCall('jwt'), adminMiddleware, uploader.array('files'), ProductsController.addProduct)
router.put('/:pid', passportCall('jwt'), adminMiddleware, ProductsController.updateProduct)
router.delete('/:pid', passportCall('jwt'), adminMiddleware, ProductsController.deleteProduct)