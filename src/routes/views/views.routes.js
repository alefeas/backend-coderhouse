import { Router } from 'express'
import { ProductMongoManager } from '../../daos/mongoManager/product.manager.js'
import { CartManagerMongo } from '../../daos/mongoManager/cart.manager.js'
import { sessionMiddleware } from '../../middlewares/session.middleware.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'

export const router = Router()

const productService = new ProductMongoManager()
const cartService = new CartManagerMongo()

router.get('/', sessionMiddleware, (req, res) => {
    res.redirect('/login')
})

router.get('/register', sessionMiddleware, (req, res) => {
    res.render('register', {
        title: 'Sing Up!',
    })
})

router.get('/login', sessionMiddleware, (req, res) => {
    res.render('login', {
        title: 'Login',
    })
})

router.get('/profile', authMiddleware, (req, res) => {
    const user = req.session.user

    res.render('profile', {
        title: 'Profile',
        user: user
    })
})

router.get('/products', authMiddleware, async (req, res) => {
    try {
        const user = req.session.user
        const products = await productService.getProducts(req.query)
        res.render('products', {
            title: "E-commerce",
            products: products.docs,
            user: user
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get('/products/:pid', async (req, res) => {
    const prodId = req.params.pid
    try {
        const product = await productService.getProductById(prodId)
        res.render('detail', {
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            thumbnails: product.thumbnails,
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid 
    try {
        const cart = await cartService.getCartById(cartId)
        res.render('cart', {
            title: "Cart",
            products: cart.products,
            cartId: cart._id
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})