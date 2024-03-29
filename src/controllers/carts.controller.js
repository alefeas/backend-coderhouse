import { HTTP_STATUS } from "../constants/api.constants.js";
import { CartsService } from "../services/carts.service.js";
import { TicketsService } from "../services/tickets.service.js";
import { apiSuccessResponse } from "../utils/api.utils.js";

const cartsService = new CartsService()
const ticketService = new TicketsService()

export class CartsController{

    static async getAll(req, res, next) {
        try {
            const carts = await cartsService.getCarts()
            const response = apiSuccessResponse(carts)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        const { cid } = req.params
        try {
            const cart = await cartsService.getCartById(cid)
            const response = apiSuccessResponse(cart)
            res.status(HTTP_STATUS.OK).json(response) 
        } catch (error) {
            next(error)
        }
    }

    static async addCart(req, res, next) {
        try {
            const addCart = await cartsService.createCart()
            const response = apiSuccessResponse(addCart)
            res.status(HTTP_STATUS.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async addProduct(req, res, next){
        try {
            const { cid, pid } = req.params
            const amount = +req.body?.amount || 1
            const addedProduct = await cartsService.addProductToCart(cid, pid, amount)
            const response = apiSuccessResponse(addedProduct)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }
    
    static async removeProduct(req, res, next){
        const {cid, pid} = req.params
        try {
            const deletedProduct = await cartsService.deleteProduct(cid, pid)
            const response = apiSuccessResponse(deletedProduct)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async clearCart(req, res, next){
        const { cid }= req.params
        try {
            const emptyCart = await cartsService.clearCart(cid)
            const response = apiSuccessResponse(emptyCart)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async purchase(req, res, next){
        const purchaser = req.user
        const { cid } = req.params
        try {
            const cart = await cartsService.getCartById(cid)
            const payload = cart.products
            const ticket = await ticketService.createTicket(cid, payload, purchaser)
            const response = apiSuccessResponse(ticket)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }
}