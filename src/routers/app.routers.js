import { Router } from 'express'
import { router as productsRoutes} from './products/products.routes.js'
import { router as cartRoutes} from './carts/carts.routes.js'
import { router as chatRoutes} from './chat/chat.routes.js'
import { router as sessionRoutes} from './session/session.routes.js'
import { router as userRoutes} from './users/users.routes.js'
import { errorMiddleware } from '../middlewares/error.middleware.js'

export const router = Router()

router.use('/products', productsRoutes)
router.use('/carts', cartRoutes)
router.use('/chat', chatRoutes)
router.use('/session', sessionRoutes)
router.use('/users', userRoutes)

router.use(errorMiddleware)
