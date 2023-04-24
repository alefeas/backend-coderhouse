import { CartModel } from "../../schemas/cart.models.js"
import { logCyan } from "../../../utils/console.utils.js"

export class CartsMongoDao {
    async getAll() {
        const carts = await CartModel.find()
        return carts
    }

    async getById(id) {
        const cart = await CartModel.findById(id).lean()
        return cart
    }

    async add(){
        const newCart = await CartModel.create({})
        logCyan('New cart created')
        return newCart
    }

    async addProductToCart(cid, pid, amount){
        const updatedCart = await CartModel.findByIdAndUpdate(cid, {
            $push: {
                products: {
                    product: pid,
                    quantity: amount
                }
            }
        })
        logCyan(`product ${pid} added to cart`)
        return updatedCart
    }

    async updateCart(cid, payload){
        const updatedCart = await CartModel.findByIdAndUpdate(cid, payload)
        return updatedCart
    }

    async deleteProductFromCart(cid, pid){
        const cart = CartModel.updateOne({ _id: cid}, {$pull: {products: {product: {_id: pid}}}})
        logCyan(`product ${pid} deleted from cart`)
        return cart
    }

    async deleteAllProducts(cid){
        const emptyCart = CartModel.updateOne({ _id: cid}, {$pull: {products: {}}})
        logCyan(`cart empty`)
        return emptyCart
    }
}