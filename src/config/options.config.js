const enviroment = require('./enviroment.config')

export const options = {
    fileSystem: {
        productsFileName: "products.json"
    },
    mongoDB: {
        url: enviroment.mongoUrl
    }
}