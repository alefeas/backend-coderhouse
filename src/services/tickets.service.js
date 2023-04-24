import { HTTP_STATUS } from "../constants/api.constants.js";
import { getDaos } from "../models/daos/factory.js";
import { UpdateProductDTO } from "../models/dtos/products.dto.js";
import { GetTicketDTO, AddTicketDTO } from "../models/dtos/ticket.dto.js";
import { logYellow } from "../utils/console.utils.js";
import { HttpError } from "../utils/error.utils.js";

const { ticketsDao, cartsDao, productsDao } = getDaos()

export class TicketsService {
    async getTickets() {
        const tickets = await ticketsDao.getAll()
        const ticketsPayloadDTO = []
        tickets.forEach(ticket => {
            ticketsPayloadDTO.push(new GetTicketDTO(ticket))
        })
        return ticketsPayloadDTO
    }

    async getTicketById(tid) {
        if(!tid){
            throw new HttpError('Missing param', HTTP_STATUS.BAD_REQUEST)
        }
        const ticket = await ticketsDao.getById(tid)
        if(!ticket){
            throw new HttpError('Ticket not found', HTTP_STATUS.NOT_FOUND)
        }
        const ticketPayloadDTO = new GetTicketDTO(ticket)
        return ticketPayloadDTO
    }

    async createTicket(cid, payload, purchaser){
        if(!cid ||!payload.length || !purchaser ){
            throw new HttpError('Missing param', HTTP_STATUS.BAD_REQUEST)
        }        
        console.log(payload);
        payload.totalPrice = 0
        await payload.forEach( async item => {
            if(item.quantity > item.product.stock){
                logYellow(`Not enough stock for this item ${item.product.title} with id: ${item.product._id}`);
            }else{
                payload.totalPrice += item.quantity * item.product.price
                await cartsDao.deleteProductFromCart(cid, item.product._id)
                const updateProductPayload = {}
                updateProductPayload.stock = item.product.stock - item.quantity
                if (updateProductPayload.stock === 0){
                    updateProductPayload.status = false
                }
                const productPayloadDTO = new UpdateProductDTO(updateProductPayload)
                await productsDao.updateById(item.product._id, productPayloadDTO)
                logYellow(`Item ${item.product.title} deleted from cart: ${cid}`);
            }
        })
        const amount = payload.totalPrice
        if(!amount){
            throw new HttpError('Not enough stock for purchase any product', HTTP_STATUS.BAD_REQUEST)
        }
        const ticketPayloadDTO = new AddTicketDTO(purchaser, amount, payload)
        const newTicket = await ticketsDao.create(ticketPayloadDTO)
        return newTicket
    }

    async updateTicket(tid, payload){
        if(!tid || !payload || !Object.keys(payload).length){
            throw HttpError('Please provide an id and a payload for the ticket', HTTP_STATUS.BAD_REQUEST)
        }
        const ticket = await ticketsDao.getById(tid)
        if(!ticket){
            throw new HttpError('Ticket not found', HTTP_STATUS.NOT_FOUND)
        }
        const updatedTicket = await ticketsDao.updateById(tid, payload)
        return updatedTicket
    }

    async deleteTicket(tid){
        if(!tid){
            throw HttpError('Please specify a ticket ID', HTTP_STATUS.BAD_REQUEST)
        }
        const deletedTicket = await ticketsDao.delete(tid)
        return deletedTicket
    }
}