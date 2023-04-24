import { CartsMongoDao } from './mongoManager/cart.manager.js'
import { ProductsMongoDao } from './mongoManager/product.manager.js'
import { TicketMongoDao } from './mongoManager/ticket.manager.js';
import { UserMongoDao } from './mongoManager/user.manager.js'

const usersDao = new UserMongoDao();
const productsDao = new ProductsMongoDao();
const cartsDao = new CartsMongoDao();
const ticketDao = new TicketMongoDao()

export const getDAOS = () => {
    return {
    usersDao,
    productsDao,
    cartsDao,
    ticketDao
    }
}