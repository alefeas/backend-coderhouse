import { getDaos } from '../models/daos/factory.js'
import { CartsService } from '../services/carts.service.js'
import { ProductsService } from '../services/products.service.js'
import { TicketsService } from '../services/tickets.service.js'

const { chatsDao } = getDaos()

const productsService = new ProductsService()
const cartsService = new CartsService()
const ticketsService = new TicketsService()

export class ViewsController{

    static async register(req, res, next) {
        res.render('register', {
            title: 'Sign Up!',
            styles: 'register.css'
        })
    }

    static async login(req, res, next) {
        res.render('login', {
            title: 'Login',
            styles: 'login.css'
        })
    }

    static async products(req, res, next) {
        const { user } = req
        const filter = req.query
        try {
            const products = await productsService.getProducts(filter)
            res.render('index', {
                title: "E-commerce",
                styles:"index.css",
                products: products,
                user: user
            })
        } catch (error) {
            next(error)
        }
    }

    static async cart(req, res, next) {
        const { cid } = req.params 
        const { user } = req
        try {
            const cart = await cartsService.getCartById(cid)
            res.render('cart', {
                title: "Cart",
                styles:"cart.css",
                user,
                cart
            })
        } catch (error) {
            next(error)
        }
    }

    static async chat(req, res, next) {
        try{
            const messages = await chatsDao.getAll()
            res.render('chat', {
                title: "Super Chat!",
                styles:"chat.css",
                messages})
        }catch (error) {
            next(error)
        }
    }

    static async ticket(req, res, next) {
        const { tid } = req.params 
        try{
            const ticket = await ticketsService.getTicketById(tid)
            console.log(ticket);
            res.render('ticket', {
                title: "Purchase Ticket",
                styles:"ticket.css",
                ticket
                })
        }catch (error) {
            next(error)
        }
    }
}