import { Router } from 'express'
import { CartsController } from '../../controllers/carts.controllers.js'

export const router = Router()

router.get('/', CartsController.getAll)
router.get('/:cid', CartsController.getById)
router.post('/', CartsController.addCart)
router.put('/:cid/product/:pid', CartsController.addProduct)
router.put('/:cid/purchase', CartsController.purchase)
router.delete('/:cid/product/:pid', CartsController.removeProduct)
router.delete('/:cid', CartsController.clearCart)