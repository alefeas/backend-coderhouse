import { Router } from 'express'
import { CartsController } from '../../controllers/carts.controller.js'
import { passportCall } from '../../middlewares/passport.middleware.js'
import { userMiddleware } from '../../middlewares/role.middleware.js'

export const router = Router()

router.get('/', CartsController.getAll)
router.get('/:cid', CartsController.getById)
router.post('/', CartsController.addCart)
router.put('/:cid/product/:pid', passportCall('jwt'), userMiddleware, CartsController.addProduct)
router.put('/:cid/purchase', passportCall('jwt'), userMiddleware, CartsController.purchase)
router.delete('/:cid/product/:pid', CartsController.removeProduct)
router.delete('/:cid', CartsController.clearCart)