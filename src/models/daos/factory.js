import { ENV_CONFIG } from '../../config/enviroment.config.js';
import { logCyan } from '../../utils/console.utils.js';
import { MongoManager } from '../db/mongo/mongo.manager.js'
import { CartMongoDao } from './mongo/CartMongoDao.js';
import { ProductMongoDao } from './mongo/ProductMongoDao.js'
import { ChatMongoDao } from './mongo/ChatMongoDao.js';
import { UserMongoDao } from './mongo/UserMongoDao.js';
import { TicketMongoDao } from './mongo/TicketMongoDao.js';

let cartsDao, chatsDao, productsDao, usersDao, ticketsDao

logCyan(`Using ${ENV_CONFIG.DATA_SOURCE} as persistence method`)

switch(ENV_CONFIG.DATA_SOURCE) {

    case "FILE": {
        const CartFileDao = require('./file/CartFileDao')
        const ProductFileDao = require('./file/ProductFileDao')
        cartsDao = new CartFileDao()
        productsDao = new ProductFileDao()
        break;
    }

    case "MONGO": {
        MongoManager.connect()
        cartsDao = new CartMongoDao()
        productsDao = new ProductMongoDao()
        chatsDao = new ChatMongoDao()
        usersDao = new UserMongoDao()
        ticketsDao = new TicketMongoDao()
        break;
    }

    default: {
        throw new Error('You must provide a valid persistence method')
    }
}

export const getDaos = () => {
    return {
        cartsDao,
        productsDao, 
        chatsDao,
        usersDao,
        ticketsDao
    }
}