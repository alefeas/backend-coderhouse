import { Router } from 'express'
import { ViewsController } from '../../controllers/views.controller.js'
import { sessionMiddleware } from '../../middlewares/session.middleware.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { passportCall } from '../../middlewares/passport.middleware.js'

export const router = Router()

router.get('/', (req, res)=>{
    res.redirect('/login')
})

router.get('/register', 
    sessionMiddleware,
    ViewsController.register
)

router.get('/login', 
    sessionMiddleware,
    ViewsController.login
)

router.get('/products',
    authMiddleware,
    passportCall('jwt'),
    ViewsController.products
)

router.get('/cart/:cid', 
    authMiddleware,
    passportCall('jwt'),
    ViewsController.cart
)

router.get('/chat', 
    authMiddleware,
    passportCall('jwt'),
    ViewsController.chat
)

router.get('/ticket/:tid',
    authMiddleware,
    passportCall('jwt'),
    ViewsController.ticket
)