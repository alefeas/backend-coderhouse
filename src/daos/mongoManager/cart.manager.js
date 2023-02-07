import { CartModel } from "../../models/cart.models.js"

export class CartManagerMongo {

    async getCarts() {
        try{
            const carts = await CartModel.find()
            return carts
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async getCartById(id) {
        try{
            const cart = await CartModel.findById(id).lean()
            return cart
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async addCart(){
        try{
            const newCart = await CartModel.create({})
            return newCart
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async addProductToCart(cartId, productId, amount){
        try {
            let cart = await this.getCartById(cartId)
            const productToAdd = cart.products.findIndex(product => product.product._id == productId)
            if(!amount){
                if(productToAdd < 0){
                    cart.products.push({product: productId})
                }else{
                    cart.products[productToAdd].quantity ++
                }
            }else{
                cart.products[productToAdd].quantity = amount
            }
            let result = await CartModel.updateOne({_id:cartId}, cart) 
            return result          
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateProducts (cartId, newProducts){
        try {
            const cart = await this.getCartById(cartId)
            cart.products = newProducts
            await CartModel.updateOne({_id:cartId}, cart)
            return newProducts
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(cartId, productId){
        try {
            const cart = await this.getCartById(cartId)
            const productToDelete = cart.products.find(product => product.product._id == productId)
            const index = cart.products.indexOf(productToDelete)
            if(index < 0){
                throw new Error('Product not found')
            }
            cart.products.splice(index, 1)
            const result = CartModel.updateOne({_id:cartId}, cart)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteAllProducts(cartId){
        try {
            const cart = await this.getCartById(cartId)
            cart.products = []
            const result = CartModel.updateOne({_id:cartId}, cart)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }
}