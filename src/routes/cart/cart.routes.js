import express from "express";
import { CartManagerMongo } from '../../daos/mongoManager/cart.manager.js'

const cartService = new CartManagerMongo()

export const router = express.Router()

router.get('/',async (req, res) =>{
    try {
        const cart = await cartService.getCarts() 
        res.send({
            status: 'success',
            carts: cart
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get('/:cid',async (req, res) =>{
    const id = req.params.cid
    try {
        const cart = await cartService.getCartById(id) 
        res.send({
            status: 'success',
            cart: cart
        })  
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.post('/', async(req, res)=>{
    try {
        const addCart = await cartService.addCart()
        res.send({
            status: 'success',
            cart: addCart
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.post('/:cid/products/:pid', async(req,res)=>{
    try {
        const {cid, pid} = req.params
        const addProduct = await cartService.addProductToCart(cid, pid)
        res.send({
            status: 'success',
            newCart: addProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})


router.put('/:cid', async (req, res) =>{
    const { cid } = req.params
    const newProducts = req.body
    try {
        const updatedCart = await cartService.updateProducts(cid, newProducts)
        res.send({
            status: 'success',
            payload: updatedCart
        })
        
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.put('/:cid/products/:pid', async(req,res)=>{
    const {cid, pid} = req.params
    const amount = req.body.quantity
    try {
        if(!amount){
            throw new Error('an amount of product must be provided')
        }
        const updateProduct = await cartService.addProductToCart(cid, pid, amount)
        if (updateProduct.stock < amount) {
            await cartService.deleteProductFromCart(cid, pid)            
        }
        res.send({
            status: 'success',
            payload: updateProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.delete('/:cid/products/:pid', async(req,res)=>{
    try {
        const {cid, pid} = req.params
        const deletedProduct = await cartService.deleteProductFromCart(cid, pid)
        res.send({
            status: 'success',
            newCart: deletedProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.delete('/:cid', async(req,res)=>{
    try {
        const { cid }= req.params
        const result = await cartService.deleteAllProducts(cid)
        res.send({
            status: 'success',
            payload: []
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})